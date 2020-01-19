<template>
	<v-container fluid 
		style="background: linear-gradient(to bottom, #fafafa, #c9ead2, #95c9a4);"
	>
	<div class="d-none d-sm-block">
		<TopNav></TopNav>
		<v-layout justify-center align-start
		style="height:4800px;"
		v-scroll="onScroll"
		>
			<v-flex xs8 text-left>
				<v-img
					:src="require('../assets/About.png')"
					class="my-3"
					contain
					height="150"
				></v-img>
					<p class="display-2 text--primary" style="text-align:center;padding-top:50px;">
						There are many 'life organization' apps already out there.
					</p>
					<p class="display-1 text--primary" style="text-align:center;padding-top:50px;">
						What makes Totrno different?
					</p>
					<p class="headline text--primary" style="text-align:center;padding-top:10px;">
						Scroll down to find out...
					</p>
			<v-slide-x-transition
			transition="slide-x-transition">
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 100"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					>
						Robust feature set, and powerful integration between components.
					</p>
					<p class="headline text--primary"
					text-left
					>
						- Todos, Time Tracked data and Notes are all linked in one cohesive format
					</p>
					<p class="headline text--primary"
					>
						- Totrno only contains 'Files', a combination of folders and tasks into one
					</p>
					<p class="headline text--primary"
					>
						- Every File has subfiles, a place to take notes, and time tracking data attached to it
					</p>
				</v-card-text>
			</v-card>
			</v-slide-x-transition>

			<v-scale-transition
			transition="scale-transition" origin="center center"
			>
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 500"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						Totrno can be as simple...
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/SimpleExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>
			</v-scale-transition>

			<v-scale-transition
			transition="scale-transition" origin="center center"
			>
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 1200"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						Or as complex as you want.
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/ComplexExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>
			</v-scale-transition>

			<v-slide-x-reverse-transition
			transition="slide-x-reverse-transition">
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 1900"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						Advanced features include...
					</p>
				</v-card-text>
				<v-card-text>
					<p class="headline text--primary"
					>
						- Drag files around to create subfiles. Subfiles can be opened or closed on the left
					</p>
					<p class="headline text--primary"
					>
						- Clicking on a file will open access to the notes section, as well as to timer buttons
					</p>
					<p class="headline text--primary"
					>
						- The timer button starts a new timer, while the clock shows previously tracked time
					</p>
					<p class="headline text--primary"
					>
						- Pre, post and next timer notes encourage the user to reflect on how effective the session was
					</p>
					<p class="headline text--primary"
					>
						- Customizable timer functionality: countup, interval, countdown and pomodoro timers included
					</p>
				</v-card-text>
			</v-card>
			</v-slide-x-reverse-transition>


			<v-scale-transition
			transition="scale-transition" origin="center center"
			>
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 2400"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						Right clicking on a file will show its subfiles exclusively, with the path above allowing traversal back up to higher files
					</p>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Below is what happens if you right click on 'Bacon' in the main File list
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/PathExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>
			</v-scale-transition>

			<v-slide-x-transition
			transition="slide-x-transition">
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 3000"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						There are many more features planned for the future, including:
					</p>
					<p class="headline text--primary"
					>
						- Powerful search functionality
					</p>
					<p class="headline text--primary"
					>
						- Visualising your tracked time over weeks and months
					</p>
					<p class="headline text--primary"
					>
						- Integration with services such as Slack and Google Calendar
					</p>
					<p class="headline text--primary"
					>
						- Full andriod /ios integration with reminders and notifications
					</p>
					<p class="headline text--primary"
					>
						- And way more!
					</p>
				</v-card-text>
			</v-card>
			</v-slide-x-transition>


			<v-slide-x-reverse-transition
			transition="slide-x-reverse-transition">
			<v-card
					style="margin-top:100px;"
					v-show="offsetTop > 3400"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-2 text--primary"
					style="text-align:center;"
					>
						Feel free to try out the app by signing up above!
					</p>
					<p class="headline text--primary"
					style="text-align:center;padding-top:30px;"
					>
						You can find me, the developer (Greg Baranov), at the social links below
					</p>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Please reach out to me with any comments or questions you might have about the website.
					</p>
					<p class="headline text--primary"
					style="text-align:center;padding-bottom:30px;"
					>
						:)
					</p>
				</v-card-text>
				<v-row style="padding-bottom:50px;text-align:center;">
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="https://github.com/gbaranov99" target="_blank"
							fab dark>
							<v-icon>mdi-github-circle</v-icon>
						</v-btn>
					</v-flex>
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="https://www.linkedin.com/in/gbaranov99/" target="_blank"
							fab dark>
							<v-icon>mdi-linkedin-box</v-icon>
						</v-btn>
					</v-flex>
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="mailto: gbaranov99@gmail.com"
							fab dark>
							<v-icon>mail</v-icon>
						</v-btn>
					</v-flex>
				</v-row>
			</v-card>
			</v-slide-x-reverse-transition>
			</v-flex>
		</v-layout>
	</div>
	<div class="d-sm-none">
		<TopNav></TopNav>
		<v-layout justify-center align-start
		>
			<v-flex xs12>
				<v-img
					:src="require('../assets/About.png')"
					class="my-3"
					contain
					height="100"
				></v-img>
					<p class="headline" style="text-align:center;">
						There are many 'life organization' apps already out there.
					</p>
					<p class="display-1 text--primary" style="text-align:center;padding-top:20px;">
						What makes Totrno different?
					</p>
			<v-card
					style="margin-top:50px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					>
						Robust feature set, and powerful integration between components.
					</p>
					<p class="body-1 text--primary"
					text-left
					>
						- Todos, Time Tracked data and Notes are all linked in one cohesive format
					</p>
					<p class="body-1 text--primary"
					>
						- Totrno only contains 'Files', a combination of folders and tasks into one
					</p>
					<p class="body-1 text--primary"
					>
						- Every File has subfiles, a place to take notes, and time tracking data attached to it
					</p>
				</v-card-text>
			</v-card>

			<v-card
					style="margin-top:0px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Totrno can be as simple...
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/SimpleExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>

			<v-card
					style="margin-top:20px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Or as complex as you want.
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/ComplexExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>

			<v-card
					style="margin-top:20px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Advanced features include...
					</p>
				</v-card-text>
				<v-card-text>
					<p class="body-1 text--primary"
					>
						- Drag files around to create subfiles. Subfiles can be opened or closed on the left
					</p>
					<p class="body-1 text--primary"
					>
						- Clicking on a file will open access to the notes section, as well as to timer buttons
					</p>
					<p class="body-1 text--primary"
					>
						- The timer button starts a new timer, while the clock shows previously tracked time
					</p>
					<p class="body-1 text--primary"
					>
						- Pre, post and next timer notes encourage the user to reflect on how effective the session was
					</p>
					<p class="body-1 text--primary"
					>
						- Customizable timer functionality: countup, interval, countdown and pomodoro timers included
					</p>
				</v-card-text>
			</v-card>


			<v-card
					style="margin-top:20px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						Right clicking (long press on mobile) on a file will show its subfiles exclusively, with the path above allowing traversal back up to higher files
					</p>
					<p class="body-1 text--primary"
					style="text-align:center;"
					>
						Below is what happens if you right click on 'Bacon' in the main File list
					</p>
				</v-card-text>
				<v-img
					:src="require('../assets/PathExample.png')"
					class="my-3"
					contain
				></v-img>
			</v-card>

			<v-card
					style="margin-top:20px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="headline text--primary"
					style="text-align:center;"
					>
						There are many more features planned for the future, including:
					</p>
					<p class="body-1 text--primary"
					>
						- Powerful search functionality
					</p>
					<p class="body-1 text--primary"
					>
						- Visualising your tracked time over weeks and months
					</p>
					<p class="body-1 text--primary"
					>
						- Integration with services such as Slack and Google Calendar
					</p>
					<p class="body-1 text--primary"
					>
						- Full andriod /ios integration with reminders and notifications
					</p>
					<p class="body-1 text--primary"
					>
						- And way more!
					</p>
				</v-card-text>
			</v-card>


			<v-card
					style="margin-top:20px;"
					color="rgb(255, 0, 0, 0)"
					outlined
			>
				<v-card-text>
					<p class="display-1 text--primary"
					style="text-align:center;"
					>
						Feel free to try out the app by signing up above!
					</p>
					<p class="body-1 text--primary"
					style="text-align:center;padding-top:30px;"
					>
						You can find me, the developer (Greg Baranov), at the social links below
					</p>
					<p class="body-1 text--primary"
					style="text-align:center;"
					>
						Please reach out to me with any comments or questions you might have about the website.
					</p>
					<p class="body-1 text--primary"
					style="text-align:center;padding-bottom:30px;"
					>
						:)
					</p>
				</v-card-text>
				<v-row style="padding-bottom:50px;text-align:center;">
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="https://github.com/gbaranov99" target="_blank"
							fab dark>
							<v-icon>mdi-github-circle</v-icon>
						</v-btn>
					</v-flex>
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="https://www.linkedin.com/in/gbaranov99/" target="_blank"
							fab dark>
							<v-icon>mdi-linkedin-box</v-icon>
						</v-btn>
					</v-flex>
					<v-flex>
						<v-btn
							color="green darken-4" 
							href="mailto: gbaranov99@gmail.com"
							fab dark>
							<v-icon>mail</v-icon>
						</v-btn>
					</v-flex>
				</v-row>
			</v-card>
			</v-flex>
		</v-layout>
	</div>
	</v-container>
</template>

<script>
import TopNav from './TopNav'

export default {
	name: 'About',
	components: {
		'TopNav': TopNav,
	},
	data(){
		return {
		offsetTop: 0,
		appTitle: 'Totrno',
		/*
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
		*/
		}
	},
	methods: {
		onScroll () {
			this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
		}
	}
};
/*
		class="fill-height"
		style="height:4800px;"
		v-scroll="onScroll"
*/
</script>
