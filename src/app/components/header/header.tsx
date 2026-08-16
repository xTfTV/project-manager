"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  roleId: number;
}


export default function Header({ roleId }: HeaderProps) {

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    ...(roleId === 1 ? [{ name: "Accounts", href: "/account-creation" }] : []),
  ];

  // Router and the logout functionality
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch('/api/auth/logout', {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Logout failed.");
      return;
    }

    router.replace("/");
    router.refresh();
  }

  const pathname = usePathname();

  return (
    <header className="flex w-full justify-center pb-6.25">
      <nav
        className="relative top-6.25 inline-flex h-10 w-fit items-center gap-4 rounded-full bg-[#1a1a1a] shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
        style={{
          paddingInline: "clamp(1rem, 2vw, 1.5rem)",
        }}
      >
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.name}
              href={link.href}
              style={{
                paddingInline: "clamp(2.5rem, 5vw, 4rem)",
              }}
              className={`
                relative flex h-full items-center justify-center
                overflow-hidden whitespace-nowrap rounded-full
                text-sm font-semibold uppercase tracking-wide text-white
                before:absolute before:inset-0 before:origin-left
                before:rounded-full before:bg-[#ff2d3b]
                before:transition-transform before:duration-300
                ${
                  isActive
                    ? "before:scale-x-100"
                    : "before:scale-x-0 hover:before:scale-x-100"
                }
              `}
            >
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            paddingInline: "clamp(2.5rem, 5vw, 4rem)",
          }}
          className="
            relative flex h-full items-center justify-center
            overflow-hidden whitespace-nowrap rounded-full
            text-sm font-semibold uppercase tracking-wide text-white
            before:absolute before:inset-0 before:origin-left
            before:scale-x-0 before:rounded-full before:bg-[#ff2d3b]
            before:transition-transform before:duration-300
            hover:before:scale-x-100
          "
        >
          <span className="relative z-10">Logout</span>
        </button>
      </nav>
    </header>
  );
}