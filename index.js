const app = require("./app");
const connectDb = require("./db");

require("dotenv").config();

const port = process.env.PORT||8000

app.listen(port, ()=>{
    console.log(`Server run successfully at http://localhost:${port}`);
     connectDb();
});
