<template>
  <!-- margin: 20px 40px 60px;（上20px；左、右40px；下60px。） -->
  <!-- <el-container style="margin: 40px 0% 0%;padding-left: 0px;">
    <el-aside style="width: 350px">
    </el-aside>
    <el-main>
    </el-main>
  </el-container> -->
  <div id="answer">
    <div class="flexarea">
      <!--左边题目编号区-->
      <transition name="slider-fade">
        <!--         <div
          class="left"
          v-if="slider_flag"
        >
          <ul class="l-top">
            <li>
              <a href="javascript:;"></a>
              <span>当前</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>未答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>已答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>标记</span>
            </li>
          </ul>
          <div class="l-bottom">
            <div class="item" style="overflow:scroll;">
              <p>五级指标为题干</p>
              <ul>
                <li
                  v-for="(list,index1) in topic[1]"
                  :key="index1"
                >
                  <a
                    href="javascript:;"
                    @click="judge(index1)"
                    :class="{'border':index==index1,'bg':bg_flag&&topic[1][index1].isClick==true}"
                  >
                    <span :class="{'mark':topic[1][index1].isMark==true}"></span>
                    {{index1+1}}
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="final"
              @click="commit()"
            >生成风险报告</div>
          </div>
        </div> -->

        <div
            class="left"
            v-if="slider_flag"
        >
          <ul class="l-top">
            <li>
              <a href="javascript:;"></a>
              <span>当前</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>未答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>已答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>标记</span>
            </li>
          </ul>
          <div class="l-bottom">
            <div
                class="item"
                :data=pageTicket
            >
              <p>五级指标为题干</p>
              <ul>
                <li
                    v-for="(list,index1) in pageTicket"
                    :key="index1"
                >
                  <a
                      href="javascript:;"
                      @click="judge(index1)"
                      :class="{'border':index===(currentpage - 1) * pagesize + index1,
                    'bg':bg_flag&&pageTicket[index1].isClick===true}"
                  >
                    <span :class="{'mark':pageTicket[index1].isMark===true}"></span>
                    {{ (currentpage - 1) * pagesize + index1 + 1 }}
                  </a>
                </li>
              </ul>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentpage"
                :page-sizes="[50]"
                :page-size="50"
                layout="sizes, prev, next,jumper"
                :total="topicCount"
                style="display: flex; flex-wrap: wrap; background-color: white;"
            >
            </el-pagination>
            <div
                class="final"
                @click="commit(reportId)"
            >生成风险报告
            </div>
            <el-dialog title="请输入报告名称" :visible.sync="dialogFormVisible"
                       width="30%" center>
              <el-input v-model="ReportForm" autocomplete="off" placeholder="报告名称"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="noSubmit">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </transition>
      <!--右边选择答题区-->
      <transition name="slider-fade">
        <div class="right">
          <div class="title">
            <i
                class="icon20"
                ref="toggle"
                @click="slider_flag = !slider_flag"
            ></i>
            <p>{{ title }}</p>
            <p style="text-align: center; color: red;">请确保保存本题答案，文本域和图片上传信息后再进入下一题！！！</p>
            <i class="iconfont icon-right auto-right"></i>
            <span>共{{ topicCount }}题</span>
          </div>
          <div class="content">
            <p class="topic"><span class="number">{{ number }}</span>{{ showQuestion }}</p>
            <div class="judge">
              <el-radio-group
                  @change="getJudgeLabel"
                  v-model="judgeAnswer[index]"
              >
                <el-radio :label="1">有风险</el-radio>
                <el-radio :label="0">无风险</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div
              class="upload"
              style="position: relative;"
          >
            <el-form
                ref="form"
                :model="Form"
                label-width="80px"
                style="height: 200px;margin-bottom: 10px;display: flex;align-items: flex-start;"
            >
              <el-form-item
                  label="具体情况"
                  style="margin-bottom: 0;"
              >
                <el-input
                    type="textarea"
                    v-model="Form.text"
                    :autosize="{minRows:4,maxRows:4}"
                ></el-input>
              </el-form-item>
              <el-form-item
                  label="图片备注"
                  ref="uploadElement"
                  style="height: 100px;margin-bottom: 2px;"
              >
                <el-upload
                    class="avatar-uploader"
                    list-type="picture-card"
                    :file-list="showList"
                    ref="upload"
                    action="#"
                    multiple
                    :auto-upload="false"
                    :limit="2"
                    :before-remove="handleRemove"
                    :on-change="handleChange"
                    :on-exceed="handleExceed"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item style="position: absolute; bottom: 10px; right: 10px;">
                <el-button
                    type="primary"
                    @click="confirmSave"
                >保存
                </el-button>
              </el-form-item>
            </el-form>
            <p style="text-align: center; color: red;">请确保保存本题答案，文本域和图片上传信息后再进入下一题！！！</p>
          </div>
          <div class="operation">
            <ul class="end">
              <li @click="previous()"><i class="iconfont icon-previous"></i><span>上一题</span></li>
              <li @click="mark()"><i class="iconfont icon-mark-o"></i><span>标记</span></li>
              <li @click="next()"><span>下一题</span><i class="iconfont icon-next"></i></li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
