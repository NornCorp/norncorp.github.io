export default function CTA() {
  return (
    <div className="bg-norn-green">
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-norn-dark sm:text-5xl">
            Secure your infrastructure today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-norn-dark/70">
            Join 500+ enterprises that trust NornCorp to manage their secrets and secure access
            across hybrid and multi-cloud environments.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-norn-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-norn-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-norn-dark"
            >
              Start free trial
            </a>
            <a href="#" className="text-sm/6 font-semibold text-norn-dark">
              Contact sales
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
