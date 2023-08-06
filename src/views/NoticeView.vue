<template>
    <v-app>
        <v-row>
        <v-col cols="6" md="2" offset="2">
            <v-card class="mx-auto rounded-0" width="300" height="1380" flat style="border-right:1px solid #eee;">
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
          <v-carousel
            :continuous="false"
            :cycle="cycle"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="275"
            style="margin-bottom: 15px;"
          >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet :color="colors[i]" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">{{ slide }} Slide</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <v-card class="d-flex" color="" flat tile style="border-bottom: 1px solid #eee;"> 
              <v-col class="pa-2 mr-auto" cols="6" sm="2" style="position: relative;">
                <v-select v-select class="rounded-0" :items="items" v-model="items_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2" cols="12" sm="2" outlined tile>
                <v-select v-select class="rounded-0" :items="search_items" v-model="search_items_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2" cols="12" sm="3">
                <v-text-field class="search-input rounded-0" flat hide-details solo dense label="검색" prepend-inner-icon="mdi-magnify"></v-text-field>
              </v-col>
            </v-card>
          <!-- 공지사항 목록 -->  
          <v-card class="rounded-0" flat>
            <v-list>
              <v-list-item v-for="(notice_board_list, idx) in notice_board_list" :key="idx">
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark>
                    mdi-folder
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title><span style="color: #2889f1; font-weight: bold; font-size: 16px; margin-right: 10px;">[진행 이벤트]</span><span class="notice-title" @click="$router.push({name: 'boardView', query: { notice_board: 1, board: notice_board_list.noticeId }})">{{ notice_board_list.title }}</span></v-list-item-title>
                  <v-list-item-subtitle><span style="font-size: 14px; margin-right: 30px;">{{ notice_board_list.writer }}</span>{{ notice_board_list.insertDate }}</v-list-item-subtitle>
                </v-list-item-content>  
                  <v-icon color="orange lighten-1" style="margin-right: 20px;">mdi-information</v-icon>
                  <v-icon color="primary" style="margin-right: 20px;">mdi-thumb-up</v-icon>
                  <span style="position: relative; right: 35px; top: 20px; font-size: 13px; color: grey;">{{ notice_board_list.likeCount }}</span> 
                  <v-icon color="grey lignten-2">mdi-message-text</v-icon>
                  <span style="position: relative; right: 15px; top: 20px; font-size: 13px; color: grey;">{{ notice_board_list.commentCount }}</span>       
              </v-list-item>
              <v-divider></v-divider>      
            </v-list>
          </v-card>               
        </v-col>
        <v-col cols="11" md="0" offset="1" style="position: relative; bottom: 40px;">
          <div class="text-center ma-5">
            <v-pagination v-model="page" :length="this.totalPage" @input="changePage()"></v-pagination>
          </div>  
        </v-col>
    </v-row>
    </v-app>
</template>

<script>
import { selectNoticeBoard } from "@/api/noticeBoard/noticeBoard";
export default {
    data () {
        return {
            page: this.$route.query.page,
            totalPage: 0,
            notice_board_list: [],
            colors: [
              'green',
              'secondary',
              'yellow darken-4',
              'red lighten-2',
              'orange darken-1',
            ],
            cycle: false,
            slides: [
              'First',
              'Second',
              'Third',
              'Fourth',
              'Fifth',
            ],
            items_select : '최신글순',
            items: ['최신글순', '많은댓글순', '좋아요순'],
            search_items: ['제목', '글 작성자'],
            search_items_select: '제목',
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
            ],
        }
    },
    beforeCreate() {
      this.page = this.$route.query.page;
    },
    mounted() {
      this.search(this.page) // 공지사항 페이지 시작시 데이터 불러옴
    },
    methods: {
      async search(curPage){    
        await selectNoticeBoard(curPage)
          .then((res) => {
            history.pushState(null, null, 'detail?page='+this.page);
            this.notice_board_list = res.data.data.noticeBoardList,
            this.totalPage = res.data.data.totalPage
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {

          })
      },
      changePage(){
        this.search(this.page)
      }
    }
}
</script>
<style scoped>
    .search-input {
      border: 1px solid #9E9E9E;
    }

    .notice-title {
      cursor: pointer;
    }
    .notice-title:hover {
      text-decoration: underline;
    }

</style>