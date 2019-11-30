<template>
	<v-container fluid>
		<v-list>
		<draggable v-model="active" style="min-height: 10px">
			<template v-for="tab in tabs">
				<v-list-item :key="tab.id">
				<v-list-item-content>
					<v-list-item-title v-html="tab.name"></v-list-item-title>
					<v-list-item-sub-title v-html="tab.text"></v-list-item-sub-title>
					</v-list-item-content>
				</v-list-item>
				<nestedDraggable 
				:tabs="tab.tabs" />
			</template>
		</draggable>
		</v-list>
	</v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
	props: {
		tabs: {
			required: true,
			type: Array
		}
	},
	components: {
		draggable
	},
	name: "nestedDraggable"
};
</script>
