import { type z } from "zod"

import { type FooterQueryResponse } from "~/lib/sanity.queries"
import { CustomPortableText } from "~/components/custom-portable-text"

interface FooterProps {
  footer: z.infer<typeof FooterQueryResponse>
}

export function SiteFooter({ footer }: FooterProps) {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-center py-10 md:h-24 md:flex-row md:py-0">
        {footer?.content && <CustomPortableText value={footer.content} />}
      </div>
    </footer>
  )
}
