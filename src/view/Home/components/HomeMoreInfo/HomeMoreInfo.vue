<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Notification, MessageBox } from '@element-plus/icons-vue'

const moreInfo = ref({
  top: ['神经内科', '消化内科', '呼吸内科', '内科', '神经外科', '妇科', '产科', '儿科'],
  container: ['关于延长北京大学国际医院放假的通知', '北京中医药大学东方医院部分科室医生门诊医', '武警总医院号源暂停更新通知'],
  bottom: ['中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告', '首都医科大学附属北京潞河医院老年医学科门诊停诊公告', '中日友好医院中西医结合心内科门诊停诊公告'],
})
</script>

<template>
  <div class="moreinfo">
    <div class="top">
      <div class="title">
        <h2>常见科室</h2>
        <p>
          全部<el-icon class="i"><ArrowRight /></el-icon>
        </p>
      </div>
      <ul class="content">
        <li v-for="item in moreInfo.top" :key="item" :title="item">{{ item }}</li>
      </ul>
    </div>
    <div class="container">
      <div class="notification">
        <div class="icon">
          <el-icon size="30" color="#7eabff"><Notification /></el-icon>
        </div>
        <h2>平台公告</h2>
        <p>
          全部<el-icon class="i"><ArrowRight /></el-icon>
        </p>
      </div>
      <ul>
        <li v-for="item in moreInfo.container" :key="item" :title="item">{{ item }}</li>
      </ul>
    </div>
    <div class="bottom">
      <div class="notification">
        <div class="icon" style="background-color: #fffaf1">
          <el-icon size="30" color="#f1c40f"><MessageBox /></el-icon>
        </div>
        <h2>停诊公告</h2>
        <p>
          全部<el-icon class="i"><ArrowRight /></el-icon>
        </p>
      </div>
      <ul class="beforeli">
        <li v-for="item in moreInfo.bottom" :key="item" :title="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.moreinfo {
  letter-spacing: 1px;
  .top {
    margin-top: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      h2 {
        font-size: 16px;
        font-weight: 600;
      }
      p {
        color: gray;
        &:hover {
          color: #55a6f1;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      font-size: 14px;
      margin-top: 20px;
      li {
        width: 70px;
        margin: 10px;
        &:hover {
          color: #55a6f1;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
  .container,
  .bottom {
    margin-top: 40px;
    .notification {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 50%;
        background-color: #f2f8ff;
      }
    }
    ul {
      font-size: 14px;
      margin: 10px 0 0 20px;
      li {
        padding: 10px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:before {
          content: '•'; /* 使用伪元素添加自定义的小圆点样式 */
          color: #55a6f1; /* 设置小圆点的颜色 */
          margin-right: 5px; /* 可选：设置小圆点与文本之间的间距 */
        }
        &:hover {
          color: #55a6f1;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
}
h2 {
  font-size: 16px;
  font-weight: 600;
}
p {
  color: gray;
  &:hover {
    color: #55a6f1;
    font-weight: 600;
    cursor: pointer;
  }
  .i {
    font-size: 18px;
    color: #55a6f1;
    padding-left: 2px;
    vertical-align: -4px;
  }
}
.beforeli {
  li {
    &:before {
      content: '•'; /* 使用伪元素添加自定义的小圆点样式 */
      color: #f1c40f !important; /* 设置小圆点的颜色 */
    }
    &:hover {
      color: #f1c40f !important;
    }
  }
}
</style>
