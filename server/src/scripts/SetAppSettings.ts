import path from "path";
import mongoose from "mongoose";
import { config } from "dotenv";
import yargs from "yargs";
import AppSettings from "../models/AppSettings";

config({
  path: path.join(__dirname, "../..", ".env"),
});

const usage = "\nSets app settings";
const options = yargs
  .usage(usage)
  .option("n", {
    alias: "appName",
    describe: "App Name",
    type: "string",
    demandOption: true,
  })
  .help(true).argv;

const { e, _, p, n, ...settings }: any = options;

const run = async () => {
  mongoose.connect(process.env.MONGODB_URI!, () =>
    console.log("Connected to MongoDB")
  );

  const newSettings = new AppSettings({
    ...settings,
  });

  await newSettings.save();

  console.log(`Inserted settings`);
  process.exit(0);
};

run();
