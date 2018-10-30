function AuthController() {
  let roles;
  function setRoles(role) {
    roles = role;
  }
  function isAuthorized(neededRole) {
    return roles.indexOf(neededRole) >= 0;
  }

  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(() => { cb(roles.indexOf(neededRole) >= 0); }, 0);
  }

  function isAuthorizedPromise(neededRole, cb) {
    return new Promise(function (resolve) {
      setTimeout(() => { resolve(roles.indexOf(neededRole) >= 0); }, 0);
    });
  }
  return {
    isAuthorized, isAuthorizedAsync, isAuthorizedPromise, setRoles
  };
}

module.exports = AuthController();
