<template>
  <div class="airdrop-model-wrapper">
    <popup v-model="showModel">
      <div class="airdrop-model-content">
        <div class="airdrop-model-header">
          <i class="el-icon-close" @click="changeAirdropModelDisplay"></i>
          <div class="title">
            {{ t('message.index.checkClaimModel.title') }}
          </div>
        </div>
        <div class="address-connect">
          <div class="account">
            <span v-if="isConnected">{{ shortenAddress(userAccount, 7) }}</span>
            <span class="tip" v-else> {{ t('message.PlsConnect') }}</span>
          </div>
          <div class="connect">
            <el-button size="small" round v-if="isConnected" @click="onDisconnect">
              {{ t('message.disconnect') }}
            </el-button>
            <el-button size="small" round v-else @click="onConnect" :loading="isConnecting">
              {{ t('message.connectWallet') }}
            </el-button>
          </div>
        </div>
        <div class="action-tips" v-if="isConnected">
          <div class="label">
            {{ t('message.index.checkClaimModel.result') }}
          </div>
          <div class="result" v-if="!isLoading">
            <span class="success" v-if="isConnected && isInWhitelist && isAirdropped">
              {{ t('message.index.checkClaimModel.airdropped') }}
            </span>
            <span class="success" v-else-if="isConnected && isInWhitelist">
              {{ t('message.index.checkClaimModel.inWhitelist') }}
            </span>
            <span class="warning" v-else>
              {{ t('message.index.checkClaimModel.notAirdropped') }}
            </span>
          </div>
        </div>
        <div class="receive">
          <el-button
            round
            @click="onReceiveAirdrop"
            :disabled="!isConnected || isAirdropped || isLoading || (!isInWhitelist && isChecked)"
            type="primary"
            size="medium"
          >
            {{ t('message.index.checkClaimModel.receiveAirdrop') }}
          </el-button>
        </div>
        <div class="tips">
          <h3>{{ t('message.index.checkClaimModel.tipsTitle') }}</h3>
          <p>
            {{ t('message.index.checkClaimModel.tips01')
            }}<a
              target="_blank"
              href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x55d398326f99059ff775485246999027b3197955&outputCurrency=0xe6ffa2e574a8bbeb5243d2109b6b11d4a459f88b"
            >
              PancakeSwap
            </a>
            {{ t('message.index.checkClaimModel.tips02') }}
          </p>
          <p>
            {{ t('message.index.checkClaimModel.tips03') }}
            <a href="https://twitter.com/CycanNetwork" target="_blank">Twitter</a>
            {{ t('message.index.checkClaimModel.tips04') }}
          </p>
        </div>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { shortenAddress } from '@/common/ts/utils'
import Popup from '@/components/popup/popup.vue'
import Web3 from 'web3'
import {
  AIRDROP_ADDRESS_V1,
  AIRDROP_ADDRESS_V2,
  HIPPO_ADDRESS,
  SPENDER_ADDRESS
} from '@/common/ts/const'
import airdropV1 from '@/abi/airdropV1.json'
import airdropV2 from '@/abi/airdropV2.json'
import { useI18n } from 'vue-i18n'

function getProvider(): any | undefined {
  const ethereum = window.ethereum
  const provider = window?.web3?.currentProvider
  return ethereum || provider || undefined
}

export interface AirdropModelApi {
  changeAirdropModelDisplay: () => void
}
export default defineComponent({
  components: { Popup },
  setup(_, { expose }) {
    const provider = getProvider()
    let web3: Web3
    const { t } = useI18n()

    onMounted(() => {
      _watchAccountsChange()
    })

    const _instantiateWeb3 = () => {
      web3 = new Web3(provider)
    }
    const _watchAccountsChange = () => {
      if (window.ethereum && window.ethereum.on) {
        window.ethereum.on('accountsChanged', async ([address]: string[]) => {
          userAccount.value = address
          _instantiateWeb3()
          _getUserInfo()
        })
      }
    }
    const _getIsInWhitelist = async (address: string, contractV1: any, contractV2: any) => {
      const isWhitelistV1 = await contractV1.methods.isWhitelist(address).call()
      const isWhitelistV2 = await contractV2.methods.isWhitelist(address).call()
      return isWhitelistV1 || isWhitelistV2
    }
    const _getIsAirdropped = async (address: string, contractV1: any, contractV2: any) => {
      const isAirdroppedV1 = await contractV1.methods.isAirdropped(address).call()
      const isAirdroppedV2 = await contractV2.methods.isAirdropped(address).call()
      return isAirdroppedV1 || isAirdroppedV2
    }

    const _getUserInfo = async () => {
      const contractV1 = new web3.eth.Contract(airdropV1 as any, AIRDROP_ADDRESS_V1)
      const contractV2 = new web3.eth.Contract(airdropV2 as any, AIRDROP_ADDRESS_V2)
      isLoading.value = true
      isInWhitelist.value = await _getIsInWhitelist(userAccount.value, contractV1, contractV2)
      if (isInWhitelist.value) {
        isAirdropped.value = await _getIsAirdropped(userAccount.value, contractV1, contractV2)
      }
      isLoading.value = false
      isChecked.value = true
    }

    const showModel = ref(false)
    const userAccount = ref('')
    const isChecked = ref(false)
    const isInWhitelist = ref(false)
    const isAirdropped = ref(false)
    const isLoading = ref(false)
    const isConnected = computed(() => userAccount.value !== '')
    const isConnecting = ref(false)
    const changeAirdropModelDisplay = () => {
      showModel.value = !showModel.value
    }
    const onConnect = async () => {
      if (!provider) {
        ElMessage.warning({
          message: 'Failed to connect to wallet.',
          type: 'warning'
        })
        return
      }

      isConnecting.value = true
      const [address] = (await provider.enable()) as string[]
      isConnecting.value = false
      userAccount.value = address
      _instantiateWeb3()
      _getUserInfo()
    }
    const onDisconnect = () => {
      userAccount.value = ''
    }
    const onReceiveAirdrop = async () => {
      const contractV2 = new web3.eth.Contract(airdropV2 as any, AIRDROP_ADDRESS_V2)
      const receiveAirdropTokenFrom = contractV2.methods.receiveAirdropTokenFrom(
        SPENDER_ADDRESS,
        HIPPO_ADDRESS
      )
      const loading = ElLoading.service({ fullscreen: true, background: 'rgba(0,0,0 0.7)' })
      try {
        await receiveAirdropTokenFrom.send({ from: userAccount.value })
        isAirdropped.value = true
        loading.close()
      } catch (error) {
        loading.close()
        if (error?.code !== 4001) {
          ElMessage.warning({
            message: 'Receive airdrop failed.',
            type: 'warning'
          })
          console.log('ReceiveAirdropTokenFrom Error', error)
        }
      }
    }

    expose({
      changeAirdropModelDisplay
    })

    return {
      showModel,
      userAccount,

      isConnecting,
      isConnected,

      isChecked,
      isLoading,
      isAirdropped,
      isInWhitelist,

      t,
      changeAirdropModelDisplay,
      onConnect,
      onDisconnect,
      onReceiveAirdrop,
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
