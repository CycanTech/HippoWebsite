<template>
  <div class="index-wrapper">
    <img class="banner" src="./banner.png" />
    <img class="mobile-banner" src="./mobile-banner.png" />
    <div class="content">
      <div class="info" id="desc">
        <h1>{{ $t('message.index.info.title') }}</h1>
        <p v-html="$t('message.index.info.desc')"></p>
        <div class="card">
          <div class="title">
            {{ $t('message.index.info.tokenomics') }}
          </div>
          <div class="imgs">
            <img class="img1" :src="cardImags.allocations[$i18n.locale]" />
            <img class="img2" :src="cardImags.total[$i18n.locale]" />
          </div>
        </div>
        <div class="card-mobile">
          <img :src="cardImags.mobile[$i18n.locale]" />
        </div>
      </div>
      <div class="activity-wrapper" id="activity">
        <h1>{{ $t('message.index.activity.title') }}</h1>
        <el-tabs type="border-card">
          <el-tab-pane
            :label="$i18n.locale === LOCALES.EN ? tab.names.EN : tab.names.ZH"
            v-for="(tab, index) in tabs"
            :key="index"
          >
            <div class="activity">
              <div class="activity-info">
                <div
                  class="activity-content"
                  v-html="$i18n.locale === LOCALES.EN ? tab.content.EN : tab.content.ZH"
                />
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
                  {{ $t('message.index.activity.airdropClaimEnded') }}
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <airdrop-model ref="airdropModel" :projects="projects" />
  </div>
</template>

<script lang="ts">
import { Ref, ref, onMounted } from 'vue'
import { LOCALES } from '../../i18n/index'
import AirdropModel from './airdrop-model/airdrop-model.vue'
import tabList from './tabs'
import getProjects, { Project } from '@/service/getProjects'

const cardImags = {
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

export default {
  components: {
    AirdropModel
  },
  setup() {
    const tabs = ref(tabList)
    const searchRankAddress = ref<string>('')

    const airdropModel = ref<{
      checkWhitelistAddress: Ref<string>
      changeAirdropModelDisplay: () => void
    } | null>(null)
    const handleShowAirdropModel = () => {
      airdropModel.value?.changeAirdropModelDisplay()
    }

    const projects = ref<Project[]>([])
    onMounted(async () => {
      projects.value = await getProjects()
    })

    return {
      tabs,
      searchRankAddress,
      projects,

      airdropModel,
      handleShowAirdropModel,
      cardImags,

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
    overflow-x: hidden;
    h1 {
      text-align: center;
      padding-top: 80px;
      padding-bottom: 55px;
    }
    .info {
      line-height: 25px;
      white-space: normal;
      p {
        word-break: break-all;
      }
      .card {
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
      .card-mobile {
        display: none;
      }
      @include tablet {
        .card {
          display: none;
        }
        .card-mobile {
          display: block;
          margin-top: 35px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      @include mobile {
        .card {
          display: none;
        }
        .card-mobile {
          display: block;
          margin-top: 35px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    .activity-wrapper {
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
        .el-pagination {
          max-width: 520px;
        }
      }
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
