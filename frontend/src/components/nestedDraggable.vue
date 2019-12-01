<template>
		<!--
		<v-list>
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
		-->
		<v-list>
			<draggable v-model="tabs" :list="tabs" handle=".handle" :group="{ name:'g1'}">
				<template v-for="tab in tabs">
					<v-list-item :key="tab.id">
							<v-list-item-icon>
								<v-icon class="handle">drag_handle</v-icon>
							</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-html="tab.name"></v-list-item-title>
							<v-list-item-sub-title v-html="tab.text"></v-list-item-sub-title>
						</v-list-item-content>
				<nestedDraggable 
				:tabs="tab.tabs" />
					</v-list-item>
				</template>
			</draggable>
		</v-list>
</template>

<script>
import draggable from "vuedraggable";

export default {
	props: [ 'tabs' ],
	components: {
		draggable
	},
	name: "nestedDraggable"
}
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
