const debug = require("debug")("fablab:schema");
const sequelize = require("./connection");
const bcrypt = require('bcryptjs');
const {
  Equipment,
  Invoice,
  Use,
  User,
  Role,
} = require("./schema");

(async () => {
  debug("Recreating tables...");
  await sequelize.sync({ force: true });

  debug("Importing samples...");
  const imprimante = await Equipment.create({
    name: "Imprimante 3D HD",
    price: 0.3
  });

  const fraiseuse = await Equipment.create({
    name: "Fraiseuse numérique",
    price: 0.58
  });
  const machine = await Equipment.create({
    name: "Machine à coudre et à broder",
    price: 0.2
  });
  const machine_a_bois = await Equipment.create({
    name: "Machine à bois",
    price: 0.59
  });
  const decoupeuse_vinyle = await Equipment.create({
    name: "Découpeuse vinyle",
    price: 0.80
  });
  const decoupeuse_laser = await Equipment.create({
    name: "Découpeuse laser",
    price: 1
  });

  const presse = await Equipment.create({
    name: "Presse à chaud",
    price: 0.68
  });

  const admin = await Role.create ({
    role : "Admin"
  })
  const member = await Role.create ({
    role : "Member"
  })
  const accountant = await Role.create ({
    role : "Accountant"
  })

  const superUserAccount = await User.create ({
    first_name : "SuperUser",
    last_name: "Fablab",
    email: "super_user@fablab.com",
    password: bcrypt.hashSync("password",8)
  })
  const memberAccount = await User.create ({
    first_name : "Member",
    last_name: "Fablab",
    email: "member@fablab.com",
    password:bcrypt.hashSync("password",8)
  })

  const accountantAccount = await User.create ({
    first_name : "Accountant",
    last_name: "Fablab",
    email: "accountant@fablab.com",
    password:bcrypt.hashSync("password",8)
  })
  const adminAccount = await User.create ({
    first_name : "Admin",
    last_name: "Fablab",
    email: "admin@fablab.com",
    password:bcrypt.hashSync("password",8)
  })
  await superUserAccount.setRoles([1])
  await superUserAccount.addRoles([3])
  await adminAccount.setRoles([1])
  await accountantAccount.setRoles([3])
  await memberAccount.setRoles([2])


  debug("Samples imported.");

  await sequelize.close();
})();
