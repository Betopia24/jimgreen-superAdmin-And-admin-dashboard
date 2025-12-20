import * as Icons from "../icons";
import type { NavSection } from "./types";
import { LayoutDashboard, Users, CreditCard, Bell, Settings } from "../icons";

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.LayoutDashboard,
        url: "/",
        items: [],
      },
      {
        title: "User Management",
        url: "/user-management",
        icon: Icons.Users,
        items: [],
      },
      {
        title: "Subscriptions",
        url: "/subscriptions",
        icon: Icons.CreditCard,
        items: [],
      },
      {
        title: "Notifications",
        icon: Icons.Bell,
        url: "/notification",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/settings",
        items: [],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [],
  },
];
