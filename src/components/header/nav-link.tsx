'use client';
import Link from 'next/link';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';

const NavLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	const path = usePathname();
	return (
		<Link
			className={`${classes.link} ${
				path.startsWith(href) ? classes.active : ''
			}`}
			href={href}
		>
			{children}
		</Link>
	);
};

export default NavLink;
