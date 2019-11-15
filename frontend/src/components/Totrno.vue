<template>
	<v-container>
		<v-layout justify-center align-center>
			<v-flex xs6>
				<v-container>
					<v-form>
						<h1 class="display-1" style="padding-top: 0px;">
							You have these files stored:
						</h1>
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
								@click="addFile({ title: title, content: content })"
							>Add file</v-btn>
						</router-link>
					</v-form>
					<h1 class="display-1" style="padding-top:30px" v-if="files.length === 0">
						No Files
					</h1>
					<v-card mt-12 v-for="(file, index) in files" :key="index" class="mx-auto">
						<v-card-title>{{file.title}}</v-card-title>
						<v-list-item>
							<v-list-item-content>{{index}}: {{file.content}}</v-list-item-content>
						</v-list-item>
						<router-link to="/totrno" tag="span" style="cursor: pointer">
							<v-btn dark color="green darken-4" 
								type="submit"
								@click="deleteFile(file.id)"
							>Delete file</v-btn>
						</router-link>
					</v-card>
				</v-container>
			</v-flex>
		</v-layout>
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
