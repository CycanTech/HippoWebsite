<template>
  <div class="tokenomics">
    <div class="title">
      {{ t('message.tokenomics') }}
    </div>
    <div class="imgs">
      <img class="img1" :src="imags.allocations[locale]" />
      <img class="img2" :src="imags.total[locale]" />
    </div>
  </div>
  <div class="tokenomics-mobile">
    <img :src="imags.mobile[locale]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LOCALES } from '../../i18n/index'
import { useI18n } from 'vue-i18n'

const imags = {
  allocations: {
    [LOCALES.EN]: require('./allocation-en.png'),
    [LOCALES.ZH]: require('./allocation-zh.png')
  },
  total: {
    [LOCALES.EN]: require('./total-en.png'),
    [LOCALES.ZH]: require('./total-zh.png')
  },
  mobile: {
    [LOCALES.EN]: require('./tokenomics-en.png'),
    [LOCALES.ZH]: require('./tokenomics-zh.png')
  }
}

export default defineComponent({
  setup() {
    const { locale, t } = useI18n()

    return {
      imags,
      locale,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../scss/variable.scss';
@import '../../scss/mixin.scss';

.tokenomics {
  position: relative;
  padding: 20px 30px 20px 100px;
  background: #b08ffe;
  margin-top: 50px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 33px;
    padding: 0 15px;
    height: 184px;
    background: #d62283;
    border-radius: 0 20px 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 auto;
    line-height: 24px;
    word-wrap: break-word;
    text-align: center;
    writing-mode: tb-rl;
  }
  .imgs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 29px;
    padding: 30px 40px;
    .img1 {
      width: 462px;
      height: 258px;
    }
    .img2 {
      width: 300px;
      height: 86px;
    }
  }
}
.tokenomics-mobile {
  display: none;
}
@include tablet {
  .tokenomics {
    display: none;
  }
  .tokenomics-mobile {
    display: block;
    margin-top: 35px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
@include mobile {
  .tokenomics {
    display: none;
  }
  .tokenomics-mobile {
    display: block;
    margin-top: 35px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
