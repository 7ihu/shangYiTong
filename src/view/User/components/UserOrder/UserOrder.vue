<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
//@ts-ignore
import order from '@/utils/order'
import { getOrderInfoAPI, getCancelOrder, getPayAPI, getPayStatusAPI, getOrderAllInfoAPI, getfindAllAPI, getStatusListAPI } from '@/apis/user'
import { Select, CloseBold } from '@element-plus/icons-vue'
// 引入模块解析为二维码
// @ts-ignore
import QRCode from 'qrcode'
import router from '@/router'

const route = useRoute()

// has-orderid
// 拥有id获取订单详情
const orderIdInfo = ref({
  id: 9463,
  createTime: '2023-09-14 09:50:47',
  updateTime: '2023-09-14 09:50:47',
  isDeleted: 0,
  param: {
    orderStatusString: '预约成功，待支付',
  },
  userId: 8507,
  outTradeNo: '169465624746724',
  hoscode: '1000_10',
  hosname: '航天中心医院',
  depcode: '200040878_10',
  depname: '多发性硬化专科门诊',
  scheduleId: '64fc3912cd9e577ca95aa6b5',
  title: '医师',
  reserveDate: '2023-09-15',
  reserveTime: 0,
  patientId: 3895,
  patientName: 'hu',
  patientPhone: '13945678956',
  hosRecordId: '5204',
  number: 0,
  fetchTime: '2023-09-15 09:00前',
  fetchAddress: '一层114窗口',
  amount: 100,
  quitTime: '2023-09-14 15:30',
  orderStatus: 0,
})
const status = ref('')
const aa = ref(false)
const getOrderInfo = async () => {
  setTimeout(() => (aa.value = true), 1000)
  if (route.query.status) return (status.value = route.query.status as string)
  const res: any = await getOrderInfoAPI(route.query.order as string)
  if (res.code == 200) return (orderIdInfo.value = res.data)
}
// 点击取消订单
const cancel = ref(false)
const confirmEvent = async () => {
  try {
    await getCancelOrder(route.query.order as string)
    cancel.value = true
  } catch (error) {
    console.log(error)
  }
}
// 支付组件
// @ts-ignore
let timer
const dialogTableVisible = ref(false)
// 获取支付二维码
const payImgCode = ref('')
const num = ref(1)
const getPay = async () => {
  dialogTableVisible.value = true
  const res: any = await getPayAPI(route.query.order as string)
  payImgCode.value = await QRCode.toDataURL(res.data ? res.data.codeUrl : 'weixin://wxpay/bizpayurl?pr=kOfX9qbzz')
  timer = setInterval(async () => {
    const res = await getPayStatusAPI(route.query.order as string)
    if (res.data || num.value === 3) {
      ElMessage({ type: 'success', message: '支付成功' })
      return handleClose(1)
    }
    num.value++
  }, 3000)
}
// 点击关闭窗口
const handleClose = (i: number) => {
  dialogTableVisible.value = false
  //@ts-ignore
  clearInterval(timer)
  num.value = 1 - i ? i : 0
}

onMounted(() => {
  getOrderInfo()
  getOrderAllInfo()
  getStatusList()
})

// have-orderid
// 挂号订单
const formOrder = ref({
  name: '',
  state: '10',
})

// 获取当前页订单数据
const orderAllInfo = ref(order)
const getOrderAllInfo = async () => {
  const res: any = await getOrderAllInfoAPI(pages.value.page, pages.value.limit, formOrder.value.name, formOrder.value.state)
  if (res.code === 200) {
    orderAllInfo.value = res.data.records
    return pages.value.total = res.data.total
  }
  newPage.value = (orderAllInfo.value = orderAllInfo.value.filter((item:any) => (!formOrder.value.name ? item.patientName : item.patientName === formOrder.value.name && formOrder.value.state === '10' ? item.param.orderStatusString : item.param.orderStatusString === formOrder.value.state)))
  return pages.value.total = newPage.value.length
}
// 分页器
const pages = ref({
  page: 1,
  limit: 10,
  total: orderAllInfo.value.length,
})
// 改变当前页
const newPage: any = ref(orderAllInfo.value.slice(0, 10))
const handleCurrentChange = (i: number) => (newPage.value = orderAllInfo.value.slice(i * 10 - 10, i * 10))

