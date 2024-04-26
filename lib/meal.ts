import sql from 'better-sqlite3';

const db = sql('meals.db');

export const getMeals = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// for testing error
	//throw new Error('Loading meals failed');

	return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug: string) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};
