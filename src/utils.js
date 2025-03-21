import { Database } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { PanelTop } from "lucide-react";
import { Bolt } from "lucide-react";

export const Menus = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    subMenuHeading:["one heading","two heading"],
    subMenu: [
      {
        name: "Design",
        desc: "Responsive design",
        icon: PanelsTopLeft,
      },
      {
        name: "Management",
        desc: "Site control",
        icon: Bolt,
      },
      {
        name: "Navigation",
        desc: "Link pages",
        icon: PanelTop,
      },
      {
        name: "CMS",
        desc: "Management content",
        icon: Database,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Service",
    path: "/service"
  },
  {
    name: "Testimonials",
    path: "/testimonials"
  },
  {
    name: "Contact",
    path: "/contact"
  },
  {
    name: "About",
    path: "/about"
  },
  {
    name: "FAQs",
    path: "/faqs"
  }
];
