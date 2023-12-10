<template>
    <v-app>
        <SnackBar :snackbarValue="snackbarValue" :snackbarContent="snackbarContent"/>
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
        <v-row justify="center">
            <v-col cols="6" md="5" offset="0" style="position: relative; top: 105px;">
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
                <v-card width="1050" class="mx-auto" flat>
                    <v-col cols="12" sm="12" md="12">
                      <!-- 로딩바 -->
                      <div class="loading text-center" v-if="loading">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </div>
                        <div class="board-detail-header">
                            <h4>
                                <span>{{ board_category }}</span>
                            </h4>
                            <h1>
                                <div class="board-detail-title">{{ board_detail_list.title }}</div>
                            </h1>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-avatar style="border: 1px solid #eee;">
                                        <v-img :src="require('@/assets/boardDetail/igns_logo.png')"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-title-title>{{ board_detail_list.writer }}</v-list-title-title>
                                        <v-list-item-subtitle style="position: relative; top: 2px;">{{ board_detail_list.createAt }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-spacer></v-spacer>
                                    <v-list-item-action>
                                      <v-menu v-if="this.noticeBoardUserId == this.userInfoData.userId" offset-y left content-class="elevation-0">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon color="grey">mdi-dots-vertical</v-icon>
                                            </v-btn> 
                                        </template>
                                        <v-card style="border: 1px solid #CCCCCC;" width="90px">                  
                                          <v-list-item  class="notice-update-btn" @click="updateCommentList(commentList.noticeCommentId)">
                                              <v-list-item-content>
                                                  <v-list-item-title style="text-align: center;">수정</v-list-item-title>
                                              </v-list-item-content>
                                          </v-list-item>
                                          <v-divider/>
                                          <v-list-item class="notice-delete-btn" @click="deleteNotice()">
                                              <v-list-item-content>
                                                  <v-list-item-title style="text-align: center;">삭제</v-list-item-title>
                                              </v-list-item-content>
                                          </v-list-item> 
                                        </v-card>
                                      </v-menu>
                                    </v-list-item-action>                                    
                              </v-list-item>
                            </v-list>
                        </div>
                        <div class="board-detail-content" style="min-height: 300px;">
                            <div v-html="board_detail_list.content"></div>
                        </div>
                        <div v-if="!loading" class="like-btn text-center">
                            <div v-if="like_btn">
                            <v-btn class="ma-10" outlined rounded color="grey" @click="updateUnlikeNoticeBoard()" :disabled="this.userInfoData.userId == null">
                                <v-icon color="primary">mdi-thumb-up</v-icon>
                                <span style="position: relative; left: 5px;">{{ likeCount }}</span>
                            </v-btn>
                            </div>
                            <div v-else>
                            <v-btn class="ma-10" outlined rounded color="grey" @click="updateLikeNoticeBoard()" :disabled="this.userInfoData.userId == null">
                                <v-icon color="grey">mdi-thumb-up</v-icon>
                                <span style="position: relative; left: 5px;">{{ likeCount }}</span>
                            </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="13" class="pb-3">
                        <v-subheader style="margin-left: 3px; margin-bottom: 5px; font-weight: bold;">댓글 <span style="color: #2889f1;">{{ commentTotal }}</span> 개</v-subheader>
                        <v-row>
                            <v-textarea
                                class="comment-input rounded-0"
                                prepend-icon="mdi-comment"
                                :disabled="!authState"
                                color="grey"
                                solo
                                outlined
                                v-model="comment"
                                auto-grow
                                flat
                                label="댓글을 입력해주세요"
                                ref="comment"
                                hide-details
                                no-resize
                                maxlength="500"
                                clearable
                                clear-icon="mdi-close-circle"
                                background-color="#F9F9F9"
                                @keydown.enter="saveComment()"
                                @click="() => { emojiFlag = false }"
                            >
                            </v-textarea>
                            <v-btn class="comment-btn rounded-0" @click="saveComment()" text color="black" outlined style="height: 130px; left: 1px;"  v-on="on">
                              등록
                            </v-btn>
                            <AuthDialog v-model="authDialog" v-if="authDialog"></AuthDialog>
                        </v-row>
                        <v-row class="pl-7 pt-1">
                          <v-btn icon @click="openEmojiPicker()">
                          <v-icon>mood</v-icon>
                          </v-btn>
                          <VEmojiPicker v-if="emojiFlag" @select="selectEmoji" style="position: absolute; z-index: 10; margin-top: 35px;"/>
                        </v-row>
                    </v-col> 
                    <!-- 댓글 리스트 -->
                    <v-list three-line v-if="commentTotal !== 0">
                        <v-card max-height="1000" flat style="margin-bottom: 150px;">
                        <template v-for="(commentList, index) in commentList">              
                            <v-list-item v-if="commentList" :key="commentList.nickname">
                            <v-list-item-avatar>
                                <v-img :src="commentList.profileUrl" style="border: 1px solid #eee;"></v-img>
                            </v-list-item-avatar>
                            <template v-if="commentList.noticeCommentId !== updateCommentFlag"> 
                              <v-list-item-content>
                                <v-list-item-subtitle style="font-weight: 500;">{{ commentList.nickname }}</v-list-item-subtitle>
                                <br>
                                <v-list-item-title style="padding-bottom: 3px;">{{ commentList.comment }}</v-list-item-title>
                                <v-list-item-subtitle>{{ commentList.createAt }}</v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-menu v-if="commentList.userId === userInfoData.userId" offset-y left content-class="elevation-0">
                                  <template v-slot:activator="{ on, attrs }">
                                      <v-btn icon v-bind="attrs" v-on="on">
                                          <v-icon color="grey">mdi-dots-vertical</v-icon>
                                      </v-btn> 
                                  </template>
                                  <v-card style="border: 1px solid #CCCCCC;" width="90px">                  
                                    <v-list-item  class="comment-update-btn" @click="updateCommentList(commentList.noticeCommentId)">
                                        <v-list-item-content>
                                            <v-list-item-title style="text-align: center;">수정</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider/>
                                    <v-list-item class="comment-delete-btn" @click="deleteComment(commentList.noticeCommentId)">
                                        <v-list-item-content>
                                            <v-list-item-title style="text-align: center;">삭제</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item> 
                                  </v-card>
                                </v-menu>
                              </v-list-item-action>
                            </template>
                            <template v-else>
                              <div style="width: 100%; display: flex; flex-direction: column;">
                                <v-textarea
                                  :key="index"
                                  color="grey"
                                  placeholder="댓글 추가..."
                                  ref="commentTextArea"
                                  autofocus
                                  auto-grow
                                  rows="1"
                                  dense
                                  :value="commentList.comment"
                                  @input="saveCommentText"
                                ></v-textarea>
                                <v-sheet>
                                  <v-icon class="comment-list-emoji mb-3" size="22px" @click="openCommentListEmojiPicker()">mood</v-icon>
                                  <VEmojiPicker v-if="commentListEmojiFlag" @select="selectCommentListEmoji" style="position: absolute; z-index: 9; margin-top: 35px;"/>
                                  <span style="float: right;">
                                    <v-btn text small rounded @click="() => { updateCommentFlag = 0, saveCommentBtnFlag = false, commentListEmojiFlag = false }">
                                      취소
                                    </v-btn>
                                    <v-btn :disabled="saveCommentBtnFlag" text small rounded color="primary" @click="updateComment(commentList.comment, commentList.noticeCommentId)">
                                      저장
                                    </v-btn>
                                  </span>
                                </v-sheet>
                              </div>
                            </template>
                            </v-list-item>
                            <!-- <v-divider v-if="commentList" :key="index"></v-divider> -->
                        </template>
                        </v-card>
                    </v-list>
                    <v-list three-line v-else>
                      <v-card height="400" flat> 
                        <v-img :src="require('@/assets/boardDetail/commentIcon.svg')" width="75" style="left: 50%; transform: translate(-50%, 0); top: 45px;"></v-img>
                        <div style="margin-top: 70px;">
                        <div class="text-center">댓글이 없습니다.</div>
                        <div class="text-center">첫번째 댓글을 남겨주세요.</div>
                        </div>
                      </v-card>
                    </v-list>
                    <!-- 하단 공지사항 리스트 -->
                    <v-toolbar flat style="border-bottom: 2px solid #eee; top: 20px;">
                      <v-toolbar-title style="font-weight: bold; font-size: 18px;">공지사항</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn class="notice-btn" icon @click="$router.push({name: 'notice', query: { count: totalPage, page:1, category:'최신글순' }})">
                        <v-icon>mdi-view-module</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-carousel class="notice_delimiter" height="400px" v-model="model" hide-delimiter-background :show-arrows="false" style="margin-bottom: 200px;">
                      <v-carousel-item v-for="notice_list in 3" :key="notice_list">
                          <v-row class="fill-height" align="center" justify="center">
                            <v-col cols="12" md="12" offset="0">
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
                              </v-list>
                            </v-col>
                          </v-row>
                      </v-carousel-item>
                    </v-carousel>
                </v-card> 
            </v-col>
        </v-row>    
    </v-app>
</template>

<script>
import {
deleteNoticeBoard,
deleteNoticeComment,
insertNoticeComment,
likeNoticeBoard,
selectNoticeBoardDetail,
selectNoticeBoardDetailList,
selectNoticeComment,
unlikeNoticeBoard,
updateNoticeComment
} from "@/api/noticeBoard/noticeBoard";
import AuthDialog from '@/components/AuthDialog';
import SnackBar from '@/components/snackbar/SnackBar.vue';
import { VEmojiPicker } from 'v-emoji-picker';
import { mapState } from "vuex";
export default {
    data () {
        return {
          authDialog: false,
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
          fab: false,
          loading: true,
          board_category : '',
          board_detail_list: {},
          like_btn: false,
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
          commentTotal: 0,
          commentList: [],
          comment: '', // 댓글 내용
          cruds: [
              ['Create', 'mdi-plus-outline'],
              ['Read', 'mdi-file-outline'],
              ['Update', 'mdi-update'],
              ['Delete', 'mdi-delete'],
          ],
          model: 0, // 하단 공지사항 리스트
          notice_list: [
            '1','2','3'
          ],
          likeCount: 0,
          snackbarValue: false,
          snackbarContent: '',
          updateCommentFlag: 0,
          commentText: null,
          saveCommentBtnFlag: false,
          emojiFlag: false,
          commentListEmojiFlag: false,
          noticeBoardUserId: null,
        }
    },
    components: {
      AuthDialog,
      SnackBar,
      VEmojiPicker
    },
    computed: {
      ...mapState(['userInfoData', 'authState']),
    },
    watch: {
      commentText(val) {
        if(val === null || val === '') {
          this.saveCommentBtnFlag = true
        } else{
          this.saveCommentBtnFlag = false
        }
      },

    },
    created() {
        
    },
    mounted() {
      this.selectNoticeCommentList()
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
      async selectNoticeBoardList() {
        let data = {};
          if(this.userInfoData.userId != null) {
            data = { 'noticeId': this.$route.query.board, 'userId': this.userInfoData.userId  }
          } else {
            data = { 'noticeId': this.$route.query.board, 'userId': null  }
          }
          await selectNoticeBoardDetail(data)
              .then((res) => {
                console.log(res.data.data)
                this.loading = false,
                this.board_category = '[공지사항]',
                this.board_detail_list = res.data.data
                this.likeCount = res.data.data.likeCount
                this.like_btn = res.data.data.likeCheck
                this.noticeBoardUserId = res.data.data.userId
              })
              .catch((error) => {
                console.log(error)
              })
              .finally(() => {

              })
      },
      async selectNoticeCommentList() {
          const param = {'noticeId': this.$route.query.board}
          await selectNoticeComment(param)
            .then((res) => {
                console.log(res.data.data)
                this.commentTotal = res.data.data.length
                this.commentList = res.data.data
                this.snackbarValue = false
              })
              .catch((error) => {
                console.log(error)
              })
              .finally(() => {
                this.selectNoticeBoardList()
              })
      },
      noticeBoardList() {
        const data = { id: this.$route.query.board }
        selectNoticeBoardDetailList(data)
          .then((res) => {
            console.log(res.data);
              // this.loading = false,
              // this.board_category = '[공지사항]',
              // this.board_detail_list = res.data.data[0]
              // console.log(res.data.data[0])
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {

          })
      },
      deleteNotice() {
        const isConfirmed = confirm('댓글을 삭제하시겠습니까?')
        const data = { 'noticeId': this.$route.query.board, 'userId': this.userInfoData.userId }
        if(isConfirmed) {
          deleteNoticeBoard(data) 
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {

            })   
        }     
      },
      saveComment() {
        if(!this.authState) { // 비로그인 상태시
          document.documentElement.style.overflow = 'hidden'
          this.authDialog = true
        } else { // 로그인 상태시
          if(this.comment === '' || this.comment === null) {
            alert('댓글을 입력해주세요')
            this.$refs.comment.focus()
          } else {
            const data = {'comment': this.comment, 'noticeId': this.$route.query.board, 'userId': this.userInfoData.userId }
            insertNoticeComment(data)
              .then((res) => {
                console.log(res.data.code)
                this.comment = ''
                this.selectNoticeCommentList()
              })
              .catch((error) => {
                console.log(error)
              })
              .finally(() => {

              })
          }
        }
      },
      updateComment(comment, noticeCommentId) {   
        this.saveCommentBtnFlag = false 
        this.commentText =  this.$refs.commentTextArea[0].value
        if(this.commentText === null)
          this.commentText = comment
        const data = {'comment': this.commentText, 'noticeId': this.$route.query.board, 'noticeCommentId': noticeCommentId, 'userId': this.userInfoData.userId }
        console.log(data)
        updateNoticeComment(data)
          .then((res) => {
            if(res.data.code === 0) {
              this.updateCommentFlag = 0
              this.selectNoticeCommentList()
            }
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            this.commentText = null
            this.commentListEmojiFlag = false
          })
      },
      saveCommentText(e) {
        this.commentText = e
      },
      deleteComment(val) {
        const data = { 'noticeCommentId': val }
        const isConfirmed = confirm('댓글을 삭제하시겠습니까?')
        if(isConfirmed) {
          deleteNoticeComment(data)
            .then((res) => {
              this.snackbarValue = true
              this.snackbarContent = res.data.message
              this.selectNoticeCommentList()
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {

            })
        }
      },
      updateCommentList(value) {
        this.updateCommentFlag = value
      },
      openEmojiPicker() {
        this.emojiFlag = !this.emojiFlag
      },
      openCommentListEmojiPicker() {
        this.commentListEmojiFlag = !this.commentListEmojiFlag
      },
      selectEmoji(emoji) {
        this.comment = this.comment + emoji.data
        this.$refs.comment.focus()
      },
      selectCommentListEmoji(emoji) {
        this.$refs.commentTextArea[0].value = this.$refs.commentTextArea[0].value + emoji.data
        this.$refs.commentTextArea[0].focus()
        this.saveCommentBtnFlag = false
      },
      updateLikeNoticeBoard() {
        this.like_btn =  !this.like_btn;
        const data = { 'noticeId': this.$route.query.board, 'userId': this.userInfoData.userId }
        likeNoticeBoard(data)
          .then((res) => {
            this.likeCount = res.data.data
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {

          })
      },
      updateUnlikeNoticeBoard() {
        this.like_btn =  !this.like_btn;
        const data = { 'noticeId': this.$route.query.board, 'userId': this.userInfoData.userId }
        unlikeNoticeBoard(data)
          .then((res) => {
            this.likeCount = res.data.data
          })
          .catch((error) => {
            console.log(error)
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
    .board-detail-header {
      padding-top: 20px;
      padding-bottom: 20px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    .board-detail-title {
      font-weight: normal;
    }
    .board-detail-content {
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .comment-btn {
      border-color: black !important;
    }
    .v-progress-circular {
      margin: 1rem;
    }
    .loading {
      z-index: 2;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .notice-btn{
      right: 10px;
    }
    .notice_delimiter .v-carousel__controls__item {
      width: 15px;
      height: 15px;
      color: transparent !important;
       background: #eee !important
    }
    .notice_delimiter .v-btn--active {
      background-color: #2889f1 !important;
    }
    .notice-delete-btn {
      cursor: pointer;
    }
    .notice-update-btn {
      cursor: pointer;
    }
    .comment-delete-btn {
      cursor: pointer;
    }
    .comment-update-btn {
      cursor: pointer;
    }
    .comment-list-emoji {
      cursor: pointer;
    }
</style>