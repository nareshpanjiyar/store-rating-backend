require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Store Rating API Running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
Routes
*/
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/stores", require("./routes/storeRoutes"));

app.use("/api/ratings", require("./routes/ratingRoutes"));

app.use("/api/owner", require("./routes/ownerRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
