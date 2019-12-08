<template>
	<v-container>
		<v-layout justify-center align-center>
			<v-flex xs10 text-left>
				<v-img
					:src="require('../assets/About.png')"
					class="my-3"
					contain
					height="150"
				></v-img>
			<v-list>
				<v-list-group
					v-for="item in content"
					color="green darken-4"
					:key="item.title"
					background_color="grey"
				>
					<template v-slot:activator>
						<v-list-item-title> 
						<h1 class="headline"> {{ item.title }}</h1>
						</v-list-item-title>
					</template>
					<v-list-item-content>
					<template v-for="subitem in item.content" >
						<h1 class="headline" style="padding-top:10px;"> {{ subitem }}</h1>
						<br>
					</template>
					</v-list-item-content>
				</v-list-group>
			</v-list>

			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'About',
	data(){
		return {
		appTitle: 'Totrno',
		content: [
			{
				title: "Introduction",
				content: [
					"There are plenty of time tracking and planning tools out there already. Many of them work very well for a lot of people.",
					"So why make another one?",
					"Part of it was that I wanted to create a web app, and this was my only real idea. So yeah, that was definitely a factor.",
					"However, I do believe Totrno is a useful application in its own right. It does not impose any particular framework on the user. It merely provides tools that the user can use as they please.",
					"Although I did design the framework with a specific implementation in mind, it can likely be used in a number of ways I did not envision. I will use it primarily for planning out personal projects and documenting their progress. But it can just as easily be used as a place to store recipies for food, or create detailed journal entries.",
					"On this page, I will provide a basic introduction into the layout of Totrno in the Features section. In the My Implementation section I will go a bit more into how I plan on using this web app going forward. I will also include a list of Upcoming Features: things I will work into the platform.",
				],
			},
			{
				title: "Features",
				content: [
				],
			},
			{
				title: "My implementation",
				content: [
				],
			},
			{
				title: "Upcoming features",
				content: [
				],
			},
		]
		}
	}
};
</script>