// 验证
const rules = ref({
  name: [{ required: true, message: '请输入就诊人姓名', trigger: 'change' }],
  state: [{ required: true, message: '选中订单状态', trigger: 'change' }],
})

// 表单的信息
const ruleFormRef = ref()

// 输入就诊人
const elComplete = ref()
// @ts-ignore
const querySearch = async (queryString: any, cb: any) => {
  const { data: res } = await getfindAllAPI()
  // @ts-ignore
  const query = queryString ? res.filter((item) => item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : res
  cb(
    // @ts-ignore
    query.map((item) => {
      return {
        value: item.name,
      }
    })
  )
}
// 点击查询订单状态
const statusList = ref([
  { comment: '预约成功，待支付', status: 0 },
  { comment: '已支付', status: 1 },
  { comment: '已取号', status: 2 },
  { comment: '取消预约', status: -1 },
])
const getStatusList = async () => {
  const res: any = await getStatusListAPI()
  if (res.code == 200) return (statusList.value = res.data)
}
// 点击查询按钮
const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      getOrderAllInfo()
    } else {
      if (fields) {
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) return ElMessage({ type: 'error', message: fields[key][0].message })
        }
      }
    }
  })
}
// 删除
const deleteRow = (i: number) => {
  newPage.value.splice(i, 1)
}
// 详情
const selectRow = (row: any) => {
  orderIdInfo.value = row
  router.push(`/user/order?order=${row.id}`)
}
</script>

