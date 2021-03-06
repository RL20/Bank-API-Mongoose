const express = require("express");
const router = new express.Router();
const { getUsers, getUser, addUser, updateUser, removeUser, deposit, updateCredit, withdraw, transfer } = require("../controllers/userControllers");

router.get("/users", getUsers);
router.put("/users/transfer", transfer);
router.get("/users/:id/", getUser);
router.post("/users", addUser);
router.put("/users/:id/", updateUser);
router.put("/users/deposit/:id", deposit);
router.put("/users/credit/:id", updateCredit);
router.put("/users/withdraw/:id", withdraw);
// router.put("/users/transfer/:id/", transfer);
router.delete("/users/:id/", removeUser);
// patch
module.exports = router;
