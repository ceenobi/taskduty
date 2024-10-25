import { connectToDb } from "./config/mongoDb.js";
import app from "./app.js";

const port = process.env.PORT || 6000

if (!port || !process.env.MONGODB_URI) {
    throw new Error("Make sure env file is populated");
}

connectToDb().then(()=> {
    try {
        app.listen(port, ()=> {
            console.log(`Server is connected to port: ${port}`);
        });
    } catch (error) {
        console.log("Cannot connect to server");
    }
})
.catch(() => {
    console.log("Invalid database connection...!");
});