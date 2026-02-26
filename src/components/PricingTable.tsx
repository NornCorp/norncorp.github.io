import { CheckIcon } from '@heroicons/react/20/solid';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="pt-10 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 ${tiers.length <= 3 ? 'lg:max-w-4xl lg:grid-cols-3' : 'lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4'}`}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              data-featured={tier.highlighted ? 'true' : undefined}
              className="group/tier rounded-3xl p-8 ring-1 ring-white/10 data-featured:bg-norn-green/5 data-featured:ring-2 data-featured:ring-norn-green"
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg/8 font-semibold text-white group-data-featured/tier:text-norn-green">
                  {tier.name}
                </h3>
                {tier.highlighted && (
                  <p className="rounded-full bg-norn-green/10 px-2.5 py-1 text-xs/5 font-semibold text-norn-green ring-1 ring-norn-green/25">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm/6 text-gray-400">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {tier.price}
                </span>
                <span className="text-sm/6 font-semibold text-gray-400">{tier.period}</span>
              </p>
              <a
                href={tier.ctaLink}
                className="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6 font-semibold bg-white/10 text-white ring-1 ring-inset ring-white/10 hover:bg-white/20 group-data-featured/tier:bg-norn-green group-data-featured/tier:text-white group-data-featured/tier:ring-0 group-data-featured/tier:hover:bg-norn-green/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-norn-green"
              >
                {tier.cta}
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-norn-green" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
