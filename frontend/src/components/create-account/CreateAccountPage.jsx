"use client";

import CardWrapper from "@/components/CardWrapper";
import { Google } from "@mui/icons-material";
import { Stack, Typography, Button, TextField, IconButton, Link, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { createAccount } from "@/lib/auth-functions";
import { auth } from "@/lib/firebase-config";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { handleGoogleLogin } from "@/lib/auth-functions";
import { getUser, createUser } from "@/lib/dbCalls";

/**
 * React component for rendering a sign-up page for creating a new account.
 * @returns {JSX.Element} The JSX representation of the sign-up page.
 */
export default function CreateAccountPage() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorToPrint, setErrorToPrint] = useState(null);
	const [loading, setLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);
	const {
		setUserFavouriteMeals,
		setUserGeneratedMeals,
		setUserIngredients,
		setUserDislikedIngredients,
		setUserParameters,
		setUserName,
		setUserEmail,
		setAuthorisedUser
	} = useDataStore();
	const router = useRouter();

	/**
	 * Fetches user data from the backend using the provided user authentication token.
	 * @param {string} userAuthToken The user authentication token.
	 */
	async function fetchUser(userAuthToken) {
		try {
			const response = await getUser(userAuthToken);

			setUserDislikedIngredients(response.data.dislikedIngredients);
			setUserFavouriteMeals(response.data.favouriteMeals);
			setUserGeneratedMeals(response.data.generatedMeals);
			setUserIngredients(response.data.ingredients);
			setUserParameters(response.data.parameters);
			router.push("/dashboard");
		} catch (error) {
			if (error.response && error.response.data.error === "User not found") {
			} else {
				console.error("Error:", error);
			}
		}
	}

	/**
	 * Creates a new user in the database using the provided user authentication token.
	 * @param {string} userAuthToken The user authentication token.
	 * @returns {Promise<Object>} A promise that resolves to the response data.
	 */
	async function createUserInDatabase(userAuthToken) {
		try {
			const response = await createUser(userAuthToken);
			setUserDislikedIngredients(response.data.dislikedIngredients);
			setUserFavouriteMeals(response.data.favouriteMeals);
			setUserGeneratedMeals(response.data.generatedMeals);
			setUserIngredients(response.data.ingredients);
			setUserParameters(response.data.parameters);
			router.push("/onboarding");
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	/**
	 * Handles the sign-up process.
	 */
	async function handleCreateAccount() {
		try {
			if (password === confirmPassword) {
				setLoading(true);
				await createAccount(email, password);
				setAuthorisedUser(auth.currentUser);
				setUserEmail(auth.currentUser.email);
				setUserName(auth.currentUser.email.split("@")[0]);
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				setLoading(false);
				setErrorToPrint("Passwords do not match");
			}
		} catch (error) {
			setLoading(false);
			if (error.code === "auth/weak-password") {
				setErrorToPrint("Firebase: Password should be at least 6 characters");
			} else if (error.code === "auth/email-already-in-use") {
				setErrorToPrint("Email is already in use.");
			} else {
				console.error("An error occurred while signing up:", error.message);
				setErrorToPrint("An error occurred while signing up. Please try again");
			}
		}
	}

	/**
	 * Handles the Google sign-in process.
	 */
	async function handleGoogleSignIn() {
		try {
			setGoogleLoading(true);
			await handleGoogleLogin();
			setUserEmail(auth.currentUser.email);
			setUserName(auth.currentUser.email.split("@")[0]);
			setAuthorisedUser(auth.currentUser);

			const metadata = auth.currentUser.metadata;
			if (metadata.creationTime === metadata.lastSignInTime) {
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				fetchUser(auth.currentUser.accessToken);
			}
		} catch (error) {
			setGoogleLoading(false);
			console.error("An error occurred while signing in:", error.message);
			setErrorToPrint("An error occurred while signing in. Please try again");
		}
	}

	/**
	 * Handles key press events to trigger the sign-up process when all required fields are filled.
	 * @param {React.KeyboardEvent} e The keyboard event object.
	 */
	const handleKeyPress = (e) => {
		if (e.key === "Enter" && email && password && confirmPassword) {
			handleCreateAccount();
		}
	};
	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.main" }}>
					Sign Up
				</Typography>
				<Typography variant="h5">Don&apos;t have an account? We&apos;ll create one for you.</Typography>
				<TextField
					fullWidth
					label="Email Address"
					value={email}
					onKeyDown={handleKeyPress}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<TextField
					fullWidth
					label="Password (6+ Characters)"
					type={passwordVisible ? "text" : "password"}
					value={password}
					onKeyDown={handleKeyPress}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					InputProps={{
						endAdornment: (
							<IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
								{passwordVisible ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						)
					}}
				/>
				<TextField
					fullWidth
					label="Confirm Password"
					value={confirmPassword}
					type={confirmPasswordVisible ? "text" : "password"}
					onKeyDown={handleKeyPress}
					onChange={(event) => {
						setConfirmPassword(event.target.value);
					}}
					InputProps={{
						endAdornment: (
							<IconButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
								{confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						)
					}}
				/>

				{errorToPrint && !googleLoading && (
					<Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main" }}>
						{errorToPrint}
					</Typography>
				)}
				<Stack width="100%" alignItems="center" spacing={1.5}>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						sx={{ textTransform: "none", py: 1.5, borderRadius: "30px" }}
						onClick={handleCreateAccount}
					>
						{loading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold" mr={loading ? "40px" : "0px"}>
							Create Account
						</Typography>
					</Button>
					<Typography variant="h6" fontWeight="bold">
						OR
					</Typography>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						endIcon={<Google sx={{ mr: googleLoading ? "40px" : "0px" }} />}
						sx={{
							textTransform: "none",
							py: 1.5,
							borderRadius: "30px"
						}}
						onClick={handleGoogleSignIn}
					>
						{googleLoading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold">
							Sign in with Google
						</Typography>
					</Button>
					<Link href="/login" underline="hover">
						<Typography variant="h6">Sign in to an existing account</Typography>
					</Link>
				</Stack>
			</Stack>
		</CardWrapper>
	);
}
