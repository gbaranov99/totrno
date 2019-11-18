<template>
	<v-container fluid v-on:submit.prevent="onSubmit">
		<v-form>
			<h1 class="headline">
				Add a new file:
			</h1>
			<v-row no-gutters>
			<br>
			<v-text-field
				name="title"
				label="Title"
				id="title"
				type="title"
				color="green darken-4"
				v-model="title"
				required
			></v-text-field>
			<v-text-field
				name="content"
				label="Content"
				id="content"
				type="content"
				color="green darken-4"
				v-model="content"
				required
			></v-text-field>
			<v-text-field
				name="parent"
				label="Parent"
				id="parent"
				type="parent"
				color="green darken-4"
				v-model="parent"
				required
			></v-text-field>
				<v-btn dark color="green darken-4"
					type="submit"
					tile
					@click="addFile({ title: title, content: content, parent: parent })"
				>Add file</v-btn>
			</v-row>
		</v-form>
		<br>
		<v-row no-gutters v-for="(file, index) in files" :key="index" class="pa-0">
			<tree-menu 
			:title="file.title"
			:id="file.id"
			:content="file.content"
			:file_set="file.file_set"
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
		};
	},
	computed: mapState({
		files: state => state.files.files
	}),
	methods: {
		//forceRerender() {
		//	this.treeKey += 1
		//},
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
