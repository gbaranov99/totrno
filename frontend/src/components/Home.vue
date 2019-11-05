<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs8>
        <v-img
          :src="require('../assets/totrnoLanding.png')"
          class="my-3"
          contain
          height="600"
        ></v-img>
      </v-flex>

      <v-flex xs1/>
      <v-flex xs3>
	    <v-container>
          <v-column>
		    <v-flex>
              <h1 class="display-1" style="padding-top: 120px;">
		        Login
              </h1>
			</v-flex>
            <v-flex>
              <v-text-field
                name="username"
                label="Username"
                id="username"
                type="username"
				color="green darken-4"
				v-model="username"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
				color="green darken-4"
				v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
				color="green darken-4"
				v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark color="green darken-4" 
			  type="submit"
			  @click="loginUser({ username: username, email: email, password: password })"
			  >Login</v-btn>
            </v-flex>
          </v-column>
        </v-container>
      </v-flex>
	  <v-flex xs12 mt-12 text-center>
	    <h1 class="display-1 ">Everything you need to organize your life,</h1>
	    <h1 class="display-1 ">All in one place.</h1>
	  </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  computed: mapState({
    login: state => state.login.login
  }),
  methods: mapActions('login', [
    'registerUser',
    'loginUser',
	'logoutUser'
  ])
};
</script>
