import faker from 'faker';
import { getCollection, COLLECTION_ACCOUNTS } from 'database/Mongo';

export default {
  list: async (req, res) => {
    try {
      const fields = {
        name: true,
        username: true,
        email: true,
      };
      const collection = await getCollection(COLLECTION_ACCOUNTS);
      const data = await collection.find({}).project(fields).toArray();
      res.json({ message: 'Accounts found', data });
    } catch (e) {
      res.json({ message: "Something's wrong", error: e });
    }
  },
  create: async (req, res) => {
    try {
      const account = faker.helpers.createCard();
      const collection = await getCollection(COLLECTION_ACCOUNTS);
      const result = await collection.insertOne(account);
      const data = result.ops[0];
      res.json({ message: 'Account Created', data });
    } catch (e) {
      res.json({ message: "Something's wrong", error: e });
    }
  },
  status: async (req, res) => {
    try {
      res.json({ message:"Status connection",status:"UP"});
    } catch (e) {
      res.json({ message: "Something's wrong", error: e });
    }
  },
  all: async (req, res) => {
    try {
      if (!res.headersSent) {
        console.log(new Error('ERROR 404 - PAGE NOT FOUND'));
        res.status(400).send({ message: 'ERROR 404', status:"PAGE NOT FOUND" });
      }
    } catch (e) {
      res.json({ message: "Something's wrong", error: e });
    }
  },
};
