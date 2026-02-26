---
title: "Announcing Yggdrasil v2.0: Certificate-Based Access at Scale"
description: "Today we're excited to announce Yggdrasil v2.0, bringing certificate-based authentication and just-in-time access to enterprise scale."
pubDate: 2026-01-15T00:00:00Z
author: "Henrik Strand"
category: "Product Announcements"
tags: ["yggdrasil", "access-management", "certificates"]
---

Today we're excited to announce Yggdrasil v2.0, the latest version of our identity-aware access gateway. This release brings major improvements to certificate-based authentication, just-in-time access workflows, and session recording capabilities.

Over the past year, we've worked closely with our enterprise customers to understand the challenges they face managing access across hybrid infrastructure. The result is a release that fundamentally changes how organizations handle privileged access — moving away from static credentials toward short-lived, identity-bound certificates that scale with your organization.

## What's New in v2.0

### Certificate-Based Authentication

Certificate-based authentication is now available at enterprise scale, supporting thousands of concurrent sessions with automatic rotation and renewal. Each certificate is tied to a verified identity and scoped to specific resources, eliminating the need for long-lived credentials and reducing the attack surface for your infrastructure.

Under the hood, Yggdrasil v2.0 includes a built-in certificate authority that integrates with your existing PKI infrastructure. Certificates are issued on-demand with configurable TTLs — from minutes to hours — and automatically revoked when a session ends or an access policy changes. This means that even if a certificate is intercepted, the window of exposure is minimized to seconds.

Issuing a certificate for a user or service is a single CLI command:

```bash
# Issue a short-lived SSH certificate for a user
yggdrasil cert issue \
  --identity alice@norncorp.com \
  --target "env:production,role:engineer" \
  --ttl 4h \
  --output ~/.ssh/yggdrasil-cert.pub

# Verify a certificate's scope and expiration
yggdrasil cert inspect ~/.ssh/yggdrasil-cert.pub
```

```json
{
  "identity": "alice@norncorp.com",
  "valid_after": "2026-01-15T09:00:00Z",
  "valid_before": "2026-01-15T13:00:00Z",
  "principals": ["alice"],
  "extensions": {
    "target-env": "production",
    "target-role": "engineer"
  }
}
```

We've also added support for certificate pinning and mutual TLS (mTLS) for service-to-service communication, allowing you to extend the same identity-aware access model to your internal microservices.

### Session Recording and Playback

Every session through Yggdrasil is now recorded by default, with full terminal playback for SSH sessions and screen capture for RDP sessions. Recordings are stored encrypted and can be reviewed through the Yggdrasil dashboard or exported for compliance purposes.

The recording system is designed to have minimal performance impact. Sessions are recorded asynchronously, and recordings are compressed and encrypted before being written to your configured storage backend — whether that's S3, GCS, or a local filesystem.

### Enhanced Audit Logging

Audit logs now capture granular detail about every access event: who connected, what resources they accessed, what commands they ran, and how long the session lasted. Logs are structured as JSON and can be forwarded to your SIEM of choice via our integrations with Splunk, Datadog, and Elastic.

```bash
# Query audit logs for a specific user
yggdrasil audit search --identity alice@norncorp.com --since 24h

# Export audit logs for compliance review
yggdrasil audit export \
  --format csv \
  --start 2026-01-01 \
  --end 2026-01-15 \
  --output audit-q1-2026.csv
```

## Just-in-Time Access

The new JIT access system allows you to grant time-limited elevated privileges with automatic expiration and comprehensive audit trails. Instead of maintaining standing access to production systems, engineers request access when they need it and receive it only for the duration required.

Approval workflows can be customized to match your organization's policies. You can configure single-approver flows for low-risk access, multi-party approval for production databases, or automatic approval based on on-call schedules and incident response contexts. We've integrated with Slack and Microsoft Teams so approvers can review and grant access without leaving their workflow.

Once approved, access is provisioned in seconds. The engineer receives a short-lived certificate that grants them exactly the permissions they need — no more, no less. When the time window expires, access is automatically revoked without any manual intervention.

```bash
# Request JIT access to a production database
yggdrasil access request \
  --resource "prod/db-primary" \
  --reason "Investigating slow query in order service" \
  --duration 2h

# Output:
# Access request REQ-4821 submitted.
# Approvers notified: @oncall-lead, @security-team
# Status: pending

# Check request status
yggdrasil access status REQ-4821

# Once approved, connect through Yggdrasil
yggdrasil connect prod/db-primary
```

### Break-Glass Access

For emergency situations, Yggdrasil v2.0 includes a break-glass mechanism that allows engineers to bypass normal approval workflows when responding to critical incidents. Break-glass access is heavily audited, triggers immediate alerts to security teams, and requires a post-incident review before normal access can be restored.

```bash
# Emergency access — bypasses approval workflow
yggdrasil access break-glass \
  --resource "prod/db-primary" \
  --incident "INC-392" \
  --reason "Database failover — primary unresponsive"

# WARNING: Break-glass access activated.
# Security team has been alerted.
# Post-incident review required within 48 hours.
```

## Migration Guide

Upgrading from Yggdrasil 1.x is straightforward. The v2.0 agent is backwards-compatible with existing configurations, and we've built a migration tool that automatically converts your existing access policies to the new format. We recommend a phased rollout:

1. **Deploy the v2.0 server** alongside your existing installation
2. **Migrate policies** using the `yggdrasil migrate` CLI tool
3. **Roll out v2.0 agents** to your infrastructure in stages
4. **Enable certificate-based auth** once all agents are updated
5. **Decommission v1.x** after validating all access patterns

```bash
# Check compatibility before upgrading
yggdrasil migrate check --config /etc/yggdrasil/config.hcl

# Migrate policies to v2.0 format
yggdrasil migrate policies --dry-run
yggdrasil migrate policies --apply

# Upgrade the agent in-place
yggdrasil agent upgrade --version 2.0.0

# Verify the upgrade
yggdrasil version
# Yggdrasil v2.0.0 (build 2026-01-12)
# Agent: v2.0.0 | Server: v2.0.0 | Protocol: v3
```

Our team is available to assist with migrations for Enterprise customers. Reach out to your account manager or contact our support team to schedule a migration review.

## Try It Today

Yggdrasil v2.0 is available now for all customers on Team plans and above. Existing customers can upgrade through the standard update process. If you're new to Yggdrasil, start a free trial to see how identity-aware access control can transform your security posture.

Check out the [documentation](/resources) for detailed guides on each new feature, or join our upcoming webinar on February 5th for a live walkthrough with the engineering team.
