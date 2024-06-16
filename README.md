# Contributions
This was my group project for my honours-level course SOFTENG750. My (Dan) contributions were made under my university account, dcha762. 
Particularly I worked on three aspects: Login and Onboarding pages, Overall Theme design and Styling, and leveraging the Image Generation API from Segmind. 

[This is deployed on Vercel.](https://project-group-teal-turtles.vercel.app/landing)

# Intelligent Eats

Are you tired of staring into your fridge, wondering what to cook for dinner?

Do you find yourself stuck in a culinary rut, repeating the same meals week after week?

Well, worry no more!

Introducing Intelligent-Eats, the revolutionary **_AI-generated_** meal service designed for you.

Whether you're craving comfort food classics, exotic international flavors, or healthy, plant-based options, our AI algorithm has you covered.

### Usage

Using Intelligent Eats is as simple as follows:

1. Create an account
2. Follow the onboarding process to add ingredients and favourite meals
3. On the Dashboard, select Basic generation
4. Enter any additional requirements for your meal
5. Click generate and have your generated meal served directly to you

You can share any generated meals with your friends and family via email by clicking the `Share` button at the bottom of the recipe

If you liked your generated meal, you can add it to your favourites by clicking the `Add to favourites` button, also at the bottom of the recipe.

Alternatively, adding or removing favourite meals is done on the profile page, accessed on the top left of the website. Here you can add any of the last 10 meals you generated or revisit them by clicking on them.

Adding or removing disliked ingredients is also done on the profile page. These ingredients will be avoided when generating meals and recipes.

## Running the project

### Prerequisites

Get Node.js installed on your machine. You can download and install it from [here](https://nodejs.org/en/download/current)

This project requires Node.js 20.12.2 or higher

### Running the Frontend

0. Set up the `.env` file in the root directory. See `.env.local.example` for an example

1. Navigate inside the frontend folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Then either run it in development mode:

   ```bash
   npm run dev
   ```

   Or in production mode:

   ```bash
   npm run build
   ```

   ```bash
   npm run start
   ```

   This will start the frontend server at http://localhost:3000

### Running the Backend

0. Add the `serviceAccount.json` file to `src\auth`

1. Set up the `.env` file in the root directory. See `.env.local.example` for an example

2. Navigate inside the backend folder:

   ```bash
   cd backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   This will start the backend server at http://localhost:3000

## Testing

### Testing the Backend

The backend can be tested by

```bash
cd backend
npm run test
```

### Testing the Frontend

#### Jest

We unit tested our frontend logic with Jest

```bash
cd frontend
npm run test
```

#### Playwright

End-to-end testing is achieved through playwright

We've focused our tests on some common user flows

```bash
cd frontend
npm run build
npx playwright install
npx playwright test
```

## Pages

- Landing - an unauthorized user first lands/is redirected here
- Sign up/Log in - for signing up or logging in via email + password or Google
- Dashboard - generate a meal or update your pantry
- Generate - modify generation parameters and execute generation
- Pantry - update your list of ingredients
- Recipe - view the last recipe you generated here and share it or add it to your favourites
- Profile - view your last generated meals and favourite them or edit your disliked ingredients

## Tech Stack

### Backend

NodeJS + Express

Jest for testing

Deployed using google app engine

### Frontend

NextJS

Jest + Playwright for testing

Deployed using vercel

### API usage

We used Open AI API for meal generation and recipe generation

We used Segmind API for image generation

### Database

Using [mongoDB](https://www.mongodb.com/)

User DAO and database schemas can be found within the data folder in the backend

## Project Structure

### Frontend

Our repository structure is as follows:

```
public/
   images/: Image resources
src/
   __test__: Contains JUnit tests for our utility files
   app/: Directory containing page routes, using the routing system in NextJS
   lib/: Contains everything that doesn't fit into the above, typically utility files
```

### Backend

Our repository structure is as follows:

```
src/
   auth: Firebase config files
   data: Database schema and user dao
   openAi: openai meal generation helper functions
   routes: api routes
      api:
         generation: generation related
         users: user related
   segmind: segmind image helper functions
```

## Miscellaneous

Check out the figma design file [here](https://www.figma.com/file/sqO8dyu3wTHNfGy3RJjkcR/750-wireframe?type=design&node-id=2%3A2&mode=design&t=eZQL2zIErd7BnnJH-1)

Check out our project management tooling [here](https://trello.com/invite/750team1/ATTIe553059ddbcf84a85e1f14055027679b9EE006EB)

## Deployment

Check out a live deployment here:
https://project-group-teal-turtles.vercel.app/

## License

This project is licensed under the MIT License.

Contributors:

- Nathan Bell
- Troy Murdoch
- Dan Chae
- Jeremy Ting
- Jason Xavier

TEAM TEAL TURTLES
![](./group-image/Teal%20Turtles.webp)
