<template>
  <div class="airdrop-model-wrapper">
    <popup v-model="showModel">
      <div class="airdrop-model-content">
        <div class="airdrop-model-header">
          <i class="el-icon-close" @click="changeModelDisplay"></i>
          <div class="title">
            {{ t('message.lotteryResult.checkModel.title') }}
          </div>
        </div>
        <div class="address-connect">
          <div class="account">
            <el-input v-model="userAccount" />
          </div>
          <div class="connect">
            <el-button
              size="small"
              round
              @click="onCheck"
              :disabled="!isAvailableAddress"
              :loading="isChecking"
            >
              {{ t('message.index.checkModel.connectWallet') }}
            </el-button>
          </div>
        </div>
        <div class="action-tips" v-if="isConnected">
          <div class="label">
            {{ t('message.index.checkModel.result') }}
          </div>
          <div class="result" v-if="!isLoading">
            <span class="warning">
              {{ t('message.index.checkModel.notAirdropped') }}
            </span>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { shortenAddress, isAddress } from '@/common/ts/utils'
import Popup from '@/components/popup/popup.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { Popup },
  setup() {
    const { t } = useI18n()

    const showModel = ref(false)
    const userAccount = ref('')
    const isChecked = ref(false)
    const isInWhitelist = ref(false)
    const isLoading = ref(false)
    const isAvailableAddress = computed(() => (isAddress(userAccount.value) ? true : false))
    const isChecking = ref(false)
    const changeModelDisplay = () => {
      showModel.value = !showModel.value
    }
    const onCheck = async () => {}

    return {
      showModel,
      userAccount,

      isChecking,
      isAvailableAddress,

      isChecked,
      isLoading,
      isInWhitelist,

      t,
      changeModelDisplay,
      onCheck,
      shortenAddress
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../scss/variable.scss';
@import '../../../scss/mixin.scss';
.airdrop-model-wrapper {
  .airdrop-model-content {
    border-radius: 14px;
    background: #fff;
    padding: 36px;
    font-size: 18px;
    color: #000000;
    width: 300px;
    border: 1px solid #e4e7ed;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    @include mobile {
      padding: 20px;
    }
    @include smallMobile {
      width: 280px;
      padding: 15px;
    }
    .airdrop-model-header {
      display: flex;
      justify-content: center;
      position: relative;
      .el-icon-close {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 25px;
        cursor: pointer;
        color: #202e6b;
      }
    }
    .address-connect {
      display: flex;
      align-items: center;
      padding: 27px 0 7px 0;
      .account {
        display: flex;
        align-items: center;
        flex: 1;
        height: 36px;
        padding: 0 18px;
        background: #f2f7fa;
        border-radius: 18px;
        font-size: 14px;
        font-weight: 400;
        color: #202e6b;
        .tip {
          color: rgba($color: #202e6b, $alpha: 0.32);
        }
      }
      .connect {
        padding-left: 15px;
      }
    }
    .action-tips {
      display: flex;
      align-items: center;
      .label {
        font-size: 14px;
        font-weight: 400;
        color: #010101;
        height: 14px;
        margin-right: 10px;
      }
      .result {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 13px;
        font-weight: 400;
        height: 14px;
        span {
          height: 14px;
        }
        .warning {
          color: #f94736;
        }
        .success {
          color: #82ad39;
        }
      }
    }
    .receive {
      padding-top: 15px;
      display: flex;
      justify-content: center;
    }
    .tips {
      padding-top: 20px;
      font-size: 12px;
      font-weight: 400;
      color: #010101;
      h3 {
        line-height: 23px;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        color: #010101;
        line-height: 18px;
        a {
          color: #2b11ff;
        }
      }
    }
  }
}
</style>
