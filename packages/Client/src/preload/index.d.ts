// import { ElectronAPI } from '@electron-toolkit/preload'
export interface IElectronAPI {
  closeWindow: () => void
  openHomeWindow: () => void
}
declare global {
  interface Window {
    // electron: ElectronAPI
    api: IElectronAPI
  }
}
