<template>
	<v-container>
	<div class="d-none d-sm-block">
		<TopNav></TopNav>
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
							name="email"
							label="Email"
							id="email"
							type="email"
							color="green darken-4"
							v-model="email"
							required
						></v-text-field>
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
						<v-row v-if="errorMessage !== ''"
						 style="padding-top: 20px;"
						>
							<v-btn dark color="green darken-4"
								style="margin-top: 15px;"
								type="submit"
								tile
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
							tile
							type="submit"
							@click="tryRegister()"
						>Sign Up</v-btn>
					</v-form>
				</v-container>
			</v-flex>
		</v-layout>
	</div>

	<div class="d-sm-none">
		<TopNav></TopNav>
		<v-layout justify-center align-center>
			<v-flex xs12>
				<v-img
					:src="require('../assets/SignUp.png')"
					class="my-3"
					contain
					height="100"
				></v-img>
				<v-container v-on:submit.prevent="onSubmit">
					<v-form>
						<h1 class="headline" style="padding-top: 50px;">
							Fill out the forms below to sign up for an account:
						</h1>
						<br>
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
							name="username"
							label="Username"
							id="username"
							type="username"
							color="green darken-4"
							v-model="username"
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
							tile
							@click="tryRegister()"
						>Sign Up</v-btn>
					</v-form>
				</v-container>
			</v-flex>
		</v-layout>
	</div>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopNav from './TopNav'

export default {
	name: "SignUp",
	components: {
		'TopNav': TopNav,
	},
	data() {
		return {
			isLoggedIn: false,
			errorMessage: "",
			email: "",
			username: "",
			password1: "",
			password2: "",
		};
	},
	computed: mapState({
		login: state => state.login.login,
	}),
	methods: {
		...mapActions('login', [
		'registerUser',
		'loginUser',
		'logoutUser',
		'getUser'
		]),
		onSubmit() {
		},
		tryRegister() {
			//console.log(this.email)
			//console.log(this.username)
			//console.log(this.password1)
			//console.log(this.password2)
			this.registerUser({  username: this.username, email: this.email, password1: this.password1, password2: this.password2 })
				.then(errors => {
					//console.log(errors)
					if (!errors) {
						this.isLoggedIn = !this.isLoggedIn;
						this.$store.dispatch('login/getUser')
					}
					else {
						this.errorMessage = "Please make sure all forms were filled out correctly, and your password is at least 8 characters and is difficult to guess";
						this.isLoggedIn = false;
					}
				})
		}
	},
	created() {
		this.$store.dispatch('login/getUser')
	}
};
</script>
