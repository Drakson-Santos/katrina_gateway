import { Request, Response } from "express";
import { Cache } from "../../cache/Cache";
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

        let cache = new Cache();
        const NO_QUERY_PARAMS = Object.keys(query).length === 0;
        if (NO_QUERY_PARAMS) {
            const cached = await cache.get("users");
            if (cached) return response.status(200).send(cached);
        }

        await this.httpRequest.get(this.paths.USERS, query).then((result: any) => {
            const { data, status } = result;
            if (status === 200) {
                if (data.length > 0) cache.set("users", data);
            }
            return response.status(status).send(data);
        }).catch((error: any) => {
            const { data, status } = error.response;
            return response.status(status).send({
                message: error.message || "Unexpected error.",
                data: data || {}
            });
        });
    }
}