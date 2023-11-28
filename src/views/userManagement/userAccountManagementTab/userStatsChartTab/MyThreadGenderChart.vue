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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['남자', '여자']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['2012', '2013', '2014', '2015', '2016']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '남자',
                type: 'bar',
                barGap: 0,
                label: '남자',
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390]
            },
            {
                name: '여자',
                type: 'bar',
                label: '남자',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290]
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