import { rolesCollection } from "../../imports/api/collections"
import { ROLES } from "../../imports/data"

export const createOrgUserRelation = ({
    userId,
    orgId = "N/A",
    role
}) => {
    const roleIsInvalid = Object.values(ROLES).includes(role) === false

    if (roleIsInvalid) {
        //
        return
    }

    const _id = rolesCollection.insert({
        userId,
        orgId,
        role
    })


}