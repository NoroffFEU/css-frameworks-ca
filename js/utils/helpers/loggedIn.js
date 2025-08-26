import * as utils from "../storage/storage.js";

/**
 * Checks if the user is logged in.
 *
 * It retrieves the "token" from storage and returns true if it exists, false otherwise.
 *
 * @returns {boolean} True if the user is logged in (i.e., if a token exists in storage), false otherwise.
 */

export function loggedIn() {
  const token = utils.get("token");
  if (token) {
    return true;
  }
  return false;
}
