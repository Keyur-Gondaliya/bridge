import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { ZodInputValidation } from "../utils/zodError";
const supportedChainsSchema = z.object({});

const quoteParamsSchema = z.object({
  srcChainId: z.string(),
  srcQuoteTokenAddress: z.string(),
  srcQuoteTokenAmount: z.string(),
  dstChainId: z.string(),
  dstQuoteTokenAddress: z.string(),
  slippage: z.string(),
});

const buildTxSchema = z.object({});

const validateSupportedChains = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    supportedChainsSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json(ZodInputValidation(error));
  }
};

const validateQuoteParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    quoteParamsSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json(ZodInputValidation(error));
  }
};

const validateBuildTx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    buildTxSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json(ZodInputValidation(error));
  }
};

export { validateSupportedChains, validateQuoteParams, validateBuildTx };
