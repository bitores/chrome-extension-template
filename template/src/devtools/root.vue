<template>
<div>devTools</div>
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
      console.log(__('devtools'))
      {{/if}}
      {{#unless components.locales}}
      console.log('devtools')
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
