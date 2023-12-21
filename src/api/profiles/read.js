import { apiPath } from "../const";

/** Gets all profiles
 * 
 * @param {string} token 
 * @returns {object}
 */
export async function getProfiles(token) {
    // hvis du vil hente mer info (f.eks. followers med deres navn og avater, må du ordne det i postman og linken)
    const response = await fetch(`${apiPath}/social/profiles`, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}

