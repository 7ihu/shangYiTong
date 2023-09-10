<script setup lang="ts">
import { Histogram } from '@element-plus/icons-vue'
import { useHospitalStore } from '@/store/hospital.ts'

const hospitalStore = useHospitalStore()
</script>

<template>
  <div class="hosinfo" v-if="hospitalStore.hospitalInfo">
    <div class="top">
      <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}</h1>
      <p>
        <el-icon size="16" color="gray"><Histogram /></el-icon>
        <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </p>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`" :title="hospitalStore.hospitalInfo.hospital?.hosname" />
      </div>
      <div class="right">
        <div class="rule">
          <h2>挂号规则</h2>
          <div class="info">
            <div>
              <p><span class="public">预约周期：</span>{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天</p>
              <p><span class="public">放号时间：</span>{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}</p>
              <p><span class="public">停挂时间：</span>{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}</p>
            </div>
            <p><span class="public">退号时间：</span>就诊前一工作日15:30前取消</p>
          </div>
        </div>
        <div class="address">
          <h2>医院位置-路线</h2>
          <p class="public">具体地点：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</p>
          <p class="p public" v-html="'医院路线：' + hospitalStore.hospitalInfo.hospital?.route"></p>
          <h2>预约规则</h2>
          <ol>
            <li class="public" v-for="item in hospitalStore.hospitalInfo.bookingRule?.rule" :key="item">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="bottom">
      <h2>医院详情</h2>
      <p>{{ hospitalStore.hospitalInfo.hospital?.intro }}</p>
    </div>
  </div>
  <el-empty description="暂无数据" :image-size="300" v-else />
</template>

<style scoped lang="scss">
.hosinfo {
  letter-spacing: 1px;
  padding-bottom: 50px;
  .top {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 20px;
    h1 {
      font-size: 20px;
      font-weight: 700;
      margin-right: 15px;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: gray;
      span {
        margin-left: 3px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 20px;
    .left {
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 50px;
      .rule {
        h2 {
          font-size: 17px;
          margin-bottom: 15px;
        }
        .info {
          font-size: 12px;
          margin-bottom: 20px;
          & > div {
            display: flex;
            align-items: center;
            margin: 15px 0 10px;
            p {
              margin-right: 80px;
            }
          }
        }
      }
      .address {
        margin-bottom: 20px;
        h2 {
          font-size: 17px;
          margin: 15px 0;
        }
        ol {
          margin-left: 15px;
          list-style-type: decimal;
          li {
            font-size: 12px;
          }
        }
      }
    }
  }
  .bottom {
    h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 15px 0;
    }
    p {
      font-size: 14px;
      color: gray;
      text-indent: 2rem;
      line-height: 2;
      padding-left: 8px;
    }
  }
}
.p {
  line-height: 25px;
  color: gray;
  font-size: 14px;
}
.public {
  font-size: 12px;
  color: gray;
  padding: 5px;
}
</style>
