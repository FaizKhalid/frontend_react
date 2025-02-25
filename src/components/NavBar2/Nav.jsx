import { Menus } from "../../utils";
import { images } from "../../constants";
import DesktopMenu from "../DesktopMenu/DesktopMenu";
import MobMenu from "../MobMenu/MobMenu";
import "./Nav.css";  // Import the CSS file

export default function Nav() {
  return (
    <div>
      <header className="header">
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
    </div>
  );
}
