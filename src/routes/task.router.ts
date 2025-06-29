
import { celebrate } from "celebrate";
import express from "express";
import schema from "../config/schema";
import taskController from "../controllers/task.controller";

const router = express.Router();


router.post("/", celebrate(schema.addTask), taskController.addTask);

router.get("/:id", celebrate(schema.getTask), taskController.getTask);

router.get("/", taskController.getTasks)


export default router;