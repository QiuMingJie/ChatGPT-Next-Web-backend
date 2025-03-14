<template>
  <div class="dashboard-container">
    <div class="dashboard-search">
      <el-form :inline="true" :model="form">
        <el-form-item label="用户班级">
          <el-input size="small" v-model="form.userClass" placeholder="输入用户班级" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="用户Id">
          <el-input size="small" v-model="form.userId" placeholder="输入用户Id" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input size="small" v-model="form.userName" placeholder="输入用户名" clearable @keyup.enter.native="initData"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="initData">查询</el-button>
          <el-button size="small" @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dashboard-table">
      <el-upload
        style="display: inline-block; margin-right: 10px;"
        action=""
        :http-request="uploadFileTemplate"
        :show-file-list="false"
        >
        <el-button size="small" type="primary">导入</el-button>
      </el-upload>
      <el-upload
        style="display: inline-block; margin-right: 10px;"
        action=""
        :http-request="uploadFiles"
        :show-file-list="false"
        >
        <el-button size="small" type="primary">导入模版</el-button>
      </el-upload>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" />
        <el-table-column prop="userClass" label="用户班级" width="180" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="userSex" label="性别" width="80" />
        <el-table-column prop="userPhone" label="手机号" width="120" />
        <el-table-column prop="userType" label="用户类型" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button link type="text" size="small" @click="resetPwd(scope.row)">重置密码</el-button>
          <el-button link type="text" size="small" @click="setAdmin(scope.row)">设置{{scope.row.userType === 'admin' ? '普通角色' : '管理员'}}</el-button>
        </template>
      </el-table-column>
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
import { getList, resetPassword, setAsAdmin, getUploadTemplate, setUpload } from '@/api/table';
import user from '@/store/modules/user';

export default {
  name: 'Dashboard',
  data(){
    return {
      loading: false,
      tableData: [],
      form: {
        userClass: "",
        userName: "",
        userId: "",
        sortBy: "createTime",
        sortDirection: "desc" 
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
        await getList({ ...param }).then((res) => {
          const {content, totalPages} = res.data
          this.tableData = content
          this.pageParam.total = totalPages
          this.loading = false
        })
      }catch(error){
        console.log(error);
        this.loading = false
      }
      
    },
    resetFn() {
      this.form = {
        userClass: "",
        userName: "",
        userId: "",
        sortBy: "createTime",
        sortDirection: "desc" 
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
    resetPwd(val) {
      this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await resetPassword({
            userId: val.userId,
            userPassword: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
          }).then((res) => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    setAdmin(val) {
      const {userType, userId} = val
      const type = userType === 'admin'? 'user' : 'admin'
      const typeName = type === 'admin'? '管理员' : '普通用户'
      this.$confirm(`此操作将设置该用户为${typeName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        setAsAdmin({
          userId,
          userType: type
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.initData()
        })
      })
    },
    uploadFiles(item){
      let formData = new FormData();
      let file = item.file;
      formData.append('file', file);
      setUpload(formData).then(res => {
        this.$message({
          type:'success',
          message: '导入成功!'
        });
        this.initData()
      })
    },
    uploadFileTemplate(){
      let formData = new FormData();
      let file = item.file;
      formData.append('file', file);
      getUploadTemplate(formData).then(res => {
        this.$message({
          type:'success',
          message: '导入成功!'
        });
        this.initData()
      })
    }
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
