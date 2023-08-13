<template>
<!-- class="ma-12 pa-12" toolbar: flat-->
    <v-app style="position: fixed;">
        <v-app-bar dense elevation="1" height="65px" color="#F9F9F9" style="position: fixed; width: 100%; z-index: 1000;">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="drawer-icon"></v-app-bar-nav-icon>
            <v-toolbar-title class="header-main-icon pa-1" @click="$router.push({name: 'home'})">메인</v-toolbar-title>
            <v-spacer/>
              <v-text-field class="search-input shrink mx-3" flat hide-details solo label="검색" prepend-inner-icon="mdi-magnify"></v-text-field>
            <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->         
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <!-- nav 우측 메뉴 -->
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn> 
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>SMH</v-list-item-title>
                                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                            <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item v-for="item in items" :key="item.title" link>
                            <v-list-item-icon>
                            <v-icon v-if="item.icon" color="pink">
                                mdi-star
                            </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary width="350px" style="position: fixed; z-index: 1001;">
            <v-list dense>
                <v-list-item-group v-model="group">
                <v-list-item class="px-4">
                    <v-list-item-title>Foo</v-list-item-title>
                </v-list-item>
                <v-list-item class="px-4">
                    <v-list-item-title>Bar</v-list-item-title>
                </v-list-item>
                <v-list-item class="px-4">
                    <v-list-item-title>Fizz</v-list-item-title>
                </v-list-item>
                <v-list-item class="px-4" >
                    <v-list-item-title>Buzz</v-list-item-title>
                </v-list-item>
                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <div class="pa-5">
                <v-btn block class="white--text grey darken-3"  >
                    Logout
                </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <!-- <v-top-sheet hide-overlay></v-top-sheet> -->  
    </v-app>
</template>
<script>
export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      drawer: false,
      group: null,
      sheet: false,
      items: [
          { icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
     
    }),
    methods: {
        menuBackground() {
            this.menu = true
        }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },   
}
</script>
<style scoped> 
    .drawer-icon:hover {
        color: #1877F2;
    }
    .nav-content:hover {
        cursor: pointer;
        color: #1877F2;
    }
    .header-main-icon:hover {
        cursor: pointer;
    }
    .search-input {
        border-radius: 5px;
        border: 1px solid #eee;
    }
    v-text-field {
        width: 200px;
    }

</style>