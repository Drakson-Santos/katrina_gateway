const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { Cache } from "../../../cache/Cache";
import { KatrinaUsersController } from "../../../controllers/katrinaUsersControllers/KatrinaUsersController";
import { KATRINA_USERS } from "../../../services/config";
import { HttpRequest } from "../../../services/HttpRequest";


router.get("", async (req: Request, res: Response) => {
    let cache = new Cache();

    const cached = await cache.get("users");    
    if (cached) return res.json(cached);

    const data = await new KatrinaUsersController().getUsers(req, res);
    cache.set("users", data, 60 * 1);
    
    return res.status(200).send(data);
});

module.exports = (app: any) => app.use("/users", router);