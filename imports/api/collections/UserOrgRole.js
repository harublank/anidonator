import { Mongo } from "meteor/mongo";
import { isAdmin } from "./aniAdminCollection";
import { ROLES } from "../../data";
/* 
userId  orgId   role
*/
export const userOrgRoleCollection = new Mongo.Collection("userOrgRole");

userOrgRoleCollection.allow({
  insert: function (userId, doc) {
    const { orgId } = doc;
    console.log(isAdmin(userId), isOrgAdmin(userId, orgId), userId, orgId);
    return isAdmin(userId) || isOrgAdmin(userId, orgId);
  },
  remove: function (userId) {
    return isAdmin(userId);
  },
  update: function (userId) {
    return isAdmin(userId);
  },
});

export const getRole = (userId, orgId) => {
  const row = userOrgRoleCollection.findOne({
    userId,
    orgId,
  });

  const rowNotFound = row === undefined;
  if (rowNotFound) {
    return "";
  }
  console.log(row, row.role, "role row");
  return row.role;
};

export const isOrgAdmin = (userId, orgId) => {
  if (!orgId) {
  }

  return getRole(userId, orgId) === ROLES.org_admin;
};

export const isOrgCo = (userId, orgId) => {
  return getRole(userId, orgId) === ROLES.org_coordinator;
};
