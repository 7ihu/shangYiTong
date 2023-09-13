<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
// import { getPatientAPI } from '@/apis/hospital'

import { WarnTriangleFilled,Plus } from '@element-plus/icons-vue'

// const router = useRouter()

// const regInfo = ref()
// const getPatient = async () => {
//   const res = await getPatientAPI()
//   regInfo.value = res.data
// }

const formRef = ref()
const form = ref({
  name: '',
  id: '',
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  id: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { type: 'number', message: '输入值必须为数字', trigger: 'lblur' },
  ],
}
const step = ref(2)

const submitForm = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: any, fields: any) => {
    if (valid) {
      step.value = 2
    } else {
      if (fields) {
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) return ElMessage({ type: 'error', message: fields[key][0].message })
        }
      }
    }
  })
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref()
const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// onMounted(() => getPatient())
</script>

<template>
  <div class="realname">
    <h2>实名认证</h2>
    <div class="warn">
      <el-icon size="30" color="#f39c12"><WarnTriangleFilled /></el-icon>
      <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
    </div>
    <div class="real">
      <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
        <el-step title="信息填写" />
        <el-step title="证件照上传" />
        <el-step title="实名完成" />
      </el-steps>
      <div class="form" v-if="step === 1">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm" size="large">
          <el-form-item label="用户姓名" prop="name" class="item">
            <el-input v-model.trim="form.name" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="证件号码" prop="id">
            <el-input v-model.number.trim="form.id" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="step === 2">
        <el-upload action="#"  v-model:file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" />
        </el-dialog>
      </div>
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
      // display: flex;
      //  justify-content: center;
      padding: 10px 200px;
      margin: 60px auto 0;
      .item {
        padding-bottom: 20px;
      }
      button {
        margin: 0 auto;
      }
    }
  }
}
</style>
