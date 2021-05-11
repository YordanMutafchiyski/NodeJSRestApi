const validateRole = (allowedRoles) => {
  return (req, res, next) => {
    let roles =
      req.user[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    let areRolesAllowed = roles.some((r) => {
      return allowedRoles.some((ar) => ar == r);
    });
    if (!areRolesAllowed) {
      return res
        .status(405)
        .send('Only admins can create, delete or update categories!');
    }
    next();
  };
};

module.exports = validateRole;
