function mapUser(arr) {
  const newUser = arr.map((user) => {
    const newUser = {
      _id: user._id,
      dni: user.dni,
      name: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      operator: user.operator,
    };
    return newUser;
  });
  return newUser;
}

module.exports = mapUser;
