import classes from './meals-grid.module.css';
import MealItem from '@/components/meals/meal-item';
import { Meal } from '../../lib/definitions';

const MealsGrid = ({ meals }: { meals: Meal[] }) => {
	return (
		<ul className={classes.meals}>
			{meals.map((meal: Meal) => (
				<li key={meal.id}>
					<MealItem {...meal} />
				</li>
			))}
		</ul>
	);
};

export default MealsGrid;
