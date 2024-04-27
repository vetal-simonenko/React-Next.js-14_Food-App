import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '../../../lib/meal';
import { Suspense } from 'react';
import MealsLoadingPage from './loading-out';

export const metadata = {
	title: 'All meals',
	description: 'Browse the delicious meals shared by our community',
};

async function Meals() {
	const meals = await getMeals();
	return <MealsGrid meals={meals} />;
}

const MealsPage = () => {
	return (
		<>
			<div className={classes.header}>
				<h1>
					Delicious meals, created{' '}
					<span className={classes.highlight}>by you</span>
				</h1>
				<p>
					Choose your favorite recipe and cook it yourself. It is easy
					and fun!
				</p>
				<p className={classes.cta}>
					<Link href={'/meals/share'}>
						Share Your Favorite Recipe
					</Link>
				</p>
			</div>
			<div className={classes.main}>
				<Suspense fallback={<MealsLoadingPage />}>
					<Meals />
				</Suspense>
			</div>
		</>
	);
};

export default MealsPage;
