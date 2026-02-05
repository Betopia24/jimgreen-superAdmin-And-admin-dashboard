"use client";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA_SUPER_ADMIN, NAV_DATA_ADMIN } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { LogOut, LogOut as LogOutIcon, LucideLoader } from "lucide-react";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import type { NavItem } from "./data/types";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  /** ⭐ Correct nested URL detection */
  const isActiveUrl = (url?: string): boolean => {
    if (!url) return false;

    // Dashboard exact match only
    if (url === "/admin") {
      return pathname === "/admin";
    }

    // Other routes (nested)
    return pathname === url || pathname.startsWith(url + "/");
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const role = true;

  let NAV_DATA = [];
  if (
    pathname === "/admin" ||
    pathname === "/admin/team-management" ||
    pathname === "/admin/subscriptions" ||
    pathname === "/admin/reports-Analytics" ||
    pathname === "/admin/reports-Analytics/report-details" ||
    pathname === "/admin/settings"
  ) {
    NAV_DATA = NAV_DATA_ADMIN;
  } else {
    NAV_DATA = NAV_DATA_SUPER_ADMIN;
  }

  /** ⭐ Auto-expand if child matches */
  useEffect(() => {
    NAV_DATA.forEach((section) =>
      section.items.forEach((item: NavItem) => {
        if (item.items.some((sub) => isActiveUrl(sub.url))) {
          if (!expandedItems.includes(item.title)) {
            setExpandedItems([item.title]);
          }
        }
      }),
    );
  }, [pathname]);

  // const handleLogout = () => {
  //   if (isMobile) toggleSidebar();
  //   // router.push("/");
  // };

  const handleLogOut = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("persist:root");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("token");
      toast.success("Logged out successfully");
      router.push("http://localhost:3008/signIn"); // optional redirect
      setLoading(false); // 2-second delay
    }, 2000);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r bg-white transition-[width] dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
      >
        <div className="flex h-full flex-col py-5 pl-[25px] pr-[7px]">
          {/* Logo */}
          <div className="relative pr-4.5">
            <Link
              href="/"
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5"
            >
              <Logo />{" "}
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 top-1/2 -translate-y-1/2"
              >
                <ArrowLeftIcon className="size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-4 flex-1 overflow-y-auto pr-3">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-dark-4">
                  {section.label}
                </h2>

                <nav>
                  <ul className="space-y-2">
                    {section.items.map((item) => {
                      const hasChildren = item.items.length > 0;
                      const parentIsActive =
                        isActiveUrl(item.url) ||
                        item.items.some((sub) => isActiveUrl(sub.url));

                      return (
                        <li key={item.title}>
                          {hasChildren ? (
                            <>
                              <MenuItem
                                isActive={parentIsActive}
                                onClick={() => toggleExpanded(item.title)}
                              >
                                <item.icon className="size-6" />
                                <span>{item.title}</span>
                                <ChevronUp
                                  className={cn(
                                    "ml-auto rotate-180 transition-transform",
                                    expandedItems.includes(item.title) &&
                                      "rotate-0",
                                  )}
                                />
                              </MenuItem>

                              {expandedItems.includes(item.title) && (
                                <ul className="ml-9 space-y-1.5 pt-2">
                                  {item.items.map((sub) => (
                                    <li key={sub.title}>
                                      <MenuItem
                                        as="link"
                                        href={sub.url}
                                        isActive={isActiveUrl(sub.url)}
                                      >
                                        {sub.title}
                                      </MenuItem>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ) : (
                            <MenuItem
                              as="link"
                              href={item.url ?? "/"}
                              isActive={isActiveUrl(item.url)}
                              className="flex items-center gap-3 py-3"
                            >
                              <item.icon className="size-6" />
                              <span>{item.title}</span>
                            </MenuItem>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-auto border-t pt-5">
            {/* <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl bg-red-100 px-4 py-3 text-red-600 hover:bg-red-200"
            >
              <LogOutIcon className="size-6" />
              <span className="font-medium">Logout</span>
            </button> */}

            <button
              onClick={handleLogOut}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-xl bg-red-100 px-4 py-4 text-red-600 hover:bg-red-200"
            >
              {loading ? (
                <>
                  <LucideLoader
                    className={`absolutem animate-spin text-center text-[#D00E11]`}
                  />
                </>
              ) : (
                <>
                  <LogOut
                    size={22}
                    className="text-[#D00E11] transition-transform duration-200 group-hover:scale-110"
                  />
                </>
              )}

              <span className="text-[16px] font-medium text-[#D00E11]">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
