const { number } = require("yargs");
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
      return res.status(404).send(`User ${_id}  not found`);
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
  //postman test--> {"amount": 200}
  const { amount } = req.body;
  const id = req.params.id;
  //!check if amount is number ,if not error
  try {
    const updateUser = await User.findById(id);
    updateUser.cash += amount;
    const user = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: `no such ${id} to update` });
    }
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};
const updateCredit = async (req, res) => {
  //postman test--> {"amount": 200}
  const { amount } = req.body;
  const id = req.params.id;
  //!check if amount is number ,if not error
  try {
    const updateUser = await User.findById(id);
    updateUser.credit += amount;
    const user = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: `no such ${id} to update` });
    }
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;
  try {
    const userWithdraw = await User.findOne({ id });
    if (!userWithdraw) {
      return res.status(404).send({ error: `User ${id} not found..` });
    }
    const withdrawMax = userWithdraw.cash + userWithdraw.credit;
    if (amount > withdrawMax) {
      return res.status(400).send({ message: `the maximun amount you can withdraw is ${withdrawMax}` });
    }
    userWithdraw.cash -= amount;
    if (userWithdraw.cash < 0) userWithdraw.credit += userWithdraw.cash;

    const user = await User.findByIdAndUpdate(id, userWithdraw, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

const transfer = async (req, res) => {
  const { amount, user1, user2 } = req.body;
  try {
    const depositor = await User.findById(user1);
    const beneficiary = await User.findById(user2);

    if (!depositor || !beneficiary) {
      return res.status(404).send({ error: `User not found` });
    }
    const withdrawMax = beneficiary.cash + beneficiary.credit;
    if (amount > withdrawMax) {
      return res.status(400).send({ message: `the maximun amount you can withdraw is ${withdrawMax}` });
    }
    depositor.cash -= amount;
    if (depositor.cash < 0) depositor.credit += depositor.cash; //minus in the account reduces the credit sice the customer use some amount from the credit
    beneficiary.cash += amount; //update the beneficiary account
    await depositor.save();
    await beneficiary.save();
    res.status(200).send(`transfer ${amount} to ${beneficiary.name} complited successfully`);
  } catch (e) {
    res.status(500).send(e.message);
  }
  //roll back
  //   throw Error(`we are sorry,the action was failed please try again later`);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  deposit,
  updateCredit,
  withdraw,
  transfer,
};
