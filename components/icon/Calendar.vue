<template functional>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 22 23"
    xmlns="http://www.w3.org/2000/svg"
    :class="data.staticClass || ''"
    v-bind="data.attrs"
  >
    <g fill="currentColor">
      <path
        d="M5.75 0C6.16421 0 6.5 0.335786 6.5 0.75V3H15.5V0.75C15.5 0.335786 15.8358 0 16.25 0C16.6642 0 17 0.335786 17 0.75V3H19.75C20.7165 3 21.5 3.7835 21.5 4.75V20.75C21.5 21.7165 20.7165 22.5 19.75 22.5H2.25C1.2835 22.5 0.5 21.7165 0.5 20.75V4.75C0.5 3.7835 1.2835 3 2.25 3H5V0.75C5 0.335786 5.33579 0 5.75 0ZM2.25 4.5C2.11193 4.5 2 4.61193 2 4.75V8H20V4.75C20 4.61193 19.8881 4.5 19.75 4.5H2.25ZM20 9.5H2V20.75C2 20.8881 2.11193 21 2.25 21H19.75C19.8881 21 20 20.8881 20 20.75V9.5Z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: '1em'
    }
  }
}
</script>
