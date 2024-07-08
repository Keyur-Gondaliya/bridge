"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodInputValidation = void 0;
const ZodInputValidation = (error) => {
    return {
        success: false,
        errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        })),
    };
};
exports.ZodInputValidation = ZodInputValidation;
