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
exports.getQuote = exports.getBuildTx = exports.getRecommendedTokens = exports.getSupportedChains = void 0;
const xyFinanceService = __importStar(require("../services/XYFinance.service"));
const errors_1 = require("../utils/errors");
const getSupportedChains = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supportedChains = yield xyFinanceService.fetchSupportedChains();
        res.json({ supportedChains });
    }
    catch (error) {
        next(error);
    }
});
exports.getSupportedChains = getSupportedChains;
const getRecommendedTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chainId } = req.query;
    try {
        if (!chainId) {
            throw new errors_1.BadRequestError("Chain ID is required");
        }
        const recommendedTokens = yield xyFinanceService.fetchRecommendedTokens(chainId);
        res.json({ recommendedTokens });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecommendedTokens = getRecommendedTokens;
const getBuildTx = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buildTxDetails = yield xyFinanceService.fetchBuildTx();
        res.json({ buildTxDetails });
    }
    catch (error) {
        next(error);
    }
});
exports.getBuildTx = getBuildTx;
const getQuote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const quote = yield xyFinanceService.fetchQuote(params);
        res.json(quote);
    }
    catch (error) {
        next(error);
    }
});
exports.getQuote = getQuote;
