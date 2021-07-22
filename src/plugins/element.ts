import { App } from 'vue'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElInput,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElPopover,
  ElSelect,
  ElOption
} from 'element-plus'
import '../element-variables.scss'

export default (app: App) => {
  app.use(ElButton)
  app.use(ElTabs)
  app.use(ElTabPane)
  app.use(ElInput)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElPopover)
  app.use(ElSelect)
  app.use(ElOption)
}
