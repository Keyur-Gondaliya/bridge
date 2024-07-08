import request from "supertest";
import express from "express";
import router from "../../routes/core.routes";

// Mock controller responses if necessary
jest.mock("../../controllers/core.controller", () => ({
  getBuildTx: jest.fn((req, res) =>
    res.json({ buildTxDetails: "mockDetails" })
  ),
  getQuote: jest.fn((req, res) => res.json({ success: true })),
  getRecommendedTokens: jest.fn((req, res) =>
    res.json({ recommendedTokens: [] })
  ),
  getSupportedChains: jest.fn((req, res) => res.json({ supportedChains: [] })),
}));

const app = express();
app.use(express.json()); // Ensure body parser middleware is used
app.use("/api", router); // Use the router from routes.ts

describe("Core Routes", () => {
  it("GET /api/tokens should return supported chains", async () => {
    const response = await request(app).get("/api/tokens");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("supportedChains");
  });

  it("POST /api/quotes should return quote data", async () => {
    const quoteParams = {
      srcChainId: "1",
      srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      srcQuoteTokenAmount: "5000000000000000000",
      dstChainId: "56",
      dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      slippage: "1",
    };
    const response = await request(app).post("/api/quotes").send(quoteParams);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success");
  });

  it("POST /api/params should return buildTx details", async () => {
    const buildTxParams = {};
    const response = await request(app).post("/api/params").send(buildTxParams);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("buildTxDetails");
  });
});
