<template>
  <div :class="{ 'code-input-container': true, [className]: !!className }">
    <p class="title" v-if="title">{{ title }}</p>
    <div class="code-input">
      <template v-for="(v, index) in values">
        <input
          :type="type === 'number' ? 'tel' : type"
          :pattern="type === 'number' ? '[0-9]' : null"
          :autoFocus="autoFocus && index === autoFocusIndex"
          :style="{
            width: `${fieldWidth}px`,
            height: `${fieldHeight}px`,
          }"
          :key="`${id}-${index}`"
          :data-id="index"
          :value="v"
          :ref="iRefs[index]"
          v-on:input="onValueChange"
          v-on:focus="onFocus"
          v-on:keydown="onKeyDown"
          :disabled="disabled"
          :required="required"
          maxlength="1"
        />
      </template>
    </div>
  </div>
</template>

<script>
const KEY_CODE = { backspace: 8, left: 37, up: 38, right: 39, down: 40 };
export default {
  name: 'CodeInput',
  props: {
    type: {
      type: String,
      default: 'number',
    },
    className: String,
    fields: {
      type: Number,
      default: 5,
    },
    fieldWidth: {
      type: Number,
      default: 58,
    },
    fieldHeight: {
      type: Number,
      default: 54,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    title: String,
    change: Function,
    complete: Function,
  },
  data() {
    const { fields, values } = this;
    let vals;
    let autoFocusIndex = 0;
    if (values && values.length) {
      vals = [];
      for (let i = 0; i < fields; i++) {
        vals.push(values[i] || '');
      }
      autoFocusIndex = values.length >= fields ? 0 : values.length;
    } else {
      vals = Array(fields).fill('');
    }
    this.iRefs = [];
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(`input_${i}`);
    }
    this.id = +new Date();
    return {
      values: vals,
      autoFocusIndex,
    };
  },
  computed:{
    disabledInput(){
      // return (item , index) => {
      //   if(this.disabled){
      //     true
      //   }else{
      //     if(index != 0){
      //       !!this.values[index-1] && true
      //     }else{
      //       false
      //     }
      //   }
      // }
    }
  },
  methods: {
    onFocus(e) {
      e.target.select(e);
    },
    onValueChange(e) {
      const index = parseInt(e.target.dataset.id);
      const { type, fields } = this;
      if (type === 'number') {
        e.target.value = e.target.value.replace(/[^\d]/gi, '');
      }
      // this.handleKeys[index] = false;
      if (e.target.value === '' || (type === 'number' && !e.target.validity.valid)) {
        return;
      }
      let next;
      const value = e.target.value;
      let { values } = this;
      values = Object.assign([], values);
      if (value.length > 1) {
        let nextIndex = value.length + index - 1;
        if (nextIndex >= fields) {
          nextIndex = fields - 1;
        }
        next = this.iRefs[nextIndex];
        const split = value.split('');
        split.forEach((item, i) => {
          const cursor = index + i;
          if (cursor < fields) {
            values[cursor] = item;
          }
        });
        this.values = values;
      } else {
        next = this.iRefs[index + 1];
        values[index] = value;
        this.values = values;
      }
      if (next) {
        const element = this.$refs[next][0];
        element.focus();
        element.select();
      }
      this.triggerChange(values);
    },
    onKeyDown(e) {
      const index = parseInt(e.target.dataset.id);
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const prev = this.iRefs[prevIndex];
      const next = this.iRefs[nextIndex];
      switch (e.keyCode) {
        case KEY_CODE.backspace: {
          e.preventDefault();
          const vals = [...this.values];
          if (this.values[index]) {
            vals[index] = '';
            this.values = vals;
            this.triggerChange(vals);
          } else if (prev) {
            vals[prevIndex] = '';
            this.$refs[prev][0].focus();
            this.values = vals;
            this.triggerChange(vals);
          }
          break;
        }
        case KEY_CODE.left:
          e.preventDefault();
          if (prev) {
            this.$refs[prev][0].focus();
          }
          break;
        case KEY_CODE.right:
          e.preventDefault();
          if (next) {
            this.$refs[next][0].focus();
          }
          break;
        case KEY_CODE.up:
        case KEY_CODE.down:
          e.preventDefault();
          break;
        default:
          // this.handleKeys[index] = true;
          break;
      }
    },
    triggerChange(values = this.values) {
      const { fields } = this;
      const val = values.join('');
      this.$emit('change', val);
      if (val.length >= fields) {
        this.$emit('complete', val);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.code-input-container {
  position: relative;
  direction: rtl !important;
  width: 100%;
}
.code-input {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  direction: rtl;
  & > input {
    border: 1.5px solid #d8d6de;
    border-radius: 6px;
    font-size: 20px;
    color: #525461;
    text-align: center;
    background: none;
    box-sizing: border-box;
    transition: border 0.3s ease-in-out;
    outline: none;
    // will-change: outline;
    -webkit-appearance: none;
  }
  & > input:focus {
    outline: none;
    // border: none;
    border: 1.5px solid #d8d6de;
  }
}

.code-input > input:focus + input {
  border-left: none;
}
.loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 0.5;
  filter: blur(0.5px);
  transition: opacity 0.3s;
}
.title {
  margin: 0;
  height: 20px;
  padding-bottom: 10px;
}
.spin {
  display: inline-block;
  animation: loadingCircle 1s infinite linear;
}
@keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
