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
exports.fetchQuote = exports.fetchBuildTx = exports.fetchRecommendedTokens = exports.fetchSupportedChains = void 0;
const XYFinance_constant_1 = require("../constants/XYFinance.constant");
const errors_1 = require("../utils/errors");
const fetchSupportedChains = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${XYFinance_constant_1.XYFinanceBaseURL}/supportedChains`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new errors_1.BadRequestError(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data.supportedChains;
    }
    catch (error) {
        console.error("Error fetching supported chains:", error);
        throw new errors_1.InternalServerError("Failed to fetch supported chains");
    }
});
exports.fetchSupportedChains = fetchSupportedChains;
const fetchRecommendedTokens = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${XYFinance_constant_1.XYFinanceBaseURL}/recommendedTokens?chainId=${chainId}`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new errors_1.BadRequestError(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (data.success) {
            return data.recommendedTokens;
        }
        else {
            throw new errors_1.BadRequestError(data.errorMsg);
        }
    }
    catch (error) {
        console.error("Error fetching recommended tokens:", error === null || error === void 0 ? void 0 : error.message);
        throw new errors_1.InternalServerError((error === null || error === void 0 ? void 0 : error.message) || "Failed to fetch recommended tokens");
    }
});
exports.fetchRecommendedTokens = fetchRecommendedTokens;
const fetchBuildTx = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${XYFinance_constant_1.XYFinanceBaseURL}/buildTx`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return data.detail.map((e) => e.loc[1]);
    }
    catch (error) {
        console.error("Error fetching buildTx:", error);
        throw new errors_1.InternalServerError("Failed to fetch buildTx details");
    }
});
exports.fetchBuildTx = fetchBuildTx;
const fetchQuote = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `${XYFinance_constant_1.XYFinanceBaseURL}/quote`;
    const query = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${query}`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new errors_1.BadRequestError(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching quote:", error);
        throw new errors_1.InternalServerError("Failed to fetch quote");
    }
});
exports.fetchQuote = fetchQuote;
