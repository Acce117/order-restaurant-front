import { HttpClient, HttpParams } from "@angular/common/http";
import qs from "qs";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";

export interface GetAllData<T = any> {
    count: number,
    data: Array<T>
}

export abstract class Service<T = any> {
    modulePath!: string;
    http = inject(HttpClient);

    public getAll(params: { where?: string; relations?: Array<string>, limit?: number, offset?: number } = {}) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get<GetAllData<T>>(`${environment.API_PATH}/${this.modulePath}`, { params: p });
    }


    public getById(id: string, params: object = {}) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get<GetAllData<T>>(`${environment.API_PATH}/${this.modulePath}/${id}`, { params: p });
    }

    public exists(params: any) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get(`${environment.API_PATH}/${this.modulePath}/exists`, { params: p });
    }

    public create(data: any) {
        return this.http.post<T>(`${environment.API_PATH}/${this.modulePath}`, data);
    }

    public update(id: string, data: any) {
        return this.http.patch<T>(`${environment.API_PATH}/${this.modulePath}/${id}`, data);
    }

    public delete(id: string) {

    }
}
