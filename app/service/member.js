'use strict'

let _ = require('lodash')

module.exports = app => {
  class Member extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * userInfo(nickname) {
      let user = yield this.app.models.User.find({
        where: {
          nickname: nickname
        }
      })

      return user
    }
  }

  return Member
}