import report from "@/views/report/report.vue";

export default {
  components: {
    report
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Action",
  data() {
    return {
      currentpage: 1,
      pagesize: 50, // 每页显示的条目数量
      pageTicket: [], //分页后的当前页数据

      slider_flag: true, //左侧显示隐藏标识符

      index: 0, //全局index
      bg_flag: false, //已答标识符,已答改变背景色
      title: "请对该风险说明做出判断",
      topicCount: 0, //判断题的总数
      topic: {},//试卷信息
      number: 1, //题号
      showQuestion: [], //问题
      ques_id: 0,
      judgeAnswer: [], //保存所有判断题答案

      Form: {
        text: "",
        fileLists: [], //上传url地址集合
      },
      imgList: [
        {
          id: 0,
          imgUrls: []
        }
      ], //每道题上传文件本地显示图片集合(非服务器图片地址)
      showList: [],
      maxLength: 0, //上传文件最大值

      urlString:"",
      //存储所有题目信息
      questionList: [
        {
          detailId: 0,
          answer: null,
          remark: "",
          files:""
        },
      ],

      //保存标志
      flg: false,

      //提交返回报告id
      reportId:0,
      reportTitle:'',

      report:{
        title:'',
        details:[]
      },

      dialogFormVisible: false,
      ReportForm:'',
      formLabelWidth: '60px'
    };
  },

  created() {
  },

  //在这个函数里向后端发起请求，并将请求数据渲染至页面
  mounted() {
    this.getQuestion();
    // this.getImage();
  },


  methods: {
    refresh() {
      this.$router.go(0)
    },

    paginatedItems() {
      //清空pageTicket中的数据
      this.pageTicket = [];
      let data = this.topic[1];
      // 获取当前页的数据
      for (
          let i = (this.currentpage - 1) * this.pagesize;
          i < this.topicCount;
          i++
      ) {
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(data[i]);
        //判断是否达到一页的要求
        if (this.pageTicket.length === this.pagesize) break;
      }
    },

    //分页时修改每页的行数,这里会自动传入一个size
    handleSizeChange(size) {
      //修改当前每页的数据行数
      this.pagesize = size;
      //数据重新分页
      this.paginatedItems();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.paginatedItems();
    },

    getQuestion() {
      // console.log("getQuestion");
      this.$axios.get("/sys/question").then((res) => {
        if (res.data == null) {
          this.topic = null;
        } else {
          this.topic = {...res.data.data};
          /*console.log(
            "topic==" +
              JSON.stringify(this.topic, null, 2) +
              "   " +
              "count==" +
              this.topic[1].length
          );*/
          this.topicCount = this.topic[1].length;
          this.paginatedItems();

          let dataInit = this.topic[1];
          this.number = 1;
          this.showQuestion = dataInit[0].question;
        }
      });
    },

    judge(inx) {
      //清空图片集合
      // this.imgList[this.index].imgUrls = [];
      this.Form.fileLists = [];
      this.maxLength = 0;
      let len = this.topic[1].length; // 总题目数量
      let pageIndex = (this.currentpage - 1) * this.pagesize; // 当前页起始索引
      let newIndex = pageIndex + inx; // 计算在整个题目列表中的新索引
      let Data = this.topic[1];
      if (newIndex < len) {
        this.index = newIndex; // 更新当前题目索引
        this.title = "请作出正确判断";
        this.showQuestion = Data[newIndex].question; // 获取题目信息
        this.ques_id = Data[newIndex].detailId;
        this.number = this.index + 1; // 更新题号
      } else {
        // 如果超出题目数量，重置为第一页
        this.index = 0;
        this.currentpage = 1;
        this.paginatedItems(); // 重新分页
      }
      this.getImage();
    },

    //获取判断题作答选项
    getJudgeLabel(val) {
      this.judgeAnswer[this.index] = val;
      console.log("this.judgeAnswer===" + this.judgeAnswer);
      let ans = this.index;
      let data = this.pageTicket;
      //标记题目为已做
      let currentIndex = ans % this.pagesize;
      this.ques_id = data[currentIndex].detailId;
      this.bg_flag = true;
      data[currentIndex]["isClick"] = true;
      //使用扩展运算符  克隆目标对象，这样你就可以修改它而不会影响原始对象
      let ques = {...this.questionList[ans]};
      // 修改克隆对象的属性
      ques.answer = val;
      ques.detailId = this.ques_id;
      ques.remark = this.Form.text;
      // 将克隆对象放回数组
      this.questionList[ans] = ques;
      console.log("ques===" + JSON.stringify(ques, null, 2));
      console.log("len===" + this.questionList.length);
    },

    commit() {
      //判断是否做完题目
      if (this.judgeAnswer.length !== this.topicCount) {
        //提示：未做完不准提交
        this.$message.warning({
          type: 'warning',
          message: '题目未答完,不可提交！！！'
        })
      } else {
        //打开弹窗，用户命名
        this.dialogFormVisible = true;
      }
    },

    //已命名，发送请求，确认保存答案----弹窗
    submit(){
      console.log(this.questionList);
      this.report.title = this.ReportForm;
      this.report.details = this.questionList;
      var data = JSON.stringify(this.report);
      console.log("data==="+data)
      let config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      //发送网络请求，做完生成报告，
      this.$axios.post("/sys/answer",data,config).then(res=>{
        this.dialogFormVisible = false;//关闭弹窗
        this.reportId = res.data.data;//获取报告id
        console.log("answer:reportid=="+this.reportId);//没问题
        //携带报告id进入报告详情页
        this.$router.push({
          path:"/singleReport", query:{id:this.reportId}
        });
        // this.refresh();
        // this.$forceUpdate();
      }).catch((res)=>{
        this.$message.error("答案提交失败")
      });
      this.ReportForm = '';
    },
    //取消命名
    noSubmit(){
      this.dialogFormVisible = false;
    },

    getImage() {
      this.showList = [];
      this.urlString = "";
      this.imgList.forEach(item => {
        if (item.id === this.number) {
          this.showList = item.imgUrls
        }
      })
      // this.showList = this.imgList[this.index].imgUrls;
      console.log("img==" + JSON.stringify(this.showList, null, 2))
      return this.showList;
    },

    handleRemove(file) {
      let img = this.imgList[this.index].imgUrls;
      img.forEach((item, index) => {
        if (file.name === item.name) {
          img.splice(index, 1);
        }
      })
      // img = img.filter((imgFile)=>imgFile.uid !== file.uid);
      // this.imgList = this.imgList.filter((imgFile) => imgFile.uid !== file.uid);//组合新的数组
    },

    handleChange(file, fileList) {
      let length = fileList.length;
      this.maxLength = Math.max(length, this.maxLength);
      setTimeout(() => {
        if (length !== this.maxLength) {
          return;
        } else {
          let img = {id: this.number, imgUrls: fileList};
          console.log("img===" + JSON.stringify(img, null, 2));
          this.imgList.push(img)
          console.log("imglist====" + JSON.stringify(this.imgList, null, 2));
          // this.imgList = fileList;
        }
      });
    },
    // 选择图片超过最大限制2张之后处理操作
    handleExceed() {
      this.$message.error("最多选取2张,请重新选择!");
      // 清空之前选择内容
      // this.imgList = [];
      this.imgList[this.index].imgUrls = [];
    },
    //保存确认
    confirmSave() {
      this.$confirm("是否保存表单内容?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
        center: true,
      })
          .then(() => {
            //将保存标记设为true
            this.flg = true;
            this.serverUploadImg();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存",
            });
          });
    },
    serverUploadImg() {
      let formData = new FormData();
      this.imgList.forEach(item => {
        if (item.id === this.number) {
          this.showList = item.imgUrls
        }
      })
      let img = this.showList;
      let im = img.map(file=>file.raw);

      if (Array.prototype.isPrototypeOf(im) && im.length === 0) {
        formData.append("multipartFiles", []);
      } else {
          im.map(img => {
            formData.append("multipartFiles", img);
          });
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      this.$axios.post("/sys/upload", formData, config).then(res => {
        console.log("urlString===="+res.data.data);
        this.urlString = res.data.data;
        this.saveForm();
      })
    },
    saveForm() {
      //保存文本域
      //使用扩展运算符  克隆目标对象，这样你就可以修改它而不会影响原始对象
      let ques = {...this.questionList[this.index]};
      // 修改克隆对象的属性
      ques.remark = this.Form.text;
      ques.files = this.urlString;
      // ques.fileLists = this.Form.fileLists;
      // 将克隆对象放回数组
      this.questionList[this.index] = ques;
      console.log("ques===" + JSON.stringify(ques, null, 2));
      console.log("len===" + this.questionList.length);
      this.$message({
        type: "success",
        message: "保存成功",
      });

    },

    previous() {
      //上一题
      if (this.index % this.pagesize === 0 && this.index !== 0) {
        // 切换到上一页
        this.handleCurrentChange(this.currentpage - 1);
        // 自动选择此页的最后一题
        let curIndex = (this.index - 1) % this.pagesize;
        this.judge(curIndex);
      } else {
        this.index--;
        let cur = this.index % this.pagesize;
        this.judge(cur);
      }
    },
    next() {
      if (this.flg === false || this.judgeAnswer[this.index] === "") {
        this.$message({
          type: "warning",
          message: "请先保存当前题目内容",
        });
      } else {
        //下一题
        this.index++;
        if (this.index < this.topic[1].length) {
          // 判断是否到达该页最后一题
          //是
          if (this.index % this.pagesize === 0) {
            // 切换到下一页
            this.handleCurrentChange(this.currentpage + 1);
            // 自动选择此页的第一题
            let curIndex = this.index % this.pagesize;
            this.judge(curIndex);
          } else {
            //否
            let curIndex = this.index % this.pagesize;
            this.judge(curIndex);
          }
          this.flg = false;
        } else if (this.index === this.topic[1].length) {
          this.$message.log("已经是最后一题了,请检查是否已答完");
        }
      }
    },
    mark() {
      //标记功能
      this.topic[1][this.index]["isMark"] = true; //标记
    },
  },
};
</script>

