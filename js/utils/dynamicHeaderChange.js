/**
 * Dynamically updates an H2 element with the specified value, capitalizing the first letter.
 *
 * This function finds an H2 element by its ID, capitalizes the first letter of the provided value, and sets the H2 element's text content to the capitalized value. Its used to dynamically update the title of a section with a specific value.
 *
 * @param {string} value - The value to set as the H2 element's text content.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * dynamicH2Change("Users name");
 */
export const dynamicH2Change = (value) => {
  const h2 = document.getElementById("profileH2");
  const upperCaseValue = value.charAt(0).toUpperCase() + value.slice(1);
  h2.innerText = upperCaseValue;
};
