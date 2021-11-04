import app from "./src/server.js";
// const app = require("./src/server.js");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
