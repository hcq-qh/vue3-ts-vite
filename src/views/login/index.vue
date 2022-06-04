<template>
  <div class="aa">
    <h1>111</h1>
    <aaa />
    {{ ccc.data.list }}
    <!-- <a-date-picker /> -->
    <a-button @click="cancelRequestAll">
      按钮
    </a-button>
  </div>
</template>

<script setup lang="tsx">
import { ggg } from '@/api/all'
import { reactive } from 'vue'
import { IResponseData } from '@/api/types/all'
import { cancelRequest } from '../../libs/axiosmedium/sever'
const aaa = <h1>333</h1>
const ccc: IResponseData = reactive({
  msg: '',
  status: '',
  data: {
    list: [],
    str: ''
  }
})
function cancelRequestAll () {
  // cancelAllRequest()
  cancelRequest(['/', '/aaa'])
}
function name () {
  // bbb().then((res) => {
  //   // console.log(res.data.list)
  //   // ccc.a = res.data.data.str
  //   // ccc.a = res.data.list
  //   ccc.data.list = res.data.list
  // })
  // eee({}).then(res => {
  //   console.log(res)
  // })
  // ddd({}).then(res => {
  //   console.log(res)
  // })
  ggg().then(res => {
    console.log(res)
  })
}
name()
</script>

<style scoped lang="less">
.aa {
  h1 {
    color: aqua;
  }
}
</style>
