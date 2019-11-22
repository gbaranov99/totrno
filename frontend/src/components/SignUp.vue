<template>
	<v-container>
		<v-layout justify-center align-center>
			<v-flex xs6>
				<v-img
					:src="require('../assets/SignUp.png')"
					class="my-3"
					contain
					height="150"
				></v-img>
				<v-container v-on:submit.prevent="onSubmit">
					<v-form>
						<h1 class="display-1" style="padding-top: 50px;">
							Fill out the forms below to sign up for an account:
						</h1>
						<br>
						<v-text-field
							name="username"
							label="Username"
							id="username"
							type="username"
							color="green darken-4"
							v-model="username"
							required
						></v-text-field>
						<v-text-field
							name="email"
							label="Email"
							id="email"
							type="email"
							color="green darken-4"
							v-model="email"
							required
						></v-text-field>
						<v-text-field
							name="password1"
							label="Password"
							id="password1"
							type="password"
							color="green darken-4"
							v-model="password1"
							required
						></v-text-field>
						<v-text-field
							name="password2"
							label="Confirm Password"
							id="password2"
							type="password"
							color="green darken-4"
							v-model="password2"
							required
						></v-text-field>
						<v-flex v-if="errors.error_msg !== ''">
							<h1 class="headline" style="padding-top: 10px; padding-bottom: 20px;">
								{{ errors.error_msg }}
							</h1>
						</v-flex>
						<v-btn dark color="green darken-4"
							type="submit"
							@click="registerUser({ username: username, email: email, password1: password1, password2: password2 })"
						>Sign Up</v-btn>
					</v-form>
				</v-container>
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
			password1: "",
			password2: "",
		};
	},
	computed: mapState({
		login: state => state.login.login,
		errors: state => state.login.errors
	}),
	methods: mapActions('login', [
		'registerUser',
		'loginUser',
		'logoutUser',
		'getUser'
	]),
	created() {
		this.$store.dispatch('login/getUser')
	}
};
</script>
