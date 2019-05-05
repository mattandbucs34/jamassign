const ApplicationPolicy =  require("./application");
module.exports = class UserPolicy extends ApplicationPolicy {
  
  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}