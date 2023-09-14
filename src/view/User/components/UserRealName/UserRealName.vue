<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getDictCodeAPI, getUserAuahAPI } from '@/apis/user'
import { WarnTriangleFilled, Plus, Eleme } from '@element-plus/icons-vue'

// const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
const form = ref({
  name: '',
  id: computed(() => num.value * 1),
  imgType: '',
  imgSrc: '',
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  id: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { type: 'number', message: '输入值必须为数字', trigger: 'blur' },
  ],
  imgType: [{ required: true, message: '请选择认证方式', trigger: 'change' }],
  imgSrc: [{ required: true, message: '请上传认证照片', trigger: 'blur' }],
}
const step = ref(1)
const flag = ref(false)

// 判断姓名、身份信息
const submitForm = async (formEl: any) => {
  if (!formEl) return
  if (step.value === 3) {
    flag.value = true
    userStore.clearRealInfo()
  } else {
    await formEl.validate(async (valid: any, fields: any) => {
      if (valid) {
        if (step.value === 2) {
          try {
            await getUserAuahAPI({
              certificatesNo: form.value.id,
              certificatesType: form.value.imgType,
              certificatesUrl: form.value.imgSrc,
              name: form.value.name,
            })
            ElMessage({ type: 'success', message: '认证成功' })
            userStore.getRealInfo()
            if (userStore.realInfo) return (step.value = 3)
          } catch (error) {
            console.log(error)
          }
          return
        }
        flag.value = true
      } else {
        if (fields) {
          for (var key in fields) {
            if (fields.hasOwnProperty(key)) return ElMessage({ type: 'error', message: fields[key][0].message })
          }
        }
      }
    })
  }
}
// 获取上传的实名类型
const dictCode = ref()
const getDictCode = async () => {
  const res = await getDictCodeAPI()
  dictCode.value = res.data
}

// 控制图片预览
const dialogVisible = ref(false)
// 上传数量超出limit规定触发
const onExceed = () => ElMessage({ type: 'error', message: '认证照片唯一' })
// 图片上传成功
const onSuccess = (response: any) => (form.value.imgSrc = response.data)
// 点击图片预览
const handlePictureCardPreview = () => (dialogVisible.value = true)
// 点击删除图片
const handleRemove = () => (form.value.imgSrc = '')

onMounted(async () => {
  await Promise.all([userStore.getRealInfo(), getDictCode()])
  if (userStore.realInfo) return (step.value = 3)
})
// @ts-ignore
watch([step, flag], ([newStep, newFlag]) => {
  if (newFlag === true) {
    setTimeout(() => {
      step.value = step.value < 3 ? step.value + 1 : step.value === 3 ? 1 : 1
      flag.value = false
    }, 2000)
  }
})
const num = ref()
</script>

<template>
  <div class="realname" v-if="userStore.userInfo">
    <h2>实名认证</h2>
    <div class="warn">
      <el-icon size="30" color="#f39c12"><WarnTriangleFilled /></el-icon>
      <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
    </div>
    <div class="real">
      <el-steps :active="step" finish-status="success" simple style="margin-top: 20px">
        <el-step title="信息填写" />
        <el-step title="证件照上传" />
        <el-step title="实名完成" />
      </el-steps>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm" size="large" label-position="top" status-icon>
        <div class="form" v-if="step === 1">
          <el-form-item label="用户姓名" prop="name" class="item">
            <el-input v-model.trim="form.name" type="text" />
          </el-form-item>
          <el-form-item label="证件号码" prop="id">
            <el-input v-model.trim="num" type="number" />
          </el-form-item>
        </div>
        <div class="upload" v-if="step === 2">
          <el-form-item label="认证类型：" prop="imgType">
            <el-select v-model="form.imgType" placeholder="请选择认证类型">
              <el-option :label="dictCode[0].name" :value="dictCode[0].value" />
              <el-option :label="dictCode[1].name" :value="dictCode[1].value" />
            </el-select>
          </el-form-item>
          <el-form-item label="上传证件:" class="upload-img" prop="imgSrc">
            <el-upload action="/api/oss/file/fileUpload?fileHost=userAuah" :limit="1" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="onExceed" :on-success="onSuccess">
              <el-icon class="icon" size="20"><Plus /></el-icon>
              <img class="img" src="http://img.114yygh.com/static/web/auth_example.png" alt="" />
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="form.imgSrc" style="width: 100%; height: 100%" />
            </el-dialog>
          </el-form-item>
        </div>
        <div class="info" v-if="step === 3">
          <el-descriptions :column="1" class="des-info" border>
            <el-descriptions-item label="用户姓名：">{{ userStore.realInfo?.name }}</el-descriptions-item>
            <el-descriptions-item label="证件类型：">{{ userStore.realInfo?.certificatesType * 1 === 10 ? '身份证' : '户口本' }}</el-descriptions-item>
            <el-descriptions-item label="证件号码：">{{ userStore.realInfo?.certificatesNo }}</el-descriptions-item>
            <el-descriptions-item label="手机号码：">{{ userStore.realInfo?.phone }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="btn">
          <el-button type="primary" :loading-icon="flag ? Eleme : ''" :loading="flag" @click="submitForm(formRef)">{{ step === 3 ? '重置实名信息' : step === 2 ? '提交' : '下一步' }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.realname {
  h2 {
    font-weight: 600;
  }
  .warn {
    display: flex;
    align-items: center;
    color: #f39c12;
    margin: 20px 10px;
    padding: 20px 15px;
    background-color: #f4f9ff;
    span {
      margin-left: 8px;
    }
  }
  .real {
    .form {
      padding: 10px 200px;
      margin: 60px auto 0;
      .item {
        padding-bottom: 20px;
      }
    }
    .upload {
      padding-left: 50px;
      margin: 30px 0 0 50px;
      .upload-img {
        position: relative;
        .icon {
          position: absolute;
          top: 45px;
          color: #4990f1;
          font-weight: 600;
          z-index: 1;
        }
        .img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      :deep(.el-descriptions__cell) {
        width: 300px;
        font-size: 16px;
        font-weight: 600;
        padding: 20px 0;
        color: #4990f1;
        &:first-child {
          color: #999;
          width: 100px;
          text-align: right;
        }
        &:last-child {
          padding-left: 20px;
        }
      }
    }
  }
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 30px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
  }
}
</style>
