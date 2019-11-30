<template>
	<v-container>
		<v-navigation-drawer 
			v-model="drawer"
			app dark permanent
			width="180px"
			color="green darken-4"
		>
			<v-list>
				<v-list-item
					text
					v-for="item in items"
					:key="item.title"
					:to="item.path"
				>
					<v-list-item-content>
						<v-list-item-title style="padding:10px;">{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
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
		items: [
			{ title: 'Home', path: '/totrno' },
			{ title: 'Search', path: '/search' },
			{ title: 'Calendar', path: '/signup' },
			{ title: 'Account', path: '/logout' },
		]
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
