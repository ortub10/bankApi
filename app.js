import express from "express";
import dotenv from "dotenv";
import {
  getUser,
  getUsers,
  addUser,
  addAccount,
  depositing,
  updateCredit,
  cashWithdrawal,
  transferring,
} from "./users.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

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
  let { userId, cash, credit } = req.query;
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

app.put("/users/cash/:id/:accountNunmer", (req, res) => {
  const { id, accountNunmer } = req.params;
  let { numberToAdd } = req.query;
  if (numberToAdd === null) numberToAdd = 0;

  const deposit = depositing(id, +numberToAdd, accountNunmer);
  if (deposit === "deposited") {
    res.send(getUsers());
  } else {
    res.send(deposit);
  }
});

app.put("/users/credit/:id/:accountNunmer", (req, res) => {
  const { id, accountNunmer } = req.params;
  const { numberToAdd } = req.query;
  if (numberToAdd === null) numberToAdd = 0;

  const update = updateCredit(id, +numberToAdd, accountNunmer);
  if (update === "updated") {
    res.send(getUsers());
  } else {
    res.send(update);
  }
});

app.put("/users/withdrawal/:id/:accountNunmer", (req, res) => {
  const { id, accountNunmer } = req.params;
  const { cashToGet } = req.query;
  const withdrawal = cashWithdrawal(id, +cashToGet, accountNunmer);
  if (withdrawal === "withdrawaled") {
    res.send(getUsers());
  } else {
    res.send(withdrawal);
  }
});

app.put(
  "/users/transference/:idSend/:accountNunmerSend/:idGet/:accountNunmerGet",
  (req, res) => {
    const { idSend, accountNunmerSend, idGet, accountNunmerGet } = req.params;
    const { cashTotransfer } = req.query;
    const transfer = transferring(
      idSend,
      accountNunmerSend,
      idGet,
      accountNunmerGet,
      +cashTotransfer
    );
    if (transfer === "transfered") {
      res.send(getUsers());
    } else {
      res.send(transfer);
    }
  }
);

app.listen(PORT, () => {
  console.log(`listen to pore ${PORT}`);
});
