import mongoose from 'mongoose';

const createConnection = (url) => {
  console.log('url:::', url);
  mongoose.connect(url);
};

class DB {
  private static instance: any;
  constructor(url: string) {
    if (!DB?.instance) {
      DB.instance = createConnection(url);
    }
    return DB.instance;
  }
  connect() {
    return DB.instance;
  }
}

new DB(process.env.DB_URL ?? '');
const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB 🎄');
const handleError = (error) => console.log('DB Error', error);
db.on('error', handleError);
db.once('open', handleOpen);
