const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");
const activityRoutes = require("./routes/activityRoutes");
require("./utils/JobSheduler")
dotenv.config();
connectDB();

const path = require("path");
app.use(express.static(path.resolve(__dirname, ".build")));
app.get("/", (req, res) => {
    res.sendFile(join(__dirname,'dist/index.html'));
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/activity", activityRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req,res) => {
    return res.send("hi backend is running.");
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
