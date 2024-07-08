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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const xyFinanceService = __importStar(require("../../services/XYFinance.service"));
jest.mock("axios");
describe("xyFinanceService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("fetchSupportedChains should return supported chains", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = {
            supportedChains: [
                {
                    chainId: 1,
                    name: "ETHEREUM",
                },
            ],
        };
        axios_1.default.get.mockResolvedValue({
            data: mockResponse,
        });
        const result = yield xyFinanceService.fetchSupportedChains();
        expect(result[0]).toEqual({
            chainId: 1,
            name: "ETHEREUM",
        });
    }), 10000);
    it("fetchRecommendedTokens should return recommended tokens", () => __awaiter(void 0, void 0, void 0, function* () {
        const chainId = "1";
        const mockResponse = {
            success: true,
            recommendedTokens: {
                address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
                chainId: 1,
                decimals: 18,
                logoURI: "https://assets.coingecko.com/coins/images/863/small/0x.png?1547034672",
                name: "ZRX",
                symbol: "ZRX",
            },
        };
        axios_1.default.get.mockResolvedValue({
            data: mockResponse,
        });
        const result = yield xyFinanceService.fetchRecommendedTokens(chainId);
        const expected = mockResponse.recommendedTokens;
        expect(result[result.length - 1]).toEqual(expected);
    }), 10000);
    it("fetchBuildTx should return buildTx details", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = {
            detail: [
                "srcChainId",
                "srcQuoteTokenAddress",
                "srcQuoteTokenAmount",
                "dstChainId",
                "dstQuoteTokenAddress",
                "slippage",
                "receiver",
            ],
        };
        axios_1.default.get.mockResolvedValue({
            data: mockResponse,
        });
        const result = yield xyFinanceService.fetchBuildTx();
        expect(result).toEqual(mockResponse.detail);
    }), 10000);
    it("fetchQuote should return quote data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockParams = {
            srcChainId: "1",
            srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            srcQuoteTokenAmount: "6000000000000000000",
            dstChainId: "56",
            dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            slippage: "1",
        };
        const mockResponse = {
            success: true,
        };
        axios_1.default.post.mockResolvedValue({
            data: mockResponse,
        });
        const result = yield xyFinanceService.fetchQuote(mockParams);
        expect({ success: result.success }).toEqual(mockResponse);
    }), 10000);
});
