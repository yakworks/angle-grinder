import _ from 'lodash'
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
  return _.cloneDeep(appConfig)
}

export const setConfig = (newConfig) => {
  console.log('set config', newConfig)
  _.merge(appConfig, newConfig)
}
