<template>
  <v-card class="my-thread-container"> 
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="80">
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="decreaseDate()"
              >
                <v-icon>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-toolbar-title class="pl-2 pr-2">
                {{ formattedDate }}
                <v-icon size="22" class="pb-1" @click="openDatePicker()" :color="calendarIconColor">calendar_month</v-icon>
                <datepicker v-if="openPicker" class="datepicker"
                  inline 
                  v-model="selectedDate" 
                  :editable="false" 
                  :lang="datepickerLang"
                  format="YYYY.MM.DD" 
                  @pick="onDateSelected"
                  :disabled-date="disabledDate"
                />
              </v-toolbar-title>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="increaseDate()"
                :disabled="isNextDateDisabled"
              >
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="1300">
            <v-card class="statistics-contontainer" flat rounded="0" elevation="0">
              <v-row>
                <v-col>
                  <v-card class="write-text" flat rounded="0">
                    <span class="count-title" style="font-size: 16px;">글쓴 횟수</span>
                    <div class="count-text">10</div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="views-text" flat rounded="0">
                    <span class="count-title" style="font-size: 16px;">조회수</span>
                    <div class="count-text">0</div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="like-text" flat rounded="0">
                    <span class="count-title" style="font-size: 16px;">좋아요 수</span>
                    <div class="count-text">0</div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="comment-text" flat rounded="0">
                    <span class="count-title" style="font-size: 16px;">댓글 수</span>
                    <div class="count-text">0</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="tab-card mt-15" tile outlined>
              <!-- fixed-tabs 탭 좌우로 균형 배분 -->
              <v-tabs 
                active-class="active-tab" 
                class="inactive-tab"
                grow slider-size="0" 
                background-color="#F3F3F3"
                v-model="tabs" 
              >
                <v-tab class="chart-tab-text" :ripple="false" @click="changeTab('tab1')">
                    조회수
                </v-tab>
                <v-divider class="z-index-10" vertical></v-divider>
                <v-tab  class="chart-tab-text" :ripple="false" @click="changeTab('tab2')">
                    댓글 단 글
                </v-tab>
                <v-divider class="z-index-10" vertical></v-divider>
                <v-tab  class="chart-tab-text" :ripple="false" @click="changeTab('tab3')">
                    좋아요 한 글
                </v-tab>
              </v-tabs>
            </v-card>
            <v-tabs-items v-model="tabs">
                <component :is="currentTabComponent" v-if="!isLoading" @loadingState="loadingState()" :selectedDate="selectedDate"></component>        
            </v-tabs-items>
            <!-- TODO 하단 시간별 표 추가 -->
          </v-sheet>
        </v-col>
      </v-row>
      <LoadingBar :loading="isLoading" :passive="true"></LoadingBar>
  </v-card>
</template>
<script>
import LoadingBar from '@/components/LoadingBar.vue';
import MyThreadViewChart from '@/views/userManagement/userAccountManagementTab/userStatsChartTab/MyThreadViewChart.vue';
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  data() {
    return {
      selectedDate: new Date(),
      isDatepickerVisible: false, // 추가된 부분
      openPicker: false,
      datepickerLang: {
        yearFormat: "YYYY년",
        monthFormat: "M월",
        monthBeforeYear: false,
      },
      calendarIconColor: '#0000008A',
      isLoading: false,
      /****************************************************** 탭 */
      tabs: null,
      currentTab: 'tab1',
      tabComponents: {
          tab1: MyThreadViewChart
      }
    };
  },
  mounted () {
  },
  components: {
    Datepicker,
    LoadingBar,
  },
  computed: {
    formattedDate() {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return this.selectedDate.toLocaleDateString('ko-KR', options);
    },
    isNextDateDisabled() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.selectedDate.getTime() >= today.getTime();
    },
    currentTabComponent() {
        return this.tabComponents[this.currentTab];
    }
  },
  methods: {
    decreaseDate() {
      this.openPicker = false
      this.calendarIconColor = '#0000008A'
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      this.onDateSelected(newDate);
      this.selectedDate = newDate;
      //this.isLoading = true
    },
    increaseDate() {
      this.openPicker = false
      this.calendarIconColor = '#0000008A'
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      this.onDateSelected(newDate);
      this.selectedDate = newDate;
      //this.isLoading = false
    },
    onDateSelected(date) {
      this.selectedDate = date
      this.openPicker = false
      this.calendarIconColor = '#0000008A'
    },
    openDatePicker() {
      this.openPicker = !this.openPicker
      if(this.openPicker) {
        this.calendarIconColor = '#0064D1'
      } else {
        this.calendarIconColor = '#0000008A'
      }
    },
    disabledDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 현재 시간 이전의 모든 날짜는 비활성화
      return date.getTime() > today.getTime();
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    // 로딩바 컨트롤러
    loadingState() {
      this.isLoading = true
    }
  },
};
</script>
<style>
  .my-thread-container {
    padding: 30px;
    position: relative;
  }
  .statistics-contontainer {
    border: 1px solid #666 !important;
    padding: 20px;
    position: inherit;
    z-index: 1;
  }
  .write-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 10px;
    padding-bottom: 5px;
    position: inherit;
  }
  .views-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 10px;
    padding-bottom: 5px;
    position: inherit;
  }
  .like-text {
    border-right: 1px solid #DEDEDE !important;
    padding-top: 10px;
    padding-bottom: 5px;
    position: inherit;
  }
  .comment-text {
    padding-top: 10px;
    padding-bottom: 5px;
    position: inherit;
  }
  .count-title {
    background-color: #E0E0E0; 
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 15px;
    padding-right: 15px; 
    border-top-left-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
  }
  .count-text {
    font-weight: 500;
    font-size: 24px;
    color: #0064D1;
    padding-left: 5px;
    padding-top: 20px;
  }
  .active-tab {
    background-color: white !important;
    border-color: transparent;
    color: black !important;
    font-weight: bold;
    z-index: 10;
  }
  .inactive-tab {
    font-weight: bold;
  }
  .datepicker {
    position: absolute;
    top: -0%; /* 원하는 위치로 조정 */
    left: 60%;
    z-index: 10 !important; /* datepicker가 다른 엘리먼트 위에 나타나도록 설정 */
  }
  .tab-card {
    position: inherit !important;
    z-index: 1 !important;
  }
</style>