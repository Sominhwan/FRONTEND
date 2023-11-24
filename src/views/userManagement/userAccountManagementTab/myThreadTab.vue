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
          <v-sheet height="1000">
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
            <v-toolbar flat>
                    <!-- fixed-tabs 탭 좌우로 균형 배분 -->
                    <v-tabs v-model="tabs">
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab class="chart-tab-text" @click="changeTab('tab1')">
                        조회수
                    </v-tab>
                    <v-tab  class="chart-tab-text" @click="changeTab('tab2')">
                        댓글 단 글
                    </v-tab>
                    <v-tab  class="chart-tab-text" @click="changeTab('tab3')">
                        좋아요 한 글
                    </v-tab>
                    </v-tabs>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
                <component :is="currentTabComponent" v-if="!isLoading"></component>        
            </v-tabs-items>

            <div class="pt-5" style="display: flex; justify-content: space-between;">
                <div>{{ formattedNow }}</div>
                <div><span class="pr-2" style="color: #0064D1;">●</span>시간별 평균 조회수</div>
            </div>
            <VChart v-if="!isLoading" class="chart" :option="option" autoresize/>
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
import 'echarts';
import VChart from 'vue-echarts';
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
      },
      /****************************************************** 차트 */
      option: {
        title: {
          text: '',
          textStyle: {
            fontSize: 16,
            color: '#333333'
          }
        },
        xAxis: {
          type: 'category',
          data: ['00', '01', '02', '03', '04', '05', 
                 '06', '07', '08', '09', '10', '11', 
                 '12', '13', '14', '15', '16', '17', 
                 '18', '19', '20', '21', '22', '23']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        legend: {
          textStyle: {
            color: 'black'
          }
        },
        tooltip: {
          trigger: 'axis', // 툴팁이 축에 따라 트리거되도록 설정
          axisPointer: {
       
          },
          backgroundColor: 'rgba(255, 255, 255, 1)', // 배경색 설정
          borderColor: '#999', // 테두리 색상 설정
          borderWidth: 1, // 테두리 두께 설정
          textStyle: {
            color: 'black' // 텍스트 색상 설정
          },
          formatter: function (params) {
            var numericValue = parseInt(params[0].name, 10) + 1;
            var formattedValue = ('0' + numericValue).slice(-2);
            // 커스텀 포맷 함수
            return  '<div class="tooltip-title">' + params[0].name + '~' + formattedValue  + '시</div>' +
                    '<div class="content-wrapper">' +
                    '<div class="tooltip-vertical-line"></div>' +
                    '<div class="text-content">' +  '조회수 ' + '<span class="tooltip-counter">&nbsp;&nbsp;&nbsp;' + params[0].data + '</span>' + '</div>' +
                    '</div>';
          }
        },
        series: [
          {
            // name: '시간별 평균 조회수',
            data: ['10', '20', '30', '40', '50', '60', 
                   '55', '40', '35', '30', '20', '25', 
                   '30', '35', '50', '60', '70', '75', 
                   '70', '60', '40', '30', '35', '40'],
            type: 'line'
          }
        ]
      }
    };
  },
  mounted () {
  },
  components: {
    Datepicker,
    LoadingBar,
    VChart
  },
  computed: {
    formattedNow() {
      const today = new Date()
      const year = today.getFullYear()
      const month = ('0' + (today.getMonth() + 1)).slice(-2)
      const day = ('0' + today.getDate()).slice(-2)  
      const hours = ('0' + today.getHours()).slice(-2)
      const minutes = ('0' + today.getMinutes()).slice(-2)
      const todayFormat = year + '.' + month  + '.' + day + '. ' + hours + ':' + minutes + ' 기준'
      return todayFormat
    },
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
      this.isLoading = true
    },
    increaseDate() {
      this.openPicker = false
      this.calendarIconColor = '#0000008A'
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      this.onDateSelected(newDate);
      this.isLoading = false
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
  .chart-tab-text:before {

  }
  
  .datepicker {
    position: absolute;
    top: 80%; /* 원하는 위치로 조정 */
    left: 55%;
    z-index: 1100 !important; /* datepicker가 다른 엘리먼트 위에 나타나도록 설정 */
  }
  .chart {
    height: 400px;
  }
  .content-wrapper {
    display: flex;
    align-items: center; /* 수직 정렬 설정 */
  }
  .tooltip-vertical-line {
    border-left: 3px solid #0064D1; /* 선의 색상 및 두께 설정 */
    height: 20px; /* 선의 높이 설정 */
    display: inline-block; /* inline-block으로 설정하여 텍스트와 같은 라인에 위치하도록 함 */
    margin-right: 5px;
  }
  .text-content {
    margin-top: 4px; /* Text의 위쪽 간격 조절 */
    margin-bottom: 4px; /* Text의 아래쪽 간격 조절 */
    color: grey;
  }
  .tooltip-title {
    font-size: 13px;
    font-weight: bold;
  }
  .tooltip-counter {
    color: black;
  }
</style>