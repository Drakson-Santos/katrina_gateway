const axios = require('axios');

class AxiosRequest {

    private _axiosInstance: any;
    private headers: any = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    constructor(baseURL: string, headers?: any, query?: any) {
        if (headers) this.headers = headers;
        this._axiosInstance = axios.create({
            baseURL: baseURL,
            headers: this.headers,
            params: query || {},
        });
    }

    async get(url: string) {
        return await this._axiosInstance.get(url, {
            params: { ...this._axiosInstance.defaults.params }
        });
    }

    async post(url: string, data: any) {
        return await this._axiosInstance.post(url, data);
    }

    async put(url: string, data: any) {
        return await this._axiosInstance.put(url, data);
    }

    async delete(url: string) {
        return await this._axiosInstance.delete(url);
    }

}

export class HttpRequest {
    private hostname: string;
    private port: number;

    constructor(hostname: string, port: number) {
        this.hostname = hostname;
        this.port = port;
    }

    async get(url: string, query?: any) {
        return await new AxiosRequest(`http://${this.hostname}:${this.port}`, {}, query)
            .get(url);
    }

}