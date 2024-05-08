<template>
  <div class="report" >
    <div class="re-top">
      <el-select v-model="currentReportTitle" clearable placeholder="报告名称" style="margin-right: 10px">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.reportTitle"
            :value="item.reportTitle"
            @change="selectChanged">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="timeLimit"
          type="daterange"
          align="center"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <el-button type="primary" style="margin-left: 10px" @click="handleQuery">查询</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="handleReset">重置</el-button>
      {{timeLimit}}
    </div>

    <div class="re-medium" >
      <el-row class="row" type="flex" style="flex-wrap: wrap">
        <el-col class="col" :span="6" v-for="(item,index) in tableData" :key="item.id" :offset="1">
          <div style="margin-top:15px">
            <el-card class="card" shadow="hover" :body-style="{padding: '0px' }">
              <img src="@/assets/报告.jpg" class="image">
              <div style="padding: 6px;">
                <span>{{item.reportTitle}}</span>
                <div class="bottom clearfix">
                  <time class="time">时间：{{ item.createTime }}</time>
                  <el-button style="padding-right: 20px" type="text" class="button" @click="search(item)">查看</el-button>
                  <i class="iconfont icon-right auto-right"></i>
                  <el-button style="padding-right: 200px" type="text" class="button" @click="cancel(item)">删除</el-button>
                </div>
              </div>
            </el-card>
          </div>

        </el-col>
      </el-row>
    </div>

    <div class="re-bottom">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-size="pagesize"
          :page-sizes="[6]"
          layout="total,prev, pager, next"
          :total="totalReport">
      </el-pagination>
    </div>
  </div>

</template>


<script>
export default {
  name:'Report',

  data(){
    return{
      reset:false,//默认为false
      reportTitle:'',
      reportTime:'',

      currentReportTitle:null,
      options:[],
      optReport:{
        name:null,
        date:null
      },

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeLimit:null,//时间选择器
      crTime:'',

      tableData:null,//报告卡片列表
      reportId:'',//报告id
      reportNum:0,//报告数量

      totalReport:null,
      currentpage:1,
      pagesize:6
    }
  },

  watch:{
    // immediate:true,
    tableData:function(){
      this.$nextTick(function(){
        /*现在数据已经渲染完毕*/
        console.log("list=="+this.tableData);
        this.reset=true;
      })
    },
    timeLimit(val){
      if (val == null){
        this.optReport.date = null;
      }
    }


  },

  beforeMount() {
    this.initReports();
    this.getAllReport();
  },

  created() {
  },

  methods:{
    refresh() {
      this.$router.go(0)
    },

    handleReset(){
      this.currentReportTitle = null;
      this.timeLimit = null;
      this.$set(this.optReport,"name",this.currentReportTitle);
      this.$set(this.optReport,"date",this.timeLimit);
      if (this.currentReportTitle===null&&this.timeLimit===null){
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize
        this.getReports(url);
      }
    },

    getAllReport(){
      this.$axios.get('/sys/report').then(res=>{
        this.options = res.data.data;

      })
    },

    //分页获取report
    initReports(){
      let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize
      this.getReports(url);
    },

    getReports(url){
      this.reset = true;
      this.$axios.get(url).then(res=>{
        console.log(res.data)
        if (res){
          this.tableData = res.data.data.data;
          console.log("res=="+this.tableData);
          this.totalReport = res.data.data.total;
        }
        this.reset = false;
      })
      /*this.$axios.get('/sys/report/page',{
        params:{
          pageSize:this.pagesize,
          currPage:this.currentpage,
        }
      }).then(res=>{
        this.$set(this.$data,'tableData',res.data.data.records);
        // this.tableData = res.data.data.records;
        this.$set(this.$data,'totalReport',res.data.data.total);
        // this.totalReport = res.data.data.total;
        this.$set(this.$data,'reportNum',this.tableData.length);
        // this.reportNum = this.tableData.length;
      }).catch(()=>{
        this.$message.error("分页查询失败")
      })*/
    },

    handleCurrentChange(currentPage){
      this.currentpage = currentPage;
      if (this.optReport.name!=null && this.optReport.date==null){
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportTitle='+this.optReport.name
        this.getReports(url);
      }else if (this.optReport.name == null && this.optReport.date != null){
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportDate='+this.optReport.date;
        this.getReports(url);
      }else if (this.optReport.name != null && this.optReport.date != null){
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportDate='+this.optReport.date+'&reportTitle='+this.optReport.name;
        this.getReports(url);
      }else {
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize
        this.getReports(url);
      }
      // this.getReportPage(currentPage,this.pagesize);
    },

    selectChanged(){
      console.log(this.currentReportTitle);
    },

    timeToTimestamp(time){
      let str='';
      let start = Date.parse(time[0]);
      let end = Date.parse(time[1]);
      //timestamp = timestamp / 1000; //时间戳为13位需除1000，时间戳为13位的话不需除1000
      let timestamp = str+start+','+end;
      return timestamp;
    },


    handleQuery(){
      console.log("time=="+this.timeLimit+"currentTitle="+this.currentReportTitle);
      if (this.currentReportTitle == null && this.timeLimit == null){
        return
      }
      if (this.currentReportTitle != null && this.timeLimit != null){
        if (this.currentReportTitle === this.optReport.name && this.timeLimit ===  this.optReport.date){
          return
        }
        this.$set(this.optReport,"name",this.currentReportTitle);
        this.crTime = this.timeToTimestamp(this.timeLimit)
        this.$set(this.optReport,"date",this.timeLimit) ;
        this.currentpage = 1;
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportDate='+this.crTime+'&reportTitle='+this.optReport.name;
        this.getReports(url);
      }else if (this.currentReportTitle != null){
        this.optReport.name = this.currentReportTitle;
        this.currentpage = 1;
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportTitle='+this.optReport.name
        this.getReports(url);
      }else if (this.timeLimit != null && this.timeLimit !== this.optReport.date){
        this.crTime = this.timeToTimestamp(this.timeLimit)
        this.$set(this.optReport,"date",this.timeLimit) ;
        this.currentpage = 1;
        let url = '/sys/report/page?currPage='+this.currentpage+'&pageSize='+this.pagesize+'&reportDate='+this.crTime;
        this.getReports(url);
      }
    },

    //查看报告详情
    search(item){
      this.$router.push({
        path:"/singleReport", query:{id:item.id}
      })
    },
    //删除报告
    cancel(item){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/sys/delete',{
          params:{
            reportId:item.id
          }
        }).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refresh();
          // this.reset=false;
        }).catch(res=>{
          this.$message.error("删除失败");
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },


  },



}
</script>



<style scoped>
.report{
  margin-top: 50px;
}

.report .re-top{
  text-align: center;
  margin-bottom: 15px;
}

.report .re-medium{
  height: 550px;
}

.row{
  background-color: white;
  align-items: normal;
  height: 400px;
}
.col{
  //height: 150px;
}
.card{

}

.report .re-bottom{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.auto-right {
  margin-left: auto;
  color: #2776df;
  margin-right: 10px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 4px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>