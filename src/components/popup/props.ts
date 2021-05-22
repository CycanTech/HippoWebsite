export default {
  position: {
    type: String,
    default: 'center'
  },
  transition: {
    type: String,
    default() {
      return ''
    }
  },
  preventScroll: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  hasMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  }
}
