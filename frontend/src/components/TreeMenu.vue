<template>
	<v-container
	class="pt-0 pr-0 pb-0"
	fluid
	>
		<draggable 
		:list="fileSet" 
		handle=".handle" 
		@change="onChange"
		:group="{ name:'g1'}">	
			<template v-for="file in fileSet">
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
							</v-row>
						</v-form>
						<v-row no-gutters xs12>
							<tree-menu
								v-if="file.closed"
								@parentToggleContent="parentToggleContent"
								@parentChangeFileSet="parentChangeFileSet"
								:fileSet="file.file_set"
								:parentFile="file.id"
								:parentTitle="file.title"
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
import draggable from 'vuedraggable'

export default {
	name: 'tree-menu',
	components: {
		draggable
	},
	props: [ 'fileSet', 'parentFile', 'parentTitle',],
	data() {
		return {
			parent: null,
			showChildren: false,
			showTimerForm: false,
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
		onRightClick() {
		},
		parentToggleContent(file) {
			this.$emit('parentToggleContent', file);
		},
		removeFile(file) {
			this.deleteFile(file);
			this.fileSet = this.fileSet.filter(obj => obj.id !== file.id)
		},
		parentChangeFileSet(file, pathId, pathTitle) {
			if ( (this.parentFile === null) && (typeof pathId !== 'object')) {
				pathId = ['root',]
				pathTitle = ['root',]
			}
			else if (typeof pathId === 'number') {
				pathId = [ this.parentFile ]
				pathTitle = [this.parentTitle]
			}
			else {
				if (this.parentFile === null) {
					pathId.unshift('root')
					pathTitle.unshift('root')
				}
				else {
					pathId.unshift(this.parentFile);
					pathTitle.unshift(this.parentTitle);
				}
			}
			this.$emit('parentChangeFileSet', file, pathId, pathTitle);
		},
		toggleChildren(file) {
			file.closed = !file.closed;
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
			if (evt.added) {
				if (this.parentFile !== evt.added.element.parent) {
					//console.log('wow')
					var newElement = evt.added.element;
					newElement.parent = this.parentFile;
					this.updateFile(newElement);
				}
			}
		}
	}
}
</script>
