import { NAV_MODEL } from './models';

import { NavLinkComponent } from './components/NavLink';
import { NavLink } from './components/NavLink';

import { styles } from './css';

const listItems = NAV_MODEL.map((link: NavLink, index: number) => {
  return <NavLinkComponent key={index} link={link} />;
});

export function NavComponent() {
  return (
    <nav className={styles.wrapper} data-test="nav">
      <ul className={styles.links} data-test="nav-links">
        {listItems}
      </ul>
    </nav>
  );
}
