const app = require("./config/app");
const errorHandler = require("./middleware/errorHandler");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/userRoutes");

// Initialize Firebase (this will throw if config is invalid)
require("./config/firebase");

// Routes
app.use("/", indexRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const logger = require("./utils/logger");

// Start server
const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  logger.info(`🚀 Server listening on http://localhost:${port}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});
