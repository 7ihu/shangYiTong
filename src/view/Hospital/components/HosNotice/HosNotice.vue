<script setup lang="ts">
//引入医院详情仓库的数据
import { useHospitalStore } from '@/store/hospital.ts'
const hospitalStore = useHospitalStore()
</script>

<template>
  <div class="notice" v-if="hospitalStore.hospitalInfo">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知</h1>
    <div class="pages" v-if="hospitalStore.hospitalInfo">
      <span>为方便您早日就医康复，请您认真阅读预约挂号须知：</span>
      <div>
        <h2>一、预约实名制：</h2>
        <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
        <h2>二、预约挂号：</h2>
        <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
        <ul>
          <li>在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；</li>
          <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
          <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
          <li>在同一自然季度，同一就诊人，可以预约最多24个号源。</li>
        </ul>
        <h2>三、取消预约：</h2>
        <p>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
        <h2>四、爽约处理：</h2>
        <p>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：</p>
        <ul>
          <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</li>
          <li>累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</li>
        </ul>
      </div>
    </div>
    <el-empty description="暂无数据" :image-size="300" v-else />
  </div>
</template>

<style scoped lang="scss">
.notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 2px;
  h1 {
    font-size: 30px;
    font-weight: 700;
    padding: 0px 0 20px;
  }
  .pages {
    span {
      display: block;
      color: gray;
      padding: 15px 0;
    }
    & > div {
      padding-left: 20px;
      h2 {
        font-size: 16px;
        font-weight: 600;
        padding: 10px 0;
      }
      p,
      ul {
        font-size: 15px;
        text-indent: 2rem;
        line-height: 2;
        color: gray;
      }
      ul {
        font-size: 14px;
        text-indent: 4rem;
      }
    }
  }
}
</style>
