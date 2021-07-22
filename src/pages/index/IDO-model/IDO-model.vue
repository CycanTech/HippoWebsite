<template>
  <popup v-model="showModel">
    <div class="IDO-model-wrapper">
      <div class="IDO-model-content">
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
        <div class="banlace">
          <div class="title">
            {{ t('message.index.IDOModel.IQTBanlace') }}
          </div>
          <div class="IQT-banlace">
            {{ IQTBanlace ? amountToDecimal(formatAmount(IQTBanlace)) : '-' }}
          </div>
          <div class="stablecoin-banlace">
            <div class="stablecoin">
              {{ stablecoinBanlace ? amountToDecimal(formatAmount(stablecoinBanlace)) : '-' }}
            </div>
            <el-select class="select" size="small" v-model="stablecoin" placeholder="请选择">
              <el-option
                v-for="item in stablecoins"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="swap-number">
          <div class="tips">
            <div>
              {{ t('message.index.IDOModel.swapQuantity') }}
            </div>
            <div>
              <span> {{ t('message.index.IDOModel.maxQuantity') }}</span>
              <span class="quantity">{{ maxQuantity ?? '-' }} </span>
            </div>
          </div>
          <input
            type="text"
            :placeholder="t('message.index.IDOModel.placeholder')"
            v-model="swapQuantity"
            @change="checkSwapQuantity"
          />
        </div>
        <div class="swap">
          <el-button
            round
            @click="onReceiveAirdrop"
            :disabled="!isConnected"
            type="primary"
            size="medium"
          >
            {{ t('message.index.IDOModel.swapCYN') }}
          </el-button>
        </div>
      </div>
      <div class="close">
        <i class="el-icon-circle-close" @click="changeIDOModelDisplay"></i>
      </div>
    </div>
  </popup>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { getContract, shortenAddress } from '@/common/ts/utils'
import { formatAmount, amountToDecimal } from '@/common/ts/amount'
import getProvider from '@/common/ts/getProvider'
import getWeb3 from '@/common/ts/getWeb3'
import getBalance from '@/common/ts/getBalance'
import Popup from '@/components/popup/popup.vue'
import {
  // AIRDROP_ADDRESS_V2,
  IQT_TOKEN_ADDRESS
  // HIPPO_ADDRESS,
  // SPENDER_ADDRESS
} from '@/common/ts/const'
// import airdropV2 from '@/abi/airdropV2.json'
import test from '@/abi/test.json'
import { useI18n } from 'vue-i18n'
import JSBI from 'jsbi'

const stablecoins = [
  { value: '0x55d398326f99059ff775485246999027b3197955', label: 'USDT' },
  { value: '0xe9e7cea3dedca5984780bafc599bd69add087d56', label: 'BUST' }
]

export interface IDOModelApi {
  changeIDOModelDisplay: () => void
}

const SWAP_RATE = JSBI.BigInt(100)

