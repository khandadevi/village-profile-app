import { db } from "../db";

export interface IBasti {
  id?: number;
  name: string;
  status: number;
  wardId: number;
  sabikWardId: number;
}
export class Basti {
  id: number;
  name: string;
  status: number;
  wardId: number;
  sabikWardId: number;

  constructor(name: string, status: number, wardId: number,sabikWardId: number, id?: number) {
    this.name = name;
    this.status = status;
    this.wardId = wardId;
    this.sabikWardId = sabikWardId;
    if (id) this.id = id;
    db.bastis.mapToClass(Basti);
  }
  save() {
    return db.bastis.put(this);
  }
}

export async function addNewBasti(data: IBasti) {
  await db.transaction("rw", db.bastis, async function () {
    await db.bastis.add(
      new Basti(data.name, data.status, data.wardId, data.sabikWardId, data.id)
    );
  });
}

export async function getAllBasti() {
  return await db.transaction("r", db.bastis, async function () {
    let bastis = await db.bastis.toArray();
    return bastis;
  });
}

export async function getBastiById(id: string) {
  return await db.bastis.get(parseInt(id));
}

export async function getBastiByName(name: string) {
  // console.log("====nqq=="+db.bastis.where('name').startsWithAnyOfIgnoreCase(name).toArray())
  return await db.bastis.where('name').startsWithAnyOfIgnoreCase(name).toArray();
}

export async function getBastiByWardId(wardId: any) {
  return await db.bastis.where({wardId: parseInt(wardId)}).toArray();
}

export async function getBastiBySabikWardId(sabikWardId: any) {
  return await db.bastis.where({sabikWardId: parseInt(sabikWardId)}).toArray();
}

export async function updateBasti(data: IBasti) {
  return await db.bastis.put({
    id: data.id,
    name: data.name,
    status: data.status,
    wardId: data.wardId,
    sabikWardId: data.sabikWardId,
  });
}
