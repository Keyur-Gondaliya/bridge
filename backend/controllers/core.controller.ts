import { NextFunction, Request, Response } from "express";
import * as xyFinanceService from "../services/XYFinance.service";
import { BadRequestError } from "../utils/errors";

export const getSupportedChains = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supportedChains = await xyFinanceService.fetchSupportedChains();
    res.json({ supportedChains });
  } catch (error) {
    next(error);
  }
};

export const getRecommendedTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chainId } = req.query;
  try {
    if (!chainId) {
      throw new BadRequestError("Chain ID is required");
    }
    const recommendedTokens = await xyFinanceService.fetchRecommendedTokens(
      chainId as string
    );
    res.json({ recommendedTokens });
  } catch (error) {
    next(error);
  }
};

export const getBuildTx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const buildTxDetails = await xyFinanceService.fetchBuildTx();
    res.json({ buildTxDetails });
  } catch (error) {
    next(error);
  }
};

export const getQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.body;
    const quote = await xyFinanceService.fetchQuote(params);
    res.json(quote);
  } catch (error) {
    next(error);
  }
};
