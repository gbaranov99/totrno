<template>
	<v-container fluid>
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
			<router-link to="/totrno" tag="span" style="cursor: pointer">
				<v-btn dark color="green darken-4" 
					type="submit"
					tile
					@click="addFile({ title: title, content: content })"
				>Add file</v-btn>
			</router-link>
			</v-row>
		</v-form>
		<v-row no-gutters v-for="(file, index) in files" :key="index" class="mx-auto">
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ index }}: {{ file.title }}
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ file.content }}
				</v-card>
			</v-col>
			<v-btn dark color="green darken-4" 
				type="submit"
				tile
				@click="deleteFile(file.id)"
			>Delete file</v-btn>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: "Totrno",
	data() {
		return {
			title: "",
			content: "",
		};
	},
	computed: mapState({
		files: state => state.files.files
	}),
	methods: mapActions('files', [
		'addFile',
		'deleteFile'
	]),
	created() {
		this.$store.dispatch('files/getFiles')
	}
};
</script>
