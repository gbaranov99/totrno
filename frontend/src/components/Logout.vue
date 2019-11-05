<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs6 offset-xs2>
        <v-img
          :src="require('../assets/SignUp.png')"
          class="my-3"
          contain
          height="150"
        ></v-img>
	    <v-container>
          <v-column>
		    <v-flex>
              <h1 class="display-1" style="padding-top: 120px;">
			    Press the logout button to logout of your account
              </h1>
			  <br>
			</v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark color="green darken-4" 
			  type="submit"
			  @click="logoutUser({})"
			  >Logout</v-btn>
            </v-flex>
          </v-column>
        </v-container>
      </v-flex>
	<v-flex xs2/>
	</v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "Logout",
  data() {
    return {
    };
  },
  computed: mapState({
    login: state => state.login.login
  }),
  methods: mapActions('login', [
    'registerUser',
    'loginUser',
	'logoutUser'
  ]),
  created() {
    this.$store.dispatch('login/getUser')
  }
};
</script>
