import { aniAdminsCollection } from "./aniAdminCollection";
import { organizationCollection } from "./organizationCollection";
import { contactsCollection } from "./contactsCollection";
const orgUserRelationsCollection = new Mongo.Collection("orgUserRelations");
export {
  contactsCollection,
  organizationCollection,
  aniAdminsCollection,
  orgUserRelationsCollection,
};
