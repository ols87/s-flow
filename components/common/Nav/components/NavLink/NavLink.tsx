import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

import { NavLinkProps } from './types';

import { styles } from './css';

export function NavLinkComponent({ link }: NavLinkProps) {
  const { label, icon, path } = link;

  const router = useRouter();

  const state = {
    get active() {
      return router.pathname === path;
    },
    get item() {
      if (this.active) return `${styles.item} ${styles.active}`;
      return styles.item;
    },
    get icon() {
      if (this.active) return `${link.icon}`;
      return link.icon;
    },
  };

  return (
    <li className={state.item} data-test="nav-link">
      <Link className={styles.link} href={path}>
        <Icon className={styles.icon} data-test={`icon-${icon}`} icon={`ph:${state.icon}`} />
        {label}
      </Link>
    </li>
  );
}
