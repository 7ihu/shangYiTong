<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getDictCodeAPI, getCityAddressAPI, getAddUpdateAPI,getInfoAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()


const ruleForm = ref({
  name: '',
  sex: '',
  address: '',
  birthdate: '',
  certificatesNo: '',
  certificatesType: '',
  contactsCertificatesNo: '',
  contactsCertificatesType: '',
  contactsName: '',
  contactsPhone: '',
  isMarry: '',
  phone: '',
  isInsure: '',
  provinceCode: '',
  cityCode: '',
  districtCode: '',
  param: {
    fullAddress:''
  }
})
const onChange = (v: any) => {
  ruleForm.value.provinceCode = v[0]
  v.length > 1 ? (ruleForm.value.cityCode = v[1]) : ''
  v.length > 2 ? (ruleForm.value.districtCode = v[2]) : ''
}

// 获取实名类型
const dictCode = ref()
const getDictCode = async () => {
  const res = await getDictCodeAPI()
  dictCode.value = res.data
}
// 获取地址
const address = {
  lazy: true,
  //@ts-ignore
  async lazyLoad(node, resolve) {
    const res = await getCityAddressAPI(node.data.id || '86')
    resolve(
      //@ts-ignore
      res.data.map((item) => {
        return {
          id: item.id,
          value: item.value,
          label: item.name,
          leaf: !item.hasChildren,
        }
      })
    )
  },
}

onMounted(() => {
  getDictCode()
  if(route.query.id) return getAddUpdate()
})
// 表单实例
const ruleFormRef = ref()
// 校验规则
const rules = {
  name: [{ required: true, message: '请输入就诊人姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择就诊人性别', trigger: 'change' }],
  certificatesType: [{ required: true, message: '请选择就诊人证件类型', trigger: 'change' }],
  certificatesNo: [
    { required: true, message: '请输入就诊人证件号', trigger: 'blur' },
  ],
  birthdate: [{ type: 'date', required: true, message: '请输入就诊人出生日期', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入就诊人手机号码', trigger: 'blur' },
  ],
  isInsure: [{ required: true, message: '请选择就诊类型', trigger: 'change' }],
  addressSelected: [{ required: true, message: '请选择就诊人当前地址', trigger: 'change' }],
  address: [{ required: true, message: '请输入就诊人详细地址', trigger: 'blur' }],
}

// 点击提交
const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      const res = await getAddUpdateAPI(ruleForm.value)
      router.go(-1)
      return ElMessage({ type: 'success', message: res.data?'已完成': res.data})
    } else {
      if (fields) {
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) return ElMessage({ type: 'error', message: fields[key][0].message })
        }
      }
    }
  })
}

// 修改
const getAddUpdate = async () => {
  const res = await getInfoAPI(route.query.id as string)
  ruleForm.value = res.data
}
</script>

<template>
  <div class="addinfo">
    <h2>添加就诊人</h2>
    <div class="info">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px" size="large" status-icon>
        <div>
          <div class="number">
            <div></div>
            <h2>就诊人信息</h2>
          </div>
          <div class="reginfo">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model.trim="ruleForm.name" placeholder="请输入就诊人姓名" />
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model.trim="ruleForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证件类型：" prop="certificatesType">
              <el-select v-model.trim="ruleForm.certificatesType" placeholder="请选择就诊人证件类型" style="width: 100%">
                <el-option :label="item.name" :value="item.value" v-for="item in dictCode" :key="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="certificatesNo">
              <el-input v-model.trim="ruleForm.certificatesNo" type="number" placeholder="请输入就诊人证件号" />
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthdate" required>
              <el-date-picker v-model.trim="ruleForm.birthdate" type="date" placeholder="请选择出生日期" style="width: 100%" />
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model.number.trim="ruleForm.phone" type="text" placeholder="请输入就诊人手机号码" maxlength="11" />
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="number">
            <div></div>
            <h2>建档信息（完善后部分医院首次就诊不排队建档）</h2>
          </div>
          <div class="reginfo">
            <el-form-item label="婚姻状况：">
              <el-radio-group v-model.trim="ruleForm.isMarry">
                <el-radio :label="1">已婚</el-radio>
                <el-radio :label="0">未婚</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自费/医保：" prop="isInsure">
              <el-radio-group v-model.trim="ruleForm.isInsure">
                <el-radio :label="1">自费</el-radio>
                <el-radio :label="0">医保</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="当前住址：" required>
              <el-cascader v-model="ruleForm.param.fullAddress"  @change="onChange" :props="address" filterable style="width: 100%" placeholder="请选择就诊人当前地址" required/>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model.trim="ruleForm.address" placeholder="应公安机关要求，请填写" />
            </el-form-item>
          </div>
        </div>

        <div>
          <div class="number">
            <div></div>
            <h2>联系人信息（选填）</h2>
          </div>
          <div class="reginfo">
            <el-form-item label="姓名：">
              <el-input v-model.trim="ruleForm.contactsName" placeholder="请输入联系人姓名" />
            </el-form-item>
            <el-form-item label="证件类型：">
              <el-select v-model.trim="ruleForm.contactsCertificatesType" placeholder="请选择联系人证件类型" style="width: 100%">
                <el-option :label="item.name" :value="item.value" v-for="item in dictCode" :key="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：">
              <el-input v-model.number.trim="ruleForm.contactsCertificatesNo" placeholder="请输入联系人证件号" />
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model.number.trim="ruleForm.contactsPhone" placeholder="请输入联系人手机号码" />
            </el-form-item>
          </div>
        </div>
        <div class="btn">
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.addinfo {
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-20%);
    padding-top: 20px;
    .demo-ruleForm {
      width: 500px;
      .reginfo {
        padding: 20px;
      }
      .btn {
        display: flex;

        margin: 30px 0 10px 50px;
        button {
          width: 200px;
          height: 50px;
          font-size: 18px;
          font-weight: 600;
          padding: 10px 30px;
          &:hover {
            background-color: #2d81f7;
          }
        }
      }
    }
  }
  .number {
    display: flex;
    align-items: center;
    margin: 20px 0 30px;
    div {
      width: 3px;
      height: 12px;
      border-radius: 10px;
      margin-right: 5px;
      background-color: #4990f1;
    }
    h2 {
      font-size: 15px;
      color: #999;
    }
  }
}
</style>
