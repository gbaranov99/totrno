<template>
	<v-app>
		<v-container v-if="login.username === ''">
			<TopNav></TopNav>
		</v-container>
		<v-container v-else>
			<SideNav></SideNav>
			<TimeBar></TimeBar>
		</v-container>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import TimeBar from './components/TimeBar'

export default {
	name: 'App',
	components: {
		'TopNav': TopNav,
		'SideNav': SideNav,
		'TimeBar': TimeBar
	},
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
