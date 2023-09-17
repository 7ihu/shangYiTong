<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const ruleForm = ref({
  name: '',
  sex: '',
  type: '',
  idCard: computed(() => cardId.value * 1),
  date: '',
  tel: '',
  state: '',
  info: '',
  nowAddress: '',
  delAddress: '',
  otherName: '',
  otherType: '',
  otherIdCard: '',
  otherTel: '',
})
const cardId = ref()
// 表单实例
const ruleFormRef = ref()
// 校验规则
const rules = {
  name: [{ required: true, message: '请输入就诊人姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择就诊人性别', trigger: 'change' }],
  type: [{ required: true, message: '请选择就诊人证件类型', trigger: 'change' }],
  idCard: [
    { required: true, message: '请输入就诊人证件号', trigger: 'blur' },
    { type: 'number', message: '输入类型为数字', trigger: 'blur' },
  ],
  date: [{ type: 'date', required: true, message: '请输入就诊人出生日期', trigger: 'change' }],
  tel: [
    { required: true, message: '请输入就诊人手机号码', trigger: 'blur' },
    { type: 'number', message: '输入类型为数字', trigger: 'blur' },
  ],
  info: [{ required: true, message: '请选择就诊类型', trigger: 'change' }],
  nowAddress: [{ required: true, message: '请选择就诊人当前地址', trigger: 'change' }],
  delAddress: [{ required: true, message: '请输入就诊人详细地址', trigger: 'blur' }],
}
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
    ],
  },
]

// 点击提交
const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      console.log(ruleForm.value)
    } else {
      if (fields) {
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) return ElMessage({ type: 'error', message: fields[key][0].message })
        }
      }
    }
  })
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
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证件类型：" prop="type">
              <el-select v-model.trim="ruleForm.type" placeholder="请选择就诊人证件类型">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="idCard">
              <el-input v-model.trim="cardId" type="number" placeholder="请输入就诊人证件号" />
            </el-form-item>
            <el-form-item label="出生日期：" prop="date" required>
              <el-date-picker v-model.trim="ruleForm.date" type="date" placeholder="请选择出生日期" />
            </el-form-item>
            <el-form-item label="手机号码：" prop="tel">
              <el-input v-model.number.trim="ruleForm.tel" type="text" placeholder="请输入就诊人手机号码" maxlength="11" />
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
              <el-radio-group v-model.trim="ruleForm.state">
                <el-radio label="未婚" />
                <el-radio label="已婚" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自费/医保：" prop="info">
              <el-radio-group v-model.trim="ruleForm.info">
                <el-radio label="自费" />
                <el-radio label="医保" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="当前住址：" prop="nowAddress">
              <el-cascader v-model.trim="ruleForm.nowAddress" :prop="rules.nowAddress" :options="options" filterable style="width: 100%" placeholder="请选择就诊人当前地址" />
            </el-form-item>
            <el-form-item label="详细地址：" prop="delAddress">
              <el-input v-model.trim="ruleForm.delAddress" placeholder="应公安机关要求，请填写" />
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
              <el-input v-model.trim="ruleForm.otherName" placeholder="请输入联系人姓名" />
            </el-form-item>
            <el-form-item label="证件类型：">
              <el-select v-model.trim="ruleForm.otherType" placeholder="请选择联系人证件类型">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：">
              <el-input v-model.number.trim="ruleForm.otherIdCard" placeholder="请输入联系人证件号" />
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model.number.trim="ruleForm.otherTel" placeholder="请输入联系人手机号码" />
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
        justify-content: center;
        margin-top: 30px;
        button {
          width: 200px;
          height: 50px;
          font-size: 18px;
          font-weight: 600;
          padding: 10px 30px;
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
