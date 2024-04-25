'use client';
import Link from 'next/link';
import styles from './nav-link.module.css';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }: { href: string; children: any }) => {
	const path = usePathname();
	return (
		<Link
			className={`${styles.link} ${
				path.startsWith(href) ? styles.active : ''
			}`}
			href={href}
		>
			{children}
		</Link>
	);
};

export default NavLink;
