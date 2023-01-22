import { userSchema } from "../schemas.js";

export async function validateUser(req, res, next) {
	try {
		const { error } = userSchema.validate(req.body);
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
