<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template scope>
                <v-btn class="blue--text darken-1" flat @click.native="editDialog=false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      let hours = this.editableTime.match(/^(\d+)/)[1];

      let minutes = this.editableTime.match(/:(\d+)/)[1];

      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    this.editableTate = new Date(this.meetup.date).toTimeString();
  }
};
</script>

<style lang="scss" scoped>
</style>