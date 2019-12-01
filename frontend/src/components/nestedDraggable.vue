<template >
	<v-layout justify-start align-start>
			<draggable 
			v-model="tabs" 
			:list="tabs" 
			handle=".handle" 
			:group="{ name:'g1'}">
				<template v-if="tabs.length === 0 ">
					<v-card class="pa-0" outlined tile
						style="height:30px;">
						<v-text-field 
							background-color="green lighten-3"
							solo
							readonly
							value="Drag here for subfile!">
						</v-text-field>
					</v-card>
				</template>


				<template v-for="tab in tabs" v-else >
					<v-col no-gutters xs12 style="padding-left:50px">
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
								style="height:50px;">
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
						:tabs="tab.tabs">
					</nestedDraggable>
					</v-row>
					</v-col>
				</template>
			</draggable>
		<!--

 style="indent"
		<v-row no-gutters xs12>
		</v-row>
			<v-flex xs12>
			</v-flex>

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
			v-if="(parentName==='true')&&(tab.tabs.length===0)"
			:tabs="tab.tabs"
			:parentName='false'
			>
		</nestedDraggable>
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
	name: "nestedDraggable",
	props: [ 'tabs' ],
	components: {
		draggable
	},
	//computed: {
	//	indent() {
	//		return { transform: `padding-left:(${300})px` }
	//	},
	//},
	//created() {
	//	if((this.tabs.length === 0) && (this.parentName==='true')) {
	//	console.log("hmmmm");
	//		var newtab =
	//			{
	//				id: 100, 
	//				name: "place",
	//				text: "holder",
	//				tabs: []
	//			};
	//		this.tabs.push(newtab);
	//	}
	//}
	//{{ parentName }}
}
</script>
