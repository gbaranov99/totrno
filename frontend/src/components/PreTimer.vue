<template>
	<v-container>
		<v-dialog v-model="showTimerForm" persistent max-width="500px" >
			<v-form>
				<v-card>
					<v-card-title>
						<span class="headline">Enter a pre-timer note:</span>
					</v-card-title>
					<v-card-text>
						<v-text-field
						class="text--primary"
						name="beforeNote"
						id="beforeNote"
						color="green darken-4"
						v-model="beforeNote"
						required
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
							getTime();
							addTimeLog({beforeNote: beforeNote, startTime: currentTime, endTime: currentTime, associated_file: parent});"
						>Start Timer</v-btn>
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
	props: [ 'parent' ],
	data() {
		return {
			showChildren: false,
			showTimerForm: true,
			currentTime: '',
		}
	},
	computed: {
		//indent() {
		//	return { transform: `padding-left:(${this.depth * 100})px` }
		//},
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
	},
	//created() {
	//	this.path.push(this.id)
	//	//this.path = ["asdf", "wow"]
	//}
}
</script>
