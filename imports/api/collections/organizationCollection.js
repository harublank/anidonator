import { Mongo } from "meteor/mongo";
import { isAdmin } from "./aniAdminCollection";

export const organizationCollection = new Mongo.Collection("organizations");

organizationCollection.allow({
  insert: function (userId, doc) {
    return isAdmin(userId);
  },
  remove: function (userId) {
    return isAdmin(userId);
  },
  update: function (userId) {
    return isAdmin(userId);
  },
});
