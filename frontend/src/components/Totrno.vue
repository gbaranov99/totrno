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
				<v-btn dark color="green darken-4"
					type="submit"
					tile
					@click="addFile({ title: title, content: content, parent: parent })"
				>Add file</v-btn>
			</v-row>
		</v-form>
		<br>
		<v-row no-gutters v-for="(file, index) in files" :key="index">
			<tree-menu 
				:title="file.title"
				:id="file.id"
				:content="file.content"
				:file_set="file.file_set"
				:parent="file.parent"
				:depth="0"
			></tree-menu>
		</v-row>
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
			dialog: false,
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
		...mapActions('timeLogs', [
		'addTimeLog',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
	},
	created() {
		this.$store.dispatch('files/getFiles')
	}
};
</script>
