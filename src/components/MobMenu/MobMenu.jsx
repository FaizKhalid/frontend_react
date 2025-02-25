import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import './MobMenu.css';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div>
      {/* <button className="menu-button" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button> */}
      <div className="menu-button">
        <HiMenuAlt4  onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
        </HiMenuAlt4>
      </div>

      <motion.div
        className="menu-drawer"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map(({ name, subMenu }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = subMenu?.length;
            return (
              <li key={name}>
                <span
                  className="menu-item"
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`chevron-icon ${isClicked && "rotate-180"}`}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="submenu-list"
                  >
                    {subMenu.map(({ name, icon: Icon }) => (
                      <li
                        key={name}
                        className="submenu-item"
                      >
                        <Icon size={17} />
                        {name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
