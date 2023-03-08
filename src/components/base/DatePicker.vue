<template>
  <div>
    <div class="date-pickers">
      <div class="date-box">
        <!-- 操作栏 -->
        <div class="day-select">
          <div class="day-reduce">
            <el-icon
              class="arrow-icon"
              @click="reduceYear"
            >
              <DArrowLeft />
            </el-icon>
            <el-icon
              class="arrow-icon"
              @click="reduceMonth"
            >
              <ArrowLeft />
            </el-icon>
          </div>
          <div class="day-cur">{{year}}年{{month}}月</div>
          <div class="day-add">
            <el-icon
              class="arrow-icon"
              @click="addMonth"
            >
              <ArrowRight />
            </el-icon>
            <el-icon
              class="arrow-icon"
              @click="addYear"
            >
              <DArrowRight />
            </el-icon>
          </div>
        </div>
        <!-- 内容栏 -->
        <div
          class="day-screen"
          :style="disabled ? 'filter: grayscale(1);' : ''"
        >
          <div class="day-week-item day-screen-item">
            <div
              v-for="weekItem in data.week"
              :key="weekItem"
              style="display: inline"
            >
              {{ weekItem }}
            </div>
          </div>
          <div class="day-screen-item day-content">
            <div
              v-for="pday in previousMonth"
              :key="`previousMonth-${pday}`"
              class="day-content-item"
            >
              <span
                class="day-gray"
                @click="selectDay($event, 'previousMonth')"
              >{{ pday }}</span>
            </div>
            <div
              v-for="mday in data.monthDay[month - 1]"
              :key="mday"
              class="day-content-item"
            >
              <span
                :class="isActive(mday)"
                class="currentMonth"
                @click="selectDay($event, 'currentMonth')"
              >{{mday}}</span>
            </div>
            <div
              v-for="nday in nextMonth"
              :key="`nextMonth-${nday}`"
              class="day-content-item"
            >
              <span
                class="day-gray"
                @click="selectDay($event, 'nextMonth')"
              >{{ nday }}</span>
            </div>
          </div>
        </div>
        <!-- 禁用时加遮罩层 -->
        <div
          v-if="disabled"
          class="day-wrap"
        ></div>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  onBeforeMount,
  withDefaults,
  reactive,
  ref,
  watch,
} from "vue"
import type { Ref } from "vue"

interface Props {
  modelValue: string[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  disabled: false,
})

const modelValue = computed(() => props.modelValue)

const year = ref(0)
const month = ref(0)
const day: Ref<string | number | null> = ref(0)

const partialSelect: Ref<string | null> = ref(null)
const selctDate: Ref<string[]> = ref([])
const previousMonth: Ref<number[]> = ref([])
const nextMonth: Ref<number[]> = ref([])

const data = reactive({
  week: ["日", "一", "二", "三", "四", "五", "六"],
  monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
})

const date = computed(() => {
  if (year.value === 0 || month.value === 0 || day.value === 0) {
    return ""
  }
  return `${year.value}/${month.value}/${day.value}`
})

watch(year, (nv, ov) => {
  const reg = /^[1-9]\d*$/g
  if (!reg.test(nv)) {
    const date = new Date()
    year.value = date.getFullYear()
  }
  if (nv < 0) {
    year.value = 1
  }
  if (nv > 10000) {
    year.value = 10000
  }
  dayScreen()
})

watch(month, (nv, ov) => {
  const reg = /^[1-9]\d*$/g
  if (!reg.test(nv)) {
    const date = new Date()
    month.value = date.getMonth() + 1
  }
  if (nv < 1) {
    month.value = 1
  }
  if (nv > 12) {
    month.value = 12
  }
  dayScreen()
})
onBeforeMount(() => {
  trueDateBox()
  selctDate.value = modelValue.value
})

// methods------------------------
const isActive = (index: number) => {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const obj: CommonObjectType = {}

  if (year.value === y && month.value === m && index === d) {
    obj.today = true
  }
  const newIndexStr = index < 10 ? `0${index}` : `${index}`
  const newMonthStr = month.value < 10 ? `0${month.value}` : `${month.value}`
  const item = `${year.value}/${newMonthStr}/${newIndexStr}`
  if (item === partialSelect.value) {
    obj.active = true
  }
  if (selctDate.value.includes(item)) {
    obj.activeRange = true
  }
  return obj
}

