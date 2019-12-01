<template>
	<v-container
	class="pt-0 pr-0 pb-0"
	fluid
	>
		<!--
		<PreTimer
		pa-0
		:parent=id
		@parentTimerPressed="timerPressed"
		v-if="showTimerForm"
		fluid
		></PreTimer>
		-->
		<draggable 
		v-model="file_set" 
		:list="file_set" 
		handle=".handle" 
		:group="{ name:'g1'}">
		<template v-for="file in file_set">
				<v-container 
				class="pt-0 pr-0 pb-0"
				no-gutters xs12 >
		<v-form>
		<v-row no-gutters xs12>
			<v-btn
				v-if="file.file_set.length !== 0 && !file.closed"
				color="green darken-4"
				@click="toggleChildren(file)"
				icon dark>
				<v-icon>expand_less</v-icon>
			</v-btn>
			<v-btn
				v-else-if="file.file_set.length !== 0"
				color="green darken-4"
				@click="toggleChildren(file)"
				icon dark>
				<v-icon>expand_more</v-icon>
			</v-btn>
			<v-btn
				disabled
				v-else
				icon dark>
				<v-icon>expand_more</v-icon>
			</v-btn>
					<v-btn
						color="green darken-4"
						icon dark
						class="handle"
						type="submit"
						><v-icon>menu</v-icon>
					</v-btn>
			<!--
			<v-btn
				color="green darken-4"
				icon dark
				type="submit"
				><v-icon>menu</v-icon>
			</v-btn>
			style="padding-left:50px"
			-->
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="file.title"
					>
					</v-text-field>
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:50px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="file.content"
					>
					</v-text-field>
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:50px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="file.id"
					>
					</v-text-field>
				</v-card>
			</v-col>
			<v-btn
				color="green darken-4"
				icon dark
				type="submit"
				@click="updateFile({ title: title, content: content, parent:parent, id:id })"
				><v-icon>arrow_upward</v-icon>
			</v-btn>
			<!--
			<v-btn
				color="green darken-4"
				icon dark
				@click="timerPressed"
				><v-icon>timer</v-icon>
			</v-btn>
			<v-btn
				color="green darken-4"
				icon dark
				@click="addTimeLog({})"
				><v-icon>tag</v-icon>
			</v-btn>
			<v-btn
				color="green darken-4"
				icon dark
				><v-icon>calendar_today</v-icon>
			</v-btn>
			-->
			<v-btn
				color="green darken-4"
				icon dark
				@click="deleteFile(id)"
				><v-icon>delete</v-icon>
			</v-btn>
		</v-row>
		</v-form>
		<v-row no-gutters xs12>
		<tree-menu
			v-if="!file.closed"
			:file_set="file.file_set"
			>
		</tree-menu>
		<!--
		<tree-menu
			v-if="showChildren"
			v-bind:key="file"
			v-for="file in file_set"
				:file_set="file.file_set"
				:title="file.title"
				:content="file.content"
				:id="file.id"
				:parent="id"
				:depth="depth + 1"
			>
		</tree-menu>
		-->
		</v-row>
		</v-container>
		</template>
		</draggable>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PreTimer from './PreTimer'
import draggable from 'vuedraggable'

export default {
	name: 'tree-menu',
	components: {
		'PreTimer': PreTimer,
		draggable
	},
	//props: [ 'title', 'file_set', 'content', 'id', 'depth', 'parent'],
	props: [ 'file_set' ],
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
		toggleChildren(file) {
			file.closed = !file.closed;
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
		'deleteFile',
		'updateFile'
		]),
	},
}


/*
				:path="path"
	props: [ 'title', 'file_set', 'content', 'id', 'depth', 'path', 'parent'],
			path: []
	created() {
		this.path = Array.from(this.path)
		this.path.push(this.parent)
	}

*/
</script>
