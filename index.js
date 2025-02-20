import app from "./app.js";
import { connectToDB } from "./utils/mongoose.js";

function main() {
  connectToDB();
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
