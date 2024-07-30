import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';

class Database {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        synchronize: false,
        logging: (process.env.ENVIROMENT === 'development') ? true : false,
        entities: ["src/entities/*.ts"],
        migrations: [],
        subscribers: [],
      });

      Database.instance.initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
    }

    return Database.instance;
  }
}

export default Database;
