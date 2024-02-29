import * as utils from "../storage/storage.js";

/**
 * Retrieves the user's name from storage.
 *
 * It uses the storage utility to get the value of "userName" from storage.
 *
 * @returns {string} The user's name.
 */

export function getUserName() {
  return utils.get("userName");
}
