import api from "../Api/api";
import { addNewBasti, getBastiByName } from "./models/BastiModel";
import { addNewSabikWard, getSabikWardByName } from "./models/SabikWardModel";
import { addNewCountry, getCountryByName } from "./models/CountryModel";
import { addNewCountrySamuha, getCountrySamuhaByName } from "./models/CountrySamuhaModel";
import { addNewDharma, getDharmaByName } from "./models/DharmaModel";
import { addNewJaati, getJaatiByName } from "./models/JaatiModel";
import { addNewJaatiSamuha, getJaatiSamuhaByName } from "./models/JaatiSamuhaModel";
import { addNewMarga, getMargaByName } from "./models/MargaModel";
import { addNewMotherToungue, getMotherToungueByName } from "./models/MotherTongue";
import { addNewOccupation, getOccupationByName } from "./models/Occupation";
import { addNewTechnicalSkill, getTechnicalSkillByName } from "./models/TechnicalSkill";
import { addNewWard, getWardByName } from "./models/WardModel";

export async function getWadas(office_id: String, user_id:String) {
  console.log("Synchronizing Wards25...");
  let res = await api.loadWada(office_id, user_id);
  if (res.status === 200) {
    let wards = res.data;
    wards.map(async (w: any) => {
      let checkWard = await getWardByName(w.name);
      if (checkWard.length === 0) {
        await addNewWard({ name: w.name, status: w.status, id: w.id });
      }
    });
    console.log(wards.length, " Wards Synced.");
    return wards;
  }
  return null;
}

export async function getSabikWards(office_id: String) {
  console.log("Synchronizing SabikWards...");
    let res = await api.loadSabikWada(office_id);
   if (res.status === 200) {
    let sabikWards = res.data;
    
    sabikWards.map(async (w: any) => {
    
            let checksabikWard = await getSabikWardByName(w.name);
            
      if (checksabikWard.length === 0) {
        await addNewSabikWard({
          name: w.name,
          status: w.status,
          id: w.id,
          wardId: w.ward_id,
        });
      }
    });
    console.log(sabikWards.length, " Sabikward Synced.");
  }
}

export async function getBastis(office_id: String) {
  console.log("Synchronizing Basti...");
  let res = await api.loadBasti(office_id);
    if (res.status === 200) {
    let basti = res.data;
    basti.map(async (w: any) => {
      // console.log("sabik==" + w.sabik_ward_id)
      // console.log("hello=="+ basti.map[0])
      let checkBasti = await getBastiByName(w.name);
      if (checkBasti.length === 0) {
                await addNewBasti({
                    name: w.name,
          status: w.status,
          id: w.id,
          wardId: w.ward_id,
          sabikWardId: w.sabik_ward_id,
        });
      }
    });
    console.log(basti.length, " Bastis Synced.");
  }
}

export async function getMargas(office_id: String) {
  console.log("Synchronizing Marga...");
  let res = await api.loadMarga(office_id);
  if (res.status === 200) {
    let margas = res.data;
    margas.map(async (m: any) => {
      let checkMarga = await getMargaByName(m.name);
      if (checkMarga.length === 0) {
        await addNewMarga({
          id: m.id,
          name: m.name,
          bastiId: m.basti_id,
          wardId: m.wardId,
          sabikWardId: m.sabikWardId,
          status: m.status,
        });
      }
    });
    console.log(margas.length, " Marga Synced.");
  }
}

export async function getMotherToungure() {
  console.log("Synchronizing MT Samuha...");
  let res = await api.loadMotherTongues();
  if (res.status === 200) {
    let mother_tongues = res.data;
    mother_tongues.map(async (m: any) => {
      let checkMt = await getMotherToungueByName(m.name);
      if (checkMt.length === 0) {
        await addNewMotherToungue({ ...m });
      }
    });
    console.log(mother_tongues.length, " MT Synced.");
  }
}
export async function getJaatiSamuha() {
  console.log("Synchronizing Jaati Samuha...");
  let res = await api.loadJaatiSamuhas();
  if (res.status === 200) {
    let jaatis = res.data;
    jaatis.map(async (m: any) => {
      let checkJaati = await getJaatiSamuhaByName(m.name);
      if (checkJaati.length === 0) {
        await addNewJaatiSamuha({ ...m });
      }
    });
    console.log(jaatis.length, " Jaati Samuha Synced.");
  }
}

export async function getJaati() {
  console.log("Synchronizing Jaati...");
  let res = await api.loadJaati();
  if (res.status === 200) {
    let jaatis = res.data;
    jaatis.map(async (m: any) => {
      let checkJaati = await getJaatiByName(m.name);
      if (checkJaati.length === 0) {
        await addNewJaati({ ...m });
      }
    });
    console.log(jaatis.length, " Jaati Synced.");
  }
}
export async function getCountrySamuha() {
  console.log("Synchronizing Country Samuha...");
  let res = await api.loadCountrySamuhas();
  if (res.status === 200) {
    let Countrys = res.data;
    Countrys.map(async (m: any) => {
      let checkCountry = await getCountrySamuhaByName(m.name);
      if (checkCountry.length === 0) {
        await addNewCountrySamuha({ ...m });
      }
    });
    console.log(Countrys.length, " Country Samuha Synced.");
  }
}

export async function getCountry() {
  console.log("Synchronizing Country...");
  let res = await api.loadCountry();
  if (res.status === 200) {
    let Countrys = res.data;
    Countrys.map(async (m: any) => {
      let checkCountry = await getCountryByName(m.name);
      if (checkCountry.length === 0) {
        await addNewCountry({ ...m });
      }
    });
    console.log(Countrys.length, " Country Synced.");
  }
}

export async function getDharma() {
  console.log("Synchronizing Dharma...");
  let res = await api.loadDharma();
  if (res.status === 200) {
    let dharmas = res.data;
    dharmas.map(async (m: any) => {
      let checkDharma = await getDharmaByName(m.name);
      if (checkDharma.length === 0) {
        await addNewDharma({ ...m });
      }
    });
    console.log(dharmas.length, " Dharma Synced.");
  }
}

export async function getOccupation() {
  console.log("Synchronizing Occupation...");
  let res = await api.loadOccupations();
  if (res.status === 200) {
    let occupations = res.data;
    occupations.map(async (m: any) => {
      let checkDharma = await getOccupationByName(m.name);
      if (checkDharma.length === 0) {
        await addNewOccupation({ ...m });
      }
    });
    console.log(occupations.length, " Occupation Synced.");
  }
}

export async function getTechnicalSkill() {
  console.log("Synchronizing Technical Skills...");
  let res = await api.loadTechnicalSkills();
  if (res.status === 200) {
    let technicalSkills = res.data;
    technicalSkills.map(async (m: any) => {
      let checkTS = await getTechnicalSkillByName(m.name);
      if (checkTS.length === 0) {
        await addNewTechnicalSkill({ ...m });
      }
    });
    console.log(technicalSkills.length, " Technical Skills Synced.");
  }
}

export async function syncDb(data: any) {
  if (window.navigator.onLine) {
    await getWadas(data.office_id, data.id);
    await getSabikWards(data.office_id);
    await getBastis(data.office_id);
    await getMargas(data.office_id);
    await getJaati();
    await getJaatiSamuha();
    await getDharma();
    await getOccupation();
    await getTechnicalSkill();
    await getMotherToungure();
    await getCountrySamuha()
    await getCountry()
  }
}
