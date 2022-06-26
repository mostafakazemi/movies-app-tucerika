<template>
  <div class="text-center">
    <div class="flex">
      <span class="font-bold" :class="value - 1 > 0 ? 'text-blue-400 cursor-pointer': 'text-787878'" @click="leaf(-1)">Previous Page</span>
      <div class="w-0.5 bg-gray-300 mx-4" />
      <span class="font-bold" :class="value + 1 < totalPages ? 'text-blue-400 cursor-pointer': 'text-787878'" @click="leaf(1)">Next Page</span>
    </div>
    <div class="text-8B8B8B text-sm mt-4">
      Showing results {{ rangeItems.start }}-{{ rangeItems.end }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    value: {
      type: Number,
      default: 1
    },
    countOfItems: {
      type: Number,
      default: undefined
    },
    totalPages: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    rangeItems () {
      const rangeItems = {
        start: undefined,
        end: undefined
      }
      if (this.countOfItems) {
        rangeItems.start = (this.value - 1) * this.countOfItems + 1
        rangeItems.end = this.value * this.countOfItems
      }
      return rangeItems
    }
  },
  methods: {
    leaf (count) {
      const newPageNumber = this.value + count
      if (newPageNumber > 0 && newPageNumber < this.totalPages) {
        this.$emit('input', newPageNumber)
      }
    }
  }
}
</script>

<style scoped>
.text-787878 {
  color: #787878;
}

.text-8B8B8B {
  color: #8B8B8B;
}
</style>
