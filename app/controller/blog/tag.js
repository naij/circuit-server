'use strict'

exports.list = function*() {
  let tags = yield this.service.blog.tag.list()
  return this.renderJSON({
    code: 200,
    data: tags
  })
}