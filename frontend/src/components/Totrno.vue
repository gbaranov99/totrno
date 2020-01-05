<template>
	<v-container fluid>
		<SideNav></SideNav>
		<TimeBar 
			ref="TimeBar"
			:id_path=file_set_path_id
			:title_path=file_set_path_title
			:curTitle=curTitle
			@parentSwitchFileSet="switchFileSet"
			@parentDisableTimer="disableTimer"
		></TimeBar>
		<v-form>
			<v-row no-gutters>
			<v-col>
				<v-card class="pa-0" outlined tile
					style="height:39px;"
				>
					<v-text-field 
						class="pa-0 ma-0"
						solo
						loader-height="2"
						v-model="title"
						label="File title"
						required
					>
					</v-text-field>
				</v-card>
			</v-col>
				<v-btn dark color="green darken-4"
					style="margin-top:2px;"
					type="submit"
					large
					tile
					@click="createFile()"
				>Add file</v-btn>
			</v-row>
		</v-form>
		<v-row v-if="errorMessage !== ''"
		 style="padding-top: 20px;"
		>
			<v-btn dark color="green darken-4"
				style="margin-top: 15px;"
				type="submit"
				small
				text
				@click="errorMessage = ''"
				><v-icon>close</v-icon>
			</v-btn>
			<v-col>
			<h1 class="headline">
				{{ errorMessage }}
			</h1>
			</v-col>
		</v-row>
		<br>

		<v-container fluid v-if="content_open">
			<v-row no-gutters xs12>
				<v-col>
					<tree-menu 
						:file_set="file_set"
						:parent_file=null
						:parent_title=parent_title
						:parent_path=[]
						@parentToggleContent="toggleContent"
						@parentChangeFileSet="changeFileSet"
						fluid
					></tree-menu>
				</v-col>
				<v-col>
					<v-row no-gutters xs12 class="justify-start align-end">
						<v-btn
							color="green darken-4"
							icon dark
							type="submit"
							@click="preTimerPressed()"
							><v-icon>timer</v-icon>
						</v-btn>	
						<v-btn
							color="green darken-4"
							icon dark
							type="submit"
							@click="removeFile()"
							><v-icon>delete</v-icon>
						</v-btn>	
						<v-btn
							color="green darken-4"
							icon dark
							type="submit"
							@click="viewTimeData(); getFileLogs(current_file.id);"
							><v-icon>access_time</v-icon>
						</v-btn>	
						<v-btn
							color="green darken-4"
							icon dark
							type="submit"
							@click="updateFile({ title: current_file.title, content: current_file.content, parent: current_file.parent, id: current_file.id, closed: current_file.closed}); restoreContent();"
							><v-icon>close</v-icon>
						</v-btn>	
						<v-btn
							color="green darken-4"
							icon dark
							type="submit"
							@click="updateFile({ title: current_file.title, content: current_file.content, parent: current_file.parent, id: current_file.id, closed: current_file.closed});"
							><v-icon>save</v-icon>
						</v-btn>	
					</v-row>
					<v-row no-gutters xs12 class="justify-end align-end">
						<v-col>
						<v-card class="pa-0" outlined tile
							style="height:50px;"
						>
							<v-text-field 
								@click="oneClick($event)"
								class="pa-0 ma-0"
								solo
								loader-height="2"
								v-model="current_file.title"
							>
							</v-text-field>
						</v-card>
						</v-col>
					</v-row>
					<v-row no-gutters xs12 v-if="!view_time_data">
							<v-textarea
								filled
								auto-grow
								color="black"
								v-model="current_file.content"
							></v-textarea>
					</v-row>
					<v-row no-gutters xs12 v-else
					v-for="item in fileLogs">
						{{ 'Start time:' }}
						{{ item.startTime }}
						<br />
						{{ 'Duration:' }}
						{{ item.duration }}
						<br />
						{{ 'Before Note:' }}
						{{ item.beforeNote }}
						<br />
						{{ 'After Note:' }}
						{{ item.afterNote }}
						<br />
						{{ 'Next Note:' }}
						{{ item.nextNote }}
						<br />
						{{ '--------------' }}
						<br />
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-container fluid v-else>
			<tree-menu 
				:file_set="file_set"
				:parent_file=null
				:parent_title=parent_title
				:parent_path=[]
				@parentToggleContent="toggleContent"
				@parentChangeFileSet="changeFileSet"
				fluid
			></tree-menu>
		</v-container>
		<PostTimer
		pa-0
		:timerId=timerId
		:startTime=startTime
		@parentTimerPressed="postTimerPressed"
		@parentStopTimer="stopTimer"
		v-if="showPostTimer"
		fluid
		></PostTimer>
		<PreTimer
		pa-0
		:associated_file=current_file.id
		:file_name=current_file.title
		@parentTimerPressed="preTimerPressed"
		@parentStartPressed="startTimer"
		v-if="showPreTimer"
		fluid
		></PreTimer>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideNav from './SideNav'
import TreeMenu from './TreeMenu'
import TimeBar from './TimeBar'
import PostTimer from './PostTimer'
import PreTimer from './PreTimer'

