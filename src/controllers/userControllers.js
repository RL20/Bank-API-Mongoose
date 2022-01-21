const User = require("../models/user");

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
  }
};

//get user by id
const getUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    console.log("user", user);
    if (!user) {
      console.log("userinside", user);
      res.status(404).send(`User ${_id}  not found`);
      // throw Error({ status: 404, message: `User ${req.params.id} not found` });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
  }
};

//add user
const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

//update user
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "cash", "credit"];
  const isValidOperation = updates.every((usr) => {
    return allowUpdates.includes(usr);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      return res.status(404).send({ error: `no such ${req.params.id} to update` });
    }
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

//Remove user
const removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).send({ error: `User ${req.params.id}  not found` });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

//? actions function---------------------------------------------------------------
const deposit = async (req, res) => {
  try {
    const user = getUser(req.params.id);
    const amount = req.body.amount;
    user.cash = user.cash + amount;
    updateUser(req.params.id);
    res.status(202);
  } catch (e) {
    res.status(400).send({ message: "Bad Request" });
  }
};

// const updateCredit = (id, newCredit) => {
//   if (newCredit > 0) {
//     const user = getUser(id);
//     user.credit = newCredit;
//     return updateUser(id, user);
//   } else throw Error("Credit can not be negetive");
// };
// const updateCredit = async (req, res) => {
//   const user = getUser(req.params.id);
//   const credit = req.body.credit;
//   updateUser(id, user);
// };

// const withdraw = (id, amount) => {
//   const user = getUser(id);
//   const withdrawMax = user.cash + user.credit;
//   if (amount <= withdrawMax) {
//     user.cash = user.cash - amount;
//     if (user.cash < 0) user.credit = user.credit + user.cash;
//     return updateUser(id, user);
//   } else throw Error(`the maximun amount you can withdraw is ${withdrawMax}`);
// };

// const transfer = (depositorId, beneficiaryId, amount) => {
//   const user = getUser(depositorId);
//   const withdrawMax = user.cash + user.credit;
//   const depositorCashBefore = user.cash;
//   const depositorCreditBefore = user.credit;
//   if (!withdraw(depositorId, amount)) {
//     throw Error(`the maximun amount you can transfer is ${withdrawMax}`);
//   }

//   try {
//     deposit(beneficiaryId, amount);
//   } catch (e) {
//     //roll back
//     console.log(`enter deposit`);
//     user.cash = depositorCashBefore;
//     user.credit = depositorCreditBefore;
//     updateUser(depositorId, user);
//     throw Error(`we are sorry,the action was failed please try again later`);
//   }
//   return `transfer ${amount} to ${getUser(beneficiaryId).name} complited successfully`;
// };

// module.exports = {
//   getUsers,
//   getUser,
//   addUser,
//   updateUser,
//   removeUser,
//   deposit,
//   updateCredit,
//   withdraw,
//   transfer,
// };
module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  deposit,
};
