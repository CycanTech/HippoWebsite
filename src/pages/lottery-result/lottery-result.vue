<template>
  <div class="lottery-result-wrapper">
    <img class="banner" src="./banner.png" />
    <img class="mobile-banner" src="./mobile-banner.png" />
    <div class="lottery-result">
      <h1>{{ t('message.lotteryResult.title') }}</h1>
      <div class="lottery-info">
        <div class="cells">
          <div class="cell">
            <span class="label"> {{ t('message.lotteryResult.lotteryPeriod') }}</span>
            <span class="value"> </span>
          </div>
          <div class="cell">
            <span class="label"> {{ t('message.lotteryResult.lotteryTime') }}</span>
            <span class="value"></span>
          </div>
          <div class="cell">
            <span class="label"> {{ t('message.lotteryResult.lotteryBlock') }}</span>
            <span class="value"></span>
          </div>
        </div>
        <div class="check-winning-results">
          <el-button type="primary" size="medium" round @click="handleShowAirdropModel">
            {{ t('message.lotteryResult.checkWinningResults') }}
          </el-button>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first" />
        <el-tab-pane label="配置管理" name="second" />
        <el-tab-pane label="角色管理" name="third" />
        <el-tab-pane label="定时任务补偿" name="fourth" />
      </el-tabs>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
      </div>
    </div>
  </div>
  <check-model ref="checkModel" />
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import CheckModel from './check-model/check-model.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default {
  components: {
    CheckModel
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    console.log(route.query.lotteryPeriod)

    const checkModel = ref<{
      checkWhitelistAddress: Ref<string>
      changeModelDisplay: () => void
    }>()
    const activeName = ref('first')

    const handleShowAirdropModel = () => {
      checkModel.value?.changeModelDisplay()
    }

    return {
      activeName,
      checkModel,

      handleShowAirdropModel,
      t,

      tableData: []
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variable.scss';
@import '../../scss/mixin.scss';
.lottery-result-wrapper {
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
  @include mobile {
    .banner {
      display: none;
    }
    .mobile-banner {
      display: block;
    }
  }
  .lottery-result {
    max-width: 1024px;
    margin: 0 auto;
    overflow-x: hidden;
    h1 {
      text-align: center;
      padding-top: 80px;
      padding-bottom: 55px;
    }
    .lottery-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 50px;
      .cells {
        font-size: 20px;
        .cell {
          line-height: 30px;
          .label {
            font-weight: 600;
          }
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      padding: 70px 0;
    }
  }
}
</style>
