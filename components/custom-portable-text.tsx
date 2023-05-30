import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextLink } from "@portabletext/types"
import { type z } from "zod"

import { type portableContentBlockZ } from "~/lib/sanity.queries"

interface CustomPortableTextProps {
  paragraphClasses?: string
  value: z.infer<typeof portableContentBlockZ>
}

export function CustomPortableText({
  paragraphClasses,
  value,
}: CustomPortableTextProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({
        value,
        children,
      }: {
        value?: PortableTextLink
        children: React.ReactNode
      }) => {
        return (
          <a
            className="font-medium underline underline-offset-4"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
