const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cityRoutes = require("./routes/cityRoutes");
const userRoutes = require("./routes/userRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const announcementsRoutes = require("./routes/AnnouncementsRoutes");
const notificationsRoutes = require("./routes/NotificationRoutes");
const govschemeRoutes = require("./routes/governmentSchemeRoutes");
const succesSstoriesRoutes = require("./routes/successStoriesRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const weatherUpdateRoutes = require("./routes/weatherUpdateRoutes");
const liveProgramRoutes = require("./routes/liveProgramRoutes");
const userInformationRoutes = require("./routes/getuserRoutes");
const farmerProfileRoutes = require("./routes/farmProfilesRoutes");
const ContactDeveloperRoutes = require("./routes/ContactDeveloperRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const biddingRoutes = require("./routes/biddingsRoutes");
const businessRoutes = require("./routes/businessRoutes");
const weeklyConsultationRoutes = require("./routes/weeklyConsultationRoutes");
const professionalRoutes = require("./routes/professionalRoutes")
dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.options("*", cors());

app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/govscheme", govschemeRoutes);
app.use("/api/successstories", succesSstoriesRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/weatherUpdate", weatherUpdateRoutes);
app.use("/api/liveProgram", liveProgramRoutes);
app.use("/api/userInformation", userInformationRoutes);
app.use("/api/farmerProfile", farmerProfileRoutes);
app.use("/api/contactdeveloper", ContactDeveloperRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/biddings", biddingRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/professional", professionalRoutes);
app.use("/api/weeklyConsultation", weeklyConsultationRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
