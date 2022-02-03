
import growl from "@yakit/ui/growl"

/**
 * generic handler to show errors in growl for now
 * FIXME this is tempory and we need a cleaner way to deal with them but this at least shows the problem
 */
export async function handleError(er) {
  let problem = await er.response.json()
  let messages = []
  if(problem.errors){
    messages = problem.errors.map(er => er.message)
  } else if(problem.detail) {
    messages.push(problem.detail)
  }
  growl.error(messages.join('/n'), problem.title)
}
