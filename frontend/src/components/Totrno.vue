<template>
	<v-container fluid>
		<TimeBar 
			ref="TimeBar"
			:idPath=fileSetPathId
			:titlePath=fileSetPathTitle
			:curTitle=curTitle
			@parentSwitchFileSet="switchFileSet"
			@parentDisableTimer="disableTimer"
			@parentCountdownDone="countDownDone"
			@parentExpandSideNav="expandSideNav"
		></TimeBar>
		<SideNav 
			ref="sideNavRef"
		></SideNav>
	<div class="d-none d-sm-block">
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
			<v-spacer> </v-spacer>
			<v-btn dark color="green darken-4"
				style="margin-top: 15px;"
				type="submit"
				small
				text
				@click="errorMessage = ''"
				><v-icon>close</v-icon>
			</v-btn>
			<h1 class="headline" style="padding-top:10px;padding-right:10px;">
				{{ errorMessage }}
			</h1>
		</v-row>
		<br>

		<v-container fluid v-if="contentOpen">
			<v-row no-gutters xs12>
				<v-col>
					<tree-menu 
						:fileSet="fileSet"
						:parentFile=null
						:parentTitle=parentTitle
						:parentPath=[]
						@parentToggleContent="toggleContent"
						@parentChangeFileSet="changeFileSet"
						fluid
					></tree-menu>
				</v-col>
				<v-col>
					<!--
					<v-row no-gutters xs12 class="justify-start align-end">
					</v-row>
					-->
					<v-row no-gutters xs12 class="justify-end align-end">
						<v-col>
						<v-card class="pa-0" outlined tile
							style="height:50px;"
						>
							<v-text-field 
								class="pa-0 ma-0"
								solo
								loader-height="2"
								v-model="currentFile.title"
							>
							</v-text-field>
						</v-card>
						</v-col>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="preTimerPressed()"
									><v-icon>timer</v-icon>
								</v-btn>	
							</template>
							<span>Start time tracking</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="removeFile()"
									><v-icon>delete</v-icon>
								</v-btn>	
							</template>
							<span>Delete file</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="switchTimeData(); getFileLogs(currentFile.id);"
									><v-icon>access_time</v-icon>
								</v-btn>	
							</template>
							<span>View previous time track data</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="updateFile({ title: currentFile.title, content: currentFile.content, parent: currentFile.parent, id: currentFile.id, closed: currentFile.closed}); restoreContent();"
									><v-icon>close</v-icon>
								</v-btn>	
							</template>
							<span>Close file</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="updateFile({ title: currentFile.title, content: currentFile.content, parent: currentFile.parent, id: currentFile.id, closed: currentFile.closed});"
									><v-icon>save</v-icon>
								</v-btn>	
							</template>
							<span>Save changes</span>
						</v-tooltip>
					</v-row>
					<v-row no-gutters xs12 v-if="!viewTimeData">
							<v-textarea
								filled
								auto-grow
								color="black"
								v-model="currentFile.content"
							></v-textarea>
					</v-row>
					<v-row no-gutters xs12 v-else
					v-for="item in fileLogs"
					:key="item.id"
					>
						{{ 'Start time:' }}
						{{ item.start_time }}
						<br />
						{{ 'Duration:' }}
						{{ item.duration }}
						<br />
						{{ 'Before Note:' }}
						{{ item.before_note }}
						<br />
						{{ 'After Note:' }}
						{{ item.after_note }}
						<br />
						{{ 'Next Note:' }}
						{{ item.next_note }}
						<br />
						{{ '--------------' }}
						<br />
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-container fluid v-else>
			<tree-menu 
				:fileSet="fileSet"
				:parentFile=null
				:parentTitle=parentTitle
				:parentPath=[]
				@parentToggleContent="toggleContent"
				@parentChangeFileSet="changeFileSet"
				fluid
			></tree-menu>
		</v-container>
		<PostTimer
		pa-0
		:isCountdown=isCountdown
		@parentTimerPressed="postTimerPressed"
		@parentStopTimer="stopTimer"
		v-if="showPostTimer"
		fluid
		></PostTimer>
		<PreTimer
		pa-0
		:associatedFile=currentFile.id
		:fileName=currentFile.title
		@parentTimerPressed="preTimerPressed"
		@parentStartPressed="startTimer"
		v-if="showPreTimer"
		fluid
		></PreTimer>
	</div>

	<div class="d-sm-none">
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
					><v-icon>add</v-icon>
				</v-btn>
			</v-row>
		</v-form>
		<v-row v-if="errorMessage !== ''"
			style="padding-top: 20px;"
		>
			<v-spacer> </v-spacer>
			<v-btn dark color="green darken-4"
				style="margin-top: 15px;"
				type="submit"
				small
				text
				@click="errorMessage = ''"
				><v-icon>close</v-icon>
			</v-btn>
			<h1 class="headline" style="padding-top:10px;padding-right:10px;">
				{{ errorMessage }}
			</h1>
		</v-row>
		<br>

		<v-container fluid v-if="contentOpen">
			<v-row no-gutters xs12>
					<!--
					<v-row no-gutters xs12 class="justify-start align-end">
					</v-row>
					-->
				<v-col>
					<v-row no-gutters xs12 class="justify-start align-end">
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="preTimerPressed()"
									><v-icon>timer</v-icon>
								</v-btn>	
							</template>
							<span>Start a time tracking</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="removeFile()"
									><v-icon>delete</v-icon>
								</v-btn>	
							</template>
							<span>Delete file</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="switchTimeData(); getFileLogs(currentFile.id);"
									><v-icon>access_time</v-icon>
								</v-btn>	
							</template>
							<span>View previous time track data</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="updateFile({ title: currentFile.title, content: currentFile.content, parent: currentFile.parent, id: currentFile.id, closed: currentFile.closed}); restoreContent();"
									><v-icon>close</v-icon>
								</v-btn>	
							</template>
							<span>Close file</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									color="green darken-4"
									icon dark
									type="submit"
									v-on="on"
									@click="updateFile({ title: currentFile.title, content: currentFile.content, parent: currentFile.parent, id: currentFile.id, closed: currentFile.closed});"
									><v-icon>save</v-icon>
								</v-btn>	
							</template>
							<span>Save changes</span>
						</v-tooltip>
					</v-row>
					<v-row>
						<v-col>
						<v-card class="pa-0" outlined tile
							style="height:50px;"
						>
							<v-text-field 
								class="pa-0 ma-0"
								solo
								loader-height="2"
								v-model="currentFile.title"
							>
							</v-text-field>
						</v-card>
						</v-col>
					</v-row>
					<v-row no-gutters xs12 v-if="!viewTimeData">
							<v-textarea
								filled
								auto-grow
								color="black"
								v-model="currentFile.content"
							></v-textarea>
					</v-row>
					<v-row no-gutters xs12 v-else
					v-for="item in fileLogs"
					:key="item.id"
					>
						{{ 'Start time:' }}
						{{ item.start_time }}
						<br />
						{{ 'Duration:' }}
						{{ item.duration }}
						<br />
						{{ 'Before Note:' }}
						{{ item.before_note }}
						<br />
						{{ 'After Note:' }}
						{{ item.after_note }}
						<br />
						{{ 'Next Note:' }}
						{{ item.next_note }}
						<br />
						{{ '--------------' }}
						<br />
					</v-row>
				</v-col>
			</v-row>
			<tree-menu 
				:fileSet="fileSet"
				:parentFile=null
				:parentTitle=parentTitle
				:parentPath=[]
				@parentToggleContent="toggleContent"
				@parentChangeFileSet="changeFileSet"
				fluid
			></tree-menu>
		</v-container>
		<v-container fluid v-else>
			<tree-menu 
				:fileSet="fileSet"
				:parentFile=null
				:parentTitle=parentTitle
				:parentPath=[]
				@parentToggleContent="toggleContent"
				@parentChangeFileSet="changeFileSet"
				fluid
			></tree-menu>
		</v-container>
		<PostTimer
		pa-0
		:isCountdown=isCountdown
		@parentTimerPressed="postTimerPressed"
		@parentStopTimer="stopTimer"
		v-if="showPostTimer"
		fluid
		></PostTimer>
		<PreTimer
		pa-0
		:associatedFile=currentFile.id
		:fileName=currentFile.title
		@parentTimerPressed="preTimerPressed"
		@parentStartPressed="startTimer"
		v-if="showPreTimer"
		fluid
		></PreTimer>

	</div>
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
			fileSet: this.files,
			fileSetPathId: [],
			fileSetPathTitle: [],
			curTitle: null,
			fileOpen: false,
			parentTitle: 'root',

			viewTimeData: false,
			timerData: null,

			contentOpen: false,
			currentFile: null,

			showPreTimer: false,
			showPostTimer: false,
			isCountdown: false,

			errorMessage: "",

			drawer: null,
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
			this.deleteFile(this.currentFile);
			this.fileSet = this.fileSet.filter(obj => obj.id !== this.currentFile.id)
			this.contentOpen = !this.contentOpen;
		},
		expandSideNav() {
			this.$refs.sideNavRef.switchDrawer()
		},
		switchTimeData() {
			this.viewTimeData = !this.viewTimeData;
		},
		getTimeData() {
			this.$store.dispatch('timeLogs/getFileLogs')
				//.then(() => {
				//	this.fileSet = this.files;
				//	})
		},
		startTimer() {
			this.$refs.TimeBar.resetTimer();
			this.$refs.TimeBar.startTimer();
		},
		preTimerPressed() {
			this.showPreTimer = !this.showPreTimer;
		},
		postTimerPressed() {
			this.showPostTimer = !this.showPostTimer;
		},
		disableTimer() {
			this.isCountdown = false;
			this.showPostTimer = !this.showPostTimer;
		},
		countDownDone() {
			this.isCountdown = true
			this.showPostTimer = !this.showPostTimer;
		},
		stopTimer() {
			this.$refs.TimeBar.resetTimer();
		},
		toggleContent(file) {
			if (this.currentFile === null || this.currentFile.id !== file.id) {
				this.currentFile = file;
				this.viewTimeData = false;
				if (!this.contentOpen) {
					this.contentOpen = ! this.contentOpen;
				}
			}
			else {
				this.contentOpen = !this.contentOpen;
				this.updateFile({ title: this.currentFile.title, content: this.currentFile.content, parent: this.currentFile.parent, id: this.currentFile.id, closed: this.currentFile.closed});
			}
		},
		createFile() {
			this.addFile({ title: this.title, content: '', parent: this.parent})
				.then(newFile => {
					if (newFile && newFile.stack && newFile.message) {
						this.errorMessage = "Please enter a valid file name";
					}
					else {
						this.errorMessage = "";
						if (this.parent !== null) {
							this.fileSet.push(newFile);
						}
						else {
							this.fileSet = this.files;
						}
					}
					})
			this.title = "";
		},
		changeFileSet(file, pathId, pathTitle) {
			this.contentOpen = false;
			if (!this.fileOpen) {
				this.fileOpen = true;
				this.fileSetPathId = pathId;
				this.fileSetPathTitle = pathTitle;
			}
			else {
				var i
				this.fileSetPathId.push(this.parent);
				this.fileSetPathTitle.push(this.curTitle);
				for (i = 1; i < pathId.length; i++) {
					this.fileSetPathId.push(pathId[i]);
					this.fileSetPathTitle.push(pathTitle[i]);
				}
			}
			this.fileSet = file.file_set;
			this.parent = file.id;
			this.curTitle = file.title;
		},
		switchFileSet(item) {
			this.contentOpen = false;
			if ( item === "root") {
				this.fileSetPathId = [];
				this.fileSetPathTitle = [];
				this.fileSet = this.files;
				this.parent = null;
				this.fileOpen = false;
			}
			else {
				this.parent = item;
				var i, curFile;
				var done = -1;
				var curFileSet = this.files;
				for (i = 0; i < this.fileSetPathId.length; i++) {
					var j;
					for (j = 0; j < curFileSet.length; j++) {
						curFile = curFileSet[j];
						if (curFile.id == item) {
							this.fileSet = curFile.file_set;
							this.parent = curFile.id;
							this.curTitle = curFile.title;
							done = i;
						}
						if (done !== -1) {
							break;
						}
						else if (curFile.id == this.fileSetPathId[i + 1]) {
							curFileSet = curFile.file_set;
							break;
						}
					}
					if (done !== -1) {
						break;
					}
				}
				var length = this.fileSetPathId.length - done - 1;
				for (i = 0; i < length; i++) {
					this.fileSetPathId.pop();
					this.fileSetPathTitle.pop();
				}
			}		
		},
		clearContent() {
			this.currentFile.content = '';
		},
		restoreContent() {
			this.contentOpen = !this.contentOpen;
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
				this.fileSet = this.files;
				})
	}
};
</script>
