<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>
<script>
  {{#if components.locales}}
  const __ = chrome.i18n.getMessage

  {{/if}}
  export default {
    data:()=>({
    }),
    computed: { },
    created () {
      {{#if components.locales}}
      console.log(__('popup'))
      {{/if}}
      {{#unless components.locales}}
      console.log('New tab')
      {{/unless}}
    },
    mounted () { },
    methods: {
      tab () {
        chrome.tabs.create({ url: 'pages/app.html' })
      }
    }
  }
</script>
<style lang="less">
  div {
    color: blue
  }
</style>
