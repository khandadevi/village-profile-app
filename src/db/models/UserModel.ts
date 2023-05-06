import { db } from "../db";

export interface IUser {
  id?: number;
  name: string;
  username: string;
  office_name: string;
  office_id: string;
  phone: string;
  password: string;
}
export class User {
  id: number;
  name: string;
  username: string;
  phone: string;
  password: string;
  office_name: string;
  office_id: string;

  constructor(data: IUser) {
    this.name = data.name;
    this.username = data.username;
    this.phone = data.phone;
    this.password = data.password;
    this.office_name = data.office_name;
    this.office_id = data.office_id;
    if (data.id) this.id = data.id;
    db.users.mapToClass(User);
  }
  save() {
    return db.users.put(this);
  }
}

export async function addNewUser(data: IUser) {
  await deleteUser();
  await db.transaction("rw", db.users, async function () {
    let user = await db.users.add(
      new User({...data})
    );
    console.log(user);
  });
}

export async function getAllUsers() {
  return await db.transaction("r", db.users, async function () {
    let users = await db.users.toArray();
    return users;
  });
}

export async function getUserById(id: string) {
  return await db.users.get(id);
}

export async function updateUser(data: IUser) {
  return await db.users.put({...data});
}

export async function deleteUser() {
  return await db.users.clear();
}
