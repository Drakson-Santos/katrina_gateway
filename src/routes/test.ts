const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { HttpRequest } from "../services/HttpRequest";

router.get("/test", async (req: Request, res: Response) => {
    const hostname = "localhost";
    const port = 3001;
    const path = "/users";
    const url = `http://${hostname}:${port}${path}/register`;
    
    const httpRequest = new HttpRequest(hostname, port);
    await httpRequest.get(path).then((result: any) => {
        const { data, status } = result;
        res.status(status).send(data);
    }).catch((error: any) => {
        const { data, status } = error.response;
        res.status(status).send({
            message: error.message || "Unexpected error.",
            data: data || {}
        });
    });

});

module.exports = (app: any) => app.use("/", router);