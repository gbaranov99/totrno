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
			<v-flex xs3 >
				<v-container>
					<v-form v-on:submit.prevent="onSubmit">
						<h1 class="display-1" style="padding-top: 120px;">
							Login
						</h1>
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
							name="password"
							label="Password"
							id="password"
							type="password"
							color="green darken-4"
							v-model="password"
							required
						></v-text-field>
						<v-flex v-if="errors.error_msg !== ''">
							<h1 class="headline" style="padding-top: 10px; padding-bottom: 20px;">
								{{ errors.error_msg }}
							</h1>
						</v-flex>
						<v-btn dark color="green darken-4"
							type="submit"
							@click="loginUser({ username: username, email: email, password: password })"
						>Login</v-btn>
					</v-form>
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
	name: "Home",
	data() {
		return {
			username: "",
			password: "",
		};
	},
	computed: mapState({
		login: state => state.login.login,
		errors: state => state.login.errors
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
