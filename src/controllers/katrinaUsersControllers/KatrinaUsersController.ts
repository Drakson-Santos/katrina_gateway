import { Request, Response } from "express";
import { KATRINA_USERS } from "../../services/config";
import { HttpRequest } from "../../services/HttpRequest";

export class KatrinaUsersController {
    private httpRequest: HttpRequest;
    private paths: any;

    constructor() {
        this.httpRequest = new HttpRequest(KATRINA_USERS.hostname, KATRINA_USERS.port);
        this.paths = KATRINA_USERS.paths;
    }

    public async getUsers(request: Request, response: Response) {
        const { query } = request;
        const { data } = await this.httpRequest.get(this.paths.USERS, query);
        return data;
        // await this.httpRequest.get(this.paths.USERS, query).then((result: any) => {
        //     const { data, status } = result;
        //     response.status(status).send(data);
        // }).catch((error: any) => {
        //     const { data, status } = error.response;
        //     response.status(status).send({
        //         message: error.message || "Unexpected error.",
        //         data: data || {}
        //     });
        // });
    }
}