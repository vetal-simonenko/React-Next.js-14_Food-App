import MainFooterBackground from './main-footer-background';
import classes from './main-footer.module.css';

const MainFooter = () => {
	return (
		<>
			<footer className={classes.footer}>
				2024 | All Rights Reserved.
			</footer>
			<MainFooterBackground />
		</>
	);
};

export default MainFooter;
