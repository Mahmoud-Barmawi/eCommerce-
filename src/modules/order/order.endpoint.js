import { roles } from "../../middelware/auth.js"

export const endPoint={
    create:[roles.User],
    cancel:[roles.User],
    get:[roles.User],
    changeStatus:[roles.Admin]
}