<template>
    <v-app>
        <v-row justify="center">
        <v-col cols="6" md="5" offset="0" style="position: relative; top: 105px;">
          <v-card class="d-flex" flat tile > 
            <v-row>
              <v-col class="pa-2 mr-auto" cols="12" style="position: relative;">
                <v-select :disabled="btnFlag" class="rounded-0" :items="items" v-model="items_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2 mr-auto" cols="12" sm="2" style="position: relative;">
                <v-select v-select class="rounded-0" :items="brackets" v-model="brackets_select" hide-details solo flat outlined dense></v-select>
              </v-col>
              <v-col class="pa-2" cols="12" sm="10">
                <v-text-field class="search-input rounded-0" maxlength="50" flat hide-details solo dense label="제목" v-model="title"></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col class="pa-2 mr-auto" cols="12">
          <v-card height="590" style="top: 20px;" flat>
            <vue-editor v-model="content" :placeholder="placeholder" style="height: 500px;"></vue-editor>
          </v-card>
        </v-col>
         </v-row>
          <v-card class="d-flex justify-center" flat>
            <v-card class="pa-2" flat>
              <v-btn class="rounded-0" outlined color="grey">취소</v-btn>
            </v-card>
            <v-card class="pa-2" flat>
              <v-btn v-if="!btnFlag" class="rounded-0" outlined color="primary" @click="write()">작성하기</v-btn>
              <v-btn v-if="btnFlag" class="rounded-0" outlined color="primary" @click="update()">수정하기</v-btn>
            </v-card>
          </v-card>
        </v-col> 
    </v-row>
    </v-app>
</template>
<script>
import { insertNoticeBoard, selectBoardContent } from "@/api/noticeBoard/noticeBoard";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
export default {
    data() {
        return {
          items_select : '자유게시판',
          items: ['자유게시판', '공지사항', '주요소식'],
          brackets: ['진행 이벤트', '업데이트', '공지사항'],
          brackets_select: '진행 이벤트',
          cruds: [
              ['Create', 'mdi-plus-outline'],
              ['Read', 'mdi-file-outline'],
              ['Update', 'mdi-update'],
              ['Delete', 'mdi-delete'],
          ],
          title: "",
          content: "",   
          btnFlag: false,   
          noticeId: null,        
        }
    },
    components: {
      VueEditor
    },
    props: {
      id: {
        type: String,
        default: "quill-container"
      },
      placeholder: {
        type: String,
        default: "내용을 입력해주세요"
      },
      value: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean
      },
      editorToolbar: {
        type: Array,
        default: () => []
      },
      editorOptions: {
        type: Object,
        required: false,
        default: () => ({})
      },
      useCustomImageHandler: {
        type: Boolean,
        default: false
      },
      useMarkdownShortcuts: {
        type: Boolean,
        default: false
      }
    },
    created() {
      const noticeId = this.$route.params.noticeId;
      this.noticeId = this.$route.params.noticeId;
      const category = this.$route.params.category;
      if(noticeId != null && category == '공지사항') {
        this.btnFlag = true
        this.items_select = '공지사항'
        this.getBoardContent(noticeId, category) 
      }
      if(noticeId != null && category == '자유게시판') {
        this.btnFlag = true
        this.items_select = '자유게시판'
        this.getBoardContent(noticeId, category)
      }
      if(noticeId != null && category == '주요소식') {
        this.btnFlag = true
        this.items_select = '주요소식'
        this.getBoardContent(noticeId, category)
      }
    },
    mounted() {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    computed: { 
      // 회원정보, 권한 가져오기
      ...mapState(['userInfoData', 'authState']),
    },
    methods: {
      handleBeforeUnload(event) {
        // 새로고침 이벤트를 감지하거나 사용자에게 경고를 표시할 수 있습니다.     
        event.preventDefault();
        event.returnValue = '';
      },
      getBoardContent(noticeId, category) {
        const data = { 'noticeId': noticeId, 'category': category, 'userId': this.userInfoData.userId }
        selectBoardContent(data) 
          .then((res) => {
            console.log(res.data.data)
            this.title = res.data.data.title
            this.content = res.data.data.content
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {

          })
      },
      write(){      
        const data = { 'title': this.title, 'writer': this.userInfoData.nickname, 'content': this.content, 'userId': this.userInfoData.userId }
        if(this.items_select === "공지사항") {
          insertNoticeBoard(data)
            .then((res) => {
              console.log(res.data),
              this.$router.replace({name: 'notice', query: { page:1 }})
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {

            })
        } else if(this.items_select === "자유게시판") {
          alert("자유게시판")
        } else if(this.items_select === "주요소식") {
          alert("주요소식")
        }
      },
      // TODO 20231213 수정하기 추가
      update() {
        const data = { 
          'title': this.title, 
          'writer': this.userInfoData.nickname, 
          'content': this.content, 
          'userId': this.userInfoData.userId, 
          'noticeId': this.noticeId 
        }
        if(this.items_select === "공지사항") {
          console.log(data)
        }
      }
    }
}
</script>

<style scoped>
    @media (max-width: 1200px) {
      .left-banner {display:none}
    } 
    .search-input {
      /* border: 1px solid #9E9E9E; */
    }
</style>