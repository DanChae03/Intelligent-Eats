import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = require("./middleware.js");
const authToken = "user1";
const authToken2 = "user2";
const authToken3 = "user3";
const badAuthToken = "user4";

let mongod;

const user1 = {
	_id: "user1",
	favouriteMeals: [],
	generatedMeals: [],
	ingredients: ["Broccoli", "Spinach", "Tomato"],
	dislikedIngredients: [],
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};

const user2 = {
	_id: "user2",
	favouriteMeals: [],
	generatedMeals: [],
	ingredients: ["Broccoli", "Spinach", "Tomato"],
	dislikedIngredients: [],
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};
const user3 = {
	_id: "user3",
	favouriteMeals: [],
	generatedMeals: [],
	ingredients: ["Broccoli", "Spinach", "Tomato"],
	dislikedIngredients: ["Olives"],
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};

const users = [user1, user2, user3];

beforeAll(async () => {
	mongod = await MongoMemoryServer.create();

	const connectionString = mongod.getUri();
	await mongoose.connect(connectionString);
	await mongoose.connection.db.dropDatabase();
});

beforeEach(async () => {
	// Drop existing db
	await mongoose.connection.db.dropDatabase();
	const coll = await mongoose.connection.db.createCollection("Users");
	await coll.insertMany(users);
});

describe("API: /api/users/ingredients", () => {
	describe("GET /api/users/ingredients", () => {
		it("should return user's ingredient data", (done) => {
			request(app)
				.get("/api/users/ingredients")
				.set("Authorization", authToken)
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body);
					return done();
				});
		}, 15000);

		it("should return 401 Unauthorized for bad token", (done) => {
			request(app).get("/api/users/ingredients").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});

	describe("PUT /api/users/ingredients", () => {
		it("should update the user's ingredients", (done) => {
			const updatedIngredients = ["Carrot", "Cucumber", "Spinach", "Broccoli"];

			request(app)
				.put("/api/users/ingredients")
				.send({ ingredients: updatedIngredients })
				.set("Authorization", authToken2)
				.expect(204, done);
		}, 15000);
	});
	describe("PUT /api/users/ingredients/disliked/add", () => {
		it("should add a disliked ingredient", (done) => {
			const dislikedIngredientToAdd = "Olives";

			request(app)
				.put("/api/users/ingredients/disliked/add")
				.send({ dislikedIngredientToAdd })
				.set("Authorization", authToken2)
				.expect(204, done);
		}, 15000);

		it("should return 400 if no disliked ingredient is provided", (done) => {
			request(app)
				.put("/api/users/ingredients/disliked/add")
				.send({})
				.set("Authorization", authToken)
				.expect(400, done);
		}, 15000);
	});

	describe("PUT /api/users/ingredients/disliked/remove", () => {
		it("should remove a disliked ingredient", (done) => {
			const dislikedIngredientToRemove = "Olives";

			request(app)
				.put("/api/users/ingredients/disliked/remove")
				.send({ dislikedIngredientToRemove })
				.set("Authorization", authToken3)
				.expect(204, done);
		}, 15000);

		it("should return 400 if no disliked ingredient is provided for removal", (done) => {
			request(app)
				.put("/api/users/ingredients/disliked/remove")
				.send({})
				.set("Authorization", authToken)
				.expect(400, done);
		}, 15000);
	});

	describe("GET /api/users/ingredients/disliked", () => {
		it("should return all disliked ingredients for a user", (done) => {
			request(app)
				.get("/api/users/ingredients/disliked")
				.set("Authorization", authToken)
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(Array.isArray(res.body)).toBeTruthy();
					return done();
				});
		}, 15000);

		it("should return 401 Unauthorized for bad token", (done) => {
			request(app).get("/api/users/ingredients/disliked").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});

	describe("PUT /api/users/ingredients/disliked", () => {
		it("should set disliked ingredient", (done) => {
			const dislikedIngredientToAdd = ["Olives", "Broccoli", "Spinach"];

			request(app)
				.put("/api/users/ingredients/disliked/add")
				.send({ dislikedIngredientToAdd })
				.set("Authorization", authToken2)
				.expect(204, done);
		}, 15000);

		it("should return 400 if no disliked ingredients are provided", (done) => {
			request(app).put("/api/users/ingredients/disliked").send({}).set("Authorization", authToken).expect(400, done);
		}, 15000);
	});
});
