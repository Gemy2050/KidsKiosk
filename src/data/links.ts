import {
  Facebook,
  Github,
  Home,
  LayoutGrid,
  Linkedin,
  Package,
  Phone,
  ShoppingCart,
  Users,
} from "lucide-react";

export const NAV_LINKS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Favorites",
    link: "/favorites",
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export const SIDEBAR_LINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: Home,
  },
  {
    name: "Products",
    link: "/products",
    icon: Package,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: LayoutGrid,
  },
  {
    name: "Orders",
    link: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    link: "/users",
    icon: Users,
  },
];

export const SOCIAL_LINKS = [
  {
    name: "facebook",
    link: "https://www.facebook.com/profile.php?id=100013438807065",
    icon: Facebook,
  },
  {
    name: "whatsapp",
    link: "https://wa.me/201021595806",
    icon: Phone,
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/mohamed-gamal-18a006225",
    icon: Linkedin,
  },
  {
    name: "github",
    link: "https://github.com/gemy2050",
    icon: Github,
  },
];
