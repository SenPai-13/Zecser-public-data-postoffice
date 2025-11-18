import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { getEnvVariable } from "./utils/helpers";
import cookieParser from "cookie-parser";
import postofficeRoutes from "./routes/postoffice";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load("./swagger.yaml");

connectDB();

app.use(
  cors({
    origin: [getEnvVariable("FRONT_END_URL")],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (_req, res) => {
  res.send("Hai there, API is running...");
});

app.use("/api/postoffice", postofficeRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
