import 'dotenv/config';
import app from './app.js';

const port = process.env.APP_PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
