import { Mongo } from 'meteor/mongo'

export const aniAdminsCollection = new Mongo.Collection("aniAdmins")

export const getOneAnimAdmin = (userId) => {
    const response = aniAdminsCollection.findOne({ userId })
    return response
}