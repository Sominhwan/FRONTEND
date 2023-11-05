<template>
  <v-app>   
    <v-row justify="center">
      <v-col cols="12" md="5" offset="0" style="position: relative; top: 105px;">
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
        <v-card class="rounded-0" flat style="min-height:1000px">
          <div v-for="index in 15" :key="index">
          <v-skeleton-loader class="loader" type="list-item-avatar" v-if="loading" style="margin-top: 15px;"></v-skeleton-loader>
          </div>
          <v-list class="notice-list" style="border-bottom: 1px solid #eee;"  v-for="(notice_board_list, idx) in notice_board_list" :key="idx" >
            <!-- 로딩바 -->
            <!-- <div class="loading text-center" v-if="loading">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div> -->
            <!-- <v-list-item v-if="loading">
              <v-list-item-avatar>
                <v-skeleton-loader class="loader" type="list-item-avatar"></v-skeleton-loader>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-skeleton-loader type="text"></v-skeleton-loader>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->

            <v-list-item>
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
          </v-list>
        </v-card> 
        <!-- 페이징처리 버튼 -->
        <v-list style="margin-bottom: 200px;">
          <ul class="paging-ul">
            <router-link class="prev-btn" :id="page == 1 ? activeBtnCss : ''" :to="{ name: 'noticeDetail', query: { page: page - 1, count: totalPage, category: this.$route.query.category }}">
              이전
            </router-link>
              <div v-for="idx in parseInt(this.totalPage)" :key="idx">
                <li :class="page == idx ? activePageCSS : ''" @click="changePage2(idx)"><span>{{ idx }}</span></li>
              </div>
            <router-link class="next-btn" :id="page == totalPage ? activeBtnCss : ''" :to="{ name: 'noticeDetail', query: { page: page + 1 , count: totalPage, category: this.$route.query.category }}">
              다음
            </router-link>
          </ul>
        </v-list>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { selectNoticeBoard } from "@/api/noticeBoard/noticeBoard";
export default {
  props: { 
    page: {
      type: String
    },
  },
  data () {
    return {
      pagingBtn: 0,
      loading: true,
      paging: 0,
      totalPage: this.$route.query.count,
      notice_board_list: [],
      activePageCSS: 'on',
      activeBtnCss: 'disabled-link',
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
      items_select : this.$route.query.category,
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
  watch: {
    items_select: function() {
      this.changePage()
    }
  },
  created() {
    if(this.items_select == '최신글순' || this.items_select == '많은댓글순' || this.items_select == '좋아요순') {
      this.search(this.page, this.items_select) // 공지사항 페이지 시작시 데이터 불러옴
    } else {
      this.$router.push({name: 'error404'})
    }
  },
  mounted() {
   console.log(this.totalPage)
   console.log(this.page)
   console.log(this.items_select)
  },
  methods: {
    search(curPage, category){    
      selectNoticeBoard(curPage, category)
        .then((res) => {
          if(res.data.data.noticeBoardList == '' ||  this.totalPage != res.data.data.totalPage || curPage == null || curPage == ''){ // url 값에 대한 error404 페이지 반환
            this.$router.push({name: 'error404'})
          }
          this.loading = false,
          this.notice_board_list = res.data.data.noticeBoardList
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {

        })
    },
    // 카테고리에 대한 url 반환
    changePage(){
        this.$router.push({name: 'noticeDetail', query: { page: this.page, count: this.totalPage, category: this.items_select}})
    },
    // 페이징 버튼을 통한 url 반환
    changePage2(page){
        this.$router.push({name: 'noticeDetail', query: { page: page, count: this.totalPage, category: this.items_select}}).catch(() => {})
    }
  }
}
</script>
<style scoped>
  @media (max-width: 1200px) {
    .left-banner {display:none}
  } 
  .search-input {
    border: 1px solid #9E9E9E;
  }
  .notice-title {
    cursor: pointer;
  }
  .notice-title:hover {
    text-decoration: underline;
  }
  .notice-list {
    padding: 0px;
  }
  .loading {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #disabled-link {
    pointer-events: none; /* 클릭 이벤트 비활성화 */
    cursor: not-allowed; /* 커서 모양 변경 */
    opacity: 0.6; /* 링크 비활성화 시 투명도 적용 */
  }
  .prev-btn {
    position: relative;
    text-decoration: none;
    font-size: 14px;
    color: black;
    padding: 10px 15px; 
  }
  .next-btn {
    position: relative;
    text-decoration: none;
    font-size: 14px;
    color: black;
    padding: 10px 15px; 
  }
  .paging-ul {
    display: flex; 
    justify-content: center; 
    align-items: center;
  }
  .paging-ul li {
    cursor: pointer;
    padding: 10px 15px;   
    list-style: none;
  }
  .paging-ul li span{
    font-size: 14px;
    color: black;
  }
  .paging-ul li.on {
    outline: solid 1px #0073e6;
    transition: outline-color 0.2s ease;
    border-radius: 5px;
  }
  #paging {
    margin: 5px;
  }
  #paging-ul li.on  {
    color: #0073e6;
  }
</style>