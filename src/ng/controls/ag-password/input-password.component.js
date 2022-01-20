import InputBase from '../AgBaseControl'
import stringUtils from '@yakit/core/stringFormUtils'

// WIP not finished yet!
export default class InputPasswordComponent extends InputBase {
  score
  passwordStrengthMessage
  passwordStrengthClass = 'red'

  $onInit() {
    super.onInit()
    this.validate()
  }

  onChange() {
    super.onChange()
    this.validate()
  }

  validate() {
    if (super.validate() && this.value) {
      this.score = stringUtils.checkPassword(this.value)
      this.passwordStrengthMessage = stringUtils.getPasswordScoreText(this.score)
      this.passwordStrengthClass = stringUtils.getPasswordStrengthClass(this.score)
    }
  }
}
