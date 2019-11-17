<template>
	<v-container
	:style="indent"
	class="tree-menu">
		<v-row no-gutters v-if="notDeleted">
			<v-btn
				v-if="showChildren"
				color="green darken-4" 
				@click="toggleChildren"
				icon dark>
				<v-icon>expand_less</v-icon>
			</v-btn>
			<v-btn
				v-else-if="file_set.length !== 0"
				color="green darken-4" 
				@click="toggleChildren"
				icon dark>
				<v-icon>expand_more</v-icon>
			</v-btn>
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ id }}: {{ title }}
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-2" outlined tile>
					{{ content }}
				</v-card>
			</v-col>
			<v-btn 
				color="green darken-4"
				type="submit"
				icon dark
				@click="forceRerender(); deleteFile(id); "
				><v-icon>delete</v-icon>
			</v-btn>
		</v-row>
		<tree-menu
			v-if="showChildren"
			v-bind:key="file"
			v-for="file in file_set"
			:file_set="file.file_set"
			:title="file.title"
			:content="file.content"
			:id="file.id"
			:depth="depth + 1"
			>
		</tree-menu>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'tree-menu',
	props: [ 'title', 'file_set', 'content', 'id', 'depth' ],
	data() {
		return { 
			showChildren: false,
			notDeleted: true,
			treeKey: 0,
		}
	},
	computed: {
		indent() {
			return { transform: `translate(${this.depth * 50}px)` }
		},
		...mapState({
			files: state => state.files.files
		}),

	},
	methods: {
		toggleChildren() {
			this.showChildren = !this.showChildren;
		},
		forceRerender() {
			this.notDeleted = !this.notDeleted;
		},
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
	},
}
</script>
