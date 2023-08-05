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
                <v-card width="1050" class="mx-auto">
                    <v-col cols="12" sm="12" md="12">
                        <div>sks,ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdaddsadasds</div>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field
                            prepend-icon="mdi-comment"
                            color="indigo"
                            outlined
                            v-model="comment"
                            clearable
                            label="댓글을 입력해주세요"
                            ref="comment"
                            type="text"
                            style="border-radius: 3px;"
                            counter
                            maxlength="100"
                            height="90"
                        >
                        <template v-slot:append-outer>
                            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="50" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text color="indigo" style="height:20px" v-bind="attrs" v-on="on">
                                        등록
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-text-field label="닉네임" outlined color="indigo" ref="nickName" v-model="nickName"></v-text-field>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="menu = false">취소</v-btn>
                                        <v-btn color="indigo" text @click="getIpAddress">올리기</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </template>
                        </v-text-field>
                    </v-col> 
                    <!-- 댓글 리스트 -->
                    <v-list three-line v-if="commentTotal !== ''">
                        <v-subheader>{{ commentTotal }}</v-subheader>
                        <br>
                        <template v-for="(comment_list, index) in comment_list">
                    
                            <v-list-item v-if="comment_list" :key="comment_list.writer">
                            <v-list-item-avatar>
                                <!-- <v-img :src="require('@/assets/igns_logo.png')"></v-img> -->
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
                    </v-list>
                    <v-list three-line v-else>
                        <div class="container" style="position: relative; width: 40%; height: 280px; bottom: 10px;">
                            <v-img :src="require('@/assets/boardDetail/commentIcon.svg')" width="75" style="left: 50%; transform: translate(-50%, 0); top: 45px;"></v-img>
                            <div style="position: relative; color: #5E5E5E; font-size: 20px; font-family: 'Helvetica', sans-serif; font-weight: lighter; left: 50%; top: 80px; transform: translate(-22%, 0);">댓글이 없습니다.</div>
                            <div style="position: relative; color: #5E5E5E; font-size: 20px; font-family: 'Helvetica', sans-serif; font-weight: lighter; left: 50%; top: 90px; transform: translate(-35%, 0);">첫번째 댓글을 남겨주세요.</div>
                        </div>
                    </v-list>
                </v-card> 
            </v-col>
        </v-row>    
    </v-app>
</template>

<script>
export default {
    data () {
        return {
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
            commentTotal: 2,
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
    }
}
</script>

<style scoped>

</style>