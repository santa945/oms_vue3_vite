<template>
  <el-dialog
    v-model="visible"
    width="610px"
    custom-class="order-time-picker"
    title="投放时间"
    :before-close="beforeClose"
  >
    <div class="content">
      <DatePicker
        v-model="selectDate"
        :disabled="false"
      />
      <div class="content-details">
        <div
          v-for="i in selectDate"
          :key="i"
          class="detail-item"
        >
          <span class="item-label fl">{{i}}：</span>
          <el-input
            v-model="dateNumObj[i]"
            placeholder="Please input"
            size="mini"
            class="item-input fl"
            :input-style="{
                padding: '4px',
                width: '100px',
                height: '22px',
                lineHeight: '22px',
              }"
          />
          <el-icon class="item-icon fl">
            <CircleClose />
          </el-icon>

        </div>
      </div>
    </div>
    <template #footer>
      <el-button
        size="small"
        :disabled="loading"
        @click="handleCancel"
      >取消</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="loading"
        @click="handleConfirm"
      >确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { withDefaults, ref, computed, watch } from "vue"
import type { Ref } from "vue"
import { ElDialog, ElButton, ElInput, ElIcon } from "element-plus"
import { CircleClose } from "@element-plus/icons-vue"
import DatePicker from "@/components/base/DatePicker.vue"

interface Props {
  modelValue: boolean
  selected: Array<CommonObjectType>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  selected: () => [],
})
const loading: Ref<boolean> = ref(false)
const selectDate: Ref<string[]> = ref(["2023/03/16"])

const dateNumObj: Ref<CommonObjectType> = ref({})

watch(
  selectDate,
  (nv) => {
    for (const i in nv) {
      const key = nv[i]

      if (!dateNumObj.value[key]) {
        dateNumObj.value[key] = ""
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

const emit = defineEmits(["update:modelValue", "cancel", "confirm"])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})

const beforeClose = (done: () => void) => {
  if (loading.value) {
    return
  }
  done()
}
const handleCancel = () => {
  emit("cancel")
  visible.value = false
}

const handleConfirm = () => {
  loading.value = true
  emit("confirm", dateNumObj.value)
  loading.value = false
  visible.value = false
}
</script>
<style lang="scss" scoped>
.fl {
  float: left;
}
.order-time-picker {
  .content {
    display: flex;
    border: 1px solid #eee;
    .content-details {
      border-left: 1px solid #eee;
      padding: 10px;
      padding-right: 25px;
      height: 284px;
      overflow-y: auto;
      .detail-item {
        overflow: hidden;
        margin-bottom: 5px;
        .item-label {
          width: 82px;
          font-size: 12px;
          line-height: 22px;
        }
        .item-input {
          width: 100px;
          margin-right: 5px;
        }
        .item-icon {
          padding: 4px 0;
        }
      }
    }
  }
}
</style>