import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URl;

if (!mongodbUrl) {
  throw new Error("Mongodb url is mssing");
}

//this is declaring in global.d.ts
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    //this will make promis
    cached.promise = mongoose
      .connect(mongodbUrl)
      .then((conn) => conn.connection);
  }

  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log("conenction db error", error);
    throw new Error("error on connection");
  }
};

export default connectDb;
