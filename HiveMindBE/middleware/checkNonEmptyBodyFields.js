import { generateHttpError } from "../utils/common.utils.js";

export async function checkNonEmptyBodyFields(req, res, next) {
  const body = req.body;
  const regex = /^[^a-zA-Z0-9]*$/;

  for (const key in body) {
    if (body.hasOwnProperty(key) && typeof body[key] === "string") {
      const sanitizedValue = body[key].trimEnd();

      if (regex.test(sanitizedValue)) {
        next(generateHttpError(400, `Field "${key}" cannot be empty or contain only special characters`));
        return;
      }
      body[key] = sanitizedValue;
    }
  }
  next();
}
