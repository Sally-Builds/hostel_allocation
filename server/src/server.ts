import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import userRouter from './resources/routes/user.router';
import hostelRouter from './resources/routes/hostel.router';

// controller imports below
validateEnv();

const app = new App(
  [
    {
      path: 'users',
      router: userRouter(),
    },
    {
      path: 'hostels',
      router: hostelRouter(),
    },
  ],
  Number(process.env.PORT),
);

app.listen();
