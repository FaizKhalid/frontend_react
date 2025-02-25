import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import './DesktopMenu.css'

export default function DesktopMenu({ menu }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.ul
      className="group-link"
      onMouseEnter={() => toggleHoverMenu()}
      onMouseLeave={toggleHoverMenu}
      key={menu.name}
    >
      <span className="menu-span">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="chevron" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`menu-grid ${menu.gridCols === 3 ? 'grid-cols-3' : menu.gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => (
                <div className="submenu-item" key={i}>
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p className="submenu-heading">{menu?.subMenuHeading?.[i]}</p>
                  )}
                  <div className="submenu-box">
                    <div className="submenu-icon">
                      {submenu.icon && <submenu.icon />}
                    </div>
                    <div>
                      <h6 className="submenu-title">{submenu.name}</h6>
                      <p className="submenu-desc">{submenu.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.ul>
  );
}
