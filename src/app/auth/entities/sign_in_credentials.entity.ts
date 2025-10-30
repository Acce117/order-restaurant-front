import { AuthCredentials } from "./auth_credentials.entity";

export interface SignInCredentials extends AuthCredentials {
    username: string;
}