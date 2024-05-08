<template >
  <div class="mains" style="margin-top:40px;">
    <div class="re-head">
      <i class="el-icon-d-arrow-left" style="color: #409EFF" @click="back" ></i>
      <el-button type="text" @click="back">返回</el-button>
      <el-button type="text" @click="generateWord">生成word</el-button>
    </div>
    <div style="text-align: center;height: 642px;width: 1200px;overflow: auto" >
      <div>
        <el-table :data="list" border stripe
                  :header-cell-style="{textAlign: 'center',background:'#336699',color:'#ffff'}"
                  :cell-style="{ textAlign: 'center' }"
                  tooltip-effect="dark">
          <el-table-column label="一级指标" prop="firstOrderName" ></el-table-column>
          <el-table-column label="二级指标" prop="secondOrderName" ></el-table-column>
          <el-table-column label="三级指标" prop="thirdOrderName" ></el-table-column>
          <el-table-column label="四级指标" prop="fourthOrderName" ></el-table-column>
          <el-table-column label="五级指标" prop="fifthOrderName" ></el-table-column>
          <el-table-column label="风险详情" prop="question" ></el-table-column>
          <el-table-column label="风险说明" prop="remark" ></el-table-column>
          <el-table-column label="备注图片" prop="imagePath"></el-table-column>
        </el-table>
      </div>

    </div>
  </div>


</template>


<script>
  export default {
    name:'SingleReport',

    data(){
      return{
        reportId:0,
        list:[]
      }
    },

    created() {
      this.getSingleReport();
    },

    methods:{
      async getSingleReport(){
        console.log("query:"+this.$route.query.id);
        this.reportId = this.$route.query.id;
        this.$axios.get('/sys/singleReport',{
          params:{reportId:this.reportId}
        }).then(res=>{
          console.log(res.data.data)
          this.list = res.data.data;
        })
      },
      back(){
        this.$router.push({
          path:'/report'
        });
      },
      generateWord(){

      }
    },
  }



</script>


<style scoped>
.re-head{
}

</style>