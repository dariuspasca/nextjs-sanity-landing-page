import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPageBySlug, getPageSeoBySlug } from "~/lib/sanity.client";
import { CustomPortableText } from "~/components/custom-portable-text";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const meta = await getPageSeoBySlug(slug[slug.length - 1] ?? "");

  return {
    title: meta?.metaTitle,
    description: meta?.metaTitle,
    keywords: meta?.keywords,
    robots: !meta?.preventIndexing ? "all" : "noindex,nofollow",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const pageSlug = params.slug[params.slug.length - 1];
  const page = await getPageBySlug(pageSlug ?? "/");

  if (!page) notFound();

  return (
    <div>
      {slug.length > 1 && (
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link
            key={slug[0]}
            href={`/${slug[0] ?? "/"}`}
            className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium capitalize text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
          >
            {slug[0]}
          </Link>

          <ChevronRight className="h-4 w-4" />
          <div className="font-medium capitalize text-foreground">
            {page.title}
          </div>
        </div>
      )}
      <div className="mx-auto max-w-5xl">
        <h1 className="my-8 text-2xl font-extrabold">{page.title}</h1>
        {page.content && <CustomPortableText value={page.content} />}
      </div>
    </div>
  );
}
