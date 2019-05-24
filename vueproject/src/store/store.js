import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2016/03/12/17/02/empire-state-building-1252406_960_720.jpg",
        id: "asdsdsd",
        title: "Meet Up in New York",
        date: new Date(),
        location: "New York",
        description: "DEscription lorem"
      },
      {
        imageUrl:
          "https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/paris-cityscape-overview-guide-xlarge.jpg",
        id: "asdsdsdddd",
        title: "Meet Up in New Paris",
        date: new Date(),
        location: "Paris",
        description: "DEscription lorem"
      },
      {
        imageUrl:
          "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fpsh-ex-ftnikkei-3937bb4%2Fimages%2F2%2F5%2F2%2F7%2F19457252-1-eng-GB%2FG20190221%20Victoria%20Peak%20night_2048x1152.jpg?source=nar-cms",
        id: "asdsdsdasd",
        title: "Meet Up in New Honk-Kong",
        date: new Date(),
        location: "Honkkong",
        description: "DEscription lorem"
      },
      {
        imageUrl:
          "https://ak3.picdn.net/shutterstock/videos/5717183/thumb/1.jpg",
        id: "asdsdsdasdaas",
        title: "Meet Up in New Moscow",
        date: new Date(),
        location: "Moscow",
        description: "DEscription lorem"
      }
    ],
    user: {
      id: "asd",
      registeredMeetups: ["asdasd", "asdda"]
    }
  },
  mutations: {
    CreateMeetUp(state, payload) {
      state.loadedMeetups.push(payload);
    }
  },
  actions: {
    CreateMeetUp({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: "asdadas"
      };
      commit("CreateMeetUp", meetup);
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id == meetupId;
        });
      };
    }
  }
});
