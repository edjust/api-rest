import 'reflect-metadata';
import 'dotenv/config';
import axios from 'axios';
import { Schema, model, connect } from 'mongoose';

interface Request {
  fullName: string;
  email: string;
  addresses: [{ address: string; addressNumber: number }];
  contacts: [{ phoneNumber: string }];
}

interface Users {
  fullName: string;
  email: string;
  address: string;
  addressNumber: number | '';
  phoneNumber: string;
}

const usersSchema = new Schema<Users>({
  fullName: String,
  email: String,
  address: String,
  addressNumber: Number,
  phoneNumber: String,
});

const Users = model<Users>('Users', usersSchema);

async function index() {
  try {
    const api = 'http://localhost:4000/users';

    let { data } = await axios.get(api);

    await connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

    data.map(async (users: Request) => {
      let { fullName, email, addresses, contacts } = users;

      let user = new Users({
        fullName,
        email,
        address: addresses[0] ? addresses[0].address.split(',')[0] : '',
        addressNumber: addresses[0]
          ? Number(addresses[0].address.split(',')[1])
          : '',
        phoneNumber: contacts[0] ? contacts[0].phoneNumber : '',
      });

      await user.save();
    });
    console.log('SUCCESS!');
  } catch (error) {
    console.log(error);
  }
}

index();
