<template>
  <div class="main" style="text-align: center;">
    <div style="display:inline-flex;align-items: center;margin-top: 40px">
      <el-input
        placeholder="风险说明查询"
        v-model="input"
        clearable
        style="width:350px;margin-right: 10px;height: 40px;"
      >
      </el-input>
      <el-button
        :disabled="isabled"
        icon="el-icon-search"
        type="primary"
        style="height: 40px;background-color: #409EFF"
        @click="search"
      >
        搜索
      </el-button>

      <el-dialog
        :visible.sync="centerDialogVisible"
        width="70%"
        center
      >
        <el-table :data="content" border stripe 
        :header-cell-style="{textAlign: 'center'}" 
        :cell-style="{ textAlign: 'center' }"
        tooltip-effect="dark">
            <el-table-column label="五级指标" prop="name" ></el-table-column>
            <el-table-column label="风险说明" prop="detail"></el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <div
      id="show"
      :style="{width: '2000px', height: '1000px'}"
    >
    </div>

  </div>

</template>
  
<script>
export default {
  name: "ShowMess",
  props: {
    isabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: "",
      centerDialogVisible: false,
      content:[{
    
      }]
    };
  },
  mounted() {
    this.Draw();
  },
  methods: {
    search() {
        //弹窗显示
        this.centerDialogVisible = true
        //发送请求，得到数据
        var detail=this.input
        console.log("input="+this.input)
        if(this.input===null){
            return;
        }
        this.$axios.post('/sys/search?detail='+detail).then(res=>{
            if(res.data.data===null){
                this.content=null
            }else{
                this.content = res.data.data
            }
        })

    },

    Draw() {
      let myChart = this.$echarts.init(document.getElementById("show"));
      myChart.showLoading();
      this.$axios.get("/sys/show").then((res) => {
        myChart.hideLoading();
        var treeData = this.convertData(res.data.data);
        myChart.setOption(this.getOption(treeData));
      });
    },
    // 定义 convertData 函数来转换数据格式
    convertData(data) {
      return {
        name: data.name,
        children: Array.isArray(data.children)
          ? data.children.map((child) => this.convertData(child))
          : [],
        value: data.value,
        tooltip: {
          // 使用 formatter 函数来定义 tooltip 的显示内容
          formatter: function (params) {
            var detail = params.value || ""; // 获取节点的详细信息
            var name = params.name || ""; // 获取节点的名称
            // 定义每行最大字符数
            var maxCharactersPerLine = 20;
            // 按照每行最大字符数进行分割，并添加换行符
            // RegExp 是 JavaScript 中的一个内置对象，用于表示正则表达式（Regular Expression）模式。
            // 正则表达式是一种用来匹配字符串的模式，它可以用来检索、替换、分割字符串等操作。
            var wrappedDetail = detail.replace(
              new RegExp("(.{1," + maxCharactersPerLine + "})", "g"),
              "$1<br>"
            );
            // 返回自定义的 tooltip 格式
            return  name +':'+wrappedDetail + "\n";
          },
        },
      };
    },
    // 定义函数来获取图表配置项
    getOption(treeData) {
      return {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "tree",
            data: [treeData],
            top: "1%",
            left: "2%",
            bottom: "1%",
            right: "20%",
            height: "90%",
            center: [800, "60%"],
            zoom: 0.8,
            symbolSize: 7,
            roam: true, //鼠标可移动可缩放
            expandAndCollapse: true, //默认展开
            initialTreeDepth: 3, //初始展开层数
            itemStyle: {
              color: "#99CCFF",
            },
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "right",
              fontSize: 15,
              fontStyle: "italic",
              fontFamily: "sans-serif",
              borderColor: "#409EFF",
              borderWidth: 8,
            },
            lineStyle: {
              color: "#99CCFF",
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left",
                borderWidth: 1,
                formatter: function (params) {
                  var text = params.name;
                  var length = text.length;
                  var lineHeight = 16; // 每行的高度
                  var maxLineLength = 45; // 每行最多显示的字符数
                  var lineCount = Math.ceil(length / maxLineLength); // 计算需要几行
                  var lines = [];
                  for (var i = 0; i < lineCount; i++) {
                    var line = text.substr(i * maxLineLength, maxLineLength);
                    lines.push(line);
                  }
                  return lines.join("\n");
                },
              },
            },
            emphasis: {
              focus: "descendant",
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      };
    },
  },
};
</script>
  
<style>

</style>
  