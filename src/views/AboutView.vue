<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="test">테스트</button>
  </div>
</template>

<script>
import { getBoard } from "@/api/main/main"
 export default {
  
  data() {
    return
  },
  mounted(){
  },
  methods: {
    test(){
      getBoard()
        .then((res) => {
          // if (res.success) {
          //   this.gridInit(this.GetDataGrid(this.dxDataGridRef))
          //   //this.gridMain = res.list || [] // this.gridMain = [], this.girdMAin = res.list
          //   this.gridMain = []
          //   this.gridMain = res.list
          //   this.FocusFirstRow(this.GetDataGrid(this.dxDataGridRef))
          // } else {
          //   this.$vToastify.error({ body: res.msg })
          // }
            console.log(res.data)
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
