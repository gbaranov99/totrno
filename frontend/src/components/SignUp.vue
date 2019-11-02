<template>
  <v-container>
    <v-layout text-xs-center wrap>
	<v-flex xs2/>
      <v-flex xs8>
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
		        Fill out the forms below to sign up for an account:
              </h1>
			  <br>
			</v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
				color="green darken-4"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
				color="green darken-4"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
				color="green darken-4"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark color="green darken-4" type="submit">Sign Up</v-btn>
            </v-flex>
          </v-column>
        </v-container>
      </v-flex>
	<v-flex xs2/>
	</v-layout>
  </v-container>
</template>
