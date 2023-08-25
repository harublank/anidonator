/* 
{
    email: "",
    pw: "",
    profile: {
        name: ""
    }
   
}
*/

import { Accounts } from "meteor/accounts-base"
import { ROLES } from "../../imports/data"
import { orgUserRelationsCollection } from "../../imports/api/collections"

export const createUser = ({
    email,
    password,
    name,
    role,
}) => {

    const userId = Accounts.createUser({
        email,
        password,
        profile: {
            name
        }
    })

    const isCreatingAniAdmin = role === ROLES.ani_admin
    if (isCreatingAniAdmin) {
        aniAdminsCollection.insert({
            userId
        }, (error, response) => {
            if (error) {
                // 
            } else {
                //
            }
        })
    } else {
        orgUserRelationsCollection.insert({
            userId,
            role
        }, () => {

        })
    }

    return userId
}
