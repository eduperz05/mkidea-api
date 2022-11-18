import connection from "./config";

const dbConnect = async() => {
  connection.sync().then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Err", err);
  });
};

export default dbConnect;