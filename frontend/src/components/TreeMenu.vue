<template>
	<v-container 
	:style="indent" 
	class="tree-menu">
		<p>{{ label }}</p>
		<v-btn dark color="green darken-4" 
			tile
			@click="toggleChildren"
		>Show Children</v-btn>
		<tree-menu 
			v-if="showChildren"
			v-bind:key="node"
			v-for="node in nodes" 
			:nodes="node.nodes" 
			:label="node.label"
			:depth="depth + 1"
			>
		</tree-menu>
	</v-container>
</template>

<script>
export default { 
	props: [ 'label', 'nodes', 'depth' ],
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
