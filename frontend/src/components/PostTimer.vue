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
						label="Post-timer note"
						color="green darken-4"
						v-model="afterNote"
						>
						</v-text-field>
					</v-card-text>
					<v-card-text>
						<v-text-field
						class="text--primary"
						label="Next timer note"
						color="green darken-4"
						v-model="nextNote"
						>
						</v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-4"
							text
							@click="
							parentTimerPressed();"
						>Cancel</v-btn>
						<v-btn
							color="green darken-4"
							text
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
	props: ['isCountdown'],
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
			if (this.isCountdown) {
				this.updateTimeLog({ id: this.timeLogs[0].id, after_note: this.afterNote, next_note: this.nextNote, active: false });
				this.parentTimerPressed();
				this.parentStopTimer();
			}
			else {
				var cur = Date.now();

				var old = new Date(this.timeLogs[0].start_time.substring(0,19));
				var duration = cur - old;

				var ms = duration % 1000;
				duration = (duration - ms) / 1000;
				var secs = duration % 60;
				duration = (duration - secs) / 60;
				var mins = duration % 60;
				var hrs = (duration - mins) / 60;

				var stringDuration = hrs + ':' + mins + ':' + secs;

				this.parentTimerPressed();
				this.parentStopTimer();
				this.getTime();

				this.updateTimeLog({ id: this.timeLogs[0].id, after_note: this.afterNote, next_note: this.nextNote, end_time: this.currentTime, duration: stringDuration, active: false });
			}
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
			var tzoffset = (new Date()).getTimezoneOffset() * 60000;
			var cur = new Date(Date.now() - tzoffset);
			this.currentTime = cur.toISOString().substring(0,19);
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
