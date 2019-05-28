<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info">Explore Meetups</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :width="3" color="red" indeterminate v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading" justify-center>
      <v-flex xs12 sm6>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="item in meetups"
            :key="item.id"
            @click="onloadMeetup(item.id)"
            :src="item.imageUrl"
          >
            <div class="title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3">
      <v-flex xs12 class="text-xs-center">
        <p>Join awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onloadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  bottom: 50px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2em;
  padding: 20px;
}
</style>
