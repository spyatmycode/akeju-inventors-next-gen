import { Request, Response } from "express";
import ApiResponse from "../utilities/apiResponse";
import AppDataSource from "../data-source";
import taskServices from "../services/task.services";
import { StatusCodes } from "http-status-codes";




const addTask = async (
    req: Request,
    res: Response
) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {

        const { title, description } = req.body;


        const addedTask = await taskServices.addTask(
            {
                title, description
            }, queryRunner.manager
        )
        await queryRunner.commitTransaction();


        ApiResponse.result(res, addedTask, StatusCodes.CREATED)


    } catch (error: any) {

        await queryRunner.rollbackTransaction()
        console.log(error);
        ApiResponse.error(res, error?.code, error?.message)

    }
}


const getTasks = async (
    req: Request,
    res: Response
) => {
    try {

        const page = req.query?.page ?? 1;
        const limit = req.query?.limit ?? 10;

        const taskServiceResponse = await taskServices.getTasks(page as number, limit as number);


        const response = {
            tasks: taskServiceResponse.tasks,
            total: taskServiceResponse.count,
            page: taskServiceResponse.page,
            limit: taskServiceResponse.limit
        }


        ApiResponse.result(res, response, StatusCodes.OK)

    } catch (error: any) {
        console.log(error);
        ApiResponse.error(res, error?.code, error?.message)
    }
}


const getTask = async (
    req: Request,
    res: Response
) => {

    try {
        const { id } = req.params;

        const task = await taskServices.getTask(id);

        if (!task) {
            ApiResponse.error(res, StatusCodes.NOT_FOUND, `Task  with  ${id} could not be found.`);
            return;
        }


        ApiResponse.result(res, task, StatusCodes.OK)

    } catch (error: any) {
        console.log(error);
        ApiResponse.error(res, error?.code, error?.message)
    }

}


export default {
    addTask,
    getTasks,
    getTask
}