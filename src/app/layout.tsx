import MainHeader from '@/components/header/main-header';
import './globals.css';
import MainFooter from '@/components/footer/main-footer';

export const metadata = {
	title: 'NextLevel Food',
	description: 'Delicious meals, shared by a food-loving community.',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang='en'>
			<body>
				<div id='wrapper'>
					<MainHeader />
					<main id='main'>{children}</main>
					<MainFooter />
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
