import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests (curl, server-to-server, health checks) with no origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
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
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => console.log(`running on port ${port}`));
app.use("/api", routes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
