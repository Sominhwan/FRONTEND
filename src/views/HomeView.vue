<template>
  <v-app>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item  v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
        <v-row>
          <v-col cols="6" md="2" offset="2">
            <v-card class="mx-auto rounded-0" width="300" height="1300" flat style="border-right:1px solid #eee;">
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
              <v-list-item class="write-btn ma-3 pa-2" @click="$router.push({name: 'notice'})" style="background-color: #2889f1;">
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
        <v-col cols="6" md="5" offset="0">
          <v-card class="rounded-0" flat>
            <v-toolbar flat style="border-bottom: 3px solid #eee;">
              <v-toolbar-title style="font-weight: bold; font-size: 18px;">주요소식</v-toolbar-title>
              <v-spacer></v-spacer>
              <ul style="list-style-type: none; position: absolute; width: 120px; bottom: 20px; left:88%; transform: translate(-50%, 0%);">
                <li>
                  <!-- <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled="curpage===1"
                    @click="prevPage"
                  >
                  〈 
                  </btn>
                  {{curpage}} / {{totalpage}} 
                  <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled ="curpage-1 >= totalpage -1"
                    @click="nextPage"
                  >
                  〉
                  </btn> -->
                </li>
              </ul>
              <v-btn icon @click="$router.push({name: 'notice'})">
                <v-icon>mdi-view-module</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list>
              <v-list-item v-for="folder in folders" :key="folder.title">
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark>
                    mdi-folder
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title><span style="color: #2889f1; font-weight: bold; font-size: 16px; margin-right: 10px;">[진행 이벤트]</span>{{ folder.title }}</v-list-item-title>
                  <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">GM사무국</span>{{ folder.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>  
                  <v-icon color="orange lighten-1" style="margin-right: 20px;">mdi-information</v-icon>
                  <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                  <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">7</span>       
              </v-list-item>
              <v-divider></v-divider>        
              <v-subheader></v-subheader>
            </v-list>
          </v-card>    
          <v-card class="rounded-0" flat>
            <v-toolbar flat style="border-bottom: 3px solid #eee;">
              <v-toolbar-title style="font-weight: bold; font-size: 18px;">공지사항</v-toolbar-title>
              <v-spacer></v-spacer>
              <ul style="list-style-type: none; position: absolute; width: 120px; bottom: 20px; left:88%; transform: translate(-50%, 0%);">
                <li>
                  <!-- <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled="curpage===1"
                    @click="prevPage"
                  >
                  〈 
                  </btn>
                  {{curpage}} / {{totalpage}} 
                  <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled ="curpage-1 >= totalpage -1"
                    @click="nextPage"
                  >
                  〉
                  </btn> -->
                </li>
              </ul>
              <v-btn icon @click="$router.push({name: 'notice'})">
                <v-icon>mdi-view-module</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list>
              <v-list-item v-for="file in files" :key="file.title">
                <v-list-item-avatar>
                  <v-icon :class="file.color" dark>{{ file.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title><span style="color: #2889f1; font-weight: bold; font-size: 16px; margin-right: 10px;">[공지사항]</span>{{ file.title }}</v-list-item-title>
                  <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">GM사무국</span>{{ file.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
                  <v-icon color="grey lighten-1" style="margin-right: 20px;">mdi-information</v-icon>
                  <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                  <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">7</span>   
              </v-list-item>
              <v-divider></v-divider>
              <v-subheader></v-subheader>
            </v-list>
          </v-card> 
          <v-card class="rounded-0" flat>
            <v-toolbar flat style="border-bottom: 3px solid #eee;">
              <v-toolbar-title style="font-weight: bold; font-size: 18px;">최근 게시물</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn> -->
              <ul style="list-style-type: none; position: absolute; width: 120px; bottom: 20px; left:88%; transform: translate(-50%, 0%);">
                <li>
                  <!-- <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled="curpage===1"
                    @click="prevPage"
                  >
                  〈 
                  </btn>
                  {{curpage}} / {{totalpage}} 
                  <btn
                    color="grey darken-4"
                    large
                    plain
                    :disabled ="curpage-1 >= totalpage -1"
                    @click="nextPage"
                  >
                  〉
                  </btn> -->
                </li>
              </ul>
              <v-btn icon @click="$router.push({name: 'notice'})">
                <v-icon>mdi-view-module</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list>
              <v-list-item v-for="file in files" :key="file.title">
                <v-list-item-avatar>
                  <v-icon :class="file.color" dark>{{ file.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ file.title }}</v-list-item-title>
                  <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">홍길동</span>{{ file.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
                  <v-icon color="primary" style="margin-right: 20px;">mdi-thumb-up</v-icon>
                  <span style="position: relative; right: 35px; top: 20px; font-size: 13px; color: grey;">7</span>   
                  <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                  <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">7</span>   
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
          </v-card>                
        </v-col>       
      </v-row>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        curpage: 1,
        totalpage: 4,
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
        ],
        cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
        ],
        files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: '2023.01.01 23:13',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: '2023.01.01 23:13',
          title: 'Kitchen remodel',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: '2023.01.01 23:13',
          title: 'Kitchen2 remodel',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: '2023.01.01 23:13',
          title: 'Kitchen3 remodel',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: '2023.01.01 23:13',
          title: 'Kitchen4 remodel',
        },
      ],
      folders: [
        {
          subtitle: '2023.01.01 23:13',
          title: 'Photos',
        },
        {
          subtitle: '2023.01.01 23:13',
          title: 'Recipes',
        },
        {
          subtitle: '2023.01.01 23:13',
          title: 'Work',
        },
        {
          subtitle: '2023.01.01 23:13',
          title: 'Work2',
        },
        {
          subtitle: '2023.01.01 23:13',
          title: 'Work3',
        },
      ],  
      }
    },
  }
</script>
<style scoped>
  .write-btn{
    cursor: pointer;
  }
</style>
