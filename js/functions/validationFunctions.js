// validation functions
export const validate = (el) => {
	el.classList.add("is-valid");
	el.classList.remove("is-invalid");
};

export const invalidate = (el) => {
	el.classList.add("is-invalid");
	el.classList.remove("is-valid");
};

export const empty = (el) => {
	el.classList.remove("is-valid");
	el.classList.remove("is-invalid");
};