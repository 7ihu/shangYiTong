<script setup lang="ts">
import { Histogram, AlarmClock } from '@element-plus/icons-vue'
import { pageAtt } from '@/types/home'
import { getHomeHospitalAPI } from '@/apis/home'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// 获取父组件传来的值
const props = defineProps<{
  activeChoice: string
  activeAddress: string
}>()

// 当前页面值
const pages = ref<pageAtt>({
  currentPage: 1,
  pageSize: 10,
  total: 20,
})

// 获取医院全部数据
const homeHospitalList = ref<any>([])
const getHomeHospital = async () => {
  const res = await getHomeHospitalAPI(pages.value.currentPage, pages.value.pageSize, props.activeChoice, props.activeAddress)
  homeHospitalList.value = res.data.content
  pages.value.total = res.data.totalElements
}
// 分页器页码发生变化
const handleCurrentChange = (i: number) => {
  pages.value.currentPage = i
  getHomeHospital()
}
const handleSizeChange = (i: number) => {
  pages.value.pageSize = i
  getHomeHospital()
}
// 监听props值变化
watch(props, () => getHomeHospital(), { deep: true })
// 创建路由实例
const router = useRouter()

onMounted(() => {
  getHomeHospital()
})
</script>

<template>
  <div class="hospital" v-if="homeHospitalList.length">
    <div class="hospitalInfo">
      <el-card class="box-card" v-for="item in homeHospitalList" :key="item.id" shadow="hover" @click="router.push(`/hospital/${item.hoscode}`)" :title="item.hosname">
        <div class="info">
          <h2>{{ item?.hosname }}</h2>
          <div class="detail">
            <p>
              <el-icon size="18" color="gray">
                <Histogram />
              </el-icon>
              <span>{{ item.param?.hostypeString }}</span>
            </p>
            <p>
              <el-icon>
                <AlarmClock />
              </el-icon>
              <span>每天{{ item.bookingRule?.releaseTime }}放号</span>
            </p>
          </div>
        </div>
        <img :src="`data:image/jpeg;base64,${item?.logoData}`" alt="" />
      </el-card>
    </div>
    <div class="pages" v-if="homeHospitalList.length">
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pages.currentPage" v-model:page-size="pages.pageSize" :page-sizes="[5, 10, 15, 20]" background layout="sizes, prev, pager, next, jumper,total" :total="pages.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <el-empty description="暂无数据" :image-size="300" v-else />
</template>

<style scoped lang="scss">
.hospital {
  .hospitalInfo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    .box-card {
      width: 48%;
      margin-top: 20px;
      border: 0;
      cursor: pointer;
      background: linear-gradient(to bottom, rgba(223, 249, 251, 0.4), rgba(245, 246, 250, 0.5));

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;

        h2 {
          width: 320px;
          white-space: nowrap;
          overflow: hidden;
          font-weight: 600;
        }

        .detail {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
          padding-right: 50px;

          p {
            display: flex;
            align-items: center;

            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    margin: 30px 0 12px;
    width: 100%;
  }
}

:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
