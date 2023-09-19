import { Mongo } from "meteor/mongo";

export const tagsContactCollection = new Mongo.Collection("tagContact");

/* 
{
    _id: string,
    orgId,
    contactId,
    tagId
}
*/
tagsContactCollection.allow({
  insert: function () {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});
