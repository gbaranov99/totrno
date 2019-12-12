<template>
	<v-container
	class="pt-0 pr-0 pb-0"
	fluid
	>
		<PreTimer
		pa-0
		:associated_file=associated_file
		:file_name=file_name
		@parentTimerPressed="timerPressed"
		@parentStartPressed="startPressed"
		v-if="showTimerForm"
		fluid
		></PreTimer>
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
										@click.left="parentToggleContent(file);"
										@click.right="parentChangeFileSet(file, file.id, file.title)"
										@contextmenu.prevent="onRightClick"
										>
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
									@click="timerPressed(file.id, file.title)"
									><v-icon>timer</v-icon>
								</v-btn>
								<!--
								<v-btn
									color="green darken-4"
									icon dark
									@click="parentChangeFileSet(file, file.id, file.title)"
									><v-icon>open_in_new</v-icon>
								</v-btn>
								-->
								<v-btn
									color="green darken-4"
									icon dark
									@click="removeFile(file)"
									><v-icon>delete</v-icon>
								</v-btn>
								{{ file.id }}
							</v-row>
						</v-form>
						<v-row no-gutters xs12>
							<tree-menu
								v-if="file.closed"
								@parentToggleContent="parentToggleContent"
								@parentChangeFileSet="parentChangeFileSet"
								@parentStartTimer="parentStartTimer"
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
			associated_file: null,
			file_name: "",
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
		timerPressed(id, name) {
			this.associated_file = id;
			this.file_name = name;
			this.showTimerForm = !this.showTimerForm;
		},
		startPressed() {
			console.log('wow');
			this.$emit('parentStartTimer');
		},
		parentStartTimer() {
			console.log('wowzers');
			this.$emit('parentStartTimer');
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
				this.updateFile(newElement);


			}
		}
	}
}
</script>
