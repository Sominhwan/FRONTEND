<template>
    <div>
        <div class="pt-5" style="display: flex; justify-content: space-between;">
            <div style="color: #333;" v-if="nowDate">{{ formattedNow }}</div>
            <div style="color: #333; margin-left: auto;"><span class="pr-2" style="color: #0064D1 !important;">●</span>시간별 평균 조회수</div>
        </div>
        <VChart class="chart" :option="option" autoresize/>
        <div class="pt-10" style="display: flex; justify-content: space-between;">
          <table>
              <thead>
                  <th style="width: 25%;">시간대</th>
                  <th>11월 24일</th>
                  <th>11월 25일</th>
              </thead>
              <tbody>
                  <tr v-for="line in timeView" :key="line">
                      <td v-for="item in line" :key="item">{{ item }}</td>
                  </tr>
              </tbody>
          </table>
          <table>
              <thead>
                  <th style="width: 25%;">시간대</th>
                  <th>11월 24일</th>
                  <th>11월 25일</th>
              </thead>
              <tbody>
                  <tr v-for="line in timeView2" :key="line">
                      <td v-for="item in line" :key="item">{{ item }}</td>
                  </tr>
              </tbody>
          </table>
        </div>
    </div>
</template>
<script>
import 'echarts';
import VChart from 'vue-echarts';
export default {
    data() {
    return {
      nowDate: true,
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
            type: 'line',
            symbol: 'none', // 차트 점표시
          }
        ]
      },
      timeView:[
          ['00시',1,2],
          ['01시',2,1],
          ['02시',2,1],
          ['03시',2,1],
          ['04시',2,1],
          ['05시',2,1],
          ['06시',2,1],
          ['07시',2,1],
          ['08시',2,1],
          ['09시',2,1],
          ['10시',2,1],
          ['11시',2,1]
      ],
      timeView2:[
          ['12시',1,2],
          ['13시',2,1],
          ['14시',2,1],
          ['15시',2,1],
          ['16시',2,1],
          ['17시',2,1],
          ['18시',2,1],
          ['19시',2,1],
          ['20시',2,1],
          ['21시',2,1],
          ['22시',2,1],
          ['23시',2,1]
      ]    
    };
  },  
  props: {
    selectedDate: {
      type: Date,
      default: ''
    }
  },
  mounted() {
    if(this.formattedSelectDate(this.selectedDate) !== this.formattedSelectDate(new Date())) {
      this.nowDate = false
    } else {
      this.nowDate = true
    }
    this.getThreadViewChartData(this.formattedSelectDate(this.selectedDate))
  },
  watch: {
    selectedDate() {
      if(this.formattedSelectDate(this.selectedDate) !== this.formattedSelectDate(new Date())) {
        this.nowDate = false
      } else {
        this.nowDate = true
      }
      const selectedDate = this.formattedSelectDate(this.selectedDate)
      this.getThreadViewChartData(selectedDate)
    }
  },
  components: {
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
    loadingState: {
      set(val) {
          this.$emit('loadingState', val);
      }
    }
  },
  methods: {
    loadingChange() {
      this.loadingState = true
    },
    formattedSelectDate(date) {
      const year = JSON.stringify(date.getFullYear());
      const month = JSON.stringify(date.getMonth() + 1).padStart(2, '0');
      const day = JSON.stringify(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`
    },
    getThreadViewChartData(data) {
      const inserDate = data
      console.log(inserDate)
    }
  },
}
</script>
<style scoped>
  .chart {
    height: 350px;
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
  table{
    width: 49%;
    text-align : center;
    border-collapse: collapse;
  }
  table th{
    padding : 5px;
    border-bottom: 1px solid  #303030;
    font-weight: 300;
    font-size: 13px;
  }
  table td{
    padding : 8px;
    border-bottom: 1px solid  #eee;
    font-size: 15px;
  }
  table tr:nth-of-type(even){
    background-color: rgba(190, 190, 190, 0.1);
  }
</style>