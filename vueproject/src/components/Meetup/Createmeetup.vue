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
              <v-btn raised class="error" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              >
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
          <v-layout row wrap class="mb-2">
            <v-flex xs12 sm12 style="display: flex" justify-center class="mb-3">
              <v-date-picker v-model="date" color="green lighten-1"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 style="display: flex" justify-center>
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
      time: new Date(),
      image: null
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
      if (!this.formIsValid && !this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetUp", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>