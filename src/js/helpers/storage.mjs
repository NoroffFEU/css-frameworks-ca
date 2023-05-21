import * as index from "../storage/index.mjs";

/**
   *Checks if the user is currently logged in.
   *@returns {boolean} - True if the user is logged in, false otherwise.
 */
export function isLoggedIn(){
   return index.load("token") ? true : false;
};

/**
   *Retrieves the name of the currently logged-in user.
   *@returns {string} - The name of the user.
 */
export function getName(){
   return index.load("name");
};