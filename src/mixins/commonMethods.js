export default {
  methods: {
    coppyText(_text, fncAfterDone = () => {}) {
      // this.showChatNotif('Tin nhắn đã được sao chép vào bộ nhớ tạm !');
      let copyText = document.createElement("textarea")
      document.querySelector("body").appendChild(copyText)
      copyText.value = _text
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy")
      copyText.remove()
      fncAfterDone()
    },
    parseGender(_genderStr) {
      switch (_genderStr) {
        case "male":
          return "Mr"
        case "female":
          return "Mrs"
        default:
          return _genderStr
      }
    },

    returnTextOnly(_rawhtml) {
      let txt = _rawhtml
      return txt
        .replace(/<style[^>]*>.*<\/style>/gm, " ")
        .replace(/<script[^>]*>.*<\/script>/gm, " ")
        .replace(/<[^>]+>/gm, " ")
        .replace(/([\r\n]+ +)+/gm, " ")
        .replace(/\s+/g, " ")
        .trim()
    },
  },
}
