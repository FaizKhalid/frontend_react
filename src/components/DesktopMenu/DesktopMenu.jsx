import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom"; // For routing to pages
import { Link } from "react-scroll"; // For smooth scrolling
import './DesktopMenu.css';

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

  // Function to determine if the path is a section ID (for smooth scrolling)
  const isSectionLink = (path) => path && path.startsWith("#");

  return (
    <motion.ul
      className="group-link"
      onMouseEnter={() => toggleHoverMenu()}
      onMouseLeave={toggleHoverMenu}
      key={menu.name}
    >
      <span className="menu-span">
        {/* If it's a section link (like #testimonials), use react-scroll Link */}
        {isSectionLink(menu.path) ? (
          <Link to={menu.path.slice(1)} smooth={true} duration={500} offset={-50}>
            {menu.name}
          </Link>
        ) : (
          // Otherwise, use react-router Link for routing to a different page
          <RouterLink to={menu.path}>{menu.name}</RouterLink>
        )}

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
            className={`menu-grid ${
              menu.gridCols === 4
                ? "grid-cols-4"
                : menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
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
                      <h6 className="submenu-title">
                        {/* Use Link here to navigate to submenu path */}
                        {isSectionLink(submenu.path) ? (
                          <Link to={submenu.path.slice(1)} smooth={true} duration={500} offset={-50}>
                            {submenu.name}
                          </Link>
                        ) : (
                          <RouterLink to={submenu.path}>{submenu.name}</RouterLink>
                        )}
                      </h6>
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
