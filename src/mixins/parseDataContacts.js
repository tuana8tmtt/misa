import zaloIcon from "@/assets/imgs/icons/zalo-phone-icon.svg"
import skypeIcon from "@/assets/imgs/icons/skype-phone-icon.svg"
import viberIcon from "@/assets/imgs/icons/viber-phone-icon.svg"
import wechatIcon from "@/assets/imgs/icons/wechat-phone-icon.svg"
import whatsappIcon from "@/assets/imgs/icons/whatsapp-phone-icon.svg"
import phoneIcon from "@/assets/imgs/icons/phone-icon.svg"
export default {
  methods: {
    getPhoneTypeIcon(phoneType) {
      const phoneTypeCt = String(phoneType).toLowerCase()
      switch (phoneTypeCt) {
        case "zalo":
          return zaloIcon
        case "skype":
          return skypeIcon
        case "viber":
          return viberIcon
        case "whatsapp":
          return whatsappIcon
        case "wechat":
          return wechatIcon

        default:
          return phoneIcon
      }
    },
  },
}
