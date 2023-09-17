<template>
  <div>
    <!-- scroll to top 버튼 -->
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      elevation="0"
      fab
      tile
      dark
      fixed
      bottom
      right
      color="white"
      @click="toTop"
      style="border: 2px solid #eee !important"
    >
      <v-icon color="grey" large>keyboard_arrow_up</v-icon>
    </v-btn>
        <v-row class="mt-3" justify="center" style="position: relative; margin-bottom: 250px; top: 80px;">
          <v-col cols="6" md="5" offset="0">
            <v-carousel class="main-banner" cycle height="350" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item  v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="text-h2">{{ slide }} Slide</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
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
                    <v-icon color="primary" style="margin-right: 20px;">mdi-thumb-up</v-icon>
                    <span style="position: relative; right: 35px; top: 20px; font-size: 13px; color: grey;">7</span> 
                    <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                    <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">7</span>       
                </v-list-item>
                <v-divider></v-divider>        
                <v-subheader></v-subheader>
              </v-list>
            </v-card>    
            <v-card class="notice-container rounded-0" flat >
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
                <v-btn icon @click="$router.push({name: 'noticeDetail', query: { page:1, count: totalPage, category:'최신글순' }})">
                  <v-icon>mdi-view-module</v-icon>
                </v-btn>
              </v-toolbar>
              <v-list class="notice-list" style="border-bottom: 3px solid #eee;">
                <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading"></v-skeleton-loader>
                <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading"></v-skeleton-loader>
                <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading"></v-skeleton-loader>
                <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading"></v-skeleton-loader>
                <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading"></v-skeleton-loader>
                <v-list-item v-for="(notice_board_list, idx) in notice_board_list" :key="idx">
                  <v-list-item-avatar>
                    <v-icon class="blue" dark>mdi-clipboard-text</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span style="color: #2889f1; font-weight: bold; font-size: 16px; margin-right: 10px;">[공지사항]</span>
                      <span class="notice-title" @click="$router.push({name: 'boardView', query: { notice_board: 1, board: notice_board_list.noticeId }})">{{ notice_board_list.title }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">{{ notice_board_list.writer }}</span>{{ notice_board_list.insertDate }}</v-list-item-subtitle>
                  </v-list-item-content>
                    <v-icon color="grey lighten-1" style="margin-right: 20px;">mdi-information</v-icon>
                    <v-icon color="primary" style="margin-right: 20px;">mdi-thumb-up</v-icon>
                    <span style="position: relative; right: 35px; top: 20px; font-size: 13px; color: grey;">{{ notice_board_list.likeCount }}</span> 
                    <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                    <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">{{ notice_board_list.commentCount }}</span>   
                </v-list-item>

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
  </div>
</template>

<script>
import { getBoard, getWeather } from "@/api/main/main";
import { selectNoticePage } from "@/api/noticeBoard/noticeBoard";
  export default {
    data () {
      return {
        fab: false, // 상단 스크롤 이동
        drawer: false,
        group: null,
        sheet: false,
        menu: false,
        loading: true,
        curpage: 1,
        totalpage: '',
        notice_board_list: [],
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
    watch: {
      group () {
        this.drawer = false
      },
    },  
    mounted() {
      this.search();
      this.pageCount();
      this.weather();
    },
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') 
          return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      },
      menuBackground() {
        this.menu = true
      },
      search(){    
        getBoard()
          .then((res) => {
            this.loading = false,
            this.notice_board_list = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {

          })
      },
      pageCount(){    
        selectNoticePage()
          .then((res) => {
            this.totalPage = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {

          })
      },
      weather() {
        getWeather()
          .then((res) => {
            console.log(res.data.data.main);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {

          })
      }
    }
  }
</script>
<style scoped>
  @media (max-width: 1200px) {
    .left-banner {display:none}
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
  .loader {
    margin-bottom: 14px;
  }

  .left-banner {
    z-index: 100;
  }
  .write-btn {
    cursor: pointer;
  }
  .notice-title:hover {
    cursor: pointer;
    text-decoration: underline;

  }
  .notice-container {
    margin-bottom: 50px;
  }
  .notice-list {
    min-height: 330px;
  }
  /* .notice-list {
    min-height: 50px;
  } */
</style>
