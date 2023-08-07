<template>
    <v-app>
        <div class="loading text-center" v-if="loading">
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
        </div>
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
                <v-card width="1050" class="mx-auto" flat>
                    <v-col cols="12" sm="12" md="12">
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
                                        <v-list-item-subtitle style="position: relative; top: 2px;">{{ board_detail_list.insertDate }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </div>
                        <div class="board-detail-content" style="min-height: 300px;">
                            <div v-html="board_detail_list.content"></div>
                        </div>
                        <div class="like-btn text-center">
                            <div v-if="like_btn">
                            <v-btn class="ma-10" outlined rounded color="grey" @click="changeLikeBtn()">
                                <v-icon color="primary">mdi-thumb-up</v-icon>
                                <span style="position: relative; left: 5px;">10</span>
                            </v-btn>
                            </div>
                            <div v-else>
                            <v-btn class="ma-10" outlined rounded color="grey" @click="changeLikeBtn()">
                                <v-icon color="grey">mdi-thumb-up</v-icon>
                                <span style="position: relative; left: 5px;">10</span>
                            </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="13">
                        <v-subheader style="margin-left: 3px; margin-bottom: 5px; font-weight: bold;">댓글 <span style="color: #2889f1;">{{ board_detail_list.commentCount }}</span> 개</v-subheader>
                        <v-row>
                            <v-textarea
                                class="comment-input rounded-0"
                                prepend-icon="mdi-comment"
                                color="grey"
                                outlined
                                v-model="comment"
                                clearable
                                label="댓글을 입력해주세요"
                                ref="comment"
                                type="text"
                                counter
                                no-resize
                                maxlength="200"
                                height="100"
                                background-color="#F9F9F9"
                            >
                            </v-textarea>
                            <v-btn class="comment-btn rounded-0" text color="black" outlined style="height: 100px; left: 1px;" v-bind="attrs" v-on="on">
                                등록
                            </v-btn>
                        </v-row>
                    </v-col> 
                    <!-- 댓글 리스트 -->
                    <v-list three-line v-if="commentTotal !== ''">
                        <v-card max-height="1000" flat style="margin-bottom: 100px;">
                        <template v-for="(comment_list, index) in comment_list">            
                            <v-list-item v-if="comment_list" :key="comment_list.writer">
                            <v-list-item-avatar>
                                <v-img :src="require('@/assets/boardDetail/igns_logo.png')" style="border: 1px solid #eee;"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-title-title>{{ comment_list.writer }} <span style="color: grey;">(192.138.08.2)</span></v-list-title-title>
                                <br>
                                <v-list-title-sub-title style="padding-bottom: 3px;">{{ comment_list.comment }}</v-list-title-sub-title>
                                <v-list-item-subtitle>{{ comment_list.insert_date }}</v-list-item-subtitle>
                            </v-list-item-content>
                            
                            </v-list-item>
                            <v-divider v-if="comment_list" :key="index"></v-divider>
                        </template>
                    </v-card>
                    </v-list>
                    <v-list three-line v-else>
                        <v-card height="300" flat> 
                                <v-img :src="require('@/assets/boardDetail/commentIcon.svg')" width="75" style="left: 50%; transform: translate(-50%, 0); top: 45px;"></v-img>
                                <div style="margin-top: 70px;">
                                <div class="text-center">댓글이 없습니다.</div>
                                <div class="text-center">첫번째 댓글을 남겨주세요.</div>
                                </div>
                        </v-card>
                    </v-list>
                </v-card> 
            </v-col>
        </v-row>    
    </v-app>
</template>

<script>
import { selectNoticeBoardDetail } from "@/api/noticeBoard/noticeBoard";
export default {
    data () {
        return {
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
            commentTotal: '2',
            comment_list: [
                {
                    writer: '소민환',
                    comment: '안녕하세요',
                    insert_date: '2023.08.20'
                },
                {
                    writer: '소민환',
                    comment: '안녕하세요',
                    insert_date: '2023.08.20'
                },
            ],
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
            ],
        }
    },
    created() {
        
    },
    mounted() {
        this.select()
    },

    methods: {
        changeLikeBtn() {
            this.like_btn =  !this.like_btn;
        },
        select() {
            const data = { id: this.$route.query.board, category: this.$route.query.notice_board }
            selectNoticeBoardDetail(data)
                .then((res) => {
                   this.loading = false,
                   this.board_category = '[공지사항]',
                   this.board_detail_list = res.data.data[0]
                    console.log(res.data.data[0])
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
</style>