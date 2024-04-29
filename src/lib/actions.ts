'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meal';
import { revalidatePath } from 'next/cache';

export const shareMeal = async (formData: FormData) => {
	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: formData.get('image'),
		creator: formData.get('name'),
		creator_email: formData.get('email'),
	};

	await saveMeal(meal);
	revalidatePath('/meals');
	redirect('/meals');
};
