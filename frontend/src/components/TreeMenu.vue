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
		:list="file_set" 
		handle=".handle" 
		@change="onChange"
		:group="{ name:'g1'}">	
		<!--
			<template v-if="file_set.length === 0" >
				<v-container
				class="pt-0 pb-0">
				<v-card outlined tile
					style="height:38px;">
					<v-text-field 
						background-color="green lighten-3"
						solo
						readonly
						value="Drag here to create a subfile.">
					</v-text-field>
				</v-card>
				</v-container>
			</template>

		<template v-for="file in file_set" v-else-if="true">
		-->
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
						retain-focus-on-clicked
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
					style="height:50px;"
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
			{{ file.id }}
			{{ ":" }}
			{{ parent_file }}
			{{ ":" }}
			{{ file.parent }}
			<v-btn
				color="green darken-4"
				icon dark
				type="submit"
				@click="updateFile({ title: file.title, content: file.content, parent: file.parent, id: file.id })"
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
				@click="deleteFile(file.id)"
				><v-icon>delete</v-icon>
			</v-btn>
		</v-row>
		</v-form>
		<v-row no-gutters xs12>
		<tree-menu
			v-if="file.closed"
			:file_set="file.file_set"
			:parent_file="file.id"
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
	props: [ 'file_set', 'parent_file' ],
	data() {
		return {
			parent: null,
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
		/*
		checkMove(evt) {
			console.log("first");
			console.log(evt.draggedContext.element.parent);
			console.log("second");
			console.log(evt.draggedContext.futureIndex);
			console.log("third");
			console.log(this.parent_file);
			if (this.parent_file !== evt.draggedContext.element.parent) {
				evt.draggedContext.element.parent = this.parent_file;
			}
		},
		*/
		onChange(evt) {
			console.log("wow");
			console.log(evt.added.element.parent);
			console.log(this.parent_file);
			if (this.parent_file !== evt.added.element.parent) {
				console.log("asdf");
				evt.added.element.parent = this.parent_file;
			}
		}
	}
}


/*

		:move="checkMove"
			var i;
			var done = false;
			var curFile;
			console.log(evt.draggedContext.element.parent);
			for (i = 0; i < this.file_set.length; i++) {
				curFile = this.file_set[i];
				console.log("wow");
				if (curFile.parent !== this.parent_file) {
					console.log("yay");
					curFile.parent = this.parent_file;
					done = true;
				}
				if (done) {
					break;
				}
			}


				:path="path"
	props: [ 'title', 'file_set', 'content', 'id', 'depth', 'path', 'parent'],
			path: []
*/

</script>
