<template>
	<v-container>
		<v-dialog v-model="showTimerForm" persistent max-width="500px" >
			<v-form>
				<v-card>
					<v-card-title>
						<span class="headline">Enter a post-timer and next-timer note:</span>
					</v-card-title>
					<v-card-text>
						<v-text-field
						class="text--primary"
						name="afterNote"
						id="afterNote"
						color="green darken-4"
						v-model="afterNote"
						>
						</v-text-field>
					</v-card-text>
					<v-card-text>
						<v-text-field
						class="text--primary"
						name="nextNote"
						id="nextNote"
						color="green darken-4"
						v-model="nextNote"
						>
						</v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-4"
							dark tile
							@click="
							parentTimerPressed();"
						>Cancel</v-btn>
						<v-btn
							color="green darken-4"
							dark tile
							type="submit"
							@click="postUpdate()"
						>End Timer</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
	</v-container>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'PreTimer',
	props: ['timerId', 'startTime'],
	data() {
		return {
			showTimerForm: true,
			currentTime: '',
			afterNote: '',
			nextNote: '',
			isActive: false,
		}
	},
	computed: {
		...mapState({
			timeLogs: state => state.timeLogs.timeLogs,
		}),
		...mapState({
			files: state => state.files.files
		}),
	},
	methods: {
		postUpdate() {
			var today = new Date();
			var startHours = Number(this.timeLogs[0].startTime.substring(11, 13));
			var startMinutes = Number(this.timeLogs[0].startTime.substring(14, 16));
			var startSeconds = Number(this.timeLogs[0].startTime.substring(17, 19));

			//var totalHours = today.getHours() - startHours;
			//var totalMinutes = today.getMinutes() - startMinutes;
			//var totalSeconds = today.getSeconds() - startSeconds;

			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var currentTime = date+' '+time;
			var cur = new Date(currentTime);

			//console.log(cur);
			//console.log(cur.toISOString())

			//console.log(cur)
			//console.log(old)
			//console.log(duration);

			//Date(ms).toISOString()
			//var old = new Date(this.timeLogs[0].startTime);

			var old = new Date(this.timeLogs[0].startTime.substring(0,19));
			var duration = cur - old;

			var ms = duration % 1000;
			duration = (duration - ms) / 1000;
			var secs = duration % 60;
			duration = (duration - secs) / 60;
			var mins = duration % 60;
			var hrs = (duration - mins) / 60;
			
			var stringDuration = hrs + ':' + mins + ':' + secs;
			//console.log(stringDuration);

			this.parentTimerPressed();
			this.parentStopTimer();
			this.getTime();

			//console.log({ id: this.timerId, afterNote: this.afterNote, nextNote: this.nextNote, endTime: this.currentTime, duration: duration, active: false })
			this.updateTimeLog({ id: this.timerId, afterNote: this.afterNote, nextNote: this.nextNote, endTime: this.currentTime, duration: stringDuration, active: false });
		},
		toggleChildren() {
			this.showChildren = !this.showChildren;
		},
		parentTimerPressed() {
			this.$emit('parentTimerPressed');
		},
		parentStopTimer() {
			this.$emit('parentStopTimer');
		},
		getTime() {
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			this.currentTime = date+' '+time;
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
}
</script>
