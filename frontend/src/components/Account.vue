<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
		<v-tabs
          align-with-title
          background-color="transparent"
		  color="black"
        >
          <v-tab
			v-for="item in Preferences"
			:key="item.title"
			@click="tempFunction(item.title)"
		  > {{ item.title }}</v-tab>
        </v-tabs>
			<v-spacer />
			<v-toolbar-items>
				<v-btn
					text
					type="submit"
					@click="logoutUser({})"
					>
					{{ 'Logout' }}
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<SideNav></SideNav>  
		{{ login }}
		<v-layout justify-center>
				<v-container>
						<v-flex>
							<!--
			<v-toolbar-items>
				<v-btn
					text
					v-for="item in Preferences"
					:key="item.title"
					>
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>
							<v-img
								:src="require('../assets/Account.png')"
								contain
								height="150"
							></v-img>
							<router-link to="/home" tag="span" style="cursor: pointer">
								<v-btn dark color="green darken-4"
									type="submit"
									@click="logoutUser({})"
								>Logout</v-btn>
							</router-link>
							-->
						</v-flex>
				</v-container>
		</v-layout>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideNav from './SideNav'
export default {
	name: "Logout",
	components: {
		'SideNav': SideNav,
	},
	data() {
		return {
			Preferences: [
				{ title: 'Account Info' },
				{ title: 'Timer Settings' },
				{ title: 'Aesthetics' },
			],
		};
	},
	computed: mapState({
		login: state => state.login.login
	}),
	methods: {
		tempFunction(temp) {
			//console.log(temp)
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