export default defineComponent({
  components: { Popup },
  setup(_, { expose }) {
    const { t } = useI18n()

    const showModel = ref(false)
    const userAccount = ref<string>()
    const isLoading = ref(false)
    const isConnected = computed(() => userAccount.value !== undefined)
    const isConnecting = ref(false)
    const stablecoin = ref(stablecoins[0].value)
    const stablecoinBanlace = ref<string>()
    const IQTBanlace = ref<string>()
    const swapQuantity = ref<string | number>()
    const maxQuantity = computed(() => {
      if (IQTBanlace.value === undefined) {
        return undefined
      }
      return JSBI.multiply(SWAP_RATE, JSBI.BigInt(IQTBanlace.value)).toString()
    })

    const _watchAccountsChange = () => {
      if (window.ethereum && window.ethereum.on) {
        window.ethereum.on('accountsChanged', async ([address]: string[]) => {
          userAccount.value = address
          _getUserInfo()
        })
      }
    }
    const _getIQTBanlace = async () => {
      if (!userAccount.value) {
        return
      }
      IQTBanlace.value = await getBalance(IQT_TOKEN_ADDRESS, userAccount.value)
    }
    const _getStablecoinBanlace = async () => {
      if (!userAccount.value) {
        return
      }
      stablecoinBanlace.value = await getBalance(stablecoin.value, userAccount.value)
    }
    const _getUserInfo = async () => {
      _getStablecoinBanlace()
      _getIQTBanlace()
    }
    const checkSwapQuantity = () => {
      let num: string | number | undefined = swapQuantity.value?.toString()
      num = num ? num.replace(/[^\d]/g, '') : ''
      if (num.indexOf('.') < 0 && num != '') {
        num = parseInt(num)
      }
      swapQuantity.value = num
    }
    const changeIDOModelDisplay = () => {
      showModel.value = !showModel.value
    }
    const onConnect = async () => {
      const provider = getProvider()

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
      _getUserInfo()
    }
    const onDisconnect = () => {
      userAccount.value = ''
    }
    const onReceiveAirdrop = async () => {
      const contract = getContract(test, '0xc4c4c0f6b706edc073b3ff21c86fd783bef337fb', getWeb3())
      const swapTokensForExactTokens = contract.methods.swapTokensForExactTokens(
        [
          '0xae13d989dac2f0debff460ac112a837c89baa7cd',
          '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
          '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
          '0xae13d989dac2f0debff460ac112a837c89baa7cd'
        ],
        userAccount.value
      )
      const loading = ElLoading.service({ fullscreen: true, background: 'rgba(0,0,0 0.7)' })
      try {
        const output = await swapTokensForExactTokens.send({
          from: userAccount.value,
          value: '10000000000000000'
        })
        console.log('output', output)
        ElMessage.success('调用成功')
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

    watch([stablecoin], () => {
      _getStablecoinBanlace()
    })

    onMounted(() => {
      _watchAccountsChange()
    })

    expose({
      changeIDOModelDisplay
    })

    return {
      showModel,
      userAccount,

      stablecoins,
      stablecoin,

      IQTBanlace,
      stablecoinBanlace,

      swapQuantity,
      maxQuantity,

      isConnecting,
      isConnected,
      isLoading,

      t,
      changeIDOModelDisplay,
      checkSwapQuantity,
      onConnect,
      onDisconnect,
      onReceiveAirdrop,
      shortenAddress,
      formatAmount,
      amountToDecimal
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../scss/variable.scss';
@import '../../../scss/mixin.scss';
.IDO-model-wrapper {
  .close {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .el-icon-circle-close {
      font-size: 40px;
      cursor: pointer;
      color: #fff;
    }
  }
  .IDO-model-content {
    border-radius: 14px;
    background: #fff;
    padding: 40px 30px;
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
    .address-connect {
      display: flex;
      align-items: center;
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
    .banlace {
      margin-top: 15px;
      .title {
        font-size: 14px;
        font-weight: 500;
        color: rgba(32, 46, 107, 0.6);
      }
      .stablecoin,
      .IQT-banlace {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 42px;
        padding: 0 15px;
        background: #c7d0fa;
        border-radius: 100px;
        font-size: 16px;
        font-weight: 500;
        color: #202e6b;
      }
      .IQT-banlace {
        margin-top: 15px;
      }
      .stablecoin-banlace {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .stablecoin {
          flex: 2;
        }
        .select {
          flex: 1;
          margin-left: 7px;
        }
      }
    }
    .swap-number {
      .tips {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 500;
        color: rgba(32, 46, 107, 0.6);
        margin: 14px 0;
        .quantity {
          color: #202e6b;
        }
      }
      input {
        width: 100%;
        outline-style: none;
        text-align: center;
        height: 42px;
        background: #f6f7ff;
        border-radius: 100px;
        border: 1px solid rgba(32, 46, 107, 0.2);
        &::placeholder {
          color: rgba(32, 46, 107, 0.6);
        }
      }
    }
    .swap {
      padding-top: 40px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
