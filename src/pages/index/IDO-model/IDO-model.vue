<template>
  <popup v-model="showModel">
    <div class="IDO-model-wrapper">
      <div class="IDO-model-content">
        <div class="BSCAddress">{{ t('message.index.IDOModel.BSCAddress') }}</div>
        <div class="address-connect">
          <div class="account">
            <span v-if="isConnected">{{ shortenAddress(userAccount, 7) }}</span>
            <span class="tip" v-else> {{ t('message.PlsConnect') }}</span>
          </div>
          <div class="connect">
            <el-button size="small" round v-if="isConnected" @click="onDisconnect">
              {{ t('message.disconnect') }}
            </el-button>
            <el-button
              size="small"
              type="primary"
              round
              v-else
              @click="onConnect"
              :loading="isConnecting"
            >
              {{ t('message.connectWallet') }}
            </el-button>
          </div>
        </div>
        <div class="banlace">
          <div class="title">
            {{ t('message.index.IDOModel.IQTBanlace') }}
          </div>
          <div class="IQT-banlace">
            <i class="el-icon-loading" v-if="isLoadingIQT"></i>
            {{ IQTBanlace ? amountToDecimal(formatAmount(IQTBanlace)) : '-' }}
          </div>
          <div class="title">
            {{ t('message.index.IDOModel.paymentCurrency') }}
          </div>
          <div class="stablecoin-banlace">
            <el-select class="select" size="small" v-model="stablecoin" placeholder="请选择">
              <el-option
                v-for="item in stablecoins"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="stablecoin">
              <i class="el-icon-loading" v-if="isLoadingStablecoin"></i>
              {{ stablecoinBanlace ? amountToDecimal(formatAmount(stablecoinBanlace)) : '-' }}
            </div>
          </div>
        </div>
        <div class="swap-number">
          <div class="tips">
            <div v-html="t('message.index.IDOModel.swapQuantity')"></div>
            <div class="max-quantity">
              <span> {{ t('message.index.IDOModel.maxQuantity') }}</span>
              <span class="quantity">
                {{ maxSwapQuantity ? amountToDecimal(formatAmount(maxSwapQuantity)) : '-' }}
              </span>
            </div>
          </div>
          <div class="input-wrap">
            <input
              type="text"
              :placeholder="t('message.index.IDOModel.placeholder')"
              v-model="baseSwapQuantity"
              @change="checkSwapQuantity"
            />
            <div class="max" @click="onMax">Max</div>
          </div>
        </div>
        <div class="CYN-banlace">
          <span>{{ t('message.index.IDOModel.CYNBanlace') }}</span>
          <span class="amount">
            {{ CYNBanlaceAmount ? amountToDecimal(formatAmount(CYNBanlaceAmount)) : '-' }}
          </span>
        </div>
        <div class="swap">
          <div class="label">
            {{ t('message.index.IDOModel.swap') }}
          </div>
          <div class="amounts">
            <div class="amount">
              <span>{{
                parsedStablecoinAndIQTAmounts?.IQTAmount
                  ? amountToDecimal(
                      formatAmount(parsedStablecoinAndIQTAmounts.IQTAmount.toString())
                    )
                  : '-'
              }}</span>
              <span class="symbol">IQT</span>
            </div>
            <div class="amount">
              <span>
                {{
                  parsedStablecoinAndIQTAmounts?.stablecoinAmount
                    ? amountToDecimal(
                        formatAmount(parsedStablecoinAndIQTAmounts.stablecoinAmount.toString())
                      )
                    : '-'
                }}
              </span>
              <span class="symbol">{{ stablecoinLabels[stablecoin] }}</span>
            </div>
          </div>
        </div>
        <div class="output">
          <div class="label">
            {{ t('message.index.IDOModel.for') }}
          </div>
          <div class="amounts">
            <div class="amount">
              <span>
                {{
                  parsedSwapQuantity
                    ? amountToDecimal(formatAmount(parsedSwapQuantity.toString()))
                    : '-'
                }}
              </span>
              <span class="symbol">CYN</span>
            </div>
          </div>
        </div>
        <div class="approves" v-if="isConnected && (!isStablecoinApproved || !isIQTApproved)">
          <el-button
            round
            @click="onApprove(stablecoin, false)"
            :disabled="isStablecoinApproved || !isConnected"
            :loading="isLoadingStablecoinApprove"
            type="primary"
            size="medium"
          >
            <template v-if="isStablecoinApproved">
              {{ t('message.index.IDOModel.approved') }}
            </template>
            <template v-else>{{ t('message.index.IDOModel.approve') }}</template>
            {{ stablecoinLabels[stablecoin] }}
          </el-button>
          <el-button
            round
            @click="onApprove(IQT_TOKEN_ADDRESS, true)"
            :disabled="isIQTApproved || !isConnected"
            :loading="isLoadingIQTApprove"
            type="primary"
            size="medium"
          >
            <template v-if="isIQTApproved">{{ t('message.index.IDOModel.approved') }}</template>
            <template v-else>{{ t('message.index.IDOModel.approve') }}</template>
            IQT
          </el-button>
        </div>
        <div class="buttons" v-else>
          <el-button
            round
            @click="onSwap"
            :disabled="swapButtonDisabled"
            type="primary"
            size="medium"
          >
            {{ t('message.index.IDOModel.swapCYN') }}
          </el-button>
        </div>
        <div class="bottom-tips" v-if="isInsufficientStablecoinBanlace || isInsufficientIQTBanlace">
          {{ isInsufficientStablecoinBanlace ? stablecoinLabels[stablecoin] : 'IQT' }}
          {{ t('message.index.IDOModel.insufficient') }}
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
import { parseAmount, formatAmount, amountToDecimal } from '@/common/ts/amount'
import getProvider from '@/common/ts/getProvider'
import getWeb3 from '@/common/ts/getWeb3'
import getBalance from '@/common/ts/getBalance'
import Popup from '@/components/popup/popup.vue'
import { IQT_TOKEN_ADDRESS, IOD_SWAP_ADDRESS, ZERO, CYN_ADDRESS } from '@/common/ts/const'
import { abi as IDOSwapABI } from '@/abi/IDOSwap.json'
import { useI18n } from 'vue-i18n'
import JSBI from 'jsbi'
import getApproved from '@/common/ts/getApproved'
import approve from '@/common/ts/approve'

