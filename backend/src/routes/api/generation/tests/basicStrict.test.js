import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /basicStrict", () => {
	it("no params", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("meal type", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake, Omlete"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "Breakfast",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("cuisine", (done) => {
		const payload = {
			favouriteMeals: [""],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "Asian",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("diatary requirement", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "vegetarian"
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);
});
