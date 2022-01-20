import {cloneDeep, merge} from '@yakit/core/dash'

const appConfig = {
  controls: {
    ranges: {
      fromField: {
        name: 'from',
        placeholder: 'from',
        step: 0.01
      },
      toField: {
        name: 'to',
        placeholder: 'to',
        step: 0.01
      }
    }
  }
}

export const getConfig = () => {
  return cloneDeep(appConfig)
}

export const setConfig = (newConfig) => {
  console.log('set config', newConfig)
  merge(appConfig, newConfig)
}
