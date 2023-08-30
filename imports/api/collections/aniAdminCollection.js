import { Mongo } from "meteor/mongo";

export const aniAdminsCollection = new Mongo.Collection("aniAdmins");

aniAdminsCollection.allow({});

export const getOneAnimAdmin = (userId) => {
  const response = aniAdminsCollection.findOne({ userId });
  console.log("resonpse form geton admin", response);
  return response;
};

export const isAdmin = (userId) => {
  const _userId = Meteor.userId();
  const user = getOneAnimAdmin(_userId);
  console.log({ user }, "user from isAdmi", Boolean(user));
  return Boolean(user);
};
