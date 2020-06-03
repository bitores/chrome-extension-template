<template>
  <div>tab</div>
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
      console.log(__('tab'))
      {{/if}}
      {{#unless components.locales}}
      console.log('tab')
      {{/unless}}
    },
    mounted () { },
    methods: { }
  }
</script>
<style lang="less">
  div {
    color: blue
  }
</style>
