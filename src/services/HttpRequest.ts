const http = require('http');

class Http {

    getDataResponse(request: any, data_request: any): any {
        request.setEncoding('utf8');
        let rawData = '';
        request.on('data', (chunk: any) => { rawData += chunk; });
        request.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                data_request.callback(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
        return rawData;
    }

    get(data_request: any) {
        http.get({
        hostname: data_request.hostname,
        port: data_request.port,
        path: data_request.path,
        agent: false,
        headers: data_request.headers
      }, (res: any) => {     
        return this.getDataResponse(res, data_request);
      });
    }
}

export class HttpRequest {
    private _hostname: string;
    private _port: number;
    private _path: string;
    private _headers: any = {
        'Content-Type': 'application/json'
    };

    constructor(hostname: string, port: number, path: string, headers?: any) {
        this._hostname = hostname;
        this._port = port;
        this._path = path;
        if (headers) this._headers = headers;
    }

    public async get(): Promise<any> {
        const http_request = new Http();
        return new Promise((resolve, reject) => {
            const data_request = {
                hostname: this._hostname,
                port: this._port,
                path: this._path,
                headers: this._headers,
                callback: (data: any) => {
                    resolve(data);
                }
            };
            http_request.get(data_request);
        });
    }
}