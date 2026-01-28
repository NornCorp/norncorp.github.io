export default function BentoGrid() {
  // CSS filter to shift purple/indigo to green
  const greenFilter = "brightness(0.75) sepia(1) hue-rotate(110deg) saturate(1.5) contrast(1.1)"

  return (
    <div className="bg-norn-dark py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-norn-green">Complete Security Platform</h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
          Two products. One security foundation.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {/* Mimir - Large card */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-norn-darker max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img
                alt="Mimir Dashboard"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-performance.png"
                className="h-80 object-cover object-left"
                style={{ filter: greenFilter }}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-norn-green">Secrets Management</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Mimir
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Centralized secrets storage with dynamic credential generation, encryption as a service,
                  and comprehensive audit logging for compliance.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-white/10 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>
          {/* Yggdrasil - Large card */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-norn-darker lg:rounded-tr-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt="Yggdrasil Access Gateway"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-releases.png"
                className="h-80 object-cover object-left lg:object-right"
                style={{ filter: greenFilter }}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-norn-green">Access Management</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Yggdrasil
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Identity-aware access gateway with session recording, just-in-time privileges,
                  and certificate-based authentication for zero-trust access.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-white/10 lg:rounded-tr-4xl" />
          </div>
          {/* Kubernetes */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-norn-darker lg:rounded-bl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <img
                alt="Kubernetes Integration"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-speed.png"
                className="h-80 object-cover object-left"
                style={{ filter: greenFilter }}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-norn-green">Cloud Native</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Kubernetes Native
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  CSI driver, sidecar injector, and secrets operator for seamless K8s integration.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-white/10 lg:rounded-bl-4xl" />
          </div>
          {/* CI/CD */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-norn-darker" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <img
                alt="CI/CD Integration"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png"
                className="h-80 object-cover"
                style={{ filter: greenFilter }}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-norn-green">DevOps</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  CI/CD Integration
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Native plugins for Jenkins, GitHub Actions, GitLab CI, and all major pipelines.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-white/10" />
          </div>
          {/* Compliance */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-norn-darker max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <img
                alt="Compliance & Audit"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-network.png"
                className="h-80 object-cover"
                style={{ filter: greenFilter }}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-norn-green">Compliance</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Audit & Reporting
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  SOC 2, HIPAA, and PCI-DSS compliant with comprehensive audit trails.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-white/10 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
