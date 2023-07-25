import { Client , Databases ,Account } from "appwrite";

export const PROJECT_ID = "64ba754b48bc05dd46ce";
export const DATABASE_ID = "64ba76a5f1c6773078dd";
export const COLLECTION_ID_MESSAGES = "64ba76bb390bb070af27";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64ba754b48bc05dd46ce");

  export const databases = new Databases(client);

  export const account = new Account(client);

  export default client;