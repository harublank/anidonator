import { Meteor } from "meteor/meteor";
import {
  aniAdminsCollection,
  getOneAnimAdmin,
} from "../../api/collections/aniAdminCollection";
import { isOrgAdmin, isOrgCo } from "../../api/collections/UserOrgRole";
import { ROLES } from "../../data/index";

export const checkRole = ({
  isAniAdmin = false,
  isOrgAdmin = false,
  isOrgCo = false,
  orgId = null,
}) => {
  const userId = Meteor.userId();
  if (isAniAdmin) {
    return ROLES.ani_admin === Meteor.call("getUserRole", userId);
  }

  if (isOrgAdmin) {
    console.log("is org admind"), userId, orgId;
    const result =
      ROLES.org_admin === Meteor.call("getUserRole", userId, orgId);
    return result;
  }

  if (isOrgCo) {
    return ROLES.org_coordinator === Meteor.call("getUserRole", userId, orgId);
  }
};

export { isOrgAdmin, isOrgCo };
