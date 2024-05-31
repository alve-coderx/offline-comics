// app entry point
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with your frontend origin
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.static("static", { maxAge: "1y" }));

// Route Imports
const pages = require("./api/pagesApi");
const product = require("./api/productsAPI");
const user = require("./api/userAPI");
const order = require("./api/orderAPI");
const category = require("./api/categoryAPI");
const store = require("./api/storeAPI");

// dP2m##T-.LZ5Dru
app.use("/api/v1", product);
app.use("/api/v1", pages);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", category);
app.use("/api/v1", store);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
