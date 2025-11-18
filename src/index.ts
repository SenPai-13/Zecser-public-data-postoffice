import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { getEnvVariable } from "./utils/helpers";
import cookieParser from "cookie-parser";
import postofficeRoutes from "./routes/postoffice";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.use("/postoffice", postofficeRoutes);

//swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
