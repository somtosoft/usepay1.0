import Wallet from '#models/wallet'
import AuthService from '#services/auth_service'
import UssdService from '#services/ussd_service'
import WalletService from '#services/wallet_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UssdsController {
  async index({ request, response }: HttpContext) {
    let { sessionId, serviceCode, phoneNumber, text } = request.body()
    response.header('Content-Type', 'text/plain')
    if (!text) {
      return new UssdService().startMenu({ sessionId, serviceCode, phoneNumber, text })
    }
    if (text.startsWith('1')) {
      return  new WalletService().transferFunds({ sessionId, serviceCode, phoneNumber, text })
    }
    if (text.startsWith('2')) {
      return new WalletService().getWalletBalance({ sessionId, serviceCode, phoneNumber, text })
    }
    if (text.startsWith('3')) {
      return new AuthService().registerUser({
        sessionId,
        serviceCode,
        phoneNumber,
        text,
      })
    }
  }
}
