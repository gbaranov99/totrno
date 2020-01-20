<template>
	<v-container>
		<v-app-bar app dark color="green darken-4">
			<v-toolbar-title>
				<router-link to="/" tag="span" style="cursor: pointer">
				{{ appTitle }}
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn
					text
					v-for="item in loggedOut"
					:key="item.title"
					:to="item.path">
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TopNav',
	components: {
	},
	data(){
		return {
		appTitle: 'Totrno',
		loggedOut: [
			{ title: 'About', path: '/about' },
			{ title: 'Sign Up', path: '/signup' },
		],
		}
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
