//Show details of all users
router.get("/users", (req, res) => {
  try {
    res.status(200).send(JSON.stringify(getUsers()));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//Show details of user
router.get("/users/:id/", (req, res) => {
  try {
    const id = +req.params.id; // + converts string to number
    res.status(200).send(getUser(id));
    // res.status(200).send(JSON.stringify(getUser(id)));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//Add user
router.post("/users", (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Update user
router.put("/users/:id/", (req, res) => {
  const id = +req.params.id; // + converts string to number
  const updatedUser = req.body;
  try {
    res.send(updateUser(id, updatedUser));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Deposit money to user
router.put("/users/:id/deposit", (req, res) => {
  //! from postman pass {"amount":number} in the body (JSON)
  const id = +req.params.id; // + converts string to number
  const amount = req.body.amount;
  try {
    res.send(deposit(id, amount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//Update user credit
router.put("/users/:id/credit", (req, res) => {
  //! from postman pass {"credit":number} in the body (JSON)
  const id = +req.params.id; // + converts string to number
  const credit = req.body.credit;
  try {
    res.send(updateCredit(id, credit));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Withdraw money
router.put("/users/:id/withdraw", (req, res) => {
  //! from postman pass {"amount":number} in the body (JSON)
  const id = +req.params.id; // + converts string to number
  const amount = req.body.amount;
  try {
    res.send(withdraw(id, amount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Transferring
router.put("/users/:id/transfer", (req, res) => {
  //! from postman pass {"amount":number,"id":number} in the body (JSON)
  const depositorId = +req.params.id; // + converts string to number
  const amount = req.body.amount;
  const beneficiaryId = req.body.id;
  try {
    res.send(transfer(depositorId, beneficiaryId, amount));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
//Delete user
router.delete("/users/:id/", (req, res) => {
  const id = +req.params.id;
  res.send(removeUser(id));
});
