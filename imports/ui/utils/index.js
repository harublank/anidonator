import { Meteor } from "meteor/meteor";
import {
  aniAdminsCollection,
  getOneAnimAdmin,
} from "../../api/collections/aniAdminCollection";
import { isOrgAdmin, isOrgCo } from "../../api/collections/UserOrgRole";
import { ROLES } from "../../data/index";
import { useGetRole } from "./useRole";
import { useRoute } from "vue-router";
import { ROLE } from "./useRole";
export const checkRole = ({
  isAniAdmin = false,
  isOrgAdmin = false,
  isOrgCo = false,
  orgId = null,
}) => {
  const userId = Meteor.userId();
  if (isAniAdmin) {
    let userRole;
    const role = Meteor.call("getUserRole", userId, (error, response) => {
      if (error) {
        console.log({ error });
      } else {
        console.log({ response });
        return ROLES.ani_admin === response;

        userRole = response;
      }
    });

    console.log("user role", userRole, role);
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

export const useCheckUserRole = (requireRole) => {
  const {
    params: { orgId },
  } = useRoute();

  const userId = Meteor.userId();
  console.log("user check user role", requireRole);

  // const role = useGetRole({ userId, orgId });

  // console.log({ role, requireRole }, "rr");
  // return role;
};

export { isOrgAdmin, isOrgCo };
