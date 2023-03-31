function mapUser(arr) {
  const newUser = arr.map((user) => {
    const newUser = {
      _id: user._id,
      dni: user.dni,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    return newUser;
  });
  return newUser;
}

module.exports = mapUser;
