<template>
	<v-app>
		<v-container v-if="login.username === ''">
			<TopNav></TopNav>
		</v-container>
		<v-container v-else>
			<SideNav></SideNav>
		</v-container>
		<v-content style="padding-top: 0px;">
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import TreeMenu from './components/TreeMenu'

export default {
	name: 'App',
	components: {
		'TopNav': TopNav,
		'SideNav': SideNav,
		'TreeMenu': TreeMenu
	},
	data() {
		return {
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
