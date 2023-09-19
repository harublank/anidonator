import { Mongo } from "meteor/mongo";

export const tagsCollection = new Mongo.Collection("tags");

/* 
{
    _id: string,
    label: string
    orgId: id
}
*/
tagsCollection.allow({
  insert: function () {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});