// 设置算好闰年平年
const updateLeapYear = () => {
  if (isLeapYear(year.value)) {
    data.monthDay[1] = 29
  } else {
    data.monthDay[1] = 28
  }
}
// 初始化日期盒子并算好闰年平年
const trueDateBox = () => {
  if (date.value === "") {
    const date = new Date()
    year.value = date.getFullYear()
    updateLeapYear()
    month.value = date.getMonth() + 1
    day.value = null
  }
  dayScreen()
}

// 年份的增减
const addYear = () => {
  year.value++
  updateLeapYear()
}
const reduceYear = () => {
  year.value--
  updateLeapYear()
}

// 月份的增减
const addMonth = () => {
  month.value++
  if (month.value > 12) {
    month.value = 1
    addYear()
  }
}
const reduceMonth = () => {
  month.value--
  if (month.value < 1) {
    month.value = 12
    reduceYear()
  }
}

const emit = defineEmits(["update:modelValue", "change"])

const selectDay = (e, type: string) => {
  const iText = e.target.innerText
  const sDate = Number(iText) < 10 ? `0${iText}` : `${iText}`
  if (type === "previousMonth") {
    if (month.value === 1) {
      month.value = 12
      reduceYear()
    } else {
      month.value = month.value - 1
    }
  } else if (type === "nextMonth") {
    if (month.value === 12) {
      month.value = 1
      addYear()
    } else {
      month.value = month.value + 1
    }
  }

  let arr = selctDate.value.map((i) => new Date(i).getTime())
  const newMonthStr = month.value < 10 ? `0${month.value}` : `${month.value}`
  const curSelectTime = `${year.value}/${newMonthStr}/${sDate}`
  const curSelectTimeStamp = new Date(curSelectTime).getTime()
  const clsName = e.target.className // 通过类名判断当前是什么状态
  if (clsName.includes("activeRange")) {
    // 点击了范围内的数据，需要剔除
    console.log("点击了范围内的数据，需要剔除")
    arr = arr.filter((i) => i !== curSelectTimeStamp)
  } else if (clsName.includes("active") && !clsName.includes("activeRange")) {
    // 点击了一个半选状态的日期，准备扩展范围或者单选一个
    console.log("点击了一个半选状态的日期，准备扩展范围或者单选一个")
    if (selctDate.value.length) {
      const itemTime = arr[0]
      const itemTime2 = arr[arr.length - 1]
      const selectTime = curSelectTimeStamp
      if (selectTime < itemTime) {
        console.log("点击了范围之前的时间")
      } else if (selectTime > itemTime2) {
        console.log("点击了范围之后的时间")
      } else {
        console.log("点击了范围内的空白，直接加上一个")
      }
      arr = [...arr, curSelectTimeStamp]
      console.log(arr)
    } else {
      // 第一次选择日期，而且双击了，直接单独确定这个
      arr = [curSelectTimeStamp]
    }
    // 此时选择完日前了，半选的日期消费掉了，清空
    partialSelect.value = null
  } else {
    console.log("不是半选情况")

    // 即没有点击范围内，又不是半选状态，可能是已经存在一个半选，等待这个日期来闭合范围，也可能是第一次打开点击
    if (partialSelect.value) {
      // 需要和已存在的半选态日期闭合
      const itemTime = new Date(partialSelect.value).getTime()
      const itemTime2 = curSelectTimeStamp
      const timeArr = [itemTime, itemTime2].sort((a, b) => a - b) // 排序，因为不知道谁在前面
      for (let i = timeArr[0]; i <= timeArr[1]; i += 86400000) {
        arr.push(i)
      }
      // 此时确定好范围了，半选的日期消费掉了，清空
      partialSelect.value = null
    } else if (selctDate.value.length) {
      // 存在一个范围，同时点击范围外，此时设置半选
      day.value = sDate
      partialSelect.value = curSelectTime
    } else {
      // 不存在一个范围，所以是第一次点击
      day.value = sDate
      partialSelect.value = curSelectTime
    }
  }
  let filterArr = Array.from(new Set(arr))
  filterArr = filterArr.sort((a, b) => a - b)
  selctDate.value = filterArr.map((i) => formatTime(new Date(i)))
  emit("update:modelValue", selctDate.value)
  emit("change", selctDate.value)
  day.value = parseInt(sDate)
}

