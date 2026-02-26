---
title: "Kubernetes Secrets Management: Best Practices for 2026"
description: "A comprehensive guide to managing secrets in Kubernetes environments using Mimir's CSI driver and sidecar injector."
pubDate: 2025-12-28T00:00:00Z
author: "Maya Patel"
category: "Technical Guides"
tags: ["kubernetes", "mimir", "devops"]
---

Managing secrets in Kubernetes has evolved significantly over the past few years. What started as base64-encoded values in YAML manifests has grown into a mature ecosystem of external secret stores, CSI drivers, and operator patterns. In this guide, we'll cover the current best practices and how Mimir's Kubernetes integration makes secrets management seamless.

## The Problem with Kubernetes Secrets

Kubernetes native Secrets have well-documented limitations that make them unsuitable as a standalone secrets management solution for production environments:

**No encryption at rest by default.** Kubernetes Secrets are stored as base64-encoded values in etcd. Base64 is an encoding, not encryption — anyone with read access to etcd can decode every secret in your cluster. While you can enable encryption at rest for etcd, this is an additional configuration step that many clusters don't have enabled.

**Broad access by default.** Any pod in a namespace can mount any Secret in that namespace unless you configure RBAC policies to restrict access. In practice, most teams don't configure fine-grained RBAC for Secrets, meaning a compromise of any pod can expose all secrets in the namespace.

**No rotation mechanism.** Kubernetes provides no built-in way to rotate secrets. When you update a Secret object, pods that have already mounted it won't see the change unless they're restarted (for environment variable secrets) or wait for the kubelet sync period (for volume-mounted secrets). This leads to teams avoiding rotation because it's operationally painful.

**No audit trail.** While the Kubernetes API server can log access to Secret objects, there's no way to know which process inside a pod actually read the secret or what it did with the value. This makes incident investigation and compliance reporting difficult.

**Sprawl across clusters.** If you run multiple clusters — development, staging, production, or multi-region — keeping secrets synchronized is a manual and error-prone process. Teams often end up with different values in different clusters and no single source of truth.

## External Secrets Management

The solution is to treat Kubernetes as a consumer of secrets, not a store. An external secrets management platform like Mimir serves as the single source of truth, and Kubernetes retrieves secrets on demand.

This approach gives you encryption, access control, audit logging, and rotation in one place — regardless of how many clusters you operate. Mimir provides three integration patterns for Kubernetes, each suited to different use cases.

## Mimir CSI Driver

The Mimir CSI (Container Storage Interface) driver is the recommended approach for most workloads. It mounts secrets directly into pods as files on a tmpfs volume, eliminating the need for Kubernetes Secret objects entirely.

### How It Works

1. You deploy the Mimir CSI driver as a DaemonSet on your cluster
2. Pods request secrets through a `SecretProviderClass` resource that maps Mimir paths to file paths
3. When a pod starts, the CSI driver authenticates to Mimir using the pod's service account
4. Mimir verifies the pod's identity and returns the requested secrets
5. Secrets are mounted as files in the pod's filesystem on a tmpfs volume
6. When the pod terminates, the tmpfs volume is destroyed and secrets are gone

### Benefits

The CSI driver approach has several advantages. Secrets never touch etcd — they go directly from Mimir to the pod's memory-backed filesystem. There's no intermediate Kubernetes Secret object that could be read by other pods or leaked through the API server. The pod's service account identity is verified by Mimir, so you get fine-grained access control tied to workload identity rather than namespace-level RBAC.

Rotation is handled automatically. The CSI driver polls Mimir for changes and updates mounted files without requiring a pod restart. Your application just needs to watch for file changes or re-read the secret file periodically.

### Configuration Example

```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: mimir-db-creds
spec:
  provider: mimir
  parameters:
    mimirAddress: "https://mimir.internal:8200"
    roleName: "webapp"
    objects: |
      - objectName: "db-password"
        secretPath: "database/creds/webapp"
        secretKey: "password"
      - objectName: "db-username"
        secretPath: "database/creds/webapp"
        secretKey: "username"
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: webapp
spec:
  serviceAccountName: webapp
  containers:
    - name: webapp
      image: webapp:latest
      volumeMounts:
        - name: secrets
          mountPath: "/mnt/secrets"
          readOnly: true
  volumes:
    - name: secrets
      csi:
        driver: secrets-store.csi.k8s.io
        readOnly: true
        volumeAttributes:
          secretProviderClass: "mimir-db-creds"
```

