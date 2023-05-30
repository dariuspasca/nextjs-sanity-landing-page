import * as React from "react";
import Link from "next/link";
import { Pizza } from "lucide-react";
import { siteConfig } from "~/config/site";
import { type SettingsMenuItem } from "~/lib/sanity.queries";
import { type z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";

interface MainNavProps {
  items: z.infer<typeof SettingsMenuItem>[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Pizza />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {/* EXTERNAL LINK */}
        {items.map((navItem) => {
          if (navItem.has_external_link) {
            return (
              <a
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
                key={navItem._id}
                href={navItem.external_link ?? ""}
                target="_blank"
                rel="noreferrer noopener"
              >
                {navItem.title}
              </a>
            );
          } else if (navItem.has_secondary_pages && navItem.secondary_pages) {
            return (
              <TooltipProvider delayDuration={100} key={navItem._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {navItem.main_page ? (
                      <Link
                        key={navItem.main_page._id}
                        href={`/${navItem.main_page.slug ?? ""}`}
                        className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
                      >
                        {navItem.main_page.title}
                      </Link>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-0 text-lg font-medium text-foreground/60 transition-colors hover:bg-inherit hover:text-foreground/80 sm:text-sm"
                      >
                        {navItem.title}
                      </Button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent align="start" alignOffset={14}>
                    <div className="flex flex-col gap-2 bg-card px-4 py-2">
                      {navItem.secondary_pages.map((navItemSecondary) => {
                        const subCategorySlug = navItem.main_page?.slug;
                        return (
                          <Link
                            key={navItemSecondary._id}
                            href={`${
                              subCategorySlug ? `/${subCategorySlug}/` : ""
                            }${navItemSecondary.slug ?? ""}`}
                            className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
                          >
                            {navItemSecondary.title}
                          </Link>
                        );
                      })}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          } else {
            return (
              <Link
                key={navItem._id}
                href={`/${navItem.slug ?? "#"}`}
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                {navItem.title}
              </Link>
            );
          }
        })}
      </nav>
      {children}
    </div>
  );
}
