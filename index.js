import express from "express";
import winston from "winston";
// import accountRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import cors from "cors";

const app = express();
const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = "car-list.json";
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "car-api.log" }),
  ],
  format: combine(label({ label: "car-api" }), timestamp(), myFormat),
});

app.use(express.json());
app.use(cors());
// app.use("/account", accountRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info(`API Started and read file ${fileName}`);
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info(`API Started and read created ${fileName}`);
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
