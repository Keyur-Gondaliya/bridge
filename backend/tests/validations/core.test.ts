import { validateQuoteParams } from "../../validations/core.validation";
import { Request, Response, NextFunction } from "express";

describe("validateQuoteParams Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next if validation succeeds", async () => {
    req.body = {
      srcChainId: "1",
      srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      srcQuoteTokenAmount: "5000000000000000000",
      dstChainId: "56",
      dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      slippage: "1",
    };

    await validateQuoteParams(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 if validation fails", async () => {
    req.body = {
      fromChain: "chain1",
      toChain: "chain2",
      fromToken: "token1",
      amount: 100,
    };

    await validateQuoteParams(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});
