import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.isOperational) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    console.error("Unexpected Error:", err);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred." });
  }
};

export default errorHandler;
