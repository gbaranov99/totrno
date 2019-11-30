<template>
	<v-container fluid>
		<v-layout align-start justify-center>
			<v-flex xs4 class="elevation-1 pa-3 ma-2">
				<v-list>
					<draggable v-model="list" :options="{group:'people'}">
						<template v-for="tab in list">
							<v-list-item :key="tab.id">
								<v-list-item-content>
									<v-list-item-title v-html="tab.name"></v-list-item-title>
									<v-list-item-sub-title v-html="tab.text"></v-list-item-sub-title>
								</v-list-item-content>
							</v-list-item>
							<!--
							<nestedDraggable 
							:tabs="tab.tabs" />
							-->
						</template>
					</draggable>
				</v-list>
			</v-flex>
		</v-layout>
		<v-flex xs4 class="grey lighten-2 pa-2">
			<pre>{{ list }}</pre>
		</v-flex>
	</v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
	name: 'Tree1',
	display: "Nested",
	components: {
		draggable
	},
	data() {
		return {
			list: [
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
					tabs: []
				},
				{
					id: 3, 
					name: "3rd Tab",
					text: "This is a 3rd tab",
					tabs: []
				}
			]
		}
	}
}
</script>
