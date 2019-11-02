<template>
  <v-container>
    <v-layout
	  text-center
      height="100"
	  wrap
	>
    <v-flex xs12>
      <v-img
        :src="require('../assets/Contact.png')"
        class="my-3"
        contain
        height="150"
      ></v-img>
    </v-flex>
	<v-flex xs2/>
	<v-flex xs8 mt-12 text-left>
	  <h1 class="display-1">Hi. My name is Greg Baranov. Thank you for checking out my website!</h1>
	  <br>
	  <h1 class="display-1">Feel free to sign up for an account and start using the app using the sign up tab.</h1>
	  <br>
	  <h1 class="display-1">Also feel free to reach out to me with any questions or comments!</h1>
	  <br>
	  <h1 class="display-1">I sincerely hope you like what I have made.</h1>
	  <br>
	  <br>
	  <br>
	  <br>
	</v-flex>
    <v-flex xs12>
	  <v-container>
        <v-row align-center justify-center>
		<v-flex>
		  <v-btn
		    color="green darken-4" 
			href="https://github.com/gbaranov99" target="_blank"
			fab dark>
            <v-icon>mdi-github-circle</v-icon>
           </v-btn>
		</v-flex>
		<v-flex>
		  <v-btn
		    color="green darken-4" 
			href="https://www.linkedin.com/in/gbaranov99/" target="_blank"
			fab dark>
            <v-icon>mdi-linkedin-box</v-icon>
           </v-btn>
		</v-flex>
		<v-flex>
		  <v-btn
		    color="green darken-4" 
            href="mailto: gbaranov99@gmail.com"
			fab dark>
            <v-icon>mail</v-icon>
           </v-btn>
		</v-flex>
        </v-row>
      </v-container>
    </v-flex>
	<v-flex xs2/>
	</v-layout>
  </v-container>
</template>
