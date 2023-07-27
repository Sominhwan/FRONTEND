<template>
    <v-app>
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
        <v-col cols="6" md="5" offset="0" style="position: relative; top: 50px;">
          <v-card class="rounded-0" flat>
            <v-toolbar flat style="border-bottom: 3px solid #eee;">
           
                <v-col class="" cols="6" sm="2" style="position: relative; right: 30px;">
                    <v-select v-select class="rounded-0" :items="items" label="정렬" solo></v-select>
                </v-col>
                
                <v-col class="ml-auto" cols="12" sm="2" style="position: relative; right: 30px;">
                    <v-select v-select class="rounded-0" :items="items" label="정렬" solo></v-select>
                </v-col>
                <v-col class="ml-auto" cols="12" sm="3" style="position: relative; left: 25px; bottom: 15px;">
                
                <v-text-field class="search-input rounded-0" flat hide-details solo label="검색" prepend-inner-icon="mdi-magnify"></v-text-field>
                
                </v-col>
              
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
            </v-list>
          </v-card>   
        <div class="text-center ma-5">
            <v-pagination v-model="page" :length="5"></v-pagination>
        </div>              
        </v-col> 
        
    </v-row>
    </v-app>
</template>

<script>
export default {
    data () {
        return {
            page: 1,
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
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
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work4',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work5',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work6',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work7',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work8',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work9',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work10',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work11',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work12',
                },
                {
                subtitle: '2023.01.01 23:13',
                title: 'Work13',
                },
            ],  
        }
    }
}
</script>
<style scoped>
 .search-input {
        border-radius: 5px;
        border: 1px solid #eee;
    }
</style>