export default {
	name: "Totrno",
	components: {
		'SideNav': SideNav,
		'TreeMenu': TreeMenu,
		'TimeBar': TimeBar,
		'PostTimer': PostTimer,
		'PreTimer': PreTimer,
	},
	data() {
		return {
			title: "",
			content: "",
			parent: null,
			id: null,
			dialog: false,
			file_set: this.files,
			file_set_path_id: [],
			file_set_path_title: [],
			curTitle: null,
			file_open: false,
			parent_title: 'root',

			view_time_data: false,
			timer_data: null,

			content_open: false,
			current_file: null,

			showPreTimer: false,
			showPostTimer: false,
			timerId: null,
			startTime: null,

			errorMessage: "",
		};
	},
	computed: {
		...mapState({
			timeLogs: state => state.timeLogs.timeLogs,
		}),
		...mapState({
			fileLogs: state => state.timeLogs.fileLogs,
		}),
		...mapState({
			files: state => state.files.files
		}),
	},
	methods: {
		removeFile() {
			this.deleteFile(this.current_file);
			this.file_set = this.file_set.filter(obj => obj.id !== this.current_file.id)
			this.content_open = !this.content_open;
		},
		viewTimeData() {
			this.view_time_data = !this.view_time_data;
		},
		getTimeData() {
			//console.log(this.fileLogs);
			this.$store.dispatch('timeLogs/getFileLogs')
				//.then(() => {
				//	this.file_set = this.files;
				//	})
		},
		startTimer() {
			//console.log('startTimer()');
			this.$refs.TimeBar.resetTimer();
			this.$refs.TimeBar.startTimer();
		},
		preTimerPressed() {
			this.showPreTimer = !this.showPreTimer;
			//console.log(this.current_file.id)
			//console.log(this.current_file.title)

			//console.log('timerPressed()');
			//this.$refs.TimeBar.resetTimer();
			//this.$refs.TimeBar.startTimer();
		},
		postTimerPressed() {
			this.showPostTimer = !this.showPostTimer;
		},
		disableTimer(id, start) {
			//console.log(item);
			this.showPostTimer = !this.showPostTimer;
			this.timerId = id;
			this.startTime = start;
			//console.log('disableTimer()');
		},
		stopTimer() {
			this.$refs.TimeBar.resetTimer();
			//console.log('stopTimer()');
		},
		toggleContent(file) {
			//console.log(this.current_file);
			//console.log(file);
			//console.log('wowzers')
			if (this.current_file === null || this.current_file.id !== file.id) {
				this.current_file = file;
				this.view_time_data = false;
				if (!this.content_open) {
					this.content_open = ! this.content_open;
				}
			}
			else {
				this.content_open = !this.content_open;
				//console.log('wow')
				this.updateFile({ title: this.current_file.title, content: this.current_file.content, parent: this.current_file.parent, id: this.current_file.id, closed: this.current_file.closed});
			}
		},
		createFile() {
			this.addFile({ title: this.title, content: '', parent: this.parent})
				.then(newFile => {
					//console.log(newFile)
					if (newFile && newFile.stack && newFile.message) {
						//console.log('thats an error');
						this.errorMessage = "Please enter a valid file name";
					}
					else {
						this.errorMessage = "";
						//console.log(this.parent)
						if (this.parent !== null) {
							this.file_set.push(newFile);
						}
						else {
							this.file_set = this.files;
						}
					}
					})
			this.title = "";
		},
		changeFileSet(file, path_id, path_title) {
			this.content_open = false;
			if (!this.file_open) {
				this.file_open = true;
				this.file_set_path_id = path_id;
				this.file_set_path_title = path_title;
			}
			else {
				var i
				this.file_set_path_id.push(this.parent);
				this.file_set_path_title.push(this.curTitle);
				for (i = 1; i < path_id.length; i++) {
					this.file_set_path_id.push(path_id[i]);
					this.file_set_path_title.push(path_title[i]);
				}
			}
			this.file_set = file.file_set;
			this.parent = file.id;
			this.curTitle = file.title;
		},
		switchFileSet(item) {
			this.content_open = false;
			if ( item === "root") {
				this.file_set_path_id = [];
				this.file_set_path_title = [];
				this.file_set = this.files;
				this.parent = null;
				this.file_open = false;
			}
			else {
				this.parent = item;
				var i, curFile;
				var done = -1;
				var curFileSet = this.files;
				for (i = 0; i < this.file_set_path_id.length; i++) {
					var j;
					for (j = 0; j < curFileSet.length; j++) {
						curFile = curFileSet[j];
						if (curFile.id == item) {
							this.file_set = curFile.file_set;
							this.parent = curFile.id;
							this.curTitle = curFile.title;
							done = i;
						}
						if (done !== -1) {
							break;
						}
						else if (curFile.id == this.file_set_path_id[i + 1]) {
							curFileSet = curFile.file_set;
							break;
						}
					}
					if (done !== -1) {
						break;
					}
				}
				var length = this.file_set_path_id.length - done - 1;
				for (i = 0; i < length; i++) {
					this.file_set_path_id.pop();
					this.file_set_path_title.pop();
				}
			}		
		},
		clear_content() {
			this.current_file.content = '';
		},
		restoreContent() {
			this.content_open = !this.content_open;
		},
		...mapActions('timeLogs', [
		'addTimeLog',
		'getFileLogs',
		'deleteTimeLog'
		]),
		...mapActions('files', [
		'addFile',
		'deleteFile',
		'updateFile',
		'getFiles'
		]),
	},
	created() {
		this.title = ""
		this.content = ""
		this.parent = null
		this.$store.dispatch('files/getFiles')
			.then(() => {
				this.file_set = this.files;
				})
	}
};
</script>
