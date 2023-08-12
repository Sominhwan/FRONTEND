<template>
<!-- class="ma-12 pa-12" toolbar: flat-->
    <v-app style="position: fixed;">
        <v-toolbar dense elevation="1" height="65px" color="#F9F9F9" style="position: fixed; width: 100%;">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="drawer-icon"></v-app-bar-nav-icon>
            <v-toolbar-title class="menu-text pa-1">메뉴</v-toolbar-title>
         
            <v-row justify="center">
                <v-toolbar-title class="nav-menu " @mouseover="menu = true" @mouseleave="menu = false">메뉴입니다</v-toolbar-title>
            </v-row>

        
                <v-sheet class="search-box" height="50" width="250">
                 <v-text-field class="search-input" flat hide-details solo label="검색" prepend-inner-icon="mdi-magnify"></v-text-field>
                </v-sheet>                       
            <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->         
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" absolute temporary width="350px" style="position: fixed;">
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
      drawer: false,
      group: null,
      sheet: false,
      menu: false,
     
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

    .search-input {
        border-radius: 5px;
        border: 1px solid #eee;
    }


</style>