## Sidecar Injection

For applications that can't be modified to read secrets from files — legacy applications that expect environment variables, for example — the Mimir sidecar provides a transparent injection mechanism.

### How It Works

The Mimir sidecar runs as an init container and a long-running sidecar in your pod. The init container fetches secrets from Mimir before your application starts, writes them to a shared volume, and optionally renders them into configuration file templates. The sidecar container watches for changes in Mimir and updates the shared volume when secrets rotate.

You enable sidecar injection by adding an annotation to your pod spec:

```yaml
annotations:
  mimir.norncorp.com/inject: "true"
  mimir.norncorp.com/role: "webapp"
  mimir.norncorp.com/secrets: "database/creds/webapp,api/keys/stripe"
```

The Mimir admission webhook intercepts the pod creation and automatically adds the sidecar containers and shared volume. Your application deployment doesn't need any other changes.

### Template Rendering

The sidecar supports Go template syntax for rendering secrets into configuration files. This is useful for applications that read configuration from files with specific formats:

```
# Template: /mnt/templates/database.conf.tmpl
host={{ secret "database/creds/webapp" "host" }}
port={{ secret "database/creds/webapp" "port" }}
username={{ secret "database/creds/webapp" "username" }}
password={{ secret "database/creds/webapp" "password" }}
```

The sidecar renders the template with current secret values and re-renders automatically when secrets change.

## Secrets Operator

The Mimir Secrets Operator is a Kubernetes controller that synchronizes secrets from Mimir into native Kubernetes Secret objects. This is the right choice when you need to integrate with Kubernetes-native tools that expect standard Secret objects — things like TLS certificates for Ingress controllers or image pull secrets for private registries.

### How It Works

You create a `MimirSecret` custom resource that defines which Mimir secrets to sync and how to map them to a Kubernetes Secret:

```yaml
apiVersion: mimir.norncorp.com/v1alpha1
kind: MimirSecret
metadata:
  name: tls-cert
spec:
  mimirPath: "pki/issue/webapp"
  refreshInterval: 1h
  target:
    name: webapp-tls
    type: kubernetes.io/tls
    data:
      tls.crt: "certificate"
      tls.key: "private_key"
```

The operator watches for `MimirSecret` resources, fetches the corresponding secrets from Mimir, and creates or updates the target Kubernetes Secret. It handles refresh intervals, error retries, and status reporting through the custom resource's status field.

### When to Use the Operator

Use the Secrets Operator when you need Kubernetes-native Secret objects for compatibility reasons. For all other cases, prefer the CSI driver or sidecar approach — they avoid storing secrets in etcd and provide stronger security guarantees.

## Choosing the Right Approach

| Criteria | CSI Driver | Sidecar | Operator |
|----------|-----------|---------|----------|
| Secrets in etcd | No | No | Yes |
| Application changes | Read from files | None | None |
| Auto-rotation | Yes | Yes | Yes |
| Best for | New workloads | Legacy apps | K8s-native tools |
| Performance | Low overhead | Moderate | Low overhead |

For most teams, we recommend starting with the CSI driver for new workloads and the sidecar for existing applications that are difficult to modify. Use the Secrets Operator only when you need compatibility with tools that require native Kubernetes Secrets.

## Cluster Authentication

All three integration patterns authenticate to Mimir using Kubernetes service account tokens. Mimir's Kubernetes auth backend verifies the token against your cluster's API server and maps the service account to a Mimir role with specific policies.

This means your access control is tied to workload identity, not shared credentials. Each service account gets its own Mimir role with scoped access to only the secrets it needs. If a pod is compromised, the attacker only has access to that workload's secrets — not the entire secrets store.

To set up Kubernetes authentication:

1. Enable the Kubernetes auth backend in Mimir
2. Configure Mimir with your cluster's API server URL and CA certificate
3. Create Mimir roles mapped to Kubernetes service accounts
4. Attach policies to roles that define which secrets each workload can access

## Conclusion

Kubernetes secrets management in 2026 means treating secrets as a first-class infrastructure concern, not an afterthought bolted onto your deployment manifests. By using an external secrets platform like Mimir with the right integration pattern for your workloads, you get encryption, access control, rotation, and audit logging without changing your development workflow.

Start with a single namespace, pick the integration pattern that fits your workload, and expand from there. The operational overhead of proper secrets management is far lower than the cost of a credential breach.
