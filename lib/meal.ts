import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export const getMeals = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug: string) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal: any) => {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extensions = meal.image.name.split('.').pop();
	const fileName = `${meal.slug}.${extensions}`;

	const stream = fs.createWriteStream(`public/images/${fileName}`);

	const bufferedImage = await meal.image.arrayBuffer();

	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error('Saved image failed!');
		}
	});

	meal.image = `/images/${fileName}`;

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
