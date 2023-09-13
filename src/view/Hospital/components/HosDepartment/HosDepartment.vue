<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import { getBookingScheduleRuleAPI, getfindScheduleListAPI } from '@/apis/hospital'

const route = useRoute()
const router = useRouter()

const activeIndex = ref()
// 获取当前页面挂号号源
const data = ref({
  page: 1,
  limit: 5,
  total: 1,
})

const bookingScheduleRule = ref()

// 获取当前门诊挂号详情
const getBookingScheduleRule = async () => {
  const res: any = await getBookingScheduleRuleAPI(data.value.page, data.value.limit, route.params.id as string, route.query.depcode as string)
  if (!(res.code === 200)) return ElMessage({ type: 'warning', message: res.message })
  bookingScheduleRule.value = res.data
  data.value.total = res.data.total
}

// 点击选择想要挂号的时间,并显示对应时间的医生
const findScheduleList = ref()
const onClickNumber = async (item: any, i: number) => {
  if (item.status === -1 || item.availableNumber === -1) return ElMessage({ type: 'warning', message: item.status === -1 ? '当前已停止挂号' : item.availableNumber === -1 ? '当前已无号码' : '' })
  activeIndex.value = i
  const res = await getfindScheduleListAPI(route.params.id as string, route.query.depcode as string, item.workDate)
  findScheduleList.value = res.data
}

// 点击查看其他页数据
const handleCurrentChange = (i: number) => {
  data.value.page = i
  findScheduleList.value = ''
  getBookingScheduleRule()
  activeIndex.value = ''
}

// 点击开始挂当前时间医生号码
const onAvailable = (i: string) => {
  if (bookingScheduleRule.value.bookingScheduleList[activeIndex.value]?.status === 1) return ElMessage({ type: 'warning', message: '即将放号,请耐心等待' })
  router.push(`visitor?doctor=${i}`)
}

onMounted(() => getBookingScheduleRule())
</script>

<template>
  <!-- eslint-disable -->
  <div class="department" v-if="bookingScheduleRule">
    <div class="top">
      <div>
        <h2>{{ bookingScheduleRule.baseMap.hosname }}</h2>
        <span>{{ bookingScheduleRule.baseMap.bigname }}</span>
      </div>
      <p>{{ bookingScheduleRule.baseMap.depname }}</p>
    </div>
    <div class="content">
      <p>{{ bookingScheduleRule.baseMap.workDateString }}</p>
      <div class="info">
        <div class="number-info">
          <div :class="{ active: activeIndex === i, statusColor: item.status === -1 || item.availableNumber === -1 }" v-for="(item, i) in bookingScheduleRule.bookingScheduleList" :key="i" @click="onClickNumber(item, i)">
            <p>
              {{ item.workDate }}<span>{{ item.dayOfWeek }}</span>
            </p>
            <p v-if="item.status === -1">停止挂号</p>
            <p v-if="item.status === 1">即将放号</p>
            <p v-if="item.status === 0">{{ item.availableNumber === -1 ? '已满' : `有号(${item.availableNumber})` }}</p>
          </div>
        </div>
        <div class="pagination">
          <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit" layout=" prev, pager, next" :total="data.total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div v-if="!findScheduleList" class="time">请先选择您需要预约的时间</div>
        <div v-else>
          <div>
            <div class="number">
              <div></div>
              <h2>上午号源</h2>
            </div>
            <div class="physician" v-for="item in findScheduleList" :key="item.id" v-show="item.workTime === 0">
              <div class="left">
                <div>
                  <h2>{{ item.title }}</h2>
                  <span>{{ item.docname }}</span>
                </div>
                <p>{{ item.skill }}</p>
              </div>
              <div class="right">
                <span>￥{{ item.amount }}</span>
                <button @click="onAvailable(item.id)">{{ bookingScheduleRule.bookingScheduleList[activeIndex]?.status === 1 ? '即将放号' : '剩余' + item.availableNumber }}</button>
              </div>
            </div>
          </div>
          <div>
            <div class="number">
              <div></div>
              <h2>下午号源</h2>
            </div>
            <div class="physician" v-for="item in findScheduleList" :key="item.id" v-show="item.workTime === 1">
              <div class="left">
                <div>
                  <h2>{{ item.title }}</h2>
                  <span>{{ item.docname }}</span>
                </div>
                <p>{{ item.skill }}</p>
              </div>
              <div class="right">
                <span>￥{{ item.amount }}</span>
                <button @click="onAvailable(item.id)">{{ bookingScheduleRule.bookingScheduleList[activeIndex]?.status === 1 ? '即将放号' : '剩余' + item.availableNumber }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.department {
  .top {
    div {
      display: flex;
      align-items: center;
      font-size: 14px;
      h2 {
        font-size: 16px;
        font-weight: 600;
        padding-right: 20px;
        border-right: 1px solid #ccc;
      }
      span {
        margin-left: 10px;
      }
    }
    p {
      font-size: 20px;
      font-weight: 700;
      padding: 20px 10px;
    }
  }
  .content {
    p {
      text-align: center;
    }
    .info {
      padding: 20px 30px;
      .number-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px 0;
        div {
          display: flex;
          flex-direction: column;
          color: #4990f1;
          font-size: 14px;
          width: 130px;
          height: 80px;
          margin: 0 22px;
          border: 1px solid #e8f2ff;
          border-radius: 5px;
          &.active {
            font-weight: 600;
            border: 1px solid #4990f1;
            p:first-child {
              color: #fff;
              background-color: #4990f1;
            }
          }
          &.statusColor {
            font-weight: 600;
            color: #7f8c8d;
            border: 1px solid #bdc3c7;
            p:first-child {
              color: #fff;
              background-color: #bdc3c7;
            }
          }
          p {
            line-height: 35px;
            &:first-child {
              display: flex;
              justify-content: space-around;
              align-items: center;
              color: #4990f1;
              border-top-right-radius: 5px;
              border-top-left-radius: 5px;
              background-color: #e8f2ff;
            }
            span {
              margin-top: 5px;
              font-size: 12px;
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: center;
      }
    }
  }
  .bottom {
    .number {
      display: flex;
      align-items: center;
      padding: 20px 10px 0;
      div {
        width: 3px;
        height: 12px;
        border-radius: 10px;
        margin-right: 5px;
        background-color: #4990f1;
      }
      h2 {
        font-size: 15px;
        color: #ccc;
      }
    }
    .physician {
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding: 0 20px;
      margin: 40px 0;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div {
          display: flex;
          align-items: center;
          font-size: 14px;
          h2 {
            font-size: 15px;
            font-weight: 550;
            padding-right: 20px;
            border-right: 1px solid #ccc;
          }
          span {
            margin-left: 10px;
          }
        }
        p {
          color: #999;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #4990f1;
        span {
          font-weight: 600;
          margin-right: 20px;
        }
        button {
          width: 120px;
          padding: 10px;
          border: 0;
          font-weight: 600;
          border-radius: 5px;
          background-color: #ced6e0;
          cursor: pointer;
          &:hover {
            color: #f39c12;
            background-color: #e8f2ff;
          }
        }
      }
    }
  }
  .soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      span {
        color: #999;
        font-size: 30px;
        font-style: italic;
      }
      i {
        color: #4990f1;
        font-size: 40px;
      }
      &:first-child {
        padding: 10px 0 30px;
      }
    }
  }
}
.time {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  font-size: 35px;
  font-weight: 700;
  letter-spacing: 3px;
  background: #121fcf;
  background: repeating-radial-gradient(circle farthest-corner at center center, #121fcf 9%, #ff5c21 50%, #00ff00 67%, #cf1b33 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
