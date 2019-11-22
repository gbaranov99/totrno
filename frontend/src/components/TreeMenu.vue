<template>
	<v-container
	class="pt-0 pr-0 pb-0"
	fluid
	>
		<PreTimer
		pa-0
		:parent=id
		@parentTimerPressed="timerPressed"
		v-if="showTimerForm"
		fluid
		></PreTimer>
		<v-row no-gutters xs12>
			<v-btn
				v-if="file_set.length !== 0 && showChildren"
				color="green darken-4"
				@click="toggleChildren"
				icon dark>
				<v-icon>expand_less</v-icon>
			</v-btn>
			<v-btn
				v-else-if="file_set.length !== 0"
				color="green darken-4"
				@click="toggleChildren"
				icon dark>
				<v-icon>expand_more</v-icon>
			</v-btn>
			<v-btn
				disabled
				v-else
				icon dark>
				<v-icon>expand_more</v-icon>
			</v-btn>
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ id }}: {{ title }}
				</v-card>
			</v-col>
			<p> {{ path }} </p>
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ content }}
				</v-card>
			</v-col>
			<v-btn
				color="green darken-4"
				icon dark
				@click="timerPressed"
				><v-icon>timer</v-icon>
			</v-btn>
			<v-btn
				color="green darken-4"
				icon dark
				type="submit"
				@click="addTimeLog({})"
				><v-icon>tag</v-icon>
			</v-btn>
			<v-btn
				color="green darken-4"
				icon dark
				><v-icon>calendar_today</v-icon>
			</v-btn>
			<v-btn
				color="green darken-4"
				type="submit"
				icon dark
				@click="deleteFile(id)"
				><v-icon>delete</v-icon>
			</v-btn>
		</v-row>
		<tree-menu
			v-if="showChildren"
			v-bind:key="file"
			v-for="file in file_set"
				:file_set="file.file_set"
				:title="file.title"
				:content="file.content"
				:id="file.id"
				:depth="depth + 1"
			>
		</tree-menu>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PreTimer from './PreTimer'

export default {
	name: 'tree-menu',
	components: {
		'PreTimer': PreTimer,
	},
	props: [ 'title', 'file_set', 'content', 'id', 'depth'],
	data() {
		return {
			showChildren: false,
			showTimerForm: false,
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
		timerPressed() {
			this.showTimerForm = !this.showTimerForm;
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
