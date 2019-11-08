<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title>
				Running timers:
			</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	data(){
		return {
			appTitle: 'TimeBar',
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
