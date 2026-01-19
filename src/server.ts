import dotenv from "dotenv";

import app from "./app";
import connectDB from "./app/config/db";
import envVariables from "./app/config/env.config";
dotenv.config();

const PORT = envVariables.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected ...server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception detected ....server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log("Sigterm single detected ....server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SIGINT single detected ....server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled Rejection error
// Promise.reject(new Error("I forget to catch this error"));

// uncaughtException error
// throw new Error("I forget to handle local error");
