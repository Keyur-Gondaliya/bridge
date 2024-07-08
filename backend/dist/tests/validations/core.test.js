"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_validation_1 = require("../../validations/core.validation");
describe("validateQuoteParams Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should call next if validation succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {
            srcChainId: "1",
            srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            srcQuoteTokenAmount: "5000000000000000000",
            dstChainId: "56",
            dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            slippage: "1",
        };
        yield (0, core_validation_1.validateQuoteParams)(req, res, next);
        expect(next).toHaveBeenCalled();
    }));
    it("should return 400 if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {
            fromChain: "chain1",
            toChain: "chain2",
            fromToken: "token1",
            amount: 100,
        };
        yield (0, core_validation_1.validateQuoteParams)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }));
});
