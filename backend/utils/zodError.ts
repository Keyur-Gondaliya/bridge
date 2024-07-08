import { ZodError } from "zod";

export const ZodInputValidation = (error: ZodError) => {
  return {
    success: false,
    errors: error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    })),
  };
};
