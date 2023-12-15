export const supressError = console.error

type RequestError = {
  code: number
  desc?: string
  msg?: string
  data?: Record<string, any>
}

export const getErrorMsg = (error, defaultError?: string) => {
  return error.msg || error.desc || defaultError || error?.toString?.()
}

export const dataWrapper = (p: Promise<any>): Promise<any> => {
  return new Promise((resolve, reject) => {
    p.then((result) => resolve(result.data)).catch((error) => reject(error))
  })
}
