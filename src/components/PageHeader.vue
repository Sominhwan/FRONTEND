<template>
<!-- class="ma-12 pa-12" toolbar: flat-->
    <div class="">
        <v-toolbar dense flat height="65px" color="#F9F9F9">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="drawer-icon"></v-app-bar-nav-icon>
            <v-toolbar-title class="menu-text pa-1">메뉴</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="nav-menu pa-5" @mouseover="menu = true" @mouseleave="menu = false">메뉴</v-toolbar-title>
            <v-toolbar-title class="nav-menu2 pa-5" @mouseover="menu = true" @mouseleave="menu = false">메뉴</v-toolbar-title>  
            <v-toolbar-title class="nav-menu3 pa-5">메뉴</v-toolbar-title>  
            <v-toolbar-title class="nav-menu4 pa-5">메뉴</v-toolbar-title>  
              
            <div v-if="menu" class="menu-container rounded-0" flat @mouseover="menuBackground()">
                
                <!-- <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Single-line item</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Two-line item</v-list-item-title>
                    <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>

                <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>Three-line item</v-list-item-title>
                    <v-list-item-subtitle>
                    Secondary line text Lorem ipsum dolor sit amet,
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    consectetur adipiscing elit.
                    </v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item> -->
            </div> 
 

            <v-spacer></v-spacer>
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
        <v-navigation-drawer v-model="drawer" absolute temporary width="350px">
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
    </div>
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
    @media (max-width: 530px) {

    }
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
    .menu-container {
 
        position: absolute;
        top: 65px;
        left: 0px;
        height: 500px;
        width: 100%;
        background-color: #eee;

        /* opacity: 0;*/
        transition: opacity 0.7s ease;  
    }
    /* .menu-container:hover{
        opacity: 1;
        display: block;
    }
    .nav-menu:hover {
        cursor: pointer;
        color: #1877F2;    
    }      */
    .nav-menu:hover .menu-container{     
        /* opacity: 1;      */
        /* visibility: visible; */
    }

</style>