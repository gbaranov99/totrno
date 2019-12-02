<template>
	<v-container
	class="pt-0 pr-0 pb-0"
	fluid	
	justify-start align-start>
		<draggable 
		v-model="tabs" 
		:list="tabs" 
		handle=".handle" 
		:group="{ name:'g1'}">
			<template v-if="tabs.length === 0 " >
				<v-container
				class="pt-3 pb-0">
				<v-card outlined tile
					style="height:38px;">
					<v-text-field 
						background-color="green lighten-3"
						solo
						readonly
						value="Drag here to create a subfile.">
					</v-text-field>
				</v-card>
				</v-container>
			</template>

			<template v-for="tab in tabs" v-else >
				<v-container 
				class="pt-3 pr-0 pb-0"
				no-gutters xs12 style="padding-left:50px">
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
							style="height:38px;">
							<v-text-field 
								class="pa-0 ma-0"
								solo
								loader-height="2"
								v-model="tab.name">
							</v-text-field>
						</v-card>
					</v-col>
					</v-row>
				<v-row no-gutters xs12>
				<nestedDraggable
					:parent=1
					:tabs="tab.tabs">
				</nestedDraggable>
				</v-row>
				</v-container>
			</template>
		</draggable>
	</v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
	name: "nestedDraggable",
	props: [ 'tabs' ],
	components: {
		draggable
	},
}
</script>
