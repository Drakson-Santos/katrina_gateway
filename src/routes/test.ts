const express = require('express');
const router = express.Router();

import { Request, Response } from "express";

router.get("/test", async (req: Request, res: Response) => {
    return res.send("test - katrina gateway is running");
});

module.exports = (app: any) => app.use("/", router);