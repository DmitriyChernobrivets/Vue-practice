import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return;
      }

      state.user.registeredMeetups.push(id);
      state.user.fbKey[id] = payload.fbKey;
    },
    unregisterUserForMeetup(state, payload) {
      const registeredmeetups = state.user.registeredMeetups;
      registeredmeetups.splice(
        registeredmeetups.findIndex(meetup => meetup.id === payload),
        1
      );

      Reflect.deleteProperty(state.user.fbKey, payload);
    },

    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    registerUserFormeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registration/")
        .push(payload)
        .then(data => {
          commit("setLoading", false);
          commit("registerUserForMeetup", { id: payload, fbKey: data.key });
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    unregisterUserFormeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKey) {
        return;
      }
      const fbKey = user.fbKey[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registration/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserForMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registeredmeetups: [],
            fbKey: {}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [], fbKey: {} });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id + "/registration/")
        .once("value")
        .then(data => {
          const values = data.val();
          let registeredMeetup = [];
          let swappedvalues = {};
          for (let key in values) {
            registeredMeetup.push(values[key]);
            swappedvalues[values[key]] = key;
          }
          const updateUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetup,
            fbKey: swappedvalues
          };
          commit("setLoading", false);
          commit("setUser", updateUser);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
