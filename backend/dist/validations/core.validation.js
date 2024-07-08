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
exports.validateBuildTx = exports.validateQuoteParams = exports.validateSupportedChains = void 0;
const z = __importStar(require("zod"));
const zodError_1 = require("../utils/zodError");
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
const validateSupportedChains = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        supportedChainsSchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json((0, zodError_1.ZodInputValidation)(error));
    }
});
exports.validateSupportedChains = validateSupportedChains;
const validateQuoteParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        quoteParamsSchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json((0, zodError_1.ZodInputValidation)(error));
    }
});
exports.validateQuoteParams = validateQuoteParams;
const validateBuildTx = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        buildTxSchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json((0, zodError_1.ZodInputValidation)(error));
    }
});
exports.validateBuildTx = validateBuildTx;
