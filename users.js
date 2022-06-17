import fs from "fs";

const findUser = (id) => {
  const users = getUsers();
  const user = users.find((userElement) => userElement.userId == id);
  return user;
};

export const getUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const data = JSON.parse(dataBuffer);
    return data;
  } catch (e) {
    return [];
  }
};

export const getUser = (id) => {
  const user = findUser(id);
  if (user !== undefined) return user;
  return "user id not exist";
};

export const addUser = (newUser) => {
  const users = getUsers();
  if (newUser.userId === undefined) return "User id missing";
  const user = findUser(newUser.userId);
  if (user === undefined) {
    const newUserObj = {
      userId: newUser.userId,
      acocunts: {
        number_account: `${newUser.userId}-1`,
        cash: newUser.cash,
        credit: newUser.credit,
      },
    };
    users.push(newUserObj);
    fs.writeFileSync("users.json", JSON.stringify(users));
    return "adding";
  }
  return "User id already exist ";
};

export const addAccount = (id) => {
  const users = getUsers();
  const userIndex = users.findIndex((userElement) => userElement.userId == id);
  const user = users[userIndex];
  if (user !== undefined) {
    const newAcount = {
      number_account: `${id}-${user.acocunts.length + 1}`,
      cash: 0,
      credit: 0,
    };
    users[userIndex] = { ...user, acocunts: [...user.acocunts, newAcount] };
    fs.writeFileSync("users.json", JSON.stringify(users));
    return "adding";
  }
  return "user id not exist";
};

export const depositing = (id, number, accountNunmer) => {
  if (number < 0) return "your deposited is negative number";

  const users = getUsers();
  const user = findUser(id);
  const userIndex = users.findIndex((user) => user.userId == id);

  if (user !== undefined) {
    const accountIndex = user.acocunts.findIndex(
      (account) => account.number_account === accountNunmer
    );
    const account = user.acocunts[accountIndex];
    if (account !== undefined) {
      const udtadeAccount = { ...account, cash: account.cash + number };
      user.acocunts[accountIndex] = udtadeAccount;
      users[userIndex] = user;
      fs.writeFileSync("users.json", JSON.stringify(users));
      return "deposited";
    } else {
      return "accounrt number not exist";
    }
  }

  return "user id not exist";
};

export const updateCredit = (id, number, accountNunmer) => {
  if (number < 0) return "your uddted is negative number";

  const users = getUsers();
  const user = findUser(id);
  const userIndex = users.findIndex((user) => user.userId == id);

  if (user !== undefined) {
    const accountIndex = user.acocunts.findIndex(
      (account) => account.number_account === accountNunmer
    );
    const account = user.acocunts[accountIndex];
    if (account !== undefined) {
      const udtadeAccount = { ...account, credit: number };
      user.acocunts[accountIndex] = udtadeAccount;
      users[userIndex] = user;
      fs.writeFileSync("users.json", JSON.stringify(users));
      return "updated";
    } else {
      return "accounrt number not exist";
    }
  }

  return "user id not exist";
};
