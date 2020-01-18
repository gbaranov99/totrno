<template>
	<v-container>
	<div class="d-none d-sm-block">
		<v-navigation-drawer 
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
	</div>

	<div class="d-sm-none">
		<v-navigation-drawer 
			app dark 
			v-model="drawer"
			absolute
			temporary
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
	</div>
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
			//{ title: 'Search', path: '/search' },
			//{ title: 'Calendar', path: '/signup' },
			{ title: 'Account', path: '/account' },
		],
		drawer: null,
		}
	},
	computed: mapState({
		login: state => state.login.login
	}),
	methods: {
		switchDrawer() {
			this.drawer = !this.drawer
		},
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