// 日期显示
const dayScreen = () => {
  // 渲染上个月,第一行
  const firstDate = new Date(year.value, month.value - 1, 1)
  const firstWeek = firstDate.getDay()
  let preMonthDay = null
  if (month.value === 1) {
    preMonthDay = data.monthDay[11]
  } else {
    preMonthDay = data.monthDay[month.value - 2]
  }
  console.log("preMonthDay", data.monthDay[11], month.value)

  for (let i = 0; i < preMonthDay; i++) {
    previousMonth.value[i] = i + 1
  }
  if (firstWeek === 0) {
    previousMonth.value = previousMonth.value.slice(-7)
  } else {
    previousMonth.value = previousMonth.value.slice(-firstWeek)
    console.log(33, previousMonth)
  }

  // 渲染下个月, 最后一行
  const endDate = new Date(
    year.value,
    month.value - 1,
    data.monthDay[month.value - 1]
  )
  const endWeek = endDate.getDay()
  let nextMonthDay = null
  if (month.value === 12) {
    nextMonthDay = data.monthDay[0]
  } else {
    nextMonthDay = data.monthDay[month.value]
  }
  for (let i = 0; i < nextMonthDay; i++) {
    nextMonth.value[i] = i + 1
  }
  if (endWeek === 6) {
    nextMonth.value = nextMonth.value.slice(0, 7)
  } else {
    nextMonth.value = nextMonth.value.slice(0, 6 - endWeek)
  }
}
const isLeapYear = (year: number) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

const formatTime = (date = new Date(), format = "yyyy/MM/dd") => {
  const args: CommonObjectType = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  for (const i in args) {
    const n = args[i]
    if (new RegExp(`(${i})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? n : `00${n}`.substr(`${n}`.length)
      )
    }
  }
  return format
}
</script>
<style lang="scss" scoped>
.date-pickers {
  position: relative;
}

.date-box {
  width: 322px;
  background: #fff;
}

.day-select {
  display: flex;
  padding: 5px 0;
  height: 30px;
  line-height: 30px;
  margin: 12px;
  .day-reduce,
  .day-add {
    width: 20%;
    .arrow-icon {
      cursor: pointer;
      color: #ccc;
      font-size: 10px;
      &:hover {
        color: #409eff;
      }
    }
  }
  .day-cur {
    width: 60%;
    display: flex;
    justify-content: center;

    input {
      &:hover {
        background: #eee;
      }
      &:nth-child(1) {
        width: 50px;
      }
      &:nth-child(2) {
        width: 30px;
      }
    }
  }
}

.day-screen {
  margin: 12px;
  position: relative;
  .day-screen-item {
    div {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .day-week-item {
    border-bottom: 1px solid #eee;
  }
  .day-content {
    .day-content-item {
      position: relative;
      display: inline;
      span {
        width: 24px;
        height: 24px;
        margin: 0 auto;
        line-height: 24px;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 15px;
        &:hover {
          font-weight: 700;
          background-color: #409eff;
          color: #fff;
        }
      }
      .active {
        font-weight: 700;
        background-color: #409eff;
        color: #fff;
      }
      .today {
        color: #409eff;
        font-weight: 700;
      }
      .activeRange {
        border-radius: 3px;
        background-color: #409eff;
        color: #fff;
      }
    }
    span {
      cursor: pointer;
      color: #000;
    }
    .day-gray {
      color: #888;
    }
  }
}
.day-screen > div {
  padding: 0 5px;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.day-wrap {
  width: 296px;
  height: 245px;
  position: absolute;
  left: 13px;
  top: 83px;
}
</style>