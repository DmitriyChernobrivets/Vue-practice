<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 offset-sm3>
        <h2 class="error--text mb-3">Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form class="error--text" @submit.prevent="onCreateMeetUp">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="title"
                color="error"
                sname="title"
                label="Title*"
                id="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="location"
                color="error"
                name="location"
                label="Location*"
                id="location"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="imageUrl"
                color="error"
                name="imageUrl"
                label="Image URL*"
                id="image-url"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                color="error"
                v-model="description"
                name="description"
                label="Description*"
                id="description"
                multi-line
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <h2>Choose Data</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-2" justify-center>
            <v-flex xs12 sm6 style="text-align: center;">
              <v-date-picker v-model="date" color="green lighten-1"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm6 style="text-align: center;">
              <v-time-picker v-model="time" color="green lighten-1"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="error" type="submit" :disabled="!formIsValid">SUBMIT</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import moment from "moment";
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date()
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];

        let minutes = this.time.match(/:(\d+)/)[1];

        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    }
  },
  methods: {
    onCreateMeetUp() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch("CreateMeetUp", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>