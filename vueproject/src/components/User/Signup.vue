<template>
  <v-container>
    <v-layout row>
      <v-flex x12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      v-model="email"
                      label="Mail"
                      id="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      v-model="password"
                      id="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      v-model="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign Up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  date() {
    return {
      password: "",
      email: "",
      confirmPasword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPasword
        ? "Password do not match"
        : "";
    }
  },
  methods: {
    onSignup() {
      console.log();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>