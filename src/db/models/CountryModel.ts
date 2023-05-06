import { db } from "../db";

export interface ICountry {
  id?: number;
  name: string;
  country_samuha_id: string;
}
export class Country {
  id: number;
  name: string;
  country_samuha_id: string;
  status: number;

  constructor(data: ICountry) {
    this.name = data.name;
    this.country_samuha_id = data.country_samuha_id;
    if (data.id) this.id = data.id;
    db.countries.mapToClass(Country);
  }
  save() {
    return db.countries.put(this);
  }
}

export async function addNewCountry(data: ICountry) {
  await db.transaction("rw", db.countries, async function () {
    await db.countries.add(
      new Country({...data})
    );
  });
}

export async function getAllCountrys() {
  return await db.transaction("r", db.countries, async function () {
    let countries = await db.countries.toArray();
    return countries;
  });
}

export async function getCountryById(id: string) {
  return await db.countries.get(parseInt(id));
}

export async function getCountryByName(name: string) {
  return await db.countries.where('name').startsWithAnyOfIgnoreCase(name).toArray();
}

export async function getCountryBySamuhaId(country_samuha_id: number) {
  return await db.countries.where({country_samuha_id: country_samuha_id}).toArray();
}
