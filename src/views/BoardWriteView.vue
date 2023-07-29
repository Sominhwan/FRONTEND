<template>
    <v-app>
        <v-row>
        <v-col cols="6" md="2" offset="2">
            <v-card class="mx-auto rounded-0" width="300" height="1470" flat style="border-right:1px solid #eee;">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px" style="border-right:1px solid #eee;">
              <v-row class="fill-height">
                <v-card-title class="white--text pl-12 pt-12">
                  <!-- <div class="text-h4 pl-5 pt-15" style="margin:auto">
                    test
                  </div> -->
                </v-card-title>
              </v-row>
            </v-img> 
            <v-list>
              <v-list-item class="write-btn ma-3 pa-2" @click="$router.push({name: 'write'})" style="background-color: #2889f1;">
                <div style="display: flex; margin: auto;">
                  <v-icon left size="25" color="white">
                    mdi-pencil
                  </v-icon> 
                  <v-list-item-title style="font-size: 20px; color: white; font-weight: bold;">글 쓰기</v-list-item-title> 
                </div>                 
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-group :value="true" prepend-icon="mdi-account-circle">
                <template v-slot:activator>
                  <v-list-item-title>Users</v-list-item-title>
                </template>
              <v-list-group :value="true" no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>       
                    <v-list-item-title>Actions</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                  <v-list-item-title>{{ title }}</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon >{{ icon }}</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="true" no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Actions</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                  <v-list-item-title>{{ title }}</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>        
              </v-list-group>
              </v-list>
            </v-card>
        </v-col>
        <v-col cols="6" md="5" offset="0" style="position: relative; top: 40px;">
          <v-card class="d-flex" flat tile > 
            <v-row>
              <v-col class="pa-2 mr-auto" cols="12" style="position: relative;">
                <v-select v-select class="rounded-0" :items="items" v-model="items_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2 mr-auto" cols="12" sm="2" style="position: relative;">
                <v-select v-select class="rounded-0" :items="brackets" v-model="brackets_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2" cols="12" sm="10">
                <v-text-field class="search-input rounded-0" maxlength="50" flat hide-details solo dense label="제목" v-model="title"></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <!-- <v-card class="rounded-0" flat>
            <v-list>
              <v-list-item v-for="folder in folders" :key="folder.title">
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark>
                    mdi-folder
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title><span style="color: #2889f1; font-weight: bold; font-size: 16px; margin-right: 10px;">[진행 이벤트]</span><span class="notice-title">{{ folder.title }}</span></v-list-item-title>
                  <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">GM사무국</span>{{ folder.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>  
                  <v-icon color="orange lighten-1" style="margin-right: 20px;">mdi-information</v-icon>
                  <v-icon color="primary" style="margin-right: 20px;">mdi-thumb-up</v-icon>
                  <span style="position: relative; right: 35px; top: 20px; font-size: 13px; color: grey;">7</span> 
                  <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                  <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">7</span>       
              </v-list-item>
              <v-divider></v-divider>      
            </v-list>
          </v-card>    -->
          <v-card height="590" style="top: 20px;" flat>
            <vue-editor v-model="content" :placeholder="placeholder" style="height: 500px;"></vue-editor>
          </v-card>
          <v-card class="d-flex justify-center" flat>
            <v-card class="pa-2" flat>
              <v-btn class="rounded-0" outlined color="grey">취소</v-btn>
            </v-card>
            <v-card class="pa-2" flat>
              <v-btn class="rounded-0" outlined color="primary" @click="write()">작성하기</v-btn>
            </v-card>
          </v-card>
        </v-col> 
        
    </v-row>
    </v-app>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    data() {
        return {
            items_select : '자유게시판',
            items: ['자유게시판', '공지사항', '주요소식'],
            brackets: ['진행 이벤트', '업데이트', '공지사항'],
            brackets_select: '진행 이벤트',
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
            ],
            title: "",
            content: "",
                    
        }
    },
    components: {
      VueEditor
    },
    props: {
      id: {
        type: String,
        default: "quill-container"
      },
      placeholder: {
        type: String,
        default: "내용을 입력해주세요"
      },
      value: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean
      },
      editorToolbar: {
        type: Array,
        default: () => []
      },
      editorOptions: {
        type: Object,
        required: false,
        default: () => ({})
      },
      useCustomImageHandler: {
        type: Boolean,
        default: false
      },
      useMarkdownShortcuts: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      write(){
        alert(this.content);
        alert(this.title);
      }
    }
}
</script>

<style scoped>
    .search-input {
      /* border: 1px solid #9E9E9E; */
    }
</style>