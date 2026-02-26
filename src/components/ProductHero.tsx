'use client'

interface ProductHeroProps {
  title: string
  description: string
  screenshot: string
}

export default function ProductHero({ title, description, screenshot }: ProductHeroProps) {
  return (
    <div className="bg-norn-darker">
      <div className="relative isolate overflow-hidden pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                {title}
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                {description}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-norn-green px-3.5 py-2.5 text-sm font-semibold text-norn-dark shadow-xs hover:bg-norn-green-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-norn-green"
                >
                  Get started
                </a>
                <a href="/resources/documentation" className="text-sm/6 font-semibold text-white hover:text-norn-green">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-white/5 p-2 ring-1 ring-norn-green/20 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  alt="Product screenshot"
                  src={screenshot}
                  width={2432}
                  height={1442}
                  className="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                  style={{ filter: "brightness(0.75) sepia(1) hue-rotate(110deg) saturate(1.5) contrast(1.1)" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-norn-dark sm:h-32"></div>
      </div>
    </div>
  )
}
