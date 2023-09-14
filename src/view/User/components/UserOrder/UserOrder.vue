<script setup lang="ts">
import { ref, onMounted } from "vue";
</script>

<template>
  <div class="order">
   
    <div class="haveorder">
      <!-- 展示全部订单的结构 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>挂号订单</span>
          </div>
        </template>
        <!--提供用户选择的下拉菜单-->
        <el-form :inline="true">
          <el-form-item label="就诊人">
            <el-select placeholder="请选择就诊人">
              <el-option label="请选择全部就诊人" value=""></el-option>
              <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select placeholder="请选择订单状态">
              <el-option label="全部订单" value=""></el-option>
              <el-option v-for="(item, index) in 10" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 表格展示订单的数据 -->
        <el-table border style="margin: 10px 0px">
          <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
          <el-table-column label="医院" prop="hosname"></el-table-column>
          <el-table-column label="科室" prop="depname"></el-table-column>
          <el-table-column label="医生" prop="title"></el-table-column>
          <el-table-column label="服务费" prop="amount"></el-table-column>
          <el-table-column label="就诊人" prop="patientName"></el-table-column>
          <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getOrderInfo" @size-change="handler" /> -->
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