<!----------------------------------------------------------------->
<style lang="less">
////////////////////////////////////////////////////////////////////
.mark {
  position: absolute;
  width: 4px;
  height: 4px;
  content: "";
  background-color: red;
  border-radius: 50%;
  top: 0;
  left: 22px;
}

.border {
  position: relative;
  border: 1px solid #ff90aa !important;
}

.bg {
  background-color: #5188b8 !important;
}

/////////////////////////////////////////////////////////////////////////
/* slider过渡效果 */
.slider-fade-enter-active {
  transition: all 0.3s ease;
}

.slider-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slider-fade-enter,
.slider-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

/////////////////////////////////////////////////////////////////////////
#answer {
  margin-top: 39px;
  padding-bottom: 30px;
  background: #eeeeee;
  height: 100vh;
  overflow: scroll;
}

.flexarea {
  display: flex;
}

////////////////////////////////////////////////////////////////////////
.clearfix {
  clear: both;
}

///////////////////////////////////////////////////////////////////////
#answer .left .item {
  padding: 0px;
  font-size: 16px;
}

.l-bottom {
  border-radius: 4px;
  background-color: #fff;
}

.l-bottom .final {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  background-color: rgb(39, 118, 223);
  width: 240px;
  margin: 20px 0px 20px 10px;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  margin-top: 22px;
}

