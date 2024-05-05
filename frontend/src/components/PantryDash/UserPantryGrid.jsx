"use client";

import PantryGrid from "../Pantry/PantryGrid";
import useDataStore from "@/lib/store";
import ingredients from "../../ingredients.json";
import { Stack, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function UserPantryGrid() {
	const handleIngredientsChange = (item) => {
		// Ensure userIngredients is initialized to an empty array if it's null
		const ingredientsArray = userIngredients || [];

		// Check if the item is already in userIngredients
		const isItemInUserIngredients = ingredientsArray.includes(item);

		// Create a new array based on userIngredients
		let newIngredients;

		// If the item is already in userIngredients, remove it
		if (isItemInUserIngredients) {
			newIngredients = ingredientsArray.filter((ingredient) => ingredient !== item);
		} else {
			// If the item is not in userIngredients, add it
			newIngredients = [...ingredientsArray, item];
		}

		// Update the state with the new array of ingredients
		setUserIngredients(newIngredients);
	};

	const { userIngredients, setUserIngredients } = useDataStore();

	let ingredientsPantry = ingredients.filter((item) => userIngredients.includes(item.title));

	return (
		<Stack
			sx={{ backgroundColor: "#FFFFFF", maxWidth: "calc(100vw - 560px)" }}
			alignItems="center"
			justifyContent="center"
		>
			<Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
				Your Pantry
			</Typography>
			<PantryGrid itemData={ingredientsPantry} onClick={handleIngredientsChange} selected={userIngredients} />
			<Fab color="primary" aria-label="add" variant="extended" href="/pantry">
				<AddIcon sx={{ mr: 1 }} />
				Add Ingredients
			</Fab>
		</Stack>
	);
}