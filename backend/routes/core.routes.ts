import express from "express";
import {
  getBuildTx,
  getQuote,
  getRecommendedTokens,
  getSupportedChains,
} from "../controllers/core.controller";
import {
  validateSupportedChains,
  validateQuoteParams,
  validateBuildTx,
} from "../validations/core.validation";

const router = express.Router();

router.get("/tokens", validateSupportedChains, getSupportedChains);
router.get("/tokens/recommended", getRecommendedTokens);
router.post("/quotes", validateQuoteParams, getQuote);
router.post("/params", validateBuildTx, getBuildTx);

export default router;
