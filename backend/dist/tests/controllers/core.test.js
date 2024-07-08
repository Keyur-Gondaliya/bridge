"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const xyFinanceService = __importStar(require("../../services/XYFinance.service"));
const xyFinanceController = __importStar(require("../../controllers/core.controller"));
jest.mock("../../services/XYFinance.service");
describe("xyFinanceController", () => {
    let req;
    let res;
    let next;
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
    it("getSupportedChains should return supported chains", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSupportedChains = ["chain1", "chain2"];
        xyFinanceService.fetchSupportedChains.mockResolvedValue(mockSupportedChains);
        yield xyFinanceController.getSupportedChains(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            supportedChains: mockSupportedChains,
        });
    }));
    it("getRecommendedTokens should return recommended tokens", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRecommendedTokens = ["token1", "token2"];
        req.query = { chainId: "chain1" };
        xyFinanceService.fetchRecommendedTokens.mockResolvedValue(mockRecommendedTokens);
        yield xyFinanceController.getRecommendedTokens(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            recommendedTokens: mockRecommendedTokens,
        });
    }));
    it("getBuildTx should return buildTx details", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBuildTxDetails = ["value1", "value2"];
        xyFinanceService.fetchBuildTx.mockResolvedValue(mockBuildTxDetails);
        yield xyFinanceController.getBuildTx(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            buildTxDetails: mockBuildTxDetails,
        });
    }));
    it("getQuote should return quote data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQuoteData = { success: true, routes: [], errorMsg: "" };
        req.body = {
            fromChain: "chain1",
            toChain: "chain2",
            fromToken: "token1",
            toToken: "token2",
            amount: 100,
        };
        xyFinanceService.fetchQuote.mockResolvedValue(mockQuoteData);
        yield xyFinanceController.getQuote(req, res, next);
        expect(res.json).toHaveBeenCalledWith(mockQuoteData);
    }));
});
