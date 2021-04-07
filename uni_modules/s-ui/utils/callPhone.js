/**
 * @name: 拨打电话
 * @param {String} phoneNumber
 * @return {void}
 */
export default function callPhone (phoneNumber) {
  uni.makePhoneCall({
    phoneNumber: String(phoneNumber),
    success () { },
    fail () { }
  });
}
