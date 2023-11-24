<template>
    <div>
        <div class="pt-5" style="display: flex; justify-content: space-between;">
            <div>{{ formattedNow }}</div>
            <div><span class="pr-2" style="color: #0064D1;">●</span>시간별 평균 조회수</div>
        </div>
        <VChart class="chart" :option="option" autoresize/>
    </div>
</template>
<script>
import 'echarts';
import VChart from 'vue-echarts';
export default {
    data() {
    return {
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
    }
  },
  methods: {

  },
}
</script>
<style>
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