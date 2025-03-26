import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
import logMiddleware from "./middlewares/log.middleware";
import errorMiddleware from "./middlewares/error.middleware";

import userRouter from "./routes/user";

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASS}@task-manage-db.s5vpo.mongodb.net/task-manage?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(logMiddleware)
app.use("/api/auth", userRouter)

app.use(errorMiddleware)

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})