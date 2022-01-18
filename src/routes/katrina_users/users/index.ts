const express = require('express');
const router = express.Router();

import { Request, Response } from "express";
import { KatrinaUsersController } from "../../../controllers/katrinaUsersControllers/KatrinaUsersController";

router.get("", async (req: Request, res: Response) => {
    return await new KatrinaUsersController().getUsers(req, res);
});

module.exports = (app: any) => app.use("/users", router);