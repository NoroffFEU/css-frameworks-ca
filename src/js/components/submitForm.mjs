import { postData } from "./postData.mjs";
/**
 * 
 * @param {object} form - The HTMLForm which we create our object from
 * @param {string} url - where to send the data. This is parsed into
 * 
 * This function sends data from a form to a given URL as JSON. 
 * Gathers form data and inserts it into an empty object using a forEach, saving keys and values.
 * Then runs it through the postData function below. 
 */
export function submitForm (form, url) {
    const formData = new FormData(form);
    const formdataOBj = {};
    formData.forEach((value, key) => (formdataOBj[key] = value));
    postData(url, formdataOBj);
};