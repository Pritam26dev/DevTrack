const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const projectRoutes=require("./routes/projectRoutes")
const taskRoutes=require("./routes/taskRoutes")
const dashboardRoutes=require("./routes/dashRoutes")

dotenv.config();

connectDB();

const authRoutes=require("./routes/authRoutes");

const app=express();

app.use(express.json());



app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/tasks",taskRoutes)
app.use("/api/hashboard",dashboardRoutes)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})