<template>
  <div class="order">
    <div class="has-orderid" v-if="route.query.order">
      <h2>挂号详情</h2>
      <div class="middle">
        <p v-if="orderIdInfo" :class="cancel ? 'active' : ''">
          <el-icon><CloseBold v-if="cancel" /><Select v-else /></el-icon>
          <span style="margin-left: 5px">{{ cancel ? '已取消预约' : orderIdInfo.param.orderStatusString }}</span>
        </p>
        <div>
          <img src="../../../../assets/images/code_login_wechat.png" alt="" />
          <div>
            <p>微信关注“北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <div class="content" v-if="orderIdInfo">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="就诊人信息">{{ orderIdInfo.patientName }}</el-descriptions-item>
              <el-descriptions-item label="就诊日期">{{ orderIdInfo.reserveDate }}</el-descriptions-item>
              <el-descriptions-item label="就诊医院">{{ orderIdInfo.hosname }}</el-descriptions-item>
              <el-descriptions-item label="就诊科室">{{ orderIdInfo.depname }}</el-descriptions-item>
              <el-descriptions-item label="医生职称">{{ orderIdInfo.title }}</el-descriptions-item>
              <el-descriptions-item label="医事服务费">{{ orderIdInfo.amount }}</el-descriptions-item>
              <el-descriptions-item label="挂号单号">{{ orderIdInfo.outTradeNo }}</el-descriptions-item>
              <el-descriptions-item label="挂号时间">{{ orderIdInfo.createTime }}</el-descriptions-item>
            </el-descriptions>
            <div class="btn" v-if="!(orderIdInfo.param.orderStatusString === '已支付') && num < 4 && num > 0">
              <el-popconfirm title="您确定取消预约吗?" @confirm="confirmEvent">
                <template #reference>
                  <el-button type="danger" plain size="large" :disabled="cancel">取消预约</el-button>
                </template>
              </el-popconfirm>
              <el-button type="primary" size="large" :disabled="cancel" @click="getPay">去支付</el-button>
            </div>
            <div class="pay" v-else>已支付</div>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>注意事项</span>
                </div>
              </template>
              <ol>
                <li>1. 请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担。</li>
                <li>2. 【取号】就诊当天需在{{ orderIdInfo.fetchTime }}在医院取号，未取号视为爽约，该号不退不换。</li>
                <li>3. 【退号】在{{ orderIdInfo.updateTime }}前可在线退号，逾期将不可办理退号退费。</li>
                <li>4. 北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到医院{{ orderIdInfo.fetchAddress }}取号。</li>
                <li>5. 请注意北京市医保患者在住院明间不能使用社保卡在门诊取号。</li>
              </ol>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-dialog v-model="dialogTableVisible" title="微信支付" width="25%" top="10vh" lock-scroll @close="handleClose">
        <div class="dialog" v-if="payImgCode">
          <img :src="payImgCode" style="width: 100%; height: 100%" />
          <p>请使用微信扫一扫</p>
          <p>扫描二维码支付</p>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" plain @click="handleClose">取消支付</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="have-orderid" v-else>
      <h2>挂号订单</h2>
      <div class="form">
        <el-form ref="ruleFormRef" :inline="true" :model="formOrder" :rules="rules" class="demo-form-inline">
          <el-row class="demo-autocomplete">
            <el-col :span="10">
              <el-form-item label="订单状态：" prop="name">
                <el-autocomplete ref="elComplete" v-model="formOrder.name" :fetch-suggestions="querySearch" clearable placeholder="请输入就诊人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="订单状态：" prop="state">
                <el-select v-model="formOrder.state" placeholder="全部" clearable>
                  <el-option label="全部" :value="'10'" />
                  <el-option :label="item.comment" :value="item.comment" v-for="item in statusList" :key="item.status" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <div style="width: 936px">
          <el-table :data="newPage" max-height="450" style="width: 100%">
            <el-table-column prop="reserveDate" label="就诊时间" sortable fixed width="110" />
            <el-table-column prop="hosname" label="医院" width="240" />
            <el-table-column prop="depname" label="科室" width="200" />
            <el-table-column prop="2" label="医生" />
            <el-table-column prop="amount" label="医事服务费" />
            <el-table-column prop="patientName" label="就诊人" width="150" />
            <el-table-column prop="param.orderStatusString" label="订单状态" width="150" />
            <el-table-column fixed="right" label="操作" width="140">
              <template #default="{ $index, row }">
                <el-button type="primary" size="small" @click.prevent="selectRow(row)">详情</el-button>
                <el-button type="danger" size="small" @click.prevent="deleteRow($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination v-model:current-page="pages.page" v-model:page-size="pages.limit" layout="prev, pager, next,total" :total="pages.total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  .has-orderid {
    padding: 10px 15px;
    border: 1px solid #ccc;
    h2 {
      font-size: 18px;
      font-weight: 600;
      padding: 10px 15px 20px;
      border-bottom: 1px solid #ccc;
    }
    .middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin: 10px 0;
      padding: 10px 15px 15px;
      border-bottom: 1px solid #ccc;
      & > p {
        display: flex;
        align-items: center;
        color: #67c23a;
        padding: 10px;
        border-radius: 5px;
        background-color: #f2fbef;
        &.active {
          color: #f66c6c;
          background-color: #fde6e6;
        }
      }
      & > div {
        display: flex;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        div {
          font-size: 12px;
          p:last-child {
            margin-top: 12px;
          }
        }
      }
    }
    .content {
      padding: 10px 15px 20px;
      .btn {
        display: flex;
        justify-content: space-around;
        padding: 20px 30px 0 0px;
      }
      .box-card {
        height: 100%;
        ol {
          text-indent: 2rem;
          li {
            letter-spacing: 1px;
            line-height: 1.5;
            color: gray;
          }
        }
      }
    }
    .dialog {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      p {
        padding: 5px 0;
      }
    }
    .pay {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin: 30px 50px 0;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      border-radius: 8px;
      background-color: #409eff;
    }
  }
  .have-orderid {
    h2 {
      font-size: 18px;
      font-weight: 600;
    }

    .form {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 20px 10px 0;
    }

    .table {
      :deep(.is-leaf) {
        background-color: #e8f2ff;
      }

      & > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px 0 5px;
      }
    }
  }
}
</style>
