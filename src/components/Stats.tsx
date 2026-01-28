const stats = [
  { id: 1, name: 'Secrets rotated daily', value: '2.3 billion' },
  { id: 2, name: 'Enterprise customers', value: '500+' },
  { id: 3, name: 'Uptime SLA', value: '99.999%' },
]

export default function Stats() {
  return (
    <div className="bg-norn-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-norn-green sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
