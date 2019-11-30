<template>
	<v-container fluid>
		<v-list v-if="tabs.length > 0">
		<draggable v-model="tabs" class="dragArea" :tabs="tabs" :group="{ name: 'g1' }">
			<template v-for="tab in tabs">
				<v-list-item :key="tab.id">
				<v-list-item-content>
					<v-list-item-title v-html="tab.name"></v-list-item-title>
					<v-list-item-sub-title v-html="tab.text"></v-list-item-sub-title>
					</v-list-item-content>
				</v-list-item>
				<nestedDraggable 
				v-model="tab.tabs"
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
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>

