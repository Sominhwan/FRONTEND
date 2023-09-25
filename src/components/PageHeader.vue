<template>
<!-- class="ma-12 pa-12" toolbar: flat-->
    <v-app style="position: fixed;">
        <v-app-bar dense elevation="0" height="65px" color="#363636" style="position: fixed; ">
            <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="drawer-icon"></v-app-bar-nav-icon> -->
            <v-app-bar-nav-icon @click.stop="mini = !mini" class="drawer-icon" color="white"></v-app-bar-nav-icon>
            <v-toolbar-title class="header-main-icon pa-1" @click="$router.push({name: 'home'})" style="color:white;">메인</v-toolbar-title>
            <v-spacer/>
              <v-text-field class="search-input shrink mx-4" flat hide-details solo dense label="검색" prepend-inner-icon="mdi-magnify"></v-text-field>    
            <v-btn icon>
                <v-icon color="white">mdi-heart</v-icon>
            </v-btn>
            <!-- nav 우측 메뉴 -->
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon color="white">mdi-dots-vertical</v-icon>
                    </v-btn> 
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ userInfoData.username }}</v-list-item-title>
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
                            <v-icon class="material-icons" color="">
                                {{ item.icon }}
                            </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-avatar>
                            <!-- <v-img :src="item.avatar"></v-img> -->
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            dark
            :mini-variant.sync="mini"
            permanent
            width="350px"
            style="margin-top: 65px;"
            >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ userInfoData.username }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-group v-model="selectedItem" mandatory>        
                <v-list nav><!-- dense 추가시 margin 좁아짐-->
                    <v-list-item :value="item.title" @click="selectItem(item.title, item.link, item.page, item.count, item.category)" v-for="item in side_items"  :key="item.title" :class="{ 'selected': selectedItem === item.title }">
                        <v-list-item-icon class="item-icon">
                            <v-icon size="25">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content class="item-content">
                            <v-list-item-title style="font-weight: bold; font-size: 16px;">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list-item-group>
            <v-list-item>
                <v-list-item-icon>
                        <v-icon size="25">login</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <LoginDialog style="position: absolute; top: 40%; left: 80px; "/>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-pencil
                        </v-icon> 
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item class="write-btn" @click="$router.push({name: 'write'})" style="background-color: #2889f1;">
                            <div style="display: flex; margin: auto;">
                                <v-list-item-title style="font-size: 15px; color: white; font-weight: bold;">글 쓰기</v-list-item-title> 
                            </div>    
                        </v-list-item>
                </v-list-item-content>     
            </v-list-item>

            <template v-slot:append>
                <v-list  style="position: fixed; bottom: 0; width: 100%;">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon size="25">logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-btn block class="white--text darken-3" @click="openLoginDialog()" >
                                인증테스트
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

    </v-app>
</template>
<script>
import LoginDialog from '@/components/LoginDialog';
import { mapState } from "vuex";
export default {
    data: () => ({
      selectedItem: '', // 초기에 선택된 아이템은 없음
      mini: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      drawer: false,
      group: null,
      sheet: false,
      //totalPage: this.$route.query.count,
      //loginBtn: false,
      items: [
          { icon: 'account_circle', title: '계정관리', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { icon: 'help', title: '고객센터', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { icon: 'settings', title: '설정', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { icon: 'logout', title: '로그아웃', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      side_items: [
          { icon: 'home', title: '홈', link: 'home'},
          { icon: 'mdi-clipboard-text', title: '공지사항', link: 'noticeDetail', page: 1, count: 2, category: '최신글순'},
          { icon: 'settings', title: '설정'},
          { icon: 'logout', title: '로그아웃'},
      ],
    }),
    comments: {
        LoginDialog
    },
    components: { 
        LoginDialog 
    },
    computed: {
        // 회원정보 가져오기
        ...mapState(['userInfoData'])
    },
    mounted() {
        const currentPath = this.$route.path;
        const pathSegments = currentPath.split('/');
        const item = pathSegments[1];
        if(item == 'home') {
            this.selectedItem = '홈'
        } else if(item == 'notice' || item == 'board_view') {
            this.selectedItem = '공지사항'
        } else {
            this.selectedItem = '';
        }
        // // 회원정보 가져오기
        // this.$store.dispatch('userInfo');
    },
    methods: {
        menuBackground() {
            this.menu = true
        },
        openLoginDialog() {
            this.$store.dispatch('userInfo').then(() => { console.log('데이터 가져오기 성공')})
        },
        selectItem(title, link, page ,count, category) {
            this.$router.push({
                name: link, 
                query: { page: page, count: count, category: category }
            }, () => {});
        },

    },
    watch: {
      group () {
        this.drawer = false
      },
    },   
}
</script>

<style scoped> 
    .nav-content:hover {
        cursor: pointer;
        color: #1877F2;
    }
    .header-main-icon:hover {
        cursor: pointer;
    }
    .search-input {
        border-radius: 5px;
        /* border: 3px solid #eee; */
    }
    v-text-field {
        width: 200px;
    }
    /* 왼쪽 네비바 border 없애기 */
    .v-navigation-drawer >>> .v-navigation-drawer__border {
        display: none
    }
    .router-link-active {
        color: inherit;
    }
</style>
