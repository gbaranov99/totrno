<template>
	<v-container>
		<v-app-bar app color="green lighten-4">
			<v-toolbar-title
			style="padding-right:10px;">
				Path:
			</v-toolbar-title>
				<template v-for="item in title_path" >
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
					<template v-if="item != title_path[title_path.length - 1]">
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
				<h2 style="padding-left:50px;">
					{{ "-" }}
				</h2>
				<template v-for="item in timeLogs" >
					<v-card  outlined tile
						color="grey lighten-4"
						style="height:40px;"
						@click="parentDisableTimer(item)"
						>
						<v-card-text class="pt-2"> 
							<p class="body-1 text--primary">
								{{ item.file_name }}
							</p>
						</v-card-text>
					</v-card>
				</template>
		</v-app-bar>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TimeBar',
	components: {
	},
	props: [ 'id_path', 'title_path', 'curTitle', 'timer_active',],
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
		parentDisableTimer(item) {
			//console.log(item)
			//item.active = false;
			//this.updateTimeLog(item);
			this.$emit('parentDisableTimer', item.id);
		},
		parentSwitchFileSet(item) {
			var i, j;
			for (i = 0; i < this.title_path.length; i++) {
				if (this.title_path[i] === item) {
					j = i;
				}
			}
			this.$emit('parentSwitchFileSet', this.id_path[j]);
		},
		...mapActions('timeLogs', [
		'addTimeLog',
		'updateTimeLog',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile'
		]),
	},
	created() {
		this.$store.dispatch('timeLogs/getActiveTimeLogs')
	}
};
</script>
