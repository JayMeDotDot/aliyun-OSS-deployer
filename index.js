const core = require('@actions/core')
const github = require('@actions/github')

try {
  const accessKeyId = core.getInput('access-key-id')
  const accessKeySecret = core.getInput('access-key-secret')
  const stsToken = core.getInput('sts-token')
  const bucket = core.getInput('bucket')
  const endpoint = core.getInput('endpoint')
  const region = core.getInput('region')
  const internal = core.getBooleanInput('internal')
  const cname = core.getBooleanInput('cname')
  const isRequestPay = core.getBooleanInput('is-request-pay')
  const secure = core.getBooleanInput('secure')
  const timeout = core.getInput('timeout')

  console.log(accessKeyId)
  console.log(accessKeySecret)
  console.log(stsToken)
  console.log(bucket)
  console.log(endpoint)
  console.log(region)
  console.log(internal)
  console.log(cname)
  console.log(isRequestPay)
  console.log(secure)
  console.log(timeout)

} catch (err) {
  core.setFailed(err.message)
}
