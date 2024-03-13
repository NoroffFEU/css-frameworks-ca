import { NN_BASE, NN_AUTH, NN_LOGIN } from "./constants.js"
import { save } from "./storage/save.js"

/**
 * Logs in a user using the provided email and password.
 * Saves the access token and user profile to local storage upon successful login.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The user profile information.
 * @throws {Error} If login fails.
 * @example
 * //Example usage
 * try {
 *      // Hardcoded user for the example.
 *      const email = "marius@stud.noroff.no";
 *      const password = "Password123!";
 * 
 *      // Passes trough the email and password to the login function.
 *      login(email, password);
 * 
 *      // Console Logs if the login was successful.
 *      console.log("login successfully!")
 * } catch (error) {
 *      // Catches a error and logs it if the function fails.
 *      console.error("login failed", error.message);
 * }
 */
export async function login(email, password) {
    try {
        // Send a login request to the server
        const response = await fetch(NN_BASE + NN_AUTH + NN_LOGIN, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        // Check if the response is successful
        if (response.ok) {
            // Extract the data from the response
            const responseData = await response.json();

            // Extract the access token and user profile from the data
            const { accessToken, ...profile } = responseData.data;

            // Save the access token and user profile to local storage
            save("token", accessToken);
            save("profile", profile);

            // Return the user profile
            return profile;
        } else {
            // If login fails, throw an error
            throw new Error("Could not login!");
        }
    } catch (error) {
        // Catch any errors that occur during the login process
        throw new Error("An error occurred during login: " + error.message);
    }
}
