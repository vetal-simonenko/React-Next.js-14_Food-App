import { S3 } from '@aws-sdk/client-s3';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { Meal } from './definitions';

const s3 = new S3({
	region: 'eu-central-1',
});
const db = sql('meals.db');

export const getMeals = async (): Promise<Meal[]> => {
	const mealsRows = db.prepare('SELECT * FROM meals').all();
	if (mealsRows.length === 0) {
		throw new Error('Meals not found');
	}
	return mealsRows as Meal[];
};

export const getMeal = async (slug: string): Promise<Meal> => {
	const mealRow = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
	if (!mealRow) {
		throw new Error('Meal not found');
	}
	return mealRow as Meal;
};

export const saveMeal = async (meal: Meal | any) => {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const fileName = `${meal.slug}.${extension}`;

	const bufferedImage = await meal.image.arrayBuffer();

	s3.putObject({
		Bucket: 'vetaldev-nextjs-demo-users-image',
		Key: fileName,
		Body: Buffer.from(bufferedImage),
		ContentType: meal.image.type,
	});

	meal.image = fileName;

	db.prepare(
		`
			INSERT INTO meals
				(title, summary, instructions, creator, creator_email, image, slug)
			VALUES (
				@title,
				@summary,
				@instructions,
				@creator,
				@creator_email,
				@image,
				@slug
			)
		`
	).run(meal);
};
