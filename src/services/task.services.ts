import { EntityManager } from "typeorm"
import { Task } from "../entities/task"
import AppDataSource from "../data-source";


const taskRepo = AppDataSource.getRepository(Task)

export interface ITaskPayload {
    title:string;
    description: string;
}





const addTask = async (payload:ITaskPayload, manager:EntityManager)=>{

    const newTask = new Task();

    newTask.description = payload.description;
    newTask.title = payload.title;
    return await manager.save(Task, newTask);
}


const getTasks = async(page:number, limit: number)=>{
    const [tasks, count] = await taskRepo.findAndCount({

        skip: (page - 1) * limit,
        take: limit

    })


    return {
        tasks,
        count,
        limit, 
        page
    }
}


const getTask = async(id:string)=>{

    const where:any = {}

    where.id = id;



    const task = await taskRepo.findOne({
        where
    });

    return task;
}


export default {

    addTask,
    getTasks,
    getTask

}