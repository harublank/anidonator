import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import { VueMeteor } from 'vue-meteor-tracker'
import 'vue-final-modal/style.css'
import App from './App.vue'
import { router } from './router'

Meteor.startup(() => {
  const app = createApp(App)
  const vfm = createVfm()
  app.use(router)
  app.use(VueMeteor)
  app.use(vfm)
  app.mount('#app')

})
