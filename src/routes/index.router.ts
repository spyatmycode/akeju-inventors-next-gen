import express from "express"
import taskRouter from "./task.router"

const indexRouter = express.Router();


indexRouter.use("/tasks", taskRouter);

export default indexRouter;