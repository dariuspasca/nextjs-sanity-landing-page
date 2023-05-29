import { getHomePage } from "~/lib/sanity.client";

export default async function HomePage() {
  const data = await getHomePage();

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {data?.title}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {data?.description}
        </p>
      </div>
    </section>
  );
}
