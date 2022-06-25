<template>
  <Tutorial />
</template>

<script lang="ts">
import Vue from 'vue'
import { theMovieDBApis } from '~/utils/apis'

export default Vue.extend({
  name: 'HomePage',
  data: () => ({

  }),
  mounted () {
    console.log(theMovieDBApis)
  }
})
</script>
