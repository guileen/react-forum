import config from '../../config'

export const getResourceURL = (fileInfo) => {
  if (!fileInfo) return
  const bucket = config.qiniu.buckets[fileInfo.bucket]
  if (!bucket || !bucket.host) return
  return bucket.host + '/' + fileInfo.key
}
