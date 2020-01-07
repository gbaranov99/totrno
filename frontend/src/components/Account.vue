<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-tabs
				align-with-title
				background-color="transparent"
				color="black">
				<v-tab
				v-for="item in Preferences"
				:key="item.title"
				@click="changeSettingsPage(item.title)"
				> {{ item.title }}</v-tab>
			</v-tabs>
			<v-spacer />
			<v-toolbar-items>
				<v-btn
					text
					type="submit"
					@click="logoutUser({})"
					>{{ 'Logout' }}
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<SideNav></SideNav>	
		<!--
		{{ login }}
		-->
		<v-container justify-center v-if="selectedPage==='Account Info'">
			<v-row no-gutters>
				<v-btn dark color="green darken-4"
					style="margin-top:2px;margin-top: 30px;margin-right:20px;"
					type="submit"
					tile
					@click=""
				>Change</v-btn>
				<h1 class="headline" style="padding-top: 30px;">
					Username: {{ login.username }}
				</h1>
			</v-row>
			<v-row no-gutters>
				<v-btn dark color="green darken-4"
					style="margin-top:2px;margin-top: 30px;margin-right:20px;"
					type="submit"
					tile
					@click=""
				>Change</v-btn>
				<h1 class="headline" style="padding-top: 30px;">
					Email: {{ login.email }}
				</h1>
			</v-row>
			<v-row no-gutters>
				<v-btn dark color="green darken-4"
					style="margin-top:2px;margin-top: 30px;margin-right:20px;"
					type="submit"
					tile
					@click=""
				>Change password</v-btn>
			</v-row>
		</v-container>
		<v-container justify-center v-if="selectedPage==='Timer Settings'">
			<v-row no-gutters>
				<v-menu 
					transition="slide-y-transition"
					bottom
					offset-y
				>
					<template v-slot:activator="{ on }">
						<v-btn
							color="green darken-4"
							tile dark
							style="margin-top:30px;margin-right:20px"
							v-on="on">
							{{ 'Change' }}
						</v-btn>
					</template>
					<v-list>
							<v-list-item
							v-if="login.timer_choice!=='countup'"
							@click='changeTimerOption("countup")'
							>
								<v-list-item-title>{{ 'Countup' }}</v-list-item-title>
							</v-list-item>
							<v-list-item
							v-if="login.timer_choice!=='countdown'"
							@click='changeTimerOption("countdown")'
							>
								<v-list-item-title>{{ 'Countdown' }}</v-list-item-title>
							</v-list-item>
							<v-list-item
							v-if="login.timer_choice!=='interval'"
							@click='changeTimerOption("interval")'
							>
								<v-list-item-title>{{ 'Interval' }}</v-list-item-title>
							</v-list-item>
							<v-list-item
							v-if="login.timer_choice!=='pomodoro'"
							@click='changeTimerOption("pomodoro")'
							>
								<v-list-item-title>{{ 'Pomodoro' }}</v-list-item-title>
							</v-list-item>
					</v-list>
				</v-menu>
				<h1 class="headline" style="padding-top: 30px;">
					Timer functionality: {{ login.timer_choice }}
				</h1>
			</v-row>
			<v-container justify-center v-if="login.timer_choice==='pomodoro'">
			<v-row no-gutters>
				<v-dialog
					v-model="pomodoroTimerDuration"
					max-width="500"
				>
					<template v-slot:activator="{ on }">
						<v-btn dark color="green darken-4"
							style="margin-top:2px;margin-top: 30px;margin-right:20px;margin-left:50px;"
							type="submit"
							tile
							v-on="on"
						>Change</v-btn>
					</template>

					<v-form>
					<v-card >
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
							Enter a number of minutes:
						</v-card-title>
						<v-card-text>
							<v-text-field
							color="green darken-4"
							v-model="durationVal"
							>
							</v-text-field>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-4"
								text
								@click="pomodoroTimerDuration = false"
							> Cancel
							</v-btn>
							<v-btn
								color="green darken-4"
								text
								type="submit"
								@click="updateTimerDuration"
							> Accept
							</v-btn>
						</v-card-actions>
					</v-card>
					</v-form>
				</v-dialog>
				<h1 class="headline" style="padding-top: 30px;">
					Pomodoro timer duration: {{ login.pomodoro_duration }}
				</h1>
			</v-row>
			<v-row v-if="errorDuration !== ''"
			 style="padding-top: 20px;"
			>
				<v-btn dark color="green darken-4"
					style="margin-top: 15px;"
					type="submit"
					small
					text
					@click="errorDuration = ''"
					><v-icon>close</v-icon>
				</v-btn>
				<v-col>
				<h1 class="headline">
					{{ errorDuration }}
				</h1>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-dialog
					v-model="pomodoroShortDuration"
					max-width="500"
				>
					<template v-slot:activator="{ on }">
						<v-btn dark color="green darken-4"
							style="margin-top:2px;margin-top: 30px;margin-right:20px;margin-left:50px;"
							type="submit"
							tile
							v-on="on"
						>Change</v-btn>
					</template>

					<v-form>
					<v-card >
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
							Enter a number of minutes:
						</v-card-title>
						<v-card-text>
							<v-text-field
							color="green darken-4"
							v-model="shortDurationVal"
							>
							</v-text-field>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-4"
								text
								@click="pomodoroTimerDuration = false"
							> Cancel
							</v-btn>
							<v-btn
								color="green darken-4"
								text
								type="submit"
								@click="updateShortDuration"
							> Accept
							</v-btn>
						</v-card-actions>
					</v-card>
					</v-form>
				</v-dialog>
				<h1 class="headline" style="padding-top: 30px;">
					Short break duration: {{ login.pomodoro_short_break_duration }}
				</h1>
			</v-row>
			<v-row v-if="errorShort !== ''"
			 style="padding-top: 20px;"
			>
				<v-btn dark color="green darken-4"
					style="margin-top: 15px;"
					type="submit"
					small
					text
					@click="errorShort = ''"
					><v-icon>close</v-icon>
				</v-btn>
				<v-col>
				<h1 class="headline">
					{{ errorShort }}
				</h1>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-dialog
					v-model="pomodoroLongDuration"
					max-width="500"
				>
					<template v-slot:activator="{ on }">
						<v-btn dark color="green darken-4"
							style="margin-top:2px;margin-top: 30px;margin-right:20px;margin-left:50px;"
							type="submit"
							tile
							v-on="on"
						>Change</v-btn>
					</template>

					<v-form>
					<v-card >
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
							Enter a number of minutes:
						</v-card-title>
						<v-card-text>
							<v-text-field
							color="green darken-4"
							v-model="longDurationVal"
							>
							</v-text-field>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-4"
								text
								@click="pomodoroTimerDuration = false"
							> Cancel
							</v-btn>
							<v-btn
								color="green darken-4"
								text
								type="submit"
								@click="updateLongDuration"
							> Accept
							</v-btn>
						</v-card-actions>
					</v-card>
					</v-form>
				</v-dialog>
				<h1 class="headline" style="padding-top: 30px;">
					Long break duration: {{ login.pomodoro_long_break_duration }}
				</h1>
			</v-row>
			<v-row v-if="errorLong !== ''"
			 style="padding-top: 20px;"
			>
				<v-btn dark color="green darken-4"
					style="margin-top: 15px;"
					type="submit"
					small
					text
					@click="errorLong = ''"
					><v-icon>close</v-icon>
				</v-btn>
				<v-col>
				<h1 class="headline">
					{{ errorLong }}
				</h1>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-dialog
					v-model="pomodoroShortCount"
					max-width="500"
				>
					<template v-slot:activator="{ on }">
						<v-btn dark color="green darken-4"
							style="margin-top:2px;margin-top: 30px;margin-right:20px;margin-left:50px;"
							type="submit"
							tile
							v-on="on"
						>Change</v-btn>
					</template>

					<v-form>
					<v-card >
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
							How many pomdoros to get long break:
						</v-card-title>
						<v-card-text>
							<v-text-field
							color="green darken-4"
							v-model="shortBreakCount"
							>
							</v-text-field>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-4"
								text
								@click="pomodoroTimerDuration = false"
							> Cancel
							</v-btn>
							<v-btn
								color="green darken-4"
								text
								type="submit"
								@click="updateShortCount"
							> Accept
							</v-btn>
						</v-card-actions>
					</v-card>
					</v-form>
				</v-dialog>
				<h1 class="headline" style="padding-top: 30px;">
					Number of pomodoros to long break: {{ login.pomodoro_short_break_count }}
				</h1>
			</v-row>
			<v-row v-if="errorCount !== ''"
			 style="padding-top: 20px;"
			>
				<v-btn dark color="green darken-4"
					style="margin-top: 15px;"
					type="submit"
					small
					text
					@click="errorCount = ''"
					><v-icon>close</v-icon>
				</v-btn>
				<v-col>
				<h1 class="headline">
					{{ errorCount }}
				</h1>
				</v-col>
			</v-row>
			</v-container>
		</v-container>
		<v-container justify-center v-if="selectedPage==='Aesthetics'">
		</v-container>
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
			selectedPage: 'Account Info',
			Preferences: [
				{ title: 'Account Info' },
				{ title: 'Timer Settings' },
				{ title: 'Aesthetics' },
			],
			pomodoroTimerDuration: false,
			pomodoroShortCount: false,
			pomodoroShortDuration: false,
			pomodoroLongDuration: false,

			durationVal: 0,
			shortDurationVal: 0,
			longDurationVal: 0,
			shortBreakCount: 0,

			errorDuration: '',
			errorShort: '',
			errorLong: '',
			errorCount: '',
		};
	},
	computed: mapState({
		login: state => state.login.login
	}),
	methods: {
		fixDurationValue() {	
			var durationHours = Number(this.login.pomodoro_duration.substring(0, 2))
			var durationMinutes = Number(this.login.pomodoro_duration.substring(3, 5))
			this.durationVal = durationHours * 60 + durationMinutes

			this.shortDurationVal = Number(this.login.pomodoro_short_break_duration.substring(3, 5))
			this.longDurationVal = Number(this.login.pomodoro_long_break_duration.substring(3, 5))
			this.shortBreakCount = this.login.pomodoro_short_break_count
		},
		changeSettingsPage(newPage) {
			this.selectedPage = newPage;
		},
		changeTimerOption(newTimer) {
			//console.log(newTimer);
			//console.log(this.login.username)
			this.postUser({ username: this.login.username,  timer_choice: newTimer })
			this.login.timer_choice = newTimer
		},
		updateTimerDuration() {
			this.pomodoroTimerDuration = false
			if (this.durationVal >= 0 && this.durationVal <= 1440) {
				var hours = Math.floor(this.durationVal / 60)
				var minutes = Math.floor(this.durationVal % 60)
				this.durationVal = hours * 60 + minutes
				if (hours == 0) {
					hours = '00'
				}
				var duration = hours + ":" + minutes + ":00"
				this.postUser({ username: this.login.username,  pomodoro_duration: duration })
				this.login.pomodoro_duration = duration
			}
			else {
				this.errorDuration = 'Please enter a number of minutes between 1 and 1440'
			}
		},
		updateShortDuration() {
			this.pomodoroShortDuration = false
			if (this.shortDurationVal >= 1 && this.shortDurationVal <= 60) {
				var duration = "00:" + this.shortDurationVal + ":00"
				this.postUser({ username: this.login.username, pomodoro_short_break_duration: duration })
				this.login.pomodoro_short_break_duration = duration
			}
			else {
				this.errorShort = 'Please enter a number of minutes between 1 and 60'
			}
		},
		updateLongDuration() {
			this.pomodoroLongDuration = false
			if (this.longDurationVal >= 1 && this.longDurationVal <= 60) {
				var duration = "00:" + this.longDurationVal + ":00"
				this.postUser({ username: this.login.username, pomodoro_long_break_duration: duration })
				this.login.pomodoro_long_break_duration = duration
			}
			else {
				this.errorLong = 'Please enter a number of minutes between 1 and 60'
			}
		},
		updateShortCount() {
			this.pomodoroShortCount = false
			if (this.shortBreakCount >= 1 && this.shortBreakCount <= 10) {
				this.postUser({ username: this.login.username,  pomodoro_short_break_count: this.shortBreakCount })
				this.login.pomodoro_short_break_count = this.shortBreakCount
			}
			else {
				this.errorCount = 'Please enter a number of breaks between 1 and 10'
			}
		},
		...mapActions('login', [
			'registerUser',
			'loginUser',
			'logoutUser',
			'postUser'
		]),
	},
	created() {
		this.$store.dispatch('login/getUser')
			.then(() => {
				this.fixDurationValue()
				})
	}
};


/*

		{{ selectedPage }}
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
							*/
</script>
