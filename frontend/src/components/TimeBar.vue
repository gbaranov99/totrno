<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				<template v-for="item in title_path" v-if="title_path.length > 0">
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
					<template v-if="item != title_path[title_path.length - 1]">
						-
					</template>
					<template v-else>
						<v-toolbar-title>
							{{ "-" }}
							{{ curTitle }}
						</v-toolbar-title>
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
				</span>
			</v-toolbar-title>
			<!--
				<template v-for="item in timeLogs" >
					<v-card	outlined tile
						color="grey lighten-4"
						style="height:40px;"
						@click="parentDisableTimer(item)"
						>
						<v-card-text class="pt-2"> 
							<p class="body-1 text/-/-primary">
								{{ item.file_name }}
								{{ '' }}
								{{ minutes }}
								{{ seconds }}
							</p>
						</v-card-text>
					</v-card>
				</template>
			-->
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
			countDownTime: (25 * 60),
			countUpTime: 0,
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
		hours: function() {
			const hours = Math.floor(this.countUpTime / 3600);
			return this.padTime(hours);
		},
		minutes: function() {
			const minutes = Math.floor((this.countUpTime - (this.hours * 3600))/60);
			return this.padTime(minutes);
		},
		seconds: function() {
			const seconds = this.countUpTime - (this.hours * 3600) - (this.minutes * 60);
			return this.padTime(seconds);
		}
	},
	methods: {
		changeTimerVisibility() {
			this.showTimer = !this.showTimer;
		},
		startTimer() {
			//console.log('TimebarStartTimer');
			this.timer = setInterval(() => this.countup(), 1000);
		},
		stopTimer() {
			clearInterval(this.timer);
			this.timer = null;
		},
		resetTimer() {
			//console.log('resetTimer');
			this.countDownTime = (25 * 60);
			this.countUpTime = 0;
			clearInterval(this.timer);
			this.timer = null;
		},
		padTime: function(time) {
			return (time < 10 ? '0' : '') + time;
		},
		countdown: function() {
			//console.log('Countdown');
			if(this.countDownTime >= 1){
				this.countDownTime--;
			} else{
				this.countDownTime = 0;
				this.resetTimer()
			}
		},
		countup: function() {
			//console.log('countup');
			if(this.countUpTime <= 86400){
				this.countUpTime++;
			} else{
				this.countUpTime = 0;
				this.overTime()
			}
		},
		getTime() {
			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			//this.curHours = today.getHours() - this.startHours;
			//this.curMinutes = today.getMinutes() - this.startMinutes;
			//this.curSeconds = today.getSeconds() - this.startSeconds;
			//this.countUpTime = this.curSeconds + 60 * this.curMinutes + 60 * 60 * this.curHours;

			//var today = new Date();

			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			//var currentTime = date+' '+time;

			this.startTime = this.timeLogs[0].startTime.substring(0,19);

			var cur = Date.now();
			var old = new Date(this.startTime);
			var duration = cur - old;

			this.countUpTime = Math.floor(duration / 1000);
			//console.log(this.countUpTime)
			//duration = (duration - ms) / 1000;
			//var secs = duration % 60;
			//duration = (duration - secs) / 60;
			//var mins = duration % 60;
			//var hrs = (duration - mins) / 60;
			
			//var stringDuration = hrs + ':' + mins + ':' + secs;
			//this.runTime = date+' '+time;
		},
		overTime() {
			var tzoffset = (new Date()).getTimezoneOffset() * 60000;
			var tomorrow = new Date(new Date(this.timeLogs[0].startTime.substring(0,19)) - tzoffset);
			tomorrow.setDate(tomorrow.getDate()+1);
			var tomorrowISO = tomorrow.toISOString().substring(0,19)
			
			var duration = 23 + ":" + 59 + ":" + 59;
			var isActive = false

			//console.log(this.timeLogs[0].startTime.substring(0,19))
			//console.log(today.toISOString());
			//console.log(tomorrowISO);
			//console.log(duration);

			this.updateTimeLog({ id: this.timeLogs[0].id, endTime: tomorrowISO, duration: duration, active: isActive });
			this.resetTimer();
		},
		parentDisableTimer() {
			//console.log(item)
			//item.active = false;
			//this.updateTimeLog(item);

			//this.resetTimer();
			if (this.timeLogs.length > 0) {
				var item = this.timeLogs[0]
				this.$emit('parentDisableTimer', item.id, item.startTime);
			}
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
	},
	created() {
		//console.log('wow');
		this.$store.dispatch('timeLogs/getActiveTimeLogs')
			.then(() => {
				//console.log(this.timeLogs.length);
				if (this.timeLogs.length > 0) {
					this.resetTimer()

					this.getTime();
					this.startTimer();

					//this.startHours = Number(this.timeLogs[0].startTime.substring(11, 13));
					//this.startMinutes = Number(this.timeLogs[0].startTime.substring(14, 16));
					//this.startSeconds = Number(this.timeLogs[0].startTime.substring(17, 19));
					/*
					if (this.curHours > 23) {
						//this.curHours = this.startHours;
						//this.curMinutes = this.startMinutes;
						//this.curSeconds = this.startSeconds;

						//var startDate = this.timeLogs[0].startTime;
						var tomorrow = new Date();
						tomorrow.setDate(new Date(this.startTime)+1);
						console.log(tomorrow);
						
						var duration = 24 + ":" + 0 + ":" + 0;
						var isActive = false

						this.updateTimeLog({ id: this.timeLogs[0].id, endTime: tomorrow, duration: duration, active: isActive });
					}
					else {
					*/
				}
			//console.log(this.startHours)
			//console.log(this.startMinutes)
			//console.log(this.startSeconds)
			})
	},
	destroyed() {
		//console.log('esketit');
		this.resetTimer();
	}
};


</script>
