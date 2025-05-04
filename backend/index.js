const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const adminRoutes = require('./routes/adminRoutes');
const activityRoutes = require('./routes/activityRoutes');
require('./utils/JobSheduler');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://vert-x-ai-assignment-p94i-bq90mhebr.vercel.app/", 
}));app.use(express.json());



// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activity', activityRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
