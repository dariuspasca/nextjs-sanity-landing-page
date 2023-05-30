import { notFound } from "next/navigation"

import { getHomePage } from "~/lib/sanity.client"

export default async function HomePage() {
  const data = await getHomePage()

  if (!data) notFound()

  return (
    <section className="pt-40 md:pt-56">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {data?.title}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {data?.description}
        </p>
      </div>
    </section>
  )
}
