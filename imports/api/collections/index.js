import { Mongo } from 'meteor/mongo'


export const aniAdminsCollection = new Mongo.Collection("aniAdmins")

export const orgUserRelationsCollection = new Mongo.Collection("orgUserRelations")