<template>
	<v-container>
		<v-dialog v-model="showTimerForm" persistent max-width="500px" v-if= "login.timer_choice !== 'interval'">
			<v-form>
				<v-card>
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
						Enter a pre-timer note:
					</v-card-title>
					<v-card-text>
						<v-text-field
						class="text--primary"
						label="Pre-timer note"
						color="green darken-4"
						v-model="beforeNote"
						>
						</v-text-field>
					</v-card-text>
						<v-row v-if="timerErrorMessage !== ''"
							style="padding-top: 20px;"
						>
							<v-spacer> </v-spacer>
							<v-btn dark color="green darken-4"
								style="margin-top: 15px;"
								type="submit"
								small
								text
								@click="timerErrorMessage = ''"
								><v-icon>close</v-icon>
							</v-btn>
							<h1 class="body-1" style="text-align:end;padding-top:15px;padding-right:30px;">
								{{ timerErrorMessage }}
							</h1>
						</v-row>
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
							@click="regularStartPressed();"
						>Start Timer</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
		<v-dialog v-model="showTimerForm" persistent max-width="1000px" v-else>
			<v-form>
				<v-card>
						<v-card-title
							class="headline green lighten-4"
							primary-title
						>
						Enter pre, post and next timer notes, and time interval:
					</v-card-title>
					<v-card-text>
						<v-text-field
						class="text--primary"
						label="Pre-timer note"
						color="green darken-4"
						v-model="beforeNote"
						>
						</v-text-field>
						<v-text-field
						class="text--primary"
						label="Post-timer note"
						color="green darken-4"
						v-model="afterNote"
						>
						</v-text-field>
						<v-text-field
						class="text--primary"
						label="Next timer note"
						color="green darken-4"
						v-model="nextNote"
						>
						</v-text-field>
						<div class="d-none d-sm-block">
						<v-row>
							<v-col>
								<h1 class="headline" style="text-align:center;">
									{{ " Start time " }}
								</h1>
							</v-col>
							<v-col>
								<h1 class="headline" style="text-align:center;">
									{{ " End time " }}
								</h1>
							</v-col>
						</v-row>
						<v-row justify="space-around">
							<v-date-picker 
								v-model="startDate" 
								color="green darken-4"
							></v-date-picker>
							<v-date-picker 
								v-model="endDate" 
								color="green darken-4"
							></v-date-picker>
						</v-row>
						<v-row justify="space-around">
							<v-time-picker 
								v-model="startTime" 
								color="green darken-4"
							></v-time-picker>
							<v-time-picker 
								v-model="endTime" 
								color="green darken-4"
							></v-time-picker>
						</v-row>
						</div>
						<div class="d-sm-none">
						<v-row>
								<h1 class="headline" style="text-align:center;">
									{{ " Start time " }}
								</h1>
						</v-row>
						<v-row justify="space-around">
							<v-date-picker 
								v-model="startDate" 
								color="green darken-4"
							></v-date-picker>
						</v-row>
						<v-row justify="space-around">
							<v-time-picker 
								v-model="startTime" 
								color="green darken-4"
							></v-time-picker>
						</v-row>
						<v-row>
								<h1 class="headline" style="text-align:center;">
									{{ " End time " }}
								</h1>
						</v-row>
						<v-row justify="space-around">
								<v-date-picker 
									v-model="endDate" 
									color="green darken-4"
								></v-date-picker>
						</v-row>
						<v-row justify="space-around">
							<v-time-picker 
								v-model="endTime" 
								color="green darken-4"
							></v-time-picker>
						</v-row>
						</div>
					</v-card-text>
						<v-row v-if="errorMessage !== ''"
							style="padding-top: 20px;"
						>
							<v-spacer> </v-spacer>
							<v-btn dark color="green darken-4"
								style="margin-top: 15px;"
								type="submit"
								small
								text
								@click="errorMessage = ''"
								><v-icon>close</v-icon>
							</v-btn>
							<h1 class="headline" style="text-align:end;padding-top:10px;padding-right:30px;">
								{{ errorMessage }}
							</h1>
						</v-row>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-4"
							text
							@click="parentTimerPressed();"
						>Cancel</v-btn>
						<v-btn
							color="green darken-4"
							text
							type="submit"
							@click="intervalStartPressed"
						>Save Time Log</v-btn>
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
	props: [ 'associated_file', 'file_name'],
	data() {
		return {
			showChildren: false,
			showTimerForm: true,
			currentTime: '',
			beforeNote: '',
			afterNote: '',
			nextNote: '',
			startTime: null,
			endTime: null,
			startDate: null,
			endDate: null,
			isActive: true,
			
			errorMessage: '',
			timerErrorMessage: '',
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
	},
	methods: {
		regularStartPressed() {
			if (this.timeLogs.length > 0) {
				this.timerErrorMessage = "Please stop the current timer before starting a new one."
			}
			else {
				this.getTime();
				this.parentTimerPressed();
				this.parentStartPressed();
				if (this.login.timer_choice === 'countdown') {
					var tzoffset = (new Date()).getTimezoneOffset() * 60000;
					var endTime = new Date(new Date(this.currentTime) - tzoffset);

					var hours = Number(this.login.countdown_duration.substring(0, 2))
					var minutes = Number(this.login.countdown_duration.substring(3, 5))
					endTime.setMinutes(endTime.getMinutes() + minutes);
					endTime.setHours(endTime.getHours() + hours);
					var endTimeISO = endTime.toISOString().substring(0,19)

					this.addTimeLog({before_note: this.beforeNote, start_time: this.currentTime, end_time: endTimeISO, duration: this.login.countdown_duration, associated_file: this.associated_file, active: true, file_name: this.file_name})
				}
				else {
					this.addTimeLog({before_note: this.beforeNote, start_time: this.currentTime, end_time: this.currentTime, associated_file: this.associated_file, active: this.isActive, file_name: this.file_name})
				}
			}
		},
		intervalStartPressed() {
			var duration = '23:59:59';
			var startTime = this.startDate + ' ' + this.startTime + ':00'
			var endTime = this.endDate + ' ' + this.endTime + ':00'

			var startDate = new Date(startTime);
			var endDate = new Date(endTime);

			//console.log(startDate)
			//console.log(endDate)

			if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
				//console.log('date1')
				this.errorMessage = "Please enter a valid start and end date and time"
			}
			else if (startDate > endDate) {
				this.errorMessage = "The end date/time cannot be before the start date/time"
			}
			else {
				var yesterday = new Date(startDate);
				yesterday.setDate(yesterday.getDate()-1);
				if (yesterday < startDate) {
					var newDuration = endDate - startDate
					newDuration /= 60000
					// Less than 24 hours between start and end times
					//console.log(newDuration)
					if (newDuration < 1440) {
						var hours = Math.floor(newDuration / 60)
						var minutes = newDuration % 60
						duration = hours + ':' + minutes + ':00'
					}
					//console.log(duration)
				}
				this.parentTimerPressed();
				this.addTimeLog({before_note: this.beforeNote, after_note: this.afterNote, next_note: this.nextNote, start_time: startTime, end_time: endTime, duration: duration, associated_file: this.associated_file, active: false, file_name: this.file_name});
			}
		},
		parentTimerPressed() {
			this.$emit('parentTimerPressed');
		},
		parentStartPressed() {
			this.$emit('parentStartPressed');
		},
		getTime() {
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			this.currentTime = date+' '+time;
		},
		...mapActions('timeLogs', [
		'addTimeLog',
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
	},
}
</script>
