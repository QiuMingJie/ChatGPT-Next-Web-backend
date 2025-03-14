<template>
  <div class="topbar">
    <!-- <img src="@/assets/logo.png" alt="" /> -->
    <div class="title">AI 高校管理后台</div>
    <div class="right">
      <!-- <div class="notification">
        <img src="@/assets/message.svg" alt="" />
        <span class="alarm-number">999</span>
      </div> -->
      <div>
        <img src="@/icons/svg/user.svg" alt="" />
      </div>
      <div class="user-info">
        <el-dropdown>
          <div class="link">
            <div>{{$store.getters.token}}，您好！</div>
            <!-- <i class="el-icon-arrow-down"></i> -->
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>关于</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 27px;
  z-index: 999;
  height: 64px;
  // background: url(../../assets/topbar-bg.png) no-repeat center top 0;
  // background-size: cover;
  background: #324156;
}
.title{
  color: #fff;
  font-size: 24px;
}
.right {
  display: flex;
  align-items: center;
}
.notification{
  position: relative;
  margin-right: 45px;
  .alarm-number {
    position: absolute;
    top: -10px;
    right: -19px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    background-color: red;
    color: #ffffff;
    font-size: 12px;
    border-radius: 8px;
    text-align: center;
    padding: 0 4px;
    pointer-events: none;
  }
}
.user-info {
  display: flex;
  align-items: center;
  margin-left: 15px;

  div {
    font-size: 14px;
    color: var(--th-color-white);
  }

  .link {
    display: flex;
    align-items: center;
    color: #ffffff;
    cursor: pointer;

    &:focus-visible {
      outline: none;
    }

    .icon {
      color: var(--th-color-white);
    }
  }
}
.quit{
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 14px;
  margin-left: 20px;
  span{
    margin-left: 10px;
  }
}
</style>
