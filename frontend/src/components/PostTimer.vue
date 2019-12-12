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
							type="submit"
							@click="
							parentTimerPressed();"
						>Cancel</v-btn>
						<v-btn
							color="green darken-4"
							dark tile
							type="submit"
							@click="
							parentTimerPressed();
							parentStopTimer();
							getTime();
							updateTimeLog({ id:timerId, afterNote:afterNote, nextNote:nextNote, endTime: currentTime,  active: isActive });"
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
	props: ['timerId'],
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
