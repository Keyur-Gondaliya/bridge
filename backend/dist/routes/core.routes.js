"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const core_controller_1 = require("../controllers/core.controller");
const core_validation_1 = require("../validations/core.validation");
const router = express_1.default.Router();
router.get("/tokens", core_validation_1.validateSupportedChains, core_controller_1.getSupportedChains);
router.get("/tokens/recommended", core_controller_1.getRecommendedTokens);
router.post("/quotes", core_validation_1.validateQuoteParams, core_controller_1.getQuote);
router.post("/params", core_validation_1.validateBuildTx, core_controller_1.getBuildTx);
exports.default = router;
