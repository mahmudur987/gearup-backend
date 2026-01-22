import express from "express";
import cors from "cors";
import { router } from "./app/routes/modules.route";
import { globalErrorHandler } from "./app/middleware/globalError";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
const app = express();
import "./app/config/passport";
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://secure-funds-fe.vercel.app",
    ], // frontend URLs
    credentials: true, // allow cookies, sessions, auth headers
  }),
);

app.use(
  expressSession({
    secret: "your secrete",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GearUp backend is running",
  });
});
app.use("/api/v1/", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
