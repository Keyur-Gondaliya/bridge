import * as xyFinanceService from "../../services/XYFinance.service";
import * as xyFinanceController from "../../controllers/core.controller";
import { Request, Response } from "express";
import { mock } from "jest-mock-extended";

jest.mock("../../services/XYFinance.service");

describe("xyFinanceController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getSupportedChains should return supported chains", async () => {
    const mockSupportedChains = ["chain1", "chain2"];
    (xyFinanceService.fetchSupportedChains as jest.Mock).mockResolvedValue(
      mockSupportedChains
    );

    await xyFinanceController.getSupportedChains(
      req as Request,
      res as Response,
      next
    );

    expect(res.json).toHaveBeenCalledWith({
      supportedChains: mockSupportedChains,
    });
  });

  it("getRecommendedTokens should return recommended tokens", async () => {
    const mockRecommendedTokens = ["token1", "token2"];
    req.query = { chainId: "chain1" };
    (xyFinanceService.fetchRecommendedTokens as jest.Mock).mockResolvedValue(
      mockRecommendedTokens
    );

    await xyFinanceController.getRecommendedTokens(
      req as Request,
      res as Response,
      next
    );

    expect(res.json).toHaveBeenCalledWith({
      recommendedTokens: mockRecommendedTokens,
    });
  });

  it("getBuildTx should return buildTx details", async () => {
    const mockBuildTxDetails = ["value1", "value2"];
    (xyFinanceService.fetchBuildTx as jest.Mock).mockResolvedValue(
      mockBuildTxDetails
    );

    await xyFinanceController.getBuildTx(req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith({
      buildTxDetails: mockBuildTxDetails,
    });
  });

  it("getQuote should return quote data", async () => {
    const mockQuoteData = { success: true, routes: [], errorMsg: "" };
    req.body = {
      fromChain: "chain1",
      toChain: "chain2",
      fromToken: "token1",
      toToken: "token2",
      amount: 100,
    };
    (xyFinanceService.fetchQuote as jest.Mock).mockResolvedValue(mockQuoteData);

    await xyFinanceController.getQuote(req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith(mockQuoteData);
  });
});
