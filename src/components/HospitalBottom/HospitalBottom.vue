<script setup lang="ts">

</script>

<template>
  <div class="bottom">
    <div class="container">
      <div class="left">
        <p>京ICP备13018369号</p>
        <p>电话挂号：010-56253825</p>
      </div>
      <div class="right">
        <p>联系我们</p>
        <p>合作伙伴</p>
        <p>用户协议</p>
        <p>隐私协议</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #fafafa;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    font-size: 12px;

    .left {
      display: flex;
      align-items: center;

      p:nth-child(1) {
        color: gray;
        margin-right: 30px;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      p {
        height: 50px;
        line-height: 50px;

        &:nth-child(n+1) {
          margin-left: 30px;
        }

        &:hover {
          color: #4490f1;
        }
      }
    }
  }
}
</style>