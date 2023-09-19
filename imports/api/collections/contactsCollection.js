import { Mongo } from "meteor/mongo";
import { isOrgAdmin, isOrgCo } from "./UserOrgRole";
import { isAdmin } from "./aniAdminCollection";

/* 
_id,
email
name
orgId
tags: tag[]
*/
export const contactsCollection = new Mongo.Collection("collection");

contactsCollection.allow({
  insert: function (userId, doc) {
    const { orgId } = doc;
    return (
      isAdmin(userId) || isOrgAdmin(userId, orgId) || isOrgCo(userId, orgId)
    );
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
