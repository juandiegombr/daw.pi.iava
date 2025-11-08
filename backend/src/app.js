import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "./logger.js";
import sensorsRouter from "./router/sensors.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api/sensors', sensorsRouter);

export default app;
