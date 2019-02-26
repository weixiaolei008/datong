// 导入所有接口
import apiList from './getData'

const install = Vue => {
  if (install.installed)
    return;
  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList
      }
    }
  })
}

export default install
