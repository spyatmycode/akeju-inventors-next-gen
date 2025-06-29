import express from "express";
import {config} from "dotenv"
config();
import cors from "cors"
import application from "./config/application";
import AppDataSource from "./data-source";
import indexRouter from "./routes/index.router";
import joiErrorHandler from './middlewares/joiErrorHandler';
import * as errorHandler from './middlewares/apiErrorHandler';
import authenticate from "./middlewares/authenticate";


const app = express();


app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.use(authenticate)



//Declaring my main route here

app.use("/", indexRouter)


// Joi Error Handler
app.use(joiErrorHandler)
// Error Handler
app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);





const PORT = application.port


AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);
        });
    })
    .catch((error: Error) => {

      console.log(error)
        console.log(`Database connection failed with error ${error}`);
    });