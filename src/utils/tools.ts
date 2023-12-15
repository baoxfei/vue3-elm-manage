import { AES } from 'crypto-js'
import GLOBAL from '@/utils/global'
class QTool {
  static encrypt(data) {
    return AES.encrypt(data, GLOBAL.secret).toString()
  }
}

export default QTool
