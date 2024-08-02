export const supressError = console.error

type RequestError = {
  code: number
  desc?: string
  msg?: string
  data?: Record<string, any>
}

export const getErrorMsg = (error, defaultError = '操作异常') => {
  return error?.message || error?.desc || defaultError || error?.toString?.()
}

export const dataWrapper = (p: Promise<any>): Promise<any> => {
  return new Promise((resolve, reject) => {
    p.then((result) => {
      if (result?.status !== 200) return reject('不是200')
      resolve(result.data.data)
    }).catch((error) => reject(error))
  })
}
