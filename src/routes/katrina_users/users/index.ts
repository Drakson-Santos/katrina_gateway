const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { KATRINA_USERS } from "../../../services/config";
import { HttpRequest } from "../../../services/HttpRequest";

router.get("", async (req: Request, res: Response) => {
    const { query } = req;
    
    const httpRequest = new HttpRequest(KATRINA_USERS.hostname, KATRINA_USERS.port);
    await httpRequest.get(KATRINA_USERS.paths.USERS, query).then((result: any) => {
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

module.exports = (app: any) => app.use("/users", router);