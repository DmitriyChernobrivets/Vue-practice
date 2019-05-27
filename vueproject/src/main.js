import Vue from "vue";
import App from "./App";
import router from "./router/router";
import store from "./store/store";
import * as firebase from "firebase";
import Vuetify from "vuetify";
import filterDate from "./filters/date";
import "vuetify/dist/vuetify.min.css";
import AlertCmp from "./components/shared/alert.vue";
import EditMeetUpDetails from "./components/Meetup/Edit/EditMeetupDetails.vue";
import EditMeetUpDate from "./components/Meetup/Edit/EditMeetupDate.vue";

Vue.use(Vuetify, {
  theme: {
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

Vue.config.productionTip = false;
Vue.filter("dateFilter", filterDate);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup", EditMeetUpDetails);
Vue.component("app-edit-meetup-date", EditMeetUpDate);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCFUTgy8oKeudvA25BqdkJ_wDQgbjAMnKY",
      authDomain: "dev-meetup-48a72.firebaseapp.com",
      databaseURL: "https://dev-meetup-48a72.firebaseio.com",
      projectId: "dev-meetup-48a72",
      storageBucket: "dev-meetup-48a72.appspot.com",
      messagingSenderId: "147769108947",
      appId: "1:147769108947:web:832032d0cbc571db"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
