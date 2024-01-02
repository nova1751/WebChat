import { defineStore } from 'pinia'
export const useSettingStore = defineStore(
  'setting',
  () => {
    const setting = ref({ server: '', proxy: '' })
    const updateSetting = (settingInfo) => {
      setting.value = settingInfo
    }
    return {
      setting,
      updateSetting
    }
  },
  {
    persist: true
  }
)
