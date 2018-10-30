function AuthController() {
  let roles;
  let user;
  function setRoles(role) {
    roles = role;
  }
  function setUser(inUser) {
    user = inUser;
  }
  function isAuthorized(neededRole) {
    if (user) {
      // return roles.indexOf(neededRole) >= 0;
      return user.isAuthorized(neededRole);
    }
  }

  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(() => { cb(roles.indexOf(neededRole) >= 0); }, 0);
  }

  function isAuthorizedPromise(neededRole, cb) {
    return new Promise(function (resolve) {
      setTimeout(() => { resolve(roles.indexOf(neededRole) >= 0); }, 0);
    });
  }

  function getIndex(req, res) {
    try {
      if (req.user.isAuthorized('admin')) {
        return res.render('index');
      }
      return res.render('notAuth');
    } catch (error) {
      res.render(error);
    }
  }

  return {
    isAuthorized, isAuthorizedAsync, isAuthorizedPromise, setUser, setRoles, getIndex
  };
}

module.exports = AuthController();
