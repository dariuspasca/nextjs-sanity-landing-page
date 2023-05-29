import * as React from "react";
import Link from "next/link";
import { Pizza } from "lucide-react";
import { siteConfig } from "~/config/site";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Pizza />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex"></nav>
    </div>
  );
}
