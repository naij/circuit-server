let BaseWorker = require('./worker/base_worker')
let GitWorker = require('./worker/git_worker')

class BuildDaily extends BaseWorker {
  constructor(options) {
    super(options)

    this.gitWorker = new GitWorker(options)
    this.cdnWorker = new CDNWorker(options)
  }

  * run() {

    // 检查master是否有更新
    if (!(yield this.gitWorker.isMasterLasted())) {
      this.clean_dir('error')
    }

    // 检查是否存在对应的正式版本号
    if (!(yield this.gitWorker.isPublishTagExist())) {
      this.clean_dir('error')
    }

    // clone代码

  }
}

module.exports = BuildDaily