<template>
	<v-container>
		<SideNav></SideNav>	
		{{ 'Calendar is in progress' }}
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideNav from './SideNav'
export default {
	name: "Calendar",
	components: {
		'SideNav': SideNav,
	},
	data() {
		return {
		};
	},
	computed: mapState({
		login: state => state.login.login
	}),
	methods: {
		...mapActions('login', [
			'registerUser',
			'loginUser',
			'logoutUser',
			'postUser'
		]),
	},
	created() {
		this.$store.dispatch('login/getUser')
			.then(() => {
				})
	}
};
</script>
