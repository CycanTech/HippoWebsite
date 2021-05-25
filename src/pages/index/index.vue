<template>
  <div class="index-wrapper">
    <img class="banner" src="./banner.png" />
    <img class="mobile-banner" src="./mobile-banner.png" />
    <div class="content">
      <div class="info" id="desc">
        <h1>{{ $t('message.index.info.title') }}</h1>
        <p v-html="$t('message.index.info.desc')"></p>
        <div class="imgs"></div>
        <p v-html="$t('message.index.info.desc')"></p>
        <img src="" />
      </div>
      <div class="activity-wrapper" id="activity">
        <h1>{{ $t('message.index.activity.title') }}</h1>
        <el-tabs type="border-card">
          <el-tab-pane :label="tab.name" v-for="(tab, index) in tabs" :key="index">
            <div class="activity">
              <div class="activity-info">
                <div
                  class="activity-content"
                  v-html="$i18n.locale === LOCALES.EN ? tab.content.en : tab.content.zh"
                />
                <div class="activity-img-wrapper">
                  <img :src="tab.img" />
                </div>
              </div>
              <div class="check-whitelist">
                <el-button class="check-whitelist" @click="changeModelDisplay" type="primary" round>
                  {{ $t('message.index.activity.checkWhitelist') }}
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="rank-holders" id="rank">
        <h1>{{ $t('message.index.rankHolders.title') }}</h1>
        <div class="search">
          <el-input
            clearable
            :placeholder="$t('message.index.rankHolders.placeholder')"
            v-model="searchAddress"
          >
            <template #append>
              <el-button type="primary" round>
                {{ $t('message.index.rankHolders.search') }}
              </el-button>
            </template>
          </el-input>
        </div>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column
              prop="date"
              :label="$t('message.index.rankHolders.accountAddress')"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('message.index.rankHolders.getTime')"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.getAirdrop')">
            </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.totalHoldings')">
            </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.ratio')">
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="500"> </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="showModel">
      <div class="check-whitelist-model-wrapper">
        <i class="el-icon-close" @click="changeModelDisplay"></i>
        <div class="title">
          {{ $t('message.index.checkWhitelistModel.title') }}
        </div>
        <div class="input">
          <el-input
            :disabled="isChecking"
            v-model="checkWhitelistAddress"
            @input="onInputAddress"
          />
        </div>
        <div class="tip">
          <span class="warning" v-if="isInvalidAddress">地址格式不正确</span>
          <span class="success" v-if="isInWhitelist">该地址已参与空投</span>
          <span class="warning" v-if="!isInWhitelist && isChecked">该地址未参与空投</span>
        </div>
        <div class="check">
          <el-button
            round
            @click="onCheck"
            :disabled="isChecked || !!!checkWhitelistAddress"
            :loading="isChecking"
            type="primary"
            size="medium"
          >
            {{ $t('message.index.checkWhitelistModel.check') }}
          </el-button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Popup from '../../components/popup/popup.vue'
import { LOCALES } from '../../i18n/index'
import { isAddress } from '../../common/ts/utils'

const TABS = [
  {
    name: 'HIPPO',
    img: require('./phone.png'),
    content: {
      zh: `<p><b><font size="4">活动名称：</font></b>Hippo</p><p><font size="4"><b>开始时间：</b></font>2021/05/18 24:00-2021/05/ &nbsp;24:00&nbsp;</p><p><font size="4"><b>剩余数量：</b></font>20000</p><p><b><font size="4">领取方式：&nbsp;</font></b></p><p><b><font size="4"><br/></font></b></p><p>1、准备麦子或 Tp 钱包 创建好 bsc 钱包。河马的合约地址（先空投，Pancake V2 HIP-USDT 交易对在空投完之后上线开启交易）；</p><p><br/></p><p>2、进 CYN/ELP/HIP 中文共识群（<a href="https://t.me/CycanGlobal" target="_blank"><font color="#46acc8">https://t.me/CycanGlobal</font><span></span></a>) 英文进英文社区（<a href="https://t.me/cycan_network" target="_blank"><font color="#46acc8">https://t.me/cycan_network</font><span></span></a>）；</p><p><br/></p><p>3、关注推特（<a href="https://twitter.com/CycanNetwork" target="_blank"><font color="#46acc8">https://twitter.com/CycanNetwork</font><span></span></a>） 点赞并转发空投推文并@两位好友+附上 BSC 地址，就可以获得空投白名单；</p><p><br/></p><p>4、得到 500w 个 Hippo币的空投白名单，获取空投地址: (我们给一个网址，获得空投白名单的人领取 500w Hippo 空投)。</p>`,
      en:
        '<p><b><font size="4">活动名称：</font></b>Hippo</p><p><font size="4"><b>开始时间：</b></font>2021/05/18 24:00-2021/05/ &nbsp;24:00&nbsp;</p><p><font size="4"><b>剩余数量：</b></font>20000</p><p><b><font size="4">领取方式：&nbsp;</font></b></p><p><b><font size="4"><br/></font></b></p><p>1、准备麦子或 Tp 钱包 创建好 bsc 钱包。河马的合约地址（先空投，Pancake V2 HIP-USDT 交易对在空投完之后上线开启交易）；</p><p><br/></p><p>2、进 CYN/ELP/HIP 中文共识群（<a href="https://t.me/CycanGlobal" target="_blank"><font color="#46acc8">https://t.me/CycanGlobal</font><span></span></a>) 英文进英文社区（<a href="https://t.me/cycan_network" target="_blank"><font color="#46acc8">https://t.me/cycan_network</font><span></span></a>）；</p><p><br/></p><p>3、关注推特（<a href="https://twitter.com/CycanNetwork" target="_blank"><font color="#46acc8">https://twitter.com/CycanNetwork</font><span></span></a>） 点赞并转发空投推文并@两位好友+附上 BSC 地址，就可以获得空投白名单；</p><p><br/></p><p>4、得到 500w 个 Hippo币的空投白名单，获取空投地址: (我们给一个网址，获得空投白名单的人领取 500w Hippo 空投)。</p>'
    }
  }
]

