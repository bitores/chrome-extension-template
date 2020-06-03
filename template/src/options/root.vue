<template>
<div>配置选项</div>
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
      console.log(__('options'))
      {{/if}}
      {{#unless components.locales}}
      console.log('options')
      {{/unless}}
    },
    mounted () { },
    methods: { }
  }
</script>
<style>
  div {
    color: blue
  }
</style>
