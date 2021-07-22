<template>
  <div class="index-wrapper">
    <img class="banner" src="./banner.png" />
    <img class="mobile-banner" src="./mobile-banner.png" />
    <div class="content">
      <div class="introduce" id="desc">
        <h1>{{ t('message.index.introduce.title') }}</h1>
        <p v-html="t('message.index.introduce.desc')"></p>
        <tokenomics />
        <div class="hippo-desc">
          <div class="title">
            {{ t('message.index.introduce.understandingHippo') }}
          </div>
          <div class="video">
            <video controls :poster="videos[locale].poster">
              <source type="video/mp4" :src="videos[locale].video" />
            </video>
          </div>
        </div>
      </div>
      <div class="IDO">
        <h1>Cycan IDO</h1>
        <p v-html="t('message.index.IDO.desc')"></p>
        <div class="join">
          <el-button type="primary" size="medium" @click="handleShowIDOModel" round>
            {{ t('message.index.IDO.join') }}
          </el-button>
        </div>
      </div>
      <div class="activity-wrapper" id="activity">
        <h1>{{ t('message.index.activity.title') }}</h1>
        <el-tabs type="border-card">
          <el-tab-pane :label="tab.names[locale]" v-for="(tab, index) in tabs" :key="index">
            <div class="activity">
              <div class="activity-info">
                <div class="activity-content" v-html="tab.content[locale]" />
                <div class="activity-img-wrapper">
                  <img :src="tab.img" />
                </div>
              </div>
              <div class="check-receive">
                <el-button
                  @click="handleShowAirdropModel"
                  type="primary"
                  size="medium"
                  round
                  :disabled="true"
                >
                  {{ t('message.index.activity.airdropClaimEnded') }}
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <div class="lucky-draw-wrapper">
        <h1>{{ t('message.index.luckyDraw.title') }}</h1>
        <div class="lucky-draw-content">
          <el-tabs>
            <el-tab-pane
              :label="t('message.index.luckyDraw.label', { lotteryPeriod: item.lotteryPeriod })"
              v-for="(item, index) in lotterys"
              :key="index"
            >
              <div class="lucky-draw">
                <div class="lottery-drawn" v-html="item.contents[locale]" />
                <div class="lottery-result">
                  <el-button type="primary" size="medium" round @click="toLotteryResult(index)">
                    {{ t('message.index.luckyDraw.lotteryResult') }}
                  </el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div> -->
    </div>
  </div>
  <AirdropModel ref="airdropModel" />
  <IDOModel ref="IODModel" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LOCALES } from '../../i18n/index'
import AirdropModel from './airdrop-model/airdrop-model.vue'
import type { AirdropModelApi } from './airdrop-model/airdrop-model.vue'
import IDOModel from './IDO-model/IDO-model.vue'
import type { IDOModelApi } from './IDO-model/IDO-model.vue'
import Tokenomics from '@/components/tokenomics/tokenomics.vue'
import { TABS as tabList, LOTTERYS as lotterys, VIDEOS as videos } from '../../config/index'
import { useI18n } from 'vue-i18n'
import useProxyRouter from '../../common/use/useProxyRouter'

export default defineComponent({
  components: {
    Tokenomics,
    AirdropModel,
    IDOModel
  },
  setup() {
    const { t, locale } = useI18n()
    const router = useProxyRouter()

    const tabs = ref(tabList)
    const airdropModel = ref<AirdropModelApi>()
     const IODModel = ref<IDOModelApi>()

    const handleShowAirdropModel = () => {
      airdropModel.value?.changeAirdropModelDisplay()
    }
    const handleShowIDOModel = () => {
      IODModel.value?.changeIDOModelDisplay()
    }

    const toLotteryResult = (i: number) => {
      const item = lotterys[i]

      router.push({
        path: '/lotteryResult',
        query: {
          lotteryPeriod: item.lotteryPeriod
        }
      })
    }

    return {
      tabs,
      videos,
      lotterys,

      locale,

      airdropModel,
      IODModel,

      t,
      toLotteryResult,
      handleShowAirdropModel,
      handleShowIDOModel,

      LOCALES
    }
  }
})
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
    strong {
      font-weight: bold;
    }
    h1 {
      text-align: center;
      padding-top: 80px;
      padding-bottom: 55px;
    }
    .introduce {
      max-width: 1024px;
      margin: 0 auto;
      overflow-x: hidden;
      line-height: 25px;
      white-space: normal;
      padding-bottom: 55px;
      p {
        word-break: break-all;
      }
      .hippo-desc {
        .title {
          margin: 40px 0;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #000000;
        }
        .video {
          video {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    .IDO {
      background: rgba($color: #aea5f3, $alpha: 0.09);
      padding-bottom: 55px;
      p {
        max-width: 1024px;
        margin: 0 auto;
        overflow-x: hidden;
        line-height: 25px;
        white-space: normal;
      }
      .join {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .el-button {
          width: 200px;
          height: 60px;
          border-radius: 60px;
          font-size: 18px;
        }
      }
    }
    .activity-wrapper {
      max-width: 1024px;
      margin: 0 auto;
      overflow-x: hidden;
      padding-bottom: 20px;
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
            top: 0;
            max-width: 400px;
            img {
              max-width: 400px;
            }
          }
          .activity-content {
            flex: 1;
            padding-left: 30px;
            white-space: pre-wrap;
            line-height: 25px;
          }
        }
        .check-receive {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          .el-button {
            width: 200px;
            height: 60px;
            border-radius: 60px;
            font-size: 18px;
          }
        }
      }
    }
    .lucky-draw-wrapper {
      .lucky-draw-content {
        .lucky-draw {
          position: relative;
          padding: 40px 0;
          .lottery-result {
            display: flex;
            justify-content: center;
            margin-top: 30px;
          }
        }
      }
    }
  }
  @include tablet {
    .IDO,
    .introduce,
    .activity-wrapper {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  @include mobile {
    .banner {
      display: none;
    }
    .mobile-banner {
      display: block;
    }
    .content {
      .introduce,
      .IDO,
      .activity-wrapper {
        padding-left: 16px;
        padding-right: 16px;
      }
      h1 {
        font-size: $font-size-large;
        padding-top: 55px;
        padding-bottom: 20px;
      }
      p {
        font-size: $font-size-large;
      }
      .introduce {
        .hippo-desc {
          .title {
            font-size: $font-size-large;
            margin: 20px;
          }
        }
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
              padding-left: 0;
              padding-bottom: 20px;
              width: 100%;
            }
            .activity-img-wrapper {
              justify-content: center;
              position: relative;
              padding-right: 0;
              img {
                max-width: 300px;
                max-height: 310px;
                margin: 0 auto;
              }
            }
          }
          .check-receive {
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
