<template>
	<v-container>
	<div class="d-none d-sm-block">
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				
			<template v-if="titlePath.length > 0" >
				<template v-for="(item, index) in titlePath" 
				>
					<v-card	outlined tile
						color="grey lighten-4"
						style="height:40px;"
						:key="item.id"
						@click="parentSwitchFileSet(item)">
						<v-card-text class="pt-2"> 
							<p class="body-1 text--primary">
								{{ item }}
							</p>
						</v-card-text>
					</v-card>
					<template v-if="index != titlePath.length - 1">
						-
					</template>
					<template v-else>
						<v-toolbar-title :key="item.id">
							{{ "-" }}
							{{ curTitle }}
						</v-toolbar-title>
					</template>
				</template>
			</template>
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
				<span style="padding-right:25px;" v-if="pomodoroShortBreakRunning">
				{{ '(Short Break)' }}
				</span>
				<span style="padding-right:25px;" v-if="pomodoroLongBreakRunning">
				{{ '(Long Break)' }}
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
	</div>

	<div class="d-sm-none">
		<v-app-bar app color="green lighten-4">
			<v-btn dark color="green darken-4"
				icon
				style="margin-top:0px;"
				type="submit"
				@click="parentExpandSideNav()"
				><v-icon>dehaze</v-icon>
			</v-btn>
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				
			<template v-if="titlePath.length > 0" >
				<template v-for="(item, index) in titlePath" 
				>
					<v-card	outlined tile
						color="grey lighten-4"
						style="height:40px;"
						:key="item.id"
						@click="parentSwitchFileSet(item)">
						<v-card-text class="pt-2"> 
							<p class="body-1 text--primary">
								{{ item }}
							</p>
						</v-card-text>
					</v-card>
					<template v-if="index != titlePath.length - 1">
						-
					</template>
					<template v-else>
						<v-toolbar-title :key="item.id">
							{{ "-" }}
							{{ curTitle }}
						</v-toolbar-title>
					</template>
				</template>
			</template>
			<template v-slot:extension v-if="timeLogs.length > 0">
			<v-spacer/>
			<v-toolbar-title>
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
				<span style="padding-right:25px;" v-if="pomodoroShortBreakRunning">
				{{ '(Short Break)' }}
				</span>
				<span style="padding-right:25px;" v-if="pomodoroLongBreakRunning">
				{{ '(Long Break)' }}
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
		</template>
		</v-app-bar>
	</div>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	props: [ 'idPath', 'titlePath', 'curTitle', 'timerActive',],
	data(){
		return {
			timer: null,
			timeCounter: 0,
			showTimer: true,

			startTime: null,

			pomodoroCounter: 0,
			pomodoroShortBreakRunning: false,
			pomodoroLongBreakRunning: false,

			pomodoroDuration: 0,
			pomodoroShortDuration: 0,
			pomodoroLongDuration: 0,
			pomodoroShortCount: 0,
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
		parentExpandSideNav() {
			this.$emit('parentExpandSideNav')
		},
		startTimer() {
			var cur = Date.now();
			if (this.login.timer_choice === "countup") {
				if (this.timeLogs.length > 0) {
					var old = new Date(this.timeLogs[0].start_time.substring(0,19));
					var duration = cur - old;

					this.timeCounter = Math.floor(duration / 1000);
				}
				this.timer = setInterval(() => this.countup(), 1000);
			}
			else if (this.login.timer_choice === "countdown") {
				if (this.timeLogs[0]) {
					var end = new Date(this.timeLogs[0].end_time.substring(0,19))
					this.timeCounter = Math.floor((end - cur )/ 1000)
				}
				else {
					var hoursCountdown = Number(this.login.countdown_duration.substring(0, 2)) * 3600
					var minutesCountdown = Number(this.login.countdown_duration.substring(3, 5)) * 60
					this.timeCounter = hoursCountdown + minutesCountdown
				}
				this.timer = setInterval(() => this.countdown(), 1000);
			}
			else if (this.login.timer_choice === "pomodoro") {
				var hoursPomodoro = Number(this.login.pomodoro_duration.substring(0, 2)) * 3600
				var minutesPomodoro = Number(this.login.pomodoro_duration.substring(3, 5)) * 60
				this.pomodoroDuration = hoursPomodoro + minutesPomodoro

				this.pomodoroShortDuration = Number(this.login.pomodoro_short_break_duration.substring(3, 5)) * 60

				this.pomodoroLongDuration = Number(this.login.pomodoro_long_break_duration.substring(3, 5)) * 60
				
				this.pomodoroShortCount = Number(this.login.pomodoro_short_break_count)

				if (this.timeLogs[0]) {
					// Loop through pomodoro timers until you hit the current timer
					var start = new Date(this.timeLogs[0].start_time.substring(0,19))
					var timeLeft = Math.floor((cur - start )/ 1000)
					timeLeft = timeLeft % (this.pomodoroLongDuration + (this.pomodoroDuration * this.pomodoroShortCount) + (this.pomodoroShortDuration * (this.pomodoroShortCount - 1)));
					var previousTime = timeLeft;
					for (var i = 0; i < this.pomodoroShortCount; i++) {
						timeLeft -= this.pomodoroDuration;
						this.pomodoroCounter ++;
						if (timeLeft <= 0) {
							this.timeCounter = this.pomodoroDuration - previousTime
							this.pomodoroShortBreakRunning = false
							this.pomodoroLongBreakRunning = false
							break;
						}
						else {
							previousTime = timeLeft
						}
						if (i === (this.pomodoroShortCount - 1)) {
							this.timeCounter = this.pomodoroLongDuration - previousTime
							this.pomodoroLongBreakRunning = true
							this.pomodoroShortBreakRunning = false
							this.pomodoroCounter = 0
							break;
						}
						timeLeft -= this.pomodoroShortDuration
						if (timeLeft <= 0) {
							this.timeCounter = this.pomodoroShortDuration - previousTime
							this.pomodoroShortBreakRunning = true
							this.pomodoroLongBreakRunning = false
							break;
						}
						else {
							previousTime = timeLeft
						}
					}
				}
				else {
					this.timeCounter = this.pomodoroDuration
					this.pomodoroShortBreakRunning = false
					this.pomodoroLongBreakRunning = false
					this.pomodoroCounter = 1
				}
				this.timer = setInterval(() => this.countdown(), 1000);
			}
		},
		stopTimer() {
			clearInterval(this.timer);
			this.timer = null;
		},
		resetTimer() {
			this.timeCounter = 0;
			clearInterval(this.timer);
			this.timer = null;
		},
		padTime: function(time) {
			return (time < 10 ? '0' : '') + time;
		},
		countdown: function() {
			if (this.timeCounter > 0) {
				this.timeCounter--;
			} else {
				this.timeCounter = 0;
				this.resetTimer()
				var audio = new Audio("./alarm1.mp3")
				audio.play()
				if (this.login.timer_choice === "countdown") {
					this.$emit('parentCountdownDone')
				}
				else if (this.login.timer_choice === "pomodoro") {
					this.pomodoroDone()
				}
			}
		},
		countup: function() {
			if (this.timeCounter <= 86400) {
				this.timeCounter++;
			} else{
				this.timeCounter = 0;
				this.overTime()
			}
		},
		overTime() {
			var tzoffset = (new Date()).getTimezoneOffset() * 60000;
			var tomorrow = new Date(new Date(this.timeLogs[0].start_time.substring(0,19)) - tzoffset);
			tomorrow.setDate(tomorrow.getDate()+1);
			var tomorrowISO = tomorrow.toISOString().substring(0,19)
			
			var duration = 23 + ":" + 59 + ":" + 59;
			var isActive = false

			this.updateTimeLog({ id: this.timeLogs[0].id, end_time: tomorrowISO, duration: duration, active: isActive });
			this.resetTimer();
		},
		parentDisableTimer() {
			this.$emit('parentDisableTimer');
		},
		parentSwitchFileSet(item) {
			var i, j;
			for (i = 0; i < this.titlePath.length; i++) {
				if (this.titlePath[i] === item) {
					j = i;
				}
			}
			this.$emit('parentSwitchFileSet', this.idPath[j]);
		},
		pomodoroDone() {
			this.resetTimer();
			if (this.pomodoroCounter === 0) {
				this.timeCounter = this.pomodoroDuration
				this.pomodoroShortBreakRunning = false
				this.pomodoroLongBreakRunning = false
				this.pomodoroCounter ++;
			}
			else if (this.pomodoroCounter < this.login.pomodoro_short_break_count) {
				if (this.pomodoroShortBreakRunning || this.pomodoroLongBreakRunning) {
					this.timeCounter = this.pomodoroDuration
					this.pomodoroShortBreakRunning = false
					this.pomodoroLongBreakRunning = false
					this.pomodoroCounter ++;
				}
				else {
					this.pomodoroShortBreakRunning = true
					this.pomodoroLongBreakRunning = false
					this.timeCounter = this.pomodoroShortDuration
				}
			}
			else if (this.pomodoroCounter === this.login.pomodoro_short_break_count) {
				this.pomodoroLongBreakRunning = true
				this.pomodoroShortBreakRunning = false
				this.timeCounter = this.pomodoroLongDuration
				this.pomodoroCounter = 0;
			}
			this.timer = setInterval(() => this.countdown(), 1000);
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
					if (this.timeLogs.length > 0) {
						this.resetTimer()

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
