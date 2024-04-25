import styles from './meals-grid.module.css';
import MealItem from '@/components/meals/meal-item';

const MealsGrid = ({ meals }: { meals: any }) => {
	return (
		<ul className={styles.meals}>
			{meals.map((meal: any) => (
				<li key={meal.id}>
					<MealItem {...meal} />
				</li>
			))}
		</ul>
	);
};

export default MealsGrid;
