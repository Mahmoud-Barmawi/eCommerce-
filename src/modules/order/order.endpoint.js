import { roles } from "../../middelware/auth.js"

export const endPoint={
    create:[roles.User],
}