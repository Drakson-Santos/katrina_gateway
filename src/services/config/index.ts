import { services } from "./package.json";
const { katrina_users } = services;

export const KATRINA_USERS = {
    hostname: katrina_users.api.hostname,
    port: katrina_users.api.port,
    paths: katrina_users.api.paths
}