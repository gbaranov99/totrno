<template>
	<v-app>
		<v-container v-if="login.username === ''">
			<TopNav></TopNav>
		</v-container>
		<v-container v-else>
			<SideNav></SideNav>
			<TimeBar></TimeBar>
		</v-container>
		<v-content style="padding-top: 0px;">
			<router-view></router-view>
		</v-content>
		<!--
		<tree-menu 
		:label="tree.label" 
		:nodes="tree.nodes"
		:depth="0"
		></tree-menu>
		-->
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import TimeBar from './components/TimeBar'
import TreeMenu from './components/TreeMenu'

export default {
	name: 'App',
	components: {
		'TopNav': TopNav,
		'SideNav': SideNav,
		'TimeBar': TimeBar,
		'TreeMenu': TreeMenu
	},
	data() {
		return {
			tree : {
				label: 'root',
				nodes: [
					{
						label: 'item1',
						nodes: [
							{
								label: 'item1.1'
							},
							{
								label: 'item1.2',
								nodes: [
									{
										label: 'item1.2.1'
									}
								]
							}
						]
					}, 
					{
						label: 'item2'	
					}
				]
			}
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
