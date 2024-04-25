import styles from './main-header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import MainHeaderBackground from './main-header-background';

const MainHeader = () => {
	return (
		<>
			<MainHeaderBackground />
			<header className={styles.header}>
				<Link href={'/'} className={styles.logo}>
					<Image
						src={logoImg}
						priority={true}
						alt='A plate with food on it'
					/>
					NextLevel Food
				</Link>

				<nav className={styles.nav}>
					<ul>
						<li>
							<Link href={'/meals'}>Browse Meals</Link>
						</li>
						<li>
							<Link href={'/community'}>Foodies Community</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default MainHeader;
