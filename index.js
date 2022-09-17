const core = require('@actions/core')
const OSS = require('ali-oss')
const path = require('path')

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

  const client = new OSS({
    accessKeyId,
    accessKeySecret,
    stsToken,
    bucket,
    endpoint,
    region,
    internal,
    cname,
    isRequestPay,
    secure,
    timeout,
  })

  async function put() {
    try {
      // const result = await client.put(
      //   'dist/.',
      // )
      const result = await client.list()
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  put()

} catch (err) {
  core.setFailed(err.message)
}
