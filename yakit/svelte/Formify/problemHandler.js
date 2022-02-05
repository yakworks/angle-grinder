
import { isEmpty } from "@yakit/core/dash"
import growl from "@yakit/ui/growl"

/**
 * generic handler to show errors in growl for now
 * FIXME this is tempory and we need a cleaner way to deal with them but this at least shows the problem
 */
export async function handleError(er) {
  let errMsg = er
  if(er.response){
    errMsg = await problemErrorFromResponse(er)
    console.log("handleError",errMsg)
  }
  growl.error(errMsg.message, errMsg.name)
}

export async function problemErrorFromResponse(er) {
  let problem = await er.response.json()
  let messages = []
  console.log("handleError", problem)
  if(!isEmpty(problem.errors)){
    messages = problem.errors.map(er => er.message)
  } else if(problem.detail) {
    messages.push(problem.detail)
  }
  console.log("messages", messages)
  return {
    name: problem.title,
    message: messages.join('/n')
  }
}
