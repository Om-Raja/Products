import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import connectToDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/product", productRoutes);

const __dirname = path.resolve(); // __dirname exists only in type = commonjs

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("You are in development mode");
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectToDB();
  console.log("App is listening at port", PORT);
});
