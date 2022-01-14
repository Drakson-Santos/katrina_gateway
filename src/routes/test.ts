const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { HttpRequest } from "../services/HttpRequest";

router.get("/test", async (req: Request, res: Response) => {
    const hostname = "localhost";
    const port = 3001;
    const path = "/users";
    const httpRequest = new HttpRequest(hostname, port, path);
   
    res.send(await httpRequest.get().then((data: any) => {
        return data;
    }));
    // return res.send("test - katrina gateway is running");
});

module.exports = (app: any) => app.use("/", router);