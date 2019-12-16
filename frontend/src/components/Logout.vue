<template>
	<v-container>
		<v-layout justify-center align-center>
			<v-flex xs6>
				<v-container>
						<v-flex class="text-xs-center" mt-5>
							<router-link to="/home" tag="span" style="cursor: pointer">
								<v-btn dark color="green darken-4"
									type="submit"
									@click="logoutUser({})"
								>Logout</v-btn>
							</router-link>
						</v-flex>
				</v-container>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: "Logout",
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
