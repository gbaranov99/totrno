<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
			<v-container 
				v-if="title_path.length > 0"
			>
				<template v-for="(item, index) in title_path" 
				>
					<v-span :key="item.id">
						<v-card	outlined tile
							color="grey lighten-4"
							style="height:40px;"
							@click="parentSwitchFileSet(item)">
							<v-card-text class="pt-2"> 
								<p class="body-1 text--primary">
									{{ item }}
								</p>
							</v-card-text>
						</v-card>
						<template v-if="index != title_path.length - 1">
							-
						</template>
						<template v-else>
							<v-toolbar-title>
								{{ "-" }}
								{{ curTitle }}
							</v-toolbar-title>
						</template>
					</v-span>
				</template>
			</v-container>
				<v-spacer/>
			<v-toolbar-title v-if="timeLogs.length > 0">
				Running Timers:
				<span style="padding-right:25px;" v-if="!showTimer">
				{{ timeLogs[0].file_name }}
				</span>
				<span v-else>
				{{ timeLogs[0].file_name }}
				</span>
				<span v-if="showTimer">
				--
				<span style="padding-right:25px;">
				{{ hours }}
				{{ ':' }}
				{{ minutes }}
				{{ ':' }}
				{{ seconds }}
				</span>
				</span>
			</v-toolbar-title>
		<v-menu 
			v-if="timeLogs.length > 0"
			transition="slide-y-transition"
			bottom
			offset-y
		>
			<template v-slot:activator="{ on }">
				<v-btn
					class="purple"
					color="green darken-4"
					tile dark
					v-on="on">
					<v-icon>expand_more</v-icon>
				</v-btn>
			</template>
			<v-list>
			<!--
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					@click=""
				>
				-->
					<v-list-item
					@click='parentDisableTimer()'
					>
						<v-list-item-title>{{ 'Stop Timer' }}</v-list-item-title>
					</v-list-item>
					<v-list-item
					v-if="showTimer"
					@click='changeTimerVisibility'
					>
						<v-list-item-title>{{ 'Hide countdown time' }}</v-list-item-title>
					</v-list-item>
					<v-list-item
					v-else
					@click='changeTimerVisibility'
					>
						<v-list-item-title>{{ 'Show countdown time' }}</v-list-item-title>
					</v-list-item>
			</v-list>
		</v-menu>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	props: [ 'id_path', 'title_path', 'curTitle', 'timer_active',],
	data(){
		return {
			timer: null,
			timeCounter: 0,
			showTimer: true,

			startTime: null,
		}
	},
	computed: {
		...mapState({
			timeLogs: state => state.timeLogs.timeLogs,
		}),
		...mapState({
			files: state => state.files.files
		}),
		...mapState({
			login: state => state.login.login
		}),
		hours: function() {
			const hours = Math.floor(this.timeCounter / 3600);
			return this.padTime(hours);
		},
		minutes: function() {
			const minutes = Math.floor((this.timeCounter - (this.hours * 3600))/60);
			return this.padTime(minutes);
		},
		seconds: function() {
			const seconds = this.timeCounter - (this.hours * 3600) - (this.minutes * 60);
			return this.padTime(seconds);
		}
	},
	methods: {
		changeTimerVisibility() {
			this.showTimer = !this.showTimer;
		},
		getTime() {
			this.startTime = this.timeLogs[0].startTime.substring(0,19);

			var cur = Date.now();
			var old = new Date(this.startTime);
			var duration = cur - old;

			this.timeCounter = Math.floor(duration / 1000);
		},
		startTimer() {
			//console.log('TimebarStartTimer');
			if (this.login.timer_choice === "countup") {
				this.timer = setInterval(() => this.countup(), 1000);
			}
			else if (this.login.timer_choice === "countdown") {
				if (this.timeLogs[0]) {
					var end = new Date(this.timeLogs[0].endTime.substring(0,19))
					var cur = Date.now()
					this.timeCounter = Math.floor((end - cur )/ 1000)
				}
				else {
					var hours = Number(this.login.countdown_duration.substring(0, 2)) * 3600
					var minutes = Number(this.login.countdown_duration.substring(3, 5)) * 60
					this.timeCounter = hours + minutes
				}
				this.timer = setInterval(() => this.countdown(), 1000);
			}
			else if (this.login.timer_choice === "pomodoro") {
				//console.log('in production');
			}
		},
		stopTimer() {
			clearInterval(this.timer);
			this.timer = null;
		},
		resetTimer() {
			//console.log('resetTimer');
			this.timeCounter = 0;
			clearInterval(this.timer);
			this.timer = null;
		},
		padTime: function(time) {
			return (time < 10 ? '0' : '') + time;
		},
		countdown: function() {
			//console.log('Countdown');
			if (this.timeCounter > 0) {
				this.timeCounter--;
			} else {
				this.timeCounter = 0;
				this.resetTimer()
				var audio = new Audio("./alarm1.mp3")
				audio.play()
				this.$emit('parentCountdownDone')
			}
		},
		countup: function() {
			//console.log('countup');
			if (this.timeCounter <= 86400) {
				this.timeCounter++;
			} else{
				this.timeCounter = 0;
				this.overTime()
			}
		},
		overTime() {
			var tzoffset = (new Date()).getTimezoneOffset() * 60000;
			var tomorrow = new Date(new Date(this.timeLogs[0].startTime.substring(0,19)) - tzoffset);
			tomorrow.setDate(tomorrow.getDate()+1);
			var tomorrowISO = tomorrow.toISOString().substring(0,19)
			
			var duration = 23 + ":" + 59 + ":" + 59;
			var isActive = false

			this.updateTimeLog({ id: this.timeLogs[0].id, endTime: tomorrowISO, duration: duration, active: isActive });
			this.resetTimer();
		},
		parentDisableTimer() {
			this.$emit('parentDisableTimer');
		},
		parentSwitchFileSet(item) {
			var i, j;
			for (i = 0; i < this.title_path.length; i++) {
				if (this.title_path[i] === item) {
					j = i;
				}
			}
			this.$emit('parentSwitchFileSet', this.id_path[j]);
		},
		...mapActions('timeLogs', [
		'addTimeLog',
		'updateTimeLog',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
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
			this.$store.dispatch('timeLogs/getActiveTimeLogs')
				.then(() => {
					//console.log(this.timeLogs.length);
					if (this.timeLogs.length > 0) {
						this.resetTimer()

						this.getTime();
						this.startTimer();
					}
				})
			})
	},
	destroyed() {
		this.resetTimer();
	}
};
</script>
