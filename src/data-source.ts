import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
    type: "postgres",
    // se 'url' não existir (no ambiente local), o TypeORM usa os campos host, port, etc
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: [__dirname + "/models/*.{js,ts}"],
    migrations: [__dirname + "/migrations/*.ts"],
    //entities: ["src/models/*.ts"],
    //migrations: ["src/migrations/*.ts"]

    // ativa o SSL apenas em produção >> requisito do Render.
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});