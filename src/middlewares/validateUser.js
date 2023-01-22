import { signUpSchema } from "../schemas.js";

export async function validateSignUp(req, res, next) {
	try {
		const { error } = signUpSchema.validate(req.body);
		if (error) {
			const { details } = error;
			const message = details.map((i) => i.message).join(",");
			return res.status(422).send({ error: message });
		}
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
