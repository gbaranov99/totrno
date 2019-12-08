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
		@click="oneClick($event)"
		-->
		<draggable 
		:list="file_set" 
		handle=".handle" 
		@change="onChange"
		:group="{ name:'g1'}">	
			<template v-for="file in file_set">
				<span :key="file.id">
					<v-container 
					class="pt-0 pr-0 pb-0"
					fluid
					no-gutters xs12>
						<v-form>
							<v-row no-gutters xs12>
								<v-btn
									v-if="file.file_set.length !== 0 && !file.closed"
									color="green darken-4"
									@click="toggleChildren(file);updateFile({ title: file.title, content: file.content, parent: file.parent, id: file.id, closed: file.closed});"
									icon dark>
									<v-icon>expand_less</v-icon>
								</v-btn>
								<v-btn
									v-else-if="file.file_set.length !== 0"
									color="green darken-4"
									@click="toggleChildren(file);updateFile({ title: file.title, content: file.content, parent: file.parent, id: file.id, closed: file.closed});"
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
								<v-col>
									<v-card class="pa-0 ma-0" outlined tile
										style="height:40px;"
										@click="parentToggleContent(file);">
										<v-card-text class="pt-2"> 
											<p class="body-1 text--primary">
												{{ file.title }} 
											</p>
										</v-card-text>
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
									@click="parentChangeFileSet(file, file.id, file.title)"
									><v-icon>open_in_new</v-icon>
								</v-btn>
								<v-btn
									color="green darken-4"
									icon dark
									@click="removeFile(file)"
									><v-icon>delete</v-icon>
								</v-btn>
							</v-row>
						</v-form>
						<v-row no-gutters xs12>
							<tree-menu
								v-if="file.closed"
								@parentToggleContent="parentToggleContent"
								@parentChangeFileSet="parentChangeFileSet"
								:file_set="file.file_set"
								:parent_file="file.id"
								:parent_title="file.title"
								>
							</tree-menu>
						</v-row>
					</v-container>
				</span>
			</template>
		</draggable>
	</v-container>
</template>

<script>
/*
								{{ file.id }}
								:parent_path="add_path(file.id)"
	props: [ 'file_set', 'parent_file', 'parent_path' ],

*/
import { mapState, mapActions } from 'vuex'
import PreTimer from './PreTimer'
import draggable from 'vuedraggable'

export default {
	name: 'tree-menu',
	components: {
		'PreTimer': PreTimer,
		draggable
	},
	props: [ 'file_set', 'parent_file', 'parent_title',],
	data() {
		return {
			parent: null,
			showChildren: false,
			showTimerForm: false,
			
			//delay:500,
			//clicks: 0,
			//timer: null
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
	/*
		add_path(item) {
			var newPath = JSON.parse(JSON.stringify(this.parent_path))
			newPath.push(item)
			return newPath
		},
		*/
		parentToggleContent(file) {
			this.$emit('parentToggleContent', file);
		},
		removeFile(file) {
			this.deleteFile(file);
			this.file_set = this.file_set.filter(obj => obj.id !== file.id)
		},
		parentChangeFileSet(file, path_id, path_title) {
			if ( (this.parent_file === null) && (typeof path_id !== 'object')) {
				path_id = ['root',]
				path_title = ['root',]
			}
			else if (typeof path_id === 'number') {
				path_id = [ this.parent_file ]
				path_title = [this.parent_title]
			}
			else {
				if (this.parent_file === null) {
					path_id.unshift('root')
					path_title.unshift('root')
				}
				else {
					path_id.unshift(this.parent_file);
					path_title.unshift(this.parent_title);
				}
			}
			this.$emit('parentChangeFileSet', file, path_id, path_title);
		},
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
		onChange(evt) {
			if (this.parent_file !== evt.added.element.parent) {
				var newElement = evt.added.element;
				newElement.parent = this.parent_file;
				//console.log(this.parent_path)
				//newElement.path_ids = JSON.parse(JSON.stringify(this.parent_path))
				//if (this.parent_file !== null) {
				//	newElement.path_ids.push(this.parent_file);
				//}
				//console.log(newElement)
				this.updateFile(newElement);


			}
		}
	}
}
</script>
