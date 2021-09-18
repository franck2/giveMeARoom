import { AxiosInstance } from 'axios';

export class ApiClient {
    client: AxiosInstance;

    constructor (client: AxiosInstance) {
        this.client = client;
    }

    post<T, P> (url: string, data: P) {
        return this.client.post<T>(url, data);
    }

    get<T> (url: string) {
        return this.client.get<T>(url);
    }

    delete<T> (url: string) {
        return this.client.delete<T>(url);
    }

    put<T> (url: string, data: T) {
        return this.client.put<T>(url, data);
    }
}
