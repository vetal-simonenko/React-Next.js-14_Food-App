import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '../../../../lib/meal';
import { notFound } from 'next/navigation';

export async function generateMetadata({
	params,
}: {
	params: { mealSlug: string };
}) {
	const meal: any = await getMeal(params.mealSlug);

	return {
		title: meal.title,
		description: meal.summary,
	};
}

const MealDetailPage = async ({ params }: { params: { mealSlug: string } }) => {
	const meal: any = await getMeal(params.mealSlug);

	if (!meal) {
		notFound();
	}

	meal.instructions = meal?.instructions?.replace(/\n/g, '<br/>');

	return (
		<>
			<div className={classes.header}>
				<div className={classes.image}>
					<Image
						src={`https://vetaldev-nextjs-demo-users-image.s3.eu-central-1.amazonaws.com/${meal.image}`}
						alt={meal.title}
						fill
					/>
				</div>
				<div className={classes.headerText}>
					<h1>{meal.title}</h1>
					<p className={classes.creator}>
						<a href={`mailto:${meal.creator_email}`}>
							{meal.creator}
						</a>
					</p>
					<p className={classes.summary}>{meal.summary}</p>
				</div>
			</div>
			<div>
				<p
					className={classes.instructions}
					dangerouslySetInnerHTML={{
						__html: `${meal.instructions}`,
					}}
				></p>
			</div>
		</>
	);
};

export default MealDetailPage;
