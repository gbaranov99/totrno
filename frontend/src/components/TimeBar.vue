<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				<template v-for="item in path" v-if="path[0] !== null">
					<v-card  outlined tile
						color="grey lighten-4"
						style="height:40px;"
						@click="parentSwitchFileSet(item)">
						<v-card-text class="pt-2"> 
							<p class="body-1 text--primary">
								{{ item }}
							</p>
						</v-card-text>
					</v-card>
					<template v-if="item != path[path.length - 1]">
						-
					</template>
					<template v-else>
						<h2 style="padding-right:100px;padding-left:20px;">
							{{ "-" }}
							{{ curTitle }}
						</h2>
					</template>
				</template>
			<v-toolbar-title>
				Timers:
			</v-toolbar-title>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	props: [ 'path', 'curTitle'],
	data(){
		return {
		}
	},
	computed: {
		...mapState({
			timeLogs: state => state.timeLogs.timeLogs,
		}),
		...mapState({
			files: state => state.files.files
		}),
	},
	methods: {
		parentSwitchFileSet(item) {
			//console.log("wow");
			//console.log(item);
			this.$emit('parentSwitchFileSet', item);
		},
		...mapActions('timeLogs', [
		'addTimeLog',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
	},
};
</script>
