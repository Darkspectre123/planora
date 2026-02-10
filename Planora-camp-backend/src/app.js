import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "./cron/taskReminder.cron.js";
import "./cron/projectReminder.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import noteRouter from "./routes/note.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import userRouter from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


// * healthcheck
app.use("/api/v1/healthcheck", healthcheckRouter);

// * app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter); // each task must have projectId to it for permission check
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/users",userRouter);

app.use(
  "/images",
  express.static(path.join(process.cwd(), "public/images"))
);

app.use("/api/v1/dashboard", dashboardRoutes);
app.use(errorHandler);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === "Unsupported file type") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
