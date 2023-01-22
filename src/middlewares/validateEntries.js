import { entrySchema } from "../schemas.js";
import { returnErrors } from "./validateUser.js";

export async function validateEntry(req, res, next) {
	try {
		const { error } = entrySchema.validate(req.body);
		if (error) {
			return res.status(422).send({ error: returnErrors(error) });
		}
		next();
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
