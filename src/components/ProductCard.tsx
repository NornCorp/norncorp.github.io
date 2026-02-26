interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

export default function ProductCard({ name, tagline, description, icon: Icon, link }: ProductCardProps) {
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="absolute inset-0 rounded-3xl bg-norn-darker" />

      {/* Content layer */}
      <div className="relative px-6 py-8 sm:px-8">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-norn-green/10 ring-1 ring-norn-green/25">
          <Icon aria-hidden="true" className="h-6 w-6 text-norn-green" />
        </div>

        {/* Product name */}
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
          {name}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-base/7 font-semibold text-norn-green">
          {tagline}
        </p>

        {/* Description */}
        <p className="mt-4 text-base/7 text-gray-400">
          {description}
        </p>

        {/* Learn more link */}
        <div className="mt-6">
          <a
            href={link}
            className="inline-flex items-center gap-x-2 text-sm font-semibold text-norn-green hover:text-norn-green/80"
          >
            Learn more
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Ring layer */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
    </div>
  );
}
