<template>
  <div class="dashboard-container">
    <div class="dashboard-search">
      <el-form :inline="true" :model="form">
        <el-form-item label="用户ID">
          <el-input size="small" v-model="form.userId" placeholder="输入用户ID" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input size="small" v-model="form.userName" placeholder="输入用户名" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="问题">
          <el-input size="small" v-model="form.toDeepSeekQuestion" placeholder="输入发给deepseek的问题" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="回答">
          <el-input size="small" v-model="form.answer" placeholder="输入deepseek回答" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="聊天类型">
          <el-select v-model="form.chatType" size="small">
            <el-option label="中医诊断学知识点查询库" value="中医诊断学知识点查询库"></el-option>
            <el-option label="中医诊断学AI出题" value="中医诊断学AI出题"></el-option>
            <el-option label="中医诊断学智能答疑" value="中医诊断学智能答疑"></el-option>
          </el-select>
        </el-form-item>
       
        
        <el-form-item>
          <el-button size="small" type="primary" @click="serachInit">查询</el-button>
          <el-button size="small" @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dashboard-table">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="80"  />
        <el-table-column prop="id" label="问题ID" width="180" resizable/>
        <el-table-column prop="userId" label="用户ID" width="120" resizable />
        <el-table-column prop="userName" label="用户名" width="120" resizable />
        <el-table-column prop="orgQuestion" label="问题" width="200" resizable>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div>{{ scope.row.orgQuestion }}</div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.orgQuestion }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="answer" label="AI 回答" minWidth="360" resizable>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div>{{ scope.row.answer }}</div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.answer }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="datetime" label="时间" width="200"  resizable/>
      </el-table>
      <div class="disboard-page">
        <el-pagination
          v-model:current-page="pageParam.page"
          v-model:page-size="pageParam.size"
          :page-sizes="[10, 20, 30, 40]"
          :small="true"
          :disabled="false"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="pageParam.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { searchTCMchat } from '@/api/table';


export default {
  name: 'Dashboard',
  data(){
    return {
      loading: false,
      tableData: [],
      form: {
        userId: "",
        userName: "",
        chatType: "",
        answer: "",
        orgQuestion: "",
        sortBy: "datetime",
        sortDirection: "desc", 
      },
      pageParam: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    async initData() {
      const param = { ...this.form, ...this.pageParam};
      try{
        this.loading = true
        await searchTCMchat({ ...param }).then((res) => {
          const {content, totalElements} = res.data
          this.tableData = content
          this.pageParam.total = totalElements
          this.loading = false
        })
      }catch(error){
        console.log(error);
        this.loading = false
      }
      
    },
    serachInit() {
      this.pageParam.page = 1;
      this.initData()
    },
    resetFn() {
      this.form = {
        userId: "",
        userName: "",
        chatType: "",
        answer: "",
        orgQuestion: "",
        sortBy: "datetime",
        sortDirection: "desc", 
      }
      this.pageParam = {
        page: 1,
        size: 10
      }
      this.initData()
    },
    handleCurrentChange(val) {
      this.pageParam.page = val;
      this.initData()
    },
    handleSizeChange(val){
      this.pageParam.size = val;
      this.initData()
    },
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
  .disboard-page{
    display: flex;
    justify-content: end;
    margin: 10px 0 ;
  }
}
</style>
