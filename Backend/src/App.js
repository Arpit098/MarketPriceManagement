const express = require("express");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const cityRoutes = require("./routes/cityRoutes");
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
const app = express();
const port = 8000;
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/business", businessRoutes);

// app.use('/api/articles', articlesRoutes);

// Add a root route
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

module.exports = app;