const check = (address: string) => {
  const addressList = [
    '0xD60AA52cA3A42b31A12fEB9C00b636Ae3C32f0a9',
    '0xcD0DE9bc56a99389456B96fE5819403E86C15d18'
  ]
  return new Promise<boolean>(resovle => {
    setTimeout(() => {
      resovle(addressList.includes(address) ? true : false)
    }, Math.random() * 1000)
  })
}

export default {
  components: { Popup },
  setup() {
    const tabs = ref(TABS)
    const searchAddress = ref('')
    const showModel = ref(false)

    const changeModelDisplay = () => {
      showModel.value = !showModel.value
    }

    const checkWhitelistAddress = ref('')
    const isInvalidAddress = ref(false)
    const isChecked = ref(false)
    const isInWhitelist = ref(false)
    const isChecking = ref(false)
    const onCheck = async () => {
      if (!isAddress(checkWhitelistAddress.value)) {
        isInvalidAddress.value = true
        return
      }
      isChecking.value = true
      isInWhitelist.value = await check(checkWhitelistAddress.value)
      isChecking.value = false
      isChecked.value = true
    }
    const onInputAddress = () => {
      isInvalidAddress.value = false
      isChecked.value = false
      isInWhitelist.value = false
    }

    return {
      tabs,
      searchAddress,

      isInvalidAddress,
      checkWhitelistAddress,
      isChecked,
      isChecking,
      isInWhitelist,

      showModel,
      changeModelDisplay,
      onCheck,
      onInputAddress,

      LOCALES,
      tableData: []
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variable.scss';
@import '../../scss/mixin.scss';
.index-wrapper {
  .banner {
    width: 100%;
    height: auto;
    min-height: 300px;
  }
  .mobile-banner {
    display: none;
    width: 100%;
    height: auto;
  }
  .content {
    max-width: 1024px;
    margin: 0 auto;
    h1 {
      text-align: center;
      padding-top: 80px;
      padding-bottom: 55px;
    }
    .activity-wrapper {
      .el-tabs--border-card > .el-tabs__header {
        background-color: #f2f7fa;
        border-bottom: 1px solid #e4e7ed;
        margin: 0;
      }
      .activity {
        padding: 30px 0 60px 0;
        .activity-info {
          display: flex;
          position: relative;
          min-height: 500px;
          padding-left: 400px;
          .activity-img-wrapper {
            display: flex;
            justify-content: flex-end;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 325px;
            padding-right: 75px;
          }
          .activity-content {
            flex: 1;
          }
        }
        .check-whitelist {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
      }
    }
    .rank-holders {
      .table {
        border-radius: 4px;
        border: 1px solid #eaf3f8;
        margin: 50px 0;
        overflow: hidden;
      }
      .pagination {
        display: flex;
        justify-content: center;
        padding: 50px 0;
        overflow-x: auto;
      }
    }
  }
  .check-whitelist-model-wrapper {
    position: relative;
    width: 300px;
    border-radius: 14px;
    background: #fff;
    padding: 50px 15px;
    font-size: 18px;
    color: #000000;
    @include smallMobile {
      width: 280px;
    }
    .el-icon-close {
      position: absolute;
      right: 25px;
      top: 25px;
      font-size: 25px;
      cursor: pointer;
    }
    .input {
      margin: 20px 0 15px 0;
    }
    .tip {
      margin-bottom: 15px;
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      .warning {
        color: #f94736;
      }
      .success {
        color: #7e72ec;
      }
    }
    .check {
      display: flex;
      justify-content: center;
    }
  }
  @include tablet {
    .content {
      padding: 0 16px;
    }
  }
  @include mobile {
    h1 {
      font-size: $font-size-large;
    }
    p {
      font-size: $font-size-large;
    }
    .banner {
      display: none;
    }
    .mobile-banner {
      display: block;
    }
    .content {
      padding: 0 16px;
      h1 {
        padding-top: 55px;
        padding-bottom: 20px;
      }
      .activity-wrapper {
        .activity {
          padding: 10px 0 20px 0;
          .activity-info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding-left: 0;
            .activity-content {
              padding-bottom: 20px;
              width: 100%;
            }
            .activity-img-wrapper {
              justify-content: center;
              position: relative;
              padding-right: 0;
              img {
                max-width: 100%;
                margin: 0 auto;
              }
            }
          }
          .check-whitelist {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
