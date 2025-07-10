import express from "express";
import cors from "cors";
import "dotenv/config";
import db from"./utils/db.js"
import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 8001;



app.use(cors());

app.use(express.urlencoded({extended:true}));//parse the past request coming from req
app.use(express.json()); //accept the json data from frontend

db();

app.use("/api/v1",router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}....😊`);
})

