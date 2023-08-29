import { Mongo } from "meteor/mongo";
import { isOrgAdmin, isOrgCo } from "./UserOrgRole";

/* 
_id,
email
name
orgId
*/
export const contactsCollection = new Mongo.Collection("collection");

contactsCollection.allow({
  insert: function (userId, doc) {
    const { orgId } = doc;
    return isOrgAdmin(userId, orgId) || isOrgCo(userId, orgId);
  },
  remove: function (userId, doc) {
    const { orgId } = doc;
    return isOrgAdmin(userId, orgId) || isOrgCo(userId, orgId);
  },
  update: function (userId, doc) {
    const { orgId } = doc;
    return isOrgAdmin(userId, orgId) || isOrgCo(userId, orgId);
  },
});
