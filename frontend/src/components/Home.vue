<template>
	<v-container>
		<TopNav></TopNav>
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
						<v-row v-if="errorMessage !== ''"
						 style="padding-top: 20px;"
						>
							<v-btn dark color="green darken-4"
								style="margin-top: 15px;"
								type="submit"
								small
								text
								@click="errorMessage = ''"
								><v-icon>close</v-icon>
							</v-btn>
							<v-col>
							<h1 class="headline">
								{{ errorMessage }}
							</h1>
							</v-col>
						</v-row>
						<v-btn dark color="green darken-4"
							type="submit"
							@click="tryLogin()"
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
import TopNav from './TopNav'

export default {
	name: "Home",
	components: {
		'TopNav': TopNav,
	},
	data() {
		return {
			isLoggedIn: false,
			errorMessage: "",
			username: "",
			password: "",
		};
	},
	computed: mapState({
		login: state => state.login.login,
	}),
	methods: {
		...mapActions('login', [
		'registerUser',
		'loginUser',
		'logoutUser'
		]),
		onSubmit() {
		},
		tryLogin() {
			this.loginUser({ username: this.username,  password: this.password })
				.then(errors => {
					//console.log(errors)
					if (!errors) {
						this.isLoggedIn = !this.isLoggedIn;
					}
					else {
						this.errorMessage = "Please enter a valid login";
						this.isLoggedIn = false;
					}
				})
		},
		//refreshAppVue() {
		//	this.$store.dispatch('login/getUser')
		//		.then(errors => {
		//			console.log(errors)
		//			if (!errors) {
		//				this.isLoggedIn = !this.isLoggedIn;
		//			}
		//			else {
		//				this.errorMessage = "Please enter a valid login";
		//				this.isLoggedIn = false;
		//				this.loginFailed = true;
		//			}
		//		})
		//},
	},
	//created() {
	//	this.refreshAppVue();
	//}
};
</script>
