require("dotenv").config();
const { app, httpsServer } = require("./app");

const { PORT } = process.env;

httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
