import { HttpClient, HttpParams } from "@angular/common/http";
import qs from "qs";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs";
// import { NotificationService } from "../../alert/notificationService";

export interface GetAllData<T = any> {
    count: number,
    data: Array<T>
}

export abstract class Service<T = any> {
    module_path = '';
    http = inject(HttpClient);
    // notificationsService = inject(NotificationService);

    public getAll(params: { where?: string; relations?: Array<string>, limit?: number, offset?: number } = {}) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get<GetAllData<T>>(`${environment.API_PATH}/${this.module_path}`, {
            params: p,
        }).pipe(
            tap({
                error: (err) => {
                    // if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
                    // else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
                    // else console.log(err);
                }
            })
        );
    }


    public getById(id: string, params: object = {}) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get<GetAllData<T>>(`${environment.API_PATH}/${this.module_path}/${id}`, {
            params: p,
        }).pipe(
            tap({
                error: (err) => {
                    // if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
                    // else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
                    // else console.log(err);
                }
            })
        );
    }

    public exists(params: any) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get(`${environment.API_PATH}/${this.module_path}/exists`, {
            params: p
        }).pipe(
            tap({
                error: (err) => {
                    // if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
                    // else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
                    // else console.log(err);
                }
            })
        );
    }

    public create(data: any) {
        return this.http.post<T>(`${environment.API_PATH}/${this.module_path}`, data)
            .pipe(
                tap({
                    error: (err) => {
                        // if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
                        // else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
                        // else if (err.status === 400) this.notificationsService.notifyError('Sent data is wrong');
                        // else console.log(err);
                    }
                })
            );
    }

    public update(id: string, data: any) {
        return this.http.patch<T>(`${environment.API_PATH}/${this.module_path}/${id}`, data)
            .pipe(
                tap({
                    error: (err) => {
                        // if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
                        // else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
                        // else if (err.status === 400) this.notificationsService.notifyError('Sent data is wrong');
                        // else console.log(err);
                    }
                })
            );
    }

    public delete(id: string) {

    }
}
