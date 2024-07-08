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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const core_routes_1 = __importDefault(require("../../routes/core.routes"));
// Mock controller responses if necessary
jest.mock("../../controllers/core.controller", () => ({
    getBuildTx: jest.fn((req, res) => res.json({ buildTxDetails: "mockDetails" })),
    getQuote: jest.fn((req, res) => res.json({ success: true })),
    getRecommendedTokens: jest.fn((req, res) => res.json({ recommendedTokens: [] })),
    getSupportedChains: jest.fn((req, res) => res.json({ supportedChains: [] })),
}));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Ensure body parser middleware is used
app.use("/api", core_routes_1.default); // Use the router from routes.ts
describe("Core Routes", () => {
    it("GET /api/tokens should return supported chains", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/api/tokens");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("supportedChains");
    }));
    it("POST /api/quotes should return quote data", () => __awaiter(void 0, void 0, void 0, function* () {
        const quoteParams = {
            srcChainId: "1",
            srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            srcQuoteTokenAmount: "5000000000000000000",
            dstChainId: "56",
            dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            slippage: "1",
        };
        const response = yield (0, supertest_1.default)(app).post("/api/quotes").send(quoteParams);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success");
    }));
    it("POST /api/params should return buildTx details", () => __awaiter(void 0, void 0, void 0, function* () {
        const buildTxParams = {};
        const response = yield (0, supertest_1.default)(app).post("/api/params").send(buildTxParams);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("buildTxDetails");
    }));
});
