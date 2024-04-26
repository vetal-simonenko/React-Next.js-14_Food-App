'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

const ImagePicker = ({ label, name }: { label: string; name: string }) => {
	const [pickedImage, setPickedImage] = useState<string>('');
	const imageInput = useRef<HTMLInputElement>(null);

	const handlePickClick = () => {
		imageInput.current?.click();
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | null = e.target.files ? e.target.files[0] : null;

		if (!file) {
			setPickedImage('');
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setPickedImage(fileReader.result as string);
		};

		fileReader.readAsDataURL(file);
	};

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!pickedImage && <p>No image picked yet</p>}
					{pickedImage && (
						<Image
							src={pickedImage}
							alt='The image selected by user!'
							fill
						/>
					)}
				</div>
				<input
					className={classes.input}
					type='file'
					name={name}
					id={name}
					accept='image/png, image/jpeg'
					ref={imageInput}
					onChange={handleImageChange}
					required
				/>
				<button
					className={classes.button}
					type='button'
					onClick={handlePickClick}
				>
					Pick an Image
				</button>
			</div>
		</div>
	);
};

export default ImagePicker;