.l-bottom .item p {
  margin-bottom: 15px;
  margin-top: 10px;
  color: #000;
  margin-left: 10px;
  letter-spacing: 2px;
}

.l-bottom .item li {
  width: 15%;
  margin-left: 5px;
  margin-bottom: 10px;
}

.l-bottom .item {
  display: flex;
  flex-direction: column;
}

.l-bottom .item ul {
  width: 100%;
  margin-bottom: -8px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0px;
}

.l-bottom .item ul li a {
  position: relative;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #eee;
  text-align: center;
  color: #000;
  font-size: 16px;
}

.left .l-top {
  display: flex;
  justify-content: space-around;
  padding: 16px 0px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 2px;
  background-color: #fff;
  height: 42px;
}

.left {
  width: 250px; //250px
  height: 100%;
  margin: 10px 10px 0px 10px;
}

.left .l-top li:nth-child(2) a {
  border: 1px solid #eee;
}

.left .l-top li:nth-child(3) a {
  background-color: #5188b8;
  border: none;
}

.left .l-top li:nth-child(4) a {
  position: relative;
  border: 1px solid #eee;
}

.left .l-top li:nth-child(4) a::before {
  width: 4px;
  height: 4px;
  content: " ";
  position: absolute;
  background-color: red;
  border-radius: 50%;
  top: 0px;
  left: 16px;
}

