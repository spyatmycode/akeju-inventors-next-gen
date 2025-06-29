

import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: [__dirname + "/entities/*.{js,ts}"],
    migrations: [__dirname + "/migration/*.{ts,js}"],
})

export default AppDataSource