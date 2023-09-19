import { aniAdminsCollection } from "./aniAdminCollection";
import { organizationCollection } from "./organizationCollection";
import { contactsCollection } from "./contactsCollection";
import { tagsCollection } from "./tagsCollection";
import { tagsContactCollection } from "./tagContactRelactionCollection";
const orgUserRelationsCollection = new Mongo.Collection("orgUserRelations");
export {
  tagsContactCollection,
  contactsCollection,
  organizationCollection,
  aniAdminsCollection,
  tagsCollection,
  orgUserRelationsCollection,
};
