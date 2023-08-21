/*import {z} from "zod"

const registerSchema = z.object({
   
    email:z.string({
        required_error:"Email is required"
    }).min(1, {
        message: "email is required"
    }).max(64, {
        message:"Email must be less than 64 characters"
    }).email({
        message:"Please enter a valid email adress"
    }),
    password:z.string({
        message:"Password is required"
    }).min(8, {
        message:"Password must be atlease 8 characters long"
    }).max(30, {
        message:"Password must be less than 30 characters long"
    }).trim(),
})
export const actions = {
    default: async ({request}) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = registerSchema.parse(formData);
            console.log("NOICE");
            console.log(result);
            return {
                status: 302,
                headers: {
                    location: './routes/profile'
                }
            };
        } catch (err) {
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                const { password, passwordComfirm, ...rest } = formData;
                return {
                    data: rest,
                    errors
                };
            } else {
                // Handle other types of errors, maybe log them or return a generic error message
                console.error("An unexpected error occurred:", err);
                return {
                    data: {},
                    errors: { generic: "An unexpected error occurred" }
                };
            }
        }
    }
}*/