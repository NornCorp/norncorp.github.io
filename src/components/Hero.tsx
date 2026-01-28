import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Hero() {
  return (
    <div className="bg-norn-dark">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-norn-green/5">
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div>
                  <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-norn-green/10 px-3 py-1 text-sm/6 font-semibold text-norn-green ring-1 ring-norn-green/25 ring-inset">
                      What's new
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300">
                      <span>Yggdrasil v2.0 released</span>
                      <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-500" />
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                  Security infrastructure for the modern enterprise
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                  Manage secrets, control access, and secure your infrastructure.
                  NornCorp provides the foundation for zero-trust security at scale.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-norn-green px-3.5 py-2.5 text-sm font-semibold text-norn-dark shadow-xs hover:bg-norn-green-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-norn-green"
                  >
                    Get Started
                  </a>
                  <a href="#" className="text-sm/6 font-semibold text-white hover:text-norn-green">
                    View Documentation <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-norn-darker shadow-xl ring-1 shadow-norn-green/10 ring-white/5 md:-mr-20 lg:-mr-36"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-norn-green [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-norn-green/20 opacity-20 inset-ring inset-ring-white md:ml-20 lg:ml-36"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                          <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                            Terminal
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">mimir.yaml</div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14 font-mono text-sm text-gray-300">
                        <div className="text-gray-500"># Connect to Mimir</div>
                        <div><span className="text-norn-green">$</span> mimir login</div>
                        <div className="text-gray-500 mt-2"># Store a secret</div>
                        <div><span className="text-norn-green">$</span> mimir kv put secret/api-key value=sk-xxx</div>
                        <div className="text-emerald-400 mt-1">Success! Secret stored at: secret/api-key</div>
                        <div className="text-gray-500 mt-2"># Read it back</div>
                        <div><span className="text-norn-green">$</span> mimir kv get secret/api-key</div>
                        <div className="mt-1">
                          <span className="text-gray-500">Key:</span> api-key<br/>
                          <span className="text-gray-500">Value:</span> sk-xxx
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset md:rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-norn-dark sm:h-32" />
      </div>
    </div>
  )
}
