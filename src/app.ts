import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";


dotenv.config();

const app = express();
app.use(bodyParser.json());



// Routes
app.use('/api', movieRoutes);


export default app;
