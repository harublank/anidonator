import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { ROLES, SEED_KA } from "../imports/data";
import { createUser as createUserUtils } from "./utils";
import {
  aniAdminsCollection,
  contactsCollection,
  orgUserRelationsCollection,
  organizationCollection,
} from "../imports/api/collections";
import { isAdmin } from "../imports/api/collections/aniAdminCollection";
import {
  getRole,
  userOrgRoleCollection,
} from "../imports/api/collections/UserOrgRole";
import { tagsCollection } from "../imports/api/collections/tagsCollection";
import { tagsContactCollection } from "../imports/api/collections/tagContactRelactionCollection";

Meteor.startup(async () => {
  const { email, password, name, role } = SEED_KA;
  const user = Accounts.findUserByEmail(email);

  const userNotFound = Boolean(user) === false;

  if (userNotFound) {
    createUserUtils({
      email,
      password,
      name,
      role,
    });
  }
});

Meteor.publish("findAniAdmin", () => {
  return aniAdminsCollection.find();
});

Meteor.publish("organizations", function (userId, orgId) {
  return organizationCollection.find();
  // return [organizationCollection.find(), tagsCollection.find({ orgId })];
});

Meteor.publish("users", function () {
  return Meteor.users.find({});
});

Meteor.publish("userOrgRole", function () {
  return userOrgRoleCollection.find();
});

Meteor.publish("usersInThisOrg", function (orgId) {
  return userOrgRoleCollection.find({ orgId });
});

Meteor.publish("myContacts", function (orgId) {
  return contactsCollection.find({ orgId });
});

Meteor.publish("tags", function (orgId) {
  return [tagsCollection.find({ orgId }), tagsContactCollection.find()];
});

Meteor.publish("roles", function () {
  const aniAdmin = aniAdminsCollection.find();
  const orgUsreReal = orgUserRelationsCollection.find();
  return [aniAdmin, orgUsreReal];
});

Meteor.methods({
  createOrgUser: function (data) {
    const { email, password, name } = data;
    const userId = createUserUtils({ email, password, name });
    return userId;
  },
  removeUser: function (_id) {
    Meteor.users.remove({
      _id,
    });
    return true;
  },
  getUserRole: function (userId, orgId) {
    const isAniAdmin = isAdmin(userId);
    console.log({ isAniAdmin }, "froemove m getUser role");
    if (isAniAdmin) {
      console.log("retrning", ROLES.ani_admin);
      return ROLES.ani_admin;
    }

    if (orgId) {
      const role = getRole(userId, orgId);
      console.log({ role }, "fdfadfa");
      return role;
    }
    return "";
  },
});
