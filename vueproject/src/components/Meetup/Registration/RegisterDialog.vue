<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn accent slot="activator" class="error">{{userisRegistered ? "Unregister" : "Register"}}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userisRegistered">Unregistered for Meetups ?</v-card-title>
            <v-card-title v-else>Registered for Meetups ?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text" flat @click="registerDialog=false">Cancel</v-btn>
              <v-btn class="green--text darken--1" flat @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userisRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userisRegistered) {
        this.$store.dispatch("unregisterUserFormeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserFormeetup", this.meetupId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>