<template>
  <div class="index-wrapper">
    <img class="banner" src="./banner.png" />
    <div class="content">
      <div class="info">
        <h1>{{ $t('message.index.info.title') }}</h1>
        <p v-text="$t('message.index.info.desc')"></p>
        <div class="imgs"></div>
        <p v-text="$t('message.index.info.desc')"></p>
        <img src="" />
      </div>
      <div class="activity">
        <h1>{{ $t('message.index.activity.title') }}</h1>
        <el-tabs type="border-card">
          <el-tab-pane :label="tab.name" v-for="(tab, index) in tabs" :key="index">
            <div class="tab-wrapper">
              <div class="activity-info">
                <div class="activity-img-wrapper">
                  <img :src="tab.img" />
                </div>
                <div
                  class="activity-content"
                  v-html="$i18n.locale === LOCALES.EN ? tab.content.en : tab.content.zh"
                ></div>
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
      <div class="rank-holders">
        <h1>{{ $t('message.index.rankHolders.title') }}</h1>
        <div class="search">
          <el-input clearable :placeholder="$t('message.index.rankHolders.placeholder')" v-model="searchAddress">
            <template #append>
              <el-button type="primary" round>
                {{ $t('message.index.rankHolders.search') }}
              </el-button>
            </template>
          </el-input>
        </div>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column prop="date" :label="$t('message.index.rankHolders.accountAddress')" width="180">
            </el-table-column>
            <el-table-column prop="name" :label="$t('message.index.rankHolders.getTime')" width="180">
            </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.getAirdrop')"> </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.totalHoldings')"> </el-table-column>
            <el-table-column prop="address" :label="$t('message.index.rankHolders.ratio')"> </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="showModel">
      <div class="model-wrapper">哈哈哈</div>
    </popup>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import Popup from '../../components/popup/popup.vue'
import { LOCALES } from '../../i18n/index'

const TABS = [
  {
    name: 'HIPPO',
    img: '',
    content: {
      zh: '哈哈哈哈哈哈哈哈哈哈',
      en: 'hhhhhhhhhhh'
    }
  }
]

export default {
  components: { Popup },
  setup() {
    const tabs = reactive<Array<any>>(TABS)
    const searchAddress = ref<string>('')
    const showModel = ref(false)

    const changeModelDisplay = () => {
      showModel.value = !showModel.value
    }

    return {
      tabs,
      searchAddress,

      showModel,
      changeModelDisplay,

      LOCALES,
      tableData: []
    }
  }
}
</script>

<style lang="scss">
.index-wrapper {
  .banner {
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
    // .info {
    // }
    .activity {
      .el-tabs--border-card > .el-tabs__header {
        background-color: #f2f7fa;
        border-bottom: 1px solid #e4e7ed;
        margin: 0;
      }
      .tab-wrapper {
        .activity-info {
          display: flex;
          .activity-img-wrapper {
            flex: 1;
            padding: 0 75px;
          }
          .activity-content {
            flex: 2;
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
      }
    }
  }
  .model-wrapper {
    height: 400px;
    width: 400px;
    background: #fff;
  }
}
</style>
