import { useState, useEffect } from "react";
import { Menus } from "../../utils";
import { images } from "../../constants";
import DesktopMenu from "../DesktopMenu/DesktopMenu";
import MobMenu from "../MobMenu/MobMenu";
import "./Nav.css";

export default function Nav() {
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setBgColor("white"); // Jab user 100vh scroll kar le
      } else {
        setBgColor("transparent"); // Pehli screen tak transparent
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header" style={{ backgroundColor: bgColor }}>
      <nav className="nav-container">
        <div className="nav-logo">
          <img src={images.logo} alt="Logo" />
        </div>

        <ul className="nav-menu desktop">
          {Menus.map((menu) => (
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>

        <div className="nav-menu">
          <div className="mobile">
            <MobMenu Menus={Menus} />
          </div>
        </div>
      </nav>
    </header>
  );
}
