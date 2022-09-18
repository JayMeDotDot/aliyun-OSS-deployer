import * as core from '@actions/core'
import OSS from 'ali-oss'
import path from 'path'
import fs from 'node:fs/promises'

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

  async function collectFilePath(dir, arr=[]) {
    const files = await fs.readdir(dir)
    console.log('files')
    console.log(files)
    for (const file of files) {
      const currentPath = path.join(dir, file)
      const stat = await fs.stat(currentPath)
      if (stat.isFile()) arr.push(currentPath)
      if (stat.isDirectory()) arr.push(...await collectFilePath(currentPath))
    }
    return arr
  }

  async function put(remotePath, localPath) {
    try {
      await client.put( remotePath, localPath )
    } catch (e) {
      console.warn(e)
    }
  }

  const __dirname = process.env['GITHUB_WORKSPACE']
  const basePath = path.normalize(__dirname)

  const needToUploadPath = await collectFilePath(basePath)

  for (const localPath of needToUploadPath) {
    const remotePath = path.normalize(localPath.replace('dist', '.'))
    console.log(remotePath)
    console.log(localPath)
    put(remotePath, localPath)
  }

} catch (err) {
  core.setFailed(err.message)
}
