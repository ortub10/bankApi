import express from "express";
import {
  getUser,
  getUsers,
  addUser,
  addAccount,
  depositing,
  updateCredit,
} from "./users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/users", (req, res) => {
  res.send(getUsers());
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(getUser(id));
});

app.post("/users", (req, res) => {
  let { userId, cash, credit } = req.body;
  if (cash === undefined) cash = 0;
  if (credit === undefined) credit = 0;
  const add = addUser({ userId, cash, credit });
  if (add === "adding") {
    res.send(getUsers());
  } else {
    res.send(add);
  }
});

app.put("/users/add-account/:id", (req, res) => {
  const id = req.params.id;
  const add = addAccount(id);
  if (add === "adding") {
    res.send(getUsers());
  } else {
    res.send(add);
  }
});

app.put("/users/cash/:id", (req, res) => {
  const id = req.params.id;
  const { numberToAdd, accountNunmer } = req.body;

  const deposit = depositing(id, numberToAdd, accountNunmer);
  if (deposit === "deposited") {
    res.send(getUsers());
  } else {
    res.send(deposit);
  }
});

app.put("/users/credit/:id", (req, res) => {
  const id = req.params.id;
  const { numberToAdd, accountNunmer } = req.body;

  const update = updateCredit(id, numberToAdd, accountNunmer);
  if (update === "updated") {
    res.send(getUsers());
  } else {
    res.send(update);
  }
});

app.listen(5000, () => {
  console.log(`listen to pore ${PORT}`);
});
