import "reflect-metadata";
import express from "express";
import cors from "cors";

import "./database/connect";
import router from "./routes";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(port, () => console.log("🚀 Server started as port 5000"));
