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
            <VChart class="chart pa-5" :option="option" autoresize/>
          </v-sheet>
        </v-col>
      </v-row>
      <LoadingBar :loading="isLoading" :passive="true"></LoadingBar>
  </v-card>
</template>
<script>
import LoadingBar from '@/components/LoadingBar.vue';
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
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
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
    formattedDate() {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return this.selectedDate.toLocaleDateString('ko-KR', options);
    },
    isNextDateDisabled() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.selectedDate.getTime() >= today.getTime();
    },
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
  .datepicker {
    position: absolute;
    top: 80%; /* 원하는 위치로 조정 */
    left: 55%;
    z-index: 1100 !important; /* datepicker가 다른 엘리먼트 위에 나타나도록 설정 */
  }
  .chart {
    height: 600px;
  }
</style>