.left .l-top li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left .l-top li a {
  display: inline-block;
  padding: 10px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #ff90aa;
}

/////////////////////////////////////////////////////////////////////
.flexarea .right {
  flex: 1;
  width: 600px;
}

.auto-right {
  margin-left: auto;
  color: #2776df;
  margin-right: 10px;
}

.right .title p {
  margin: 0px 0px 0px 20px;
}

.right .title {
  margin-right: 10px;
  padding-right: 30px;
  display: flex;
  margin-top: 5px;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}

.content .number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: rgb(39, 118, 223);
  border-radius: 4px;
  margin-right: 4px;
}

.content {
  padding: 0px 20px;
}

.content .topic {
  padding: 20px 0px;
  padding-top: 30px;
}

.right .content {
  background-color: #fff;
  margin: 10px;
  margin-left: 0px;
  height: 250px;
}

.content .el-radio-group label {
  color: #000;
  margin: 5px 0px;
}

.content .el-radio-group {
  display: flex;
  flex-direction: column;
  margin-top: 2px;
}

.right .upload {
  background-color: #fff;
  margin-right: 10px;
}

.avatar-uploader {
  display: flex;
}

.avatar-uploader .el-upload {
  margin-top: 2px;
  height: 100px;
  width: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.avatar-uploader .el-upload:hover {
  border-color: #073462;
}

.avatar-uploader .el-upload .el-upload__tip {
  display: none;
}

.operation .end li:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(39, 118, 223);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #fff;
}

.operation .end li {
  cursor: pointer;
  margin: 0 100px;
}

.operation {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 0px;
  margin-right: 10px;
}

.operation .end {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(39, 118, 223);
}
</style>
