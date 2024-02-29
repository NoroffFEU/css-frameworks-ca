import * as utils from "../storage/storage.js";

/**
 * Retrieves the user's token from storage.
 *
 * It uses the storage utility to get the value of "token" from storage.
 *
 * @returns {string} The user's token.
 */

export function getToken() {
  const token = utils.get("token");
  return token;
}
