<script setup lang="ts">

</script>

<template>
  <div class="top">
    <div class="container">
      <div class="left">
        <a href="/">
          <img src="../../assets/images/logo.png" alt="">
          <p>尚医通 &nbsp; 预约挂号同一平台</p>
        </a>
      </div>
      <div class="right">
        <p>帮助中心</p>
        <p>登录/注册</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;

    .left {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: #4490f1;
        text-decoration: none;

        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: grey;
      cursor: pointer;

      p {

        &:nth-child(1) {
          margin-right: 15px;
        }

        &:hover {
          color: #4490f1;
        }
      }
    }
  }
}
</style>