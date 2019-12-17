<template>
	<v-app>
		</v-container>
		<v-content style="padding-top: 50px;">
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

export default {
	name: "App",
	data() {
		return {
		}
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
	},
	created() {
		this.$store.dispatch('login/getUser')
	}
};
</script>
