<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title>
				Running timers:
			</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	data(){
		return {
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
		//toggleChildren() {
		//	this.showChildren = !this.showChildren;
		//},
		//timerPressed() {
		//	this.showTimerForm = !this.showTimerForm;
		//},
		...mapActions('timeLogs', [
		'addTimeLog',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
	},
};
</script>
