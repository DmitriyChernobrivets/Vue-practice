<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else justify-center>
      <v-flex xs12 lg8>
        <v-card>
          <v-card-title>
            <h2 class="error--text">{{meetup.title}}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup :meetup="meetup"></app-edit-meetup>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div class="info--text">{{meetup.date | dateFilter}} - {{meetup.location}}</div>
            <div>
              <app-edit-meetup-date :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date>
              <app-edit-meetup-time :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time>
            </div>
            <div>{{meetup.description}}.</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-meetup-register-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthticated && !userIsCreator"
            ></app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>