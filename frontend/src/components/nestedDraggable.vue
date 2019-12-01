<template >
	<v-layout justify-start align-start>
			<draggable 
			v-model="tabs" 
			:list="tabs" 
			handle=".handle" 
			:group="{ name:'g1'}"
			>
				<template v-for="tab in tabs">
		<v-row no-gutters xs12>
			<v-btn
				color="green darken-4"
				icon dark
				class="handle"
				type="submit"
				><v-icon>menu</v-icon>
			</v-btn>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="tab.name"
					>
					</v-text-field>
				</v-card>
			</v-col>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:50px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="tab.text"
					>
					</v-text-field>
				</v-card>
			</v-col>
		<nestedDraggable
			:tabs="tab.tabs"
			>
		</nestedDraggable>
			</v-row>
				</template>
			</draggable>
		<!--
		<v-list style="padding-left:50px;" align-left>
				<template v-for="tab in tabs">
					<v-list-item :key="tab.id">
						<v-list-item-icon>
							<v-icon class="handle">
								drag_handle
							</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>
								{{ tab.name }}
							</v-list-item-title>
							<v-list-item-sub-title>
								{{ tab.text }}
							</v-list-item-sub-title>
						</v-list-item-content>
						<v-list-group>
				<nestedDraggable 
				:tabs="tab.tabs" />
						</v-list-group>
					</v-list-item>
				</template>
			</draggable>
		</v-list>
		-->
	</v-layout>
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
