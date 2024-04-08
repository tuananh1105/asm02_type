import express from 'express';
import { connect } from 'mongoose';
import tripRouter from './router/trip';
import busHouseRouter from './router/busHouse';
import authRouter from "./router/auth.router";

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

(async () => {
    try {
        await connect(`mongodb://localhost:27017/asmtype`);
    } catch (error) {
        console.log(error);
    }
})();

app.use(`/api`, tripRouter);
app.use(`/api`, busHouseRouter);
app.use("/api", authRouter);
export const viteNodeApp = app;