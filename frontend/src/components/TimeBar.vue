<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				<template v-for="item in title_path" v-if="title.path.length > 0">
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
				{{ minutes }}
				<span style="padding-right:25px;">
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
					@click='parentDisableTimer(item)'
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

			runTime: null,
			startHours: null,
			startMinutes: null,
			startSeconds: null,
			curHours: null,
			curMinutes: null,
			curSeconds: null,
		}
	},
	computed: {
		...mapState({
			timeLogs: state => state.timeLogs.timeLogs,
		}),
		...mapState({
			files: state => state.files.files
		}),
		minutes: function() {
			const minutes = Math.floor(this.countUpTime / 60);
			return this.padTime(minutes);
		},
		seconds: function() {
			const seconds = this.countUpTime - (this.minutes * 60);
			return this.padTime(seconds);
		}
	},
	methods: {
		changeTimerVisibility() {
			this.showTimer = !this.showTimer;
		},
		startTimer() {
			console.log('TimebarStartTimer');
			this.timer = setInterval(() => this.countup(), 1000);
		},
		stopTimer() {
			clearInterval(this.timer);
			this.timer = null;
		},
		resetTimer() {
			console.log('resetTimer');
			this.countDownTime = (25 * 60);
			this.countUpTime = 0;
			clearInterval(this.timer);
			this.timer = null;
		},
		padTime: function(time) {
			return (time < 10 ? '0' : '') + time;
		},
		countdown: function() {
			console.log('Countdown');
			if(this.countDownTime >= 1){
				this.countDownTime--;
			} else{
				this.countDownTime = 0;
				this.resetTimer()
			}
		},
		countup: function() {
			console.log('countup');
			if(this.countUpTime <= 10000){
				this.countUpTime++;
			} else{
				this.countUpTime = 0;
				this.resetTimer()
			}
		},
		getTime() {
			var today = new Date();
			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			this.curHours = today.getHours() - this.startHours;
			this.curMinutes = today.getMinutes() - this.startMinutes;
			this.curSeconds = today.getSeconds() - this.startSeconds;
			this.countUpTime = this.curSeconds + 60 * this.curMinutes + 60 * 60 * this.curHours;
			//this.runTime = date+' '+time;
		},
		parentDisableTimer() {
			//console.log(item)
			//item.active = false;
			//this.updateTimeLog(item);

			//this.resetTimer();
			if (this.timeLogs.length > 0) {
				var item = this.timeLogs[0]
				this.$emit('parentDisableTimer', item.id);
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
					this.startHours = Number(this.timeLogs[0].startTime.substring(11, 13));
					this.startMinutes = Number(this.timeLogs[0].startTime.substring(14, 16));
					this.startSeconds = Number(this.timeLogs[0].startTime.substring(17, 19));
					this.getTime();
					this.startTimer();
				}
			//console.log(this.startHours)
			//console.log(this.startMinutes)
			//console.log(this.startSeconds)
			})
	}
};
</script>
