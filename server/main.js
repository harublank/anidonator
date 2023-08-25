import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { SEED_KA } from '../imports/data'
import { createUser } from './utils'

import { aniAdminsCollection } from '../imports/api/collections'
Meteor.startup(async () => {
  const { email, password, name, role } = SEED_KA
  const user = Accounts.findUserByEmail(email)

  const userNotFound = Boolean(user) === false

  if (userNotFound) {
    createUser({
      email, password, name, role
    })

  }
})
