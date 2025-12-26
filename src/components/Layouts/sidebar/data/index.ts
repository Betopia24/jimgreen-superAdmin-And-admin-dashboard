import * as Icons from "../icons";
import type { NavSection } from "./types";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Bell,
  Settings,
  Building2,
  ChartLineIcon,
} from "../icons";

export const NAV_DATA_ADMIN: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.LayoutDashboard,
        url: "/admin",
        items: [],
      },
      {
        title: "Team Management",
        url: "/admin/team-management",
        icon: Icons.Users,
        items: [],
      },

      {
        title: "Subscriptions",
        url: "/admin/subscriptions",
        icon: Icons.CreditCard,
        items: [],
      },

      {
        title: "Reports Analytics",
        icon: Icons.ChartLineIcon,
        url: "/admin/reports-Analytics",
        items: [],
      },

      {
        title: "Settings",
        icon: Icons.Settings,
        url: "/admin/settings",
        items: [],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [],
  },
];

export const NAV_DATA_SUPER_ADMIN: NavSection[] = [
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
        title: "Company Management",
        icon: Icons.Building2,
        url: "/company-management",
        items: [],
      },
      {
        title: "Subscriptions",
        url: "/subscriptions",
        icon: Icons.CreditCard,
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
