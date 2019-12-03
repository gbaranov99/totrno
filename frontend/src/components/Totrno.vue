<template>
	<v-container fluid v-on:submit.prevent="onSubmit">
		<v-form>
			<v-row no-gutters>
			<br>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="title"
						label="File title"
						required
					>
					</v-text-field>
				</v-card>
			</v-col>
			<!--
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="content"
						label="File content"
						required
					>
					</v-text-field>
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="parent"
						label="Parent File"
						required
					>
					</v-text-field>
				</v-card>
			</v-col>
			-->
				<v-btn dark color="green darken-4"
					type="submit"
					tile
					@click="addFile({ title: title, content: '', parent: parent, closed: 'true'}); clearTitle();"
				>Add file</v-btn>
			</v-row>
		</v-form>
		<br>
		<!--
		<v-row no-gutters v-for="(file, index) in files" :key="index">
			<tree-menu 
				:title="file.title"
				:id="file.id"
				:content="file.content"
				:file_set="file.file_set"
				:depth="0"
				:parent="id"
			></tree-menu>
		</v-row>
		-->
		<v-container fluid v-if="content_open">
			<v-row no-gutters xs12>
				<v-col>
					<tree-menu 
						:file_set="files"
						:parent_file=null
						@parentToggleContent="toggleContent"
						fluid
					></tree-menu>
				</v-col>
				<v-col>
					<v-row no-gutters xs12 class="justify-end align-end">
						<v-col>
						<v-card class="pa-0" outlined tile
							style="height:50px;"
						>
							<v-text-field 
								@click="oneClick($event)"
								class="pa-0 ma-0"
								solo
								loader-height="2"
								v-model="current_file.title"
							>
							</v-text-field>
						</v-card>
						</v-col>
							<v-btn
								color="green darken-4"
								icon dark
								type="submit"
								@click="clear_content();"
								><v-icon>delete</v-icon>
							</v-btn>	
							<v-btn
								color="green darken-4"
								icon dark
								type="submit"
								@click="restoreContent();"
								><v-icon>close</v-icon>
							</v-btn>	
							<v-btn
								color="green darken-4"
								icon dark
								type="submit"
								@click="updateFile({ title: current_file.title, content: current_file.content, parent: current_file.parent, id: current_file.id, closed: current_file.closed}); updateContent();"
								><v-icon>save</v-icon>
							</v-btn>	
					</v-row>
					<v-row no-gutters xs12>
							<v-textarea
								filled
								auto-grow
								color="black"
								v-model="current_file.content"
							></v-textarea>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-container fluid v-else>
			<tree-menu 
				:file_set="files"
				:parent_file=null
				@parentToggleContent="toggleContent"
				fluid
			></tree-menu>
		</v-container>
		<!--
		<v-flex xs4 class="grey lighten-2 pa-2">
			<pre>{{ files }}</pre>
		</v-flex>
		-->
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TreeMenu from './TreeMenu'

export default {
	name: "Totrno",
	components: {
		'TreeMenu': TreeMenu
	},
	data() {
		return {
			title: "",
			content: "",
			parent: null,
			id: null,
			dialog: false,
			file_set: this.files,
			content_open: false,
			current_file: null,
			old_content: ''
		};
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
		//forceRerender() {
		//	this.treeKey += 1
		//},
		toggleContent(file) {
			this.current_file = file;
			this.old_content = file.content;
			if (!this.content_open) {
				this.content_open = ! this.content_open;
			}
		},
		clear_content() {
			this.current_file.content = '';
		},
		updateContent() {
			this.old_content = this.current_file.content;
		},
		restoreContent() {
			this.current_file.content = this.old_content;
			this.content_open = !this.content_open;
		},
		clearTitle() {
			console.log("testing");
			this.title = "";
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
	created() {
		this.title = ""
		this.content = ""
		this.parent = ""
		this.$store.dispatch('files/getFiles')
	}
};
/*
			path: []
				:path="[]"

*/

</script>
