module.exports = class ApplicationPolicy {
  constructor(user, record, collaborator) {
    this.user = user;
    this.record = record;
    this.collaborator = collaborator;
  }

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this.new() &&  this.record && (this._isOwner() || this._isPremium());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}