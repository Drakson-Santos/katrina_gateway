const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { KatrinaUsersController } from "../../../controllers/katrinaUsersControllers/KatrinaUsersController";
import { KATRINA_USERS } from "../../../services/config";
import { HttpRequest } from "../../../services/HttpRequest";

router.get("", async (req: Request, res: Response) => {
    return new KatrinaUsersController().getUsers(req, res);
});

module.exports = (app: any) => app.use("/users", router);