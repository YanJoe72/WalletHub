import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') 
  .setProject('6841462700229ed8efc8');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID ,Query};