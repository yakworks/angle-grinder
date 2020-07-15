import _ from 'lodash'
import toast from 'angle-grinder/src/tools/toast'

// Service for updating grid rows
// result should contain two arrays:
//   result.data - data for successfully updated rows
//   result.errors - assoc array for errors (id => errors)
export function massUpdateHandler(grid, result) {
  let error, message

  // handle updated fields
  if (!_.isNil(result.data)) {
    for (const row of Array.from(result.data)) { grid.updateRow(row.id, row, false) }
  } else {
    console.log('[forms] Invalid JSON response, missing data array')
  }

  // handle fields with errors
  if (!_.isNil(result.errors)) {
    for (const id in result.errors) {
      error = result.errors[id]
      grid.flashOnError(id)
    }
    // make sure errors is an array instance
    if (result.errors instanceof Array) {
      if (result.errors.length === 0) {
        toast.info('Mass update completed successfully')
        return
      }
      for (error of Array.from(result.errors)) {
        message = ': '
        for (const errorKey in error.errors) {
        // get failed instance (should be object)
          const errorValue = error.errors[errorKey]
          if (typeof errorValue === 'object') {
            for (const msgKey in errorValue) {
            // error messages are strings
              const msgValue = errorValue[msgKey]
              if (typeof msgValue === 'string') {
              // build message
                const separator = message.length > 2 ? '\n' : ''
                message = `${message}${separator}${msgValue}`
              }
            }
          }
        }
        toast.error(message)
      }
    }
  } else {
    // $log.warn('[forms] Invalid JSON response, missing errors assoc array')
    toast.info('Mass update completed successfully')
  }

  if (result.message) {
    return toast.error(result.message)
  }
}
