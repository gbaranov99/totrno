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
				v-for="item in menuItems"
				:key="item.title"
				:to="item.path">
				{{ item.title }}
			</v-btn>
		</v-toolbar-items>
	</v-app-bar>
  </v-container>
</template>

<script>
export default {
	name: 'TopNav',
	components: {
	},
	data(){
		return {
		appTitle: 'Totrno',
		menuItems: [
			{ title: 'About', path: '/about' },
			{ title: 'Contact', path: '/contact' },
			{ title: 'Sign Up', path: '/signup' },
			{ title: 'Files', path: '/files' },
			{ title: 'Logout', path: '/logout' },
		]
		}
	},
};
</script>
