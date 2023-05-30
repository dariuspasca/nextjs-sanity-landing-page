import Link from "next/link";
import { siteConfig } from "~/config/site";
import { Pizza } from "lucide-react";
import { type SettingsMenuItem } from "~/lib/sanity.queries";
import { type z } from "zod";
import { useLockBody } from "~/hooks/use-lock-body";

interface MobileNavProps {
  items: z.infer<typeof SettingsMenuItem>[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Pizza />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((navItem) => {
            if (navItem.has_external_link) {
              return (
                <a
                  className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                  key={navItem._id}
                  href={navItem.external_link ?? ""}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {navItem.title}
                </a>
              );
            }
            return (
              <Link
                key={navItem._id}
                href={navItem.main_page?.slug ?? ""}
                className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
              >
                {navItem.title}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}