const roles ={
    Admin:'Admin',User:'User'
}
export const endPoint={
    create:[roles.Admin],
    getAll:[roles.Admin],
    updateCategory:[roles.Admin],
    getActive:[roles.User],
    specificCategory:[roles.Admin,roles.User]
}