import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import conn from './conn/conn.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js'; 
import categoryRoutes from './routes/category.js'
import blogRoutes from "./routes/blog.js"
import cors from "cors";


dotenv.config();

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes); 
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/blog",blogRoutes)


const PORT = process.env.PORT || 2000;


conn().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});