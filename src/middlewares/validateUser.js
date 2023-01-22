import { signUpSchema, loginSchema } from "../schemas.js";


export function returnErrors(errors){
    const { details } = errors;
	const message = details.map((i) => i.message).join(",");
    return message;
}

export async function validateSignUp(req, res, next) {
	try {
		const { error } = signUpSchema.validate(req.body);
		if (error) {
			return res.status(422).send({ error: returnErrors(error) });
		}
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function validateLogin(req, res, next) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(422).send({ error: returnErrors(error) });
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}