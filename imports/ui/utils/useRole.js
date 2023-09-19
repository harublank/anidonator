import { Tracker } from "meteor/tracker";

import { computed, onMounted, reactive } from "vue";
import { ROLES } from "../../data";
import { aniAdminsCollection } from "../../api/collections/aniAdminCollection";
import { orgUserRelationsCollection } from "../../api/collections";

export const ROLE = reactive({
  role: "",
});

export const useGetRole = ({ orgId = null, userId = null }) => {
  const ROLE = reactive({
    role: "",
  });

  onMounted(() => {
    const aniAdminSub = Meteor.subscribe("findAniAdmin");

    Tracker.autorun(() => {
      if (aniAdminSub.ready()) {
        let user;

        user = aniAdminsCollection.findOne({ userId });
        const isAniAdmin = Boolean(user);
        if (isAniAdmin) {
          console.log("User is super admin");
          ROLE.role = ROLES.ani_admin;
        } else if (!!orgId) {
          user = orgUserRelationsCollection.findOne({ userId, orgId });
          const userRole = user.role;
          ROLE.role = userRole;
        } else {
          throw new Error(
            "User is not an ani admin, and you didn't pass orgId for us to check."
          );
        }
      }
    });
  });

  console.log({ ROLE: ROLE.role });

  return ROLE.role;
};

export function getRoleplz({ orgId = null, userId = null }) {
  const ROLE = {
    role: "",
  };

  const computedRole = {
    get value() {
      console.log("what");
      console.log("From computed", ROLE.role);
      return ROLE.role;
    },
  };

  const updateRole = () => {
    const aniAdminSub = Meteor.subscribe("findAniAdmin");

    Tracker.autorun(() => {
      if (aniAdminSub.ready()) {
        let user;

        user = aniAdminsCollection.findOne({ userId });
        const isAniAdmin = Boolean(user);
        if (isAniAdmin) {
          ROLE.role = ROLES.ani_admin;
          console.log("is ani admin", ROLE.role);
        } else if (!!orgId) {
          user = orgUserRelationsCollection.findOne({ userId, orgId });
          const userRole = user.role;
          ROLE.role = userRole;
          console.log("user role", ROLE.role);
        } else {
          throw new Error(
            "User is not an ani admin, and you didn't pass orgId for us to check."
          );
        }
      }
    });
  };

  updateRole();

  return computedRole.value;
}
