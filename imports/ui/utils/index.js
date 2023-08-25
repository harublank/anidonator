import { getOneAnimAdmin } from "../../api/collections/aniAdminCollection"

export const isAniAdmin = (userId) => {
    const response = getOneAnimAdmin(userId)
    return Boolean(response)
}