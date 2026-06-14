const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const snippetsRoutes = require("./routes/snippetsRoutes");
const bugsRoutes = require("./routes/bugsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const graphRoutes = require("./routes/graphRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/snippets", snippetsRoutes);
app.use("/api/bugs", bugsRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
});