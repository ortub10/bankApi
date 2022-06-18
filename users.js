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
  return "User id not exist";
};

export const addUser = (newUser) => {
  const users = getUsers();
  const user = findUser(newUser.userId);
  if (user === undefined) {
    const newUserObj = {
      userId: +newUser.userId,
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
  return "User id not exist";
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
      return "Accounrt number not exist";
    }
  }

  return "User id not exist";
};

export const updateCredit = (id, number, accountNunmer) => {
  if (number < 0) return "your updted is negative number";

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
      return "Accounrt number not exist";
    }
  }

  return "User id not exist";
};

export const cashWithdrawal = (id, cashToGet, accountNunmer) => {
  if (cashToGet < 0) return "your cash withdrawal is negative number";

  const users = getUsers();
  const user = findUser(id);
  const userIndex = users.findIndex((user) => user.userId == id);

  if (user !== undefined) {
    const accountIndex = user.acocunts.findIndex(
      (account) => account.number_account === accountNunmer
    );
    const account = user.acocunts[accountIndex];
    if (account !== undefined) {
      if (cashToGet < account.cash + account.credit) {
        const udtadeAccount = { ...account, cash: account.cash - cashToGet };
        user.acocunts[accountIndex] = udtadeAccount;
        users[userIndex] = user;
        fs.writeFileSync("users.json", JSON.stringify(users));
        return "withdrawaled";
      } else {
        return "The balance does not allow withdrawal";
      }
    } else {
      return "Accounrt number not exist";
    }
  }

  return "User id not exist";
};

export const transferring = (
  idSend,
  accountNunmerSend,
  idGet,
  accountNunmerGet,
  cashTotransfer
) => {
  if (cashTotransfer < 0) return "your transference is negative number";

  const users = getUsers();
  const userSendIndex = users.findIndex((user) => user.userId == idSend);
  const userGetIndex = users.findIndex((user) => user.userId == idGet);
  const userSend = users[userSendIndex];
  const userGet = users[userGetIndex];

  if (userSend !== undefined && userGet !== undefined) {
    const accountIndexSend = userSend.acocunts.findIndex(
      (account) => account.number_account === accountNunmerSend
    );

    const accountIndexGet = userGet.acocunts.findIndex(
      (account) => account.number_account === accountNunmerGet
    );

    const accountSend = userSend.acocunts[accountIndexSend];
    const accountGet = userGet.acocunts[accountIndexGet];

    if (accountSend !== undefined && accountGet !== undefined) {
      if (accountGet === accountSend) {
        return "Same account";
      }

      if (cashTotransfer < accountSend.cash + accountSend.credit) {
        const udtadeAccountSend = {
          ...accountSend,
          cash: accountSend.cash - cashTotransfer,
        };
        userSend.acocunts[accountIndexSend] = udtadeAccountSend;
        users[userSendIndex] = userSend;

        console.log();
        const udtadeAccountGet = {
          ...accountGet,
          cash: accountGet.cash + cashTotransfer,
        };
        userGet.acocunts[accountIndexGet] = udtadeAccountGet;
        users[userGetIndex] = userGet;

        fs.writeFileSync("users.json", JSON.stringify(users));

        return "transfered";
      } else {
        return "The balance does not allow transference";
      }
    } else {
      return "one of accounrt numbers not exist";
    }
  }

  return "one of user ids not exist";
};
