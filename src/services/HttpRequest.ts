const axios = require('axios');

class AxiosRequest {

    private _axiosInstance: any;

    constructor(baseURL: string, headers: any) {
        this._axiosInstance = axios.create({
            baseURL: baseURL,
            headers: headers,
            params: {},    
        });
    }

    async get(url: string) {
        return await this._axiosInstance.get(url);
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
    private headers: any = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    constructor(hostname: string, port: number, headers?: any) {
        this.hostname = hostname;
        this.port = port;
        if (headers) this.headers = headers;
    }

    async get(url: string) {
        return await new AxiosRequest(`http://${this.hostname}:${this.port}`,
            this.headers).get(url);
    }

}