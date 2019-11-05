<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs6 offset-xs2>
        <v-img
          :src="require('../assets/SignUp.png')"
          class="my-3"
          contain
          height="150"
        ></v-img>
	    <v-container>
          <v-column>
		    <v-flex>
              <h1 class="display-1" style="padding-top: 120px;">
			    You have these files stored:
              </h1>
			  <br>
			</v-flex>
            <v-flex>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                type="title"
				color="green darken-4"
				v-model="title"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="content"
                label="Content"
                id="content"
                type="content"
				color="green darken-4"
				v-model="content"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn dark color="green darken-4" 
			  type="submit"
			  @click="addFile({ title: title, content: content })"
			  >Add file</v-btn>
            </v-flex>
            <v-flex>
              <v-card mt-12 v-for="(file, index) in files" :key="index" class="mx-auto">
                <v-card-title>{{file.title}}</v-card-title><v-list-item>
                  <v-list-item-content>Date: {{file.content}}</v-list-item-content>
                </v-list-item>
                <v-btn dark color="green darken-4" 
			    type="submit"
			    @click="deleteFile(file.pk)"
			    >Delete file</v-btn>
              </v-card>
	        </v-flex>
          </v-column>
        </v-container>
      </v-flex>
	<v-flex xs2/>
	</v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "Files",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: mapState({
    files: state => state.files.files
  }),
  methods: mapActions('files', [
    'addFile',
    'deleteFile'
  ]),
  created() {
    this.$store.dispatch('files/getFiles')
  }
};
</script>
