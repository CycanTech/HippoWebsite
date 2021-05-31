import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import installI18n from './plugins/i18n'
import installRouter from './plugins/router'

import './scss/index.scss'

const app = createApp(App)

installElementPlus(app)
installI18n(app)
installRouter(app)

app.mount('#app')
