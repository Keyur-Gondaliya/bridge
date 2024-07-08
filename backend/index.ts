import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import coreRoutes from "./routes/core.routes";
import logger from "morgan";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", coreRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bridge, Health Check!" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
