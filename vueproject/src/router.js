import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";
import Meetups from "./components/Meetup/Meetups";
import CreateMeetup from "./components/Meetup/Createmeetup";
import Profile from "./components/User/Profile";
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import Meetup from "./components/Meetup/Meetup";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/meetups/:id",
      name: "Meetup",
      props: true,
      component: Meetup
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup
    },
    {
      path: "/srofile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ]
});