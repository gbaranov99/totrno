<template>
	<v-container fluid>
		<v-flex justify-start align-start>
		<!--
		<v-row no-gutters v-for="tab in tabs" :key="tab">
		</v-row>
		-->
				<nestedDraggable 
				:tabs="tabs"
				/>
		</v-flex>
		<v-flex xs4 class="grey lighten-2 pa-2">
			<pre>{{ tabs }}</pre>
		</v-flex>
	</v-container>
</template>

<script>
import nestedDraggable from "./nestedDraggable";

export default {
	name: 'Tree1',
	display: "Nested",
	order: 15,
	components: {
		nestedDraggable,
	},
	data() {
		return {
			tabs: [
				{
					id: 1, 
					name: "1st Tab",
					text: "This is a 1st tab",
					tabs: [
						{
							id: 4, 
							name: "4th Tab",
							text: "This is the 4th tab",
							tabs: []
						},
						{
							id: 5, 
							name: "5th Tab",
							text: "This is the 5th tab",
							tabs: []
						}
						]
					},
				{
					id: 2, 
					name: "2nd Tab",
					text: "This is a 2nd tab",
					tabs: [
						{
							id: 6, 
							name: "6th Tab",
							text: "This is the 6th tab",
							tabs: []
						}
					]
				},
				{
					id: 3, 
					name: "3rd Tab",
					text: "This is a 3rd tab",
					tabs: []
				},
			]
		}
	}
}
</script>
