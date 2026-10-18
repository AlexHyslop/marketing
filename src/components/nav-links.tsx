"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "How it works" },
  { href: "/dashboard/calls", label: "Calls" },
  { href: "/dashboard/contractors", label: "Contractors" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/approvals", label: "Approvals" },
  { href: "/dashboard/agents", label: "Agents" },
  { href: "/dashboard/activity", label: "Activity" },
  { href: "/quote", label: "Landing page" },
];

export function NavLinks({ approvalsWaiting }: { approvalsWaiting: number }) {
  const pathname = usePathname();

  return (
    <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {links.map((link) => {
        const active =
          link.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm ${
                active ? "bg-ink text-white" : "text-ink hover:bg-stone-deep"
              }`}
            >
              {link.label}
              {link.href === "/dashboard/approvals" && approvalsWaiting > 0 ? (
                <span
                  className={`rounded-full px-1.5 text-xs font-semibold ${
                    active ? "bg-white text-ink" : "bg-sand text-white"
                  }`}
                >
                  {approvalsWaiting}
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