const stablecoins = [
  { value: '0x55d398326f99059ff775485246999027b3197955', label: 'USDT' },
  { value: '0xe9e7cea3dedca5984780bafc599bd69add087d56', label: 'BUSD' }
]
const stablecoinLabels: { [key: string]: string } = {}
stablecoins.map(item => {
  stablecoinLabels[item.value] = item.label
})

export interface IDOModelApi {
  changeIDOModelDisplay: () => void
}

const BIG_ONE = JSBI.BigInt('1000000000000000000')
const CYN_RATE = JSBI.BigInt(100)
const STABLECOIN_RATE = JSBI.BigInt(10)

export default defineComponent({
  components: { Popup },
  setup(_, { expose }) {
    const { t } = useI18n()

    const showModel = ref(false)
    const userAccount = ref<string>()
    const isConnected = computed(() => userAccount.value !== undefined)
    const isConnecting = ref(false)
    const isLoadingIQT = ref(false)
    const isLoadingStablecoinApprove = ref(false)
    const isLoadingIQTApprove = ref(false)
    const isLoadingStablecoin = ref(false)
    const stablecoin = ref(stablecoins[0].value)
    const stablecoinBanlace = ref<JSBI>()
    const CYNBanlaceAmount = ref<JSBI>()
    const isIQTApproved = ref(false)
    const isStablecoinApproved = ref(false)
    const IQTBanlace = ref<JSBI>()
    const baseSwapQuantity = ref<string | number>()
    const parsedSwapQuantity = computed(() => {
      if (!baseSwapQuantity.value) {
        return undefined
      }
      try {
        return JSBI.BigInt(parseAmount(baseSwapQuantity.value.toString()))
      } catch (error) {
        return undefined
      }
    })
    const maxSwapQuantity = computed(() => {
      if (IQTBanlace.value === undefined) {
        return undefined
      }
      return JSBI.multiply(CYN_RATE, IQTBanlace.value).toString()
    })
    const parsedStablecoinAndIQTAmounts = computed(() => {
      if (parsedSwapQuantity.value === undefined) {
        return undefined
      }
      //100CYN = 1IQT + 10(USDT|BUSD)
      const stablecoinAmount = JSBI.divide(parsedSwapQuantity.value, STABLECOIN_RATE)
      const IQTAmount = JSBI.divide(parsedSwapQuantity.value, CYN_RATE)
      // if (JSBI.greaterThan(JSBI.remainder(IQTAmount, BIG_ONE), ZERO)) {
      //   return undefined
      // }
      return {
        stablecoinAmount,
        IQTAmount
      }
    })
    const isInsufficientStablecoinBanlace = computed(() => {
      if (!parsedStablecoinAndIQTAmounts.value || !stablecoinBanlace.value) {
        return false
      }
      const { stablecoinAmount } = parsedStablecoinAndIQTAmounts.value
      return JSBI.lessThan(stablecoinBanlace.value, stablecoinAmount)
    })
    const isInsufficientIQTBanlace = computed(() => {
      if (!parsedStablecoinAndIQTAmounts.value || !IQTBanlace.value) {
        return false
      }
      const { IQTAmount } = parsedStablecoinAndIQTAmounts.value
      return JSBI.lessThan(IQTBanlace.value, IQTAmount)
    })
    const swapButtonDisabled = computed(() => {
      if (
        !isConnected.value ||
        !parsedStablecoinAndIQTAmounts.value ||
        !IQTBanlace.value ||
        !stablecoinBanlace.value
      ) {
        return true
      }
      if (JSBI.equal(ZERO, IQTBanlace.value) || JSBI.equal(ZERO, stablecoinBanlace.value)) {
        return true
      }
      const { IQTAmount } = parsedStablecoinAndIQTAmounts.value
      if (JSBI.greaterThan(JSBI.remainder(IQTAmount, BIG_ONE), ZERO)) {
        return true
      }
      if (isInsufficientStablecoinBanlace.value || isInsufficientIQTBanlace.value) {
        return true
      }
      return false
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
      isLoadingIQT.value = true
      const banlace = await getBalance(IQT_TOKEN_ADDRESS, userAccount.value)
      IQTBanlace.value = JSBI.BigInt(banlace)
      isLoadingIQT.value = false
    }
    const _getStablecoinBanlace = async () => {
      if (!userAccount.value) {
        return
      }
      isLoadingStablecoin.value = true
      const banlace = await getBalance(stablecoin.value, userAccount.value)
      stablecoinBanlace.value = JSBI.BigInt(banlace)
      isLoadingStablecoin.value = false
    }
    const _getCYNBanlaceAmount = async () => {
      if (!userAccount.value) {
        return
      }
      const banlace = await getBalance(CYN_ADDRESS, userAccount.value)
      CYNBanlaceAmount.value = JSBI.BigInt(banlace)
    }
    const _getIQTApproved = async () => {
      if (!userAccount.value) {
        return
      }
      isLoadingIQTApprove.value = true
      isIQTApproved.value = await getApproved(
        IQT_TOKEN_ADDRESS,
        IOD_SWAP_ADDRESS,
        userAccount.value
      )
      isLoadingIQTApprove.value = false
    }
    const _getStablecoinApproved = async () => {
      if (!userAccount.value) {
        return
      }
      isLoadingStablecoinApprove.value = true
      isStablecoinApproved.value = await getApproved(
        stablecoin.value,
        IOD_SWAP_ADDRESS,
        userAccount.value
      )
      isLoadingStablecoinApprove.value = false
    }
    const _getUserInfo = async () => {
      _getStablecoinBanlace()
      _getCYNBanlaceAmount()
      _getIQTBanlace()
      _getIQTApproved()
      _getStablecoinApproved()
    }
    const checkSwapQuantity = () => {
      let num: string | number | undefined = baseSwapQuantity.value?.toString()
      num = num ? num.replace(/[^\d]/g, '') : ''
      if (num.indexOf('.') < 0 && num != '') {
        num = parseInt(num)
      }
      baseSwapQuantity.value = num
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
      userAccount.value = undefined
      baseSwapQuantity.value = undefined
      IQTBanlace.value = undefined
      stablecoinBanlace.value = undefined
      isIQTApproved.value = false
      isStablecoinApproved.value = false
    }
    const onApprove = async (tokenAddress: string, isApproveIQT: boolean) => {
      if (!userAccount.value) {
        return
      }
      isApproveIQT ? (isLoadingIQTApprove.value = true) : (isLoadingStablecoinApprove.value = true)
      const hasApproved = await approve(tokenAddress, IOD_SWAP_ADDRESS, userAccount.value)
      if (hasApproved) {
        ElMessage.success(t('message.index.IDOModel.approveSuccess'))
        isApproveIQT ? (isIQTApproved.value = true) : (isStablecoinApproved.value = true)
      } else {
        ElMessage.warning(t('message.index.IDOModel.approveFailed'))
      }
      isApproveIQT
        ? (isLoadingIQTApprove.value = false)
        : (isLoadingStablecoinApprove.value = false)
    }
    const onSwap = async () => {
      if (parsedStablecoinAndIQTAmounts.value === undefined) {
        return
      }
      const { stablecoinAmount } = parsedStablecoinAndIQTAmounts.value
      const contract = getContract(IDOSwapABI, IOD_SWAP_ADDRESS, getWeb3())
      const isUSDT = stablecoin.value === stablecoins[0].value
      const swap = contract.methods[isUSDT ? 'swapUsdtAndIqtForCyn' : 'swapBusdAndIqtForCyn'](
        stablecoinAmount.toString()
      )
      const loading = ElLoading.service({ fullscreen: true, background: 'rgba(0,0,0 0.7)' })
      try {
        await swap.send({ from: userAccount.value })
        baseSwapQuantity.value = undefined
        _getUserInfo()
        ElMessage.success(t('message.index.IDOModel.swapSuccess'))
      } catch (error) {
        if (error?.code !== 4001) {
          ElMessage.warning(t('message.index.IDOModel.swapFailed'))
          console.log('Swap Error', error)
        }
      } finally {
        loading.close()
      }
    }
    const onMax = () => {
      baseSwapQuantity.value = maxSwapQuantity.value
        ? formatAmount(maxSwapQuantity.value.toString())
        : ''
    }

    watch([stablecoin], () => {
      _getStablecoinBanlace()
      _getStablecoinApproved()
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
      stablecoinLabels,
      IQT_TOKEN_ADDRESS,

      stablecoin,
      IQTBanlace,
      stablecoinBanlace,
      CYNBanlaceAmount,
      baseSwapQuantity,
      maxSwapQuantity,
      parsedStablecoinAndIQTAmounts,
      parsedSwapQuantity,

      isInsufficientStablecoinBanlace,
      isInsufficientIQTBanlace,
      isLoadingStablecoinApprove,
      isLoadingIQTApprove,
      isStablecoinApproved,
      isIQTApproved,
      isLoadingStablecoin,
      isLoadingIQT,
      isConnecting,
      isConnected,
      swapButtonDisabled,

      t,
      changeIDOModelDisplay,
      checkSwapQuantity,
      onConnect,
      onDisconnect,
      onSwap,
      onApprove,
      onMax,
      shortenAddress,
      formatAmount,
      amountToDecimal
    }
  }
})
</script>

<style lang="scss">
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
    .BSCAddress {
      font-size: 14px;
      font-weight: 500;
      color: rgba(32, 46, 107, 0.6);
      margin-bottom: 15px;
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
        background: #f6f7ff;
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
        position: relative;
        height: 42px;
        padding: 0 15px;
        background: #f6f7ff;
        border: 1px solid rgba(32, 46, 107, 0.2);
        border-radius: 100px;
        font-size: 16px;
        font-weight: 500;
        color: #202e6b;
        .el-icon-loading {
          position: absolute;
          left: 15px;
          font-size: 20px;
        }
      }
      .IQT-banlace {
        margin: 15px 0;
      }
      .stablecoin-banlace {
        display: flex;
        align-items: center;
        margin-top: 15px;
        .stablecoin {
          flex: 2;
        }
        .select {
          flex: 0 0 90px;
          margin-right: 7px;
          height: 42px;
          .select-trigger {
            .el-input {
              .el-input__inner {
                height: 42px;
                line-height: 42px;
                background: #f6f7ff;
                border-radius: 100px;
                /* border: 1px solid #202e6b; */
                color: #202e6b;
                font-size: 16px;
              }
              .el-input__icon {
                height: 42px;
                color: #202e6b;
              }
            }
          }
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
        .max-quantity {
          display: flex;
          align-items: center;
          .quantity {
            color: #202e6b;
            margin-left: 5px;
          }
        }
      }
      .input-wrap {
        display: flex;
        align-items: center;
        overflow: hidden;
        border-radius: 100px;
        border: 1px solid #202e6b;
        height: 42px;
        input {
          flex: 1;
          outline-style: none;
          text-align: center;
          background: #fff;
          height: 42px;
          border: 0;
          padding: 0 15px;
          &::placeholder {
            color: rgba(32, 46, 107, 0.6);
          }
        }
        .max {
          text-align: center;
          cursor: pointer;
          width: 65px;
          height: 42px;
          line-height: 42px;
          background: #202e6b;
          border-radius: 0px 100px 100px 0px;
          color: #fff;
        }
      }
    }
    .CYN-banlace {
      display: flex;
      font-size: 14px;
      font-weight: 500;
      color: #202e6b;
      margin-top: 15px;
      .amount {
        margin-left: 5px;
      }
    }
    .swap,
    .output {
      display: flex;
      justify-content: flex-end;
      position: relative;
      padding: 15px 0;
      .label {
        position: absolute;
        left: 0;
        top: 15px;
        font-size: 14px;
        font-weight: 500;
        color: #202e6b;
      }
      .amounts {
        .amount {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 14px;
          color: #202e6b;
          .symbol {
            margin-left: 5px;
            width: 40px;
          }
        }
      }
    }
    .swap {
      .amounts {
        .amount {
          &:last-child {
            margin-top: 10px;
          }
        }
      }
    }
    .output {
      border-top: 1px solid rgba($color: #e8e9f4, $alpha: 0.59);
    }
    .buttons,
    .approves {
      padding-top: 15px;
      display: flex;
    }
    .approves {
      justify-content: space-between;
      button {
        flex: 1;
        padding: 10px;
      }
    }
    .buttons {
      justify-content: center;
      button {
        width: 204px;
        height: 42px;
      }
    }
    .bottom-tips {
      margin-top: 15px;
      font-size: 14px;
      font-weight: 400;
      color: #ff1e1e;
      text-align: center;
    }
  }
}
</style>
