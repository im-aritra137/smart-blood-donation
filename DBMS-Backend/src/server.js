import 'dotenv/config';
import app from './app.js';

const PORT = process.env.APP_PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
