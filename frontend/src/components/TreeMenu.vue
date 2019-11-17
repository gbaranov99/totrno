<template>
	<v-container
	:style="indent"
	class="tree-menu">
		<p>{{ title }}</p>
		<v-btn dark color="green darken-4"
			tile
			@click="toggleChildren"
		>Show Children</v-btn>
		<tree-menu
			v-if="showChildren"
			v-bind:key="file"
			v-for="file in file_set"
			:file_set="file.file_set"
			:id="file.id"
			:title="file.title"
			:depth="depth + 1"
			>
		</tree-menu>
	</v-container>
</template>

<script>
export default {
	props: [ 'title', 'file_set', 'depth' ],
	data() {
		return { showChildren: false}
	},
	name: 'tree-menu',
	computed: {
		indent() {
			return { transform: `translate(${this.depth * 50}px)` }
		}
	},
	methods: {
		toggleChildren() {
			this.showChildren = !this.showChildren;
		}
	}
}
</script>
