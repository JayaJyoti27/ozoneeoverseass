import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check

// Root
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Ozone Backend Running 🚀" });
});

// All API routes
app.use("/api", routes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
