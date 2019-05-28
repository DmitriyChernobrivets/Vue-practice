import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    CreateMeetUp(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setLoadedmeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(
        meetup => meetup.id === payload.id
      );
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,

              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedmeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetUp({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      };

      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          const key = data.key;

          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));

          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then(fileData => {
          const fullUrl = fileData.metadata.fullPath;
          const unSlicedKey = fileData.metadata.name;
          const key = unSlicedKey.slice(0, unSlicedKey.indexOf("."));

          firebase
            .storage()
            .ref(fullUrl)
            .getDownloadURL()
            .then(url => {
              firebase
                .database()
                .ref("meetups")
                .child(key)
                .update({ imageUrl: url });
              return url;
            })
            .then(url => {
              commit("CreateMeetUp", {
                ...meetup,
                imageUrl: url,
                id: key
              });
            });
        })
        //
        .catch(error => console.log(error));
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 3);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id == meetupId;
        });
      };
    }
  }
};
