<template>
  <div>popup</div>
</template>
<script>
  {{#if components.locales}}
  const __ = chrome.i18n.getMessage

  {{/if}}
  export default {
    data(){
      return {}
    },
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
<style lang="scss">
  div {
    color: blue
  }
</style>
