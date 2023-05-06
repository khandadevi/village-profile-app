import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {getSabikWardById, getSabikWardByWardId, ISabikWard} from "../../../db/models/SabikWardModel";
import {
  getAllCountrys,
  getCountryBySamuhaId,
  ICountry,
} from "../../../db/models/CountryModel";
import {
  getAllCountrySamuhas,
  ICountrySamuha,
} from "../../../db/models/CountrySamuhaModel";
import { getAllDharmas, IDharma } from "../../../db/models/DharmaModel";
import {
  addNewHousehold,
  IHousehold,
  updateHousehold,
} from "../../../db/models/Household";
import {
  getAllJaatis,
  getJaatiBySamuhaId,
  IJaati,
} from "../../../db/models/JaatiModel";
import {
  getAllJaatiSamuhas,
  IJaatiSamuha,
} from "../../../db/models/JaatiSamuhaModel";
import { getBastiBySabikWardId, IBasti } from "../../../db/models/BastiModel";
import { getMargaByBastiId, IMarga } from "../../../db/models/MargaModel";
import {
  addNewMember,
  getMembersbyHousehold,
  IMember,
  updateMember,
} from "../../../db/models/Member";
import {
  getAllMotherToungues,
  IMotherTongue,
} from "../../../db/models/MotherTongue";
import { getAllOccupations, IOccupation } from "../../../db/models/Occupation";
import {
  getAllTechnicalSkills,
  ITechnicalSkill,
} from "../../../db/models/TechnicalSkill";
import { getAllUsers, IUser } from "../../../db/models/UserModel";
import { getAllWards, IWard } from "../../../db/models/WardModel";
import {
  householdRequired,
  memberDefault,
  memberRequired,
} from "../../../defaultRequired";
import GharKoBiabarn from "./GharKoBiabarn";
import GharKoDetailBiabarn from "./GharKoDetailBiabarn";
import PariwarKoBibaran from "./PariwarKoBibaran";
export interface IError {
  name: string;
  message: string;
}
export default function VPForm(props: any) {
  const history = useHistory();
  let { data } = props;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([] as IError[]);
  const [auth, setAuth] = useState({} as IUser);
  const [wards, setWards] = useState([] as IWard[]);
  const [sabikWards, setSabikWards] = useState([] as ISabikWard[]);
  const [bastis, setBastis] = useState([] as IBasti[]);
  const [margas, setMargas] = useState([] as IMarga[]);
  const [jaatis, setJaatis] = useState([] as IJaati[]);
  const [countries, setCountries] = useState([] as ICountry[]);
  const [country_samuhas, setCountrySamuhas] = useState([] as ICountrySamuha[]);
  const [mother_tongues, setMotherTongues] = useState([] as IMotherTongue[]);
  const [jaatiSamuhas, setJaatiSamuhas] = useState([] as IJaatiSamuha[]);
  const [dharmas, setDharmas] = useState([] as IDharma[]);
  const [household, setHousehold] = useState({} as IHousehold);
  // const [members, setMembers] = useState([] as IMember[]);
  const [occupations, setOccupations] = useState([] as IOccupation[]);
  const [technical_skills, setTechnicalSkills] = useState(
    [] as ITechnicalSkill[]
  );
  useEffect(() => {
    checkUser();
    loadAllWada();
    loadJaatiAndDharma();
    setHousehold({ ...data.household });
    if (data.household) {
      if (data.household.ward_id) {
        loadSabikWardByWadaId(data.household.ward_id);
      }
      if (data.household.sabikWard_id) {
        loadBastiBySabikWadaId(data.household.sabikWard_id);
      }
      // if (data.household.ward_id) {
      //   loadBastiByWadaId(data.household.ward_id);
      // }
      if (data.household.basti_id) {
        loadMargaByBastiId(data.household.basti_id);
      }
      if (data.household.id) {
        loadMembersByHoushold(data.household.id);
      }
    }
  }, [data]);

  const loadMembersByHoushold = async (household_id: string) => {
    let mems = await getMembersbyHousehold(household_id);
    // setHousehold((household) => ({
    //   ...household,
    //   members: [...mems],
    // }));
    console.log("nnn",data.household.num_of_member, mems)
    setHousehold((household) => ({
      ...household,
      members: [...mems],
    }));
    // setMembersInHousehold(data.household.num_of_member, mems);
  };

  const checkUser = async () => {
    let auth_ = await getAllUsers();
    if (auth_.length) {
      setAuth({ ...auth_[0] });
    }
  };

  async function loadAllWada() {
    let wards = await getAllWards();
    setWards([...wards]);
  }

  const loadJaatiAndDharma = async () => {
    let mts = await getAllMotherToungues();
    setMotherTongues([...mts]);
    let jaatis_samuhas = await getAllJaatiSamuhas();
    setJaatiSamuhas([...jaatis_samuhas]);
    let jaatis_ = await getAllJaatis();
    setJaatis([...jaatis_]);
    let CountryS_samuhas = await getAllCountrySamuhas();
    setCountrySamuhas([...CountryS_samuhas]);
    let CountryS_ = await getAllCountrys();
    setCountries([...CountryS_]);
    let dharmas_ = await getAllDharmas();
    setDharmas([...dharmas_]);
    let occupations_ = await getAllOccupations();
    setOccupations([...occupations_]);
    let ts = await getAllTechnicalSkills();
    setTechnicalSkills([...ts]);
  };

  const saveAndExitHousehold = async () => {
    setLoading(true);
    let hh_id: any;
    if (household.id) {
      hh_id = household.id;
      await updateHousehold(household);
    } else {
      hh_id = await addNewHousehold({
        ...household,
        status: "0",
        is_posted: "0",
        is_deleted: "0",
        user_id: auth.id?.toString(),
      });
      setHousehold((household) => ({
        ...household,
        id: hh_id,
        is_posted: "0",
        is_deleted: "0",
        user_id: auth.id?.toString(),
      }));
    }
    await saveMembers(hh_id);

    setLoading(false);
    history.push("/village-profile-app/app");
  };

  const saveHousehold = async () => {
   
    setLoading(true);
    let hh_id: any;
    if (household.id) {
      hh_id = household.id;
      await updateHousehold(household);
    } else {
      hh_id = await addNewHousehold({
        ...household,
        status: "0",
        is_posted: "0",
        is_deleted: "0",
        user_id: auth.id?.toString(),
      });
      setHousehold((household) => ({
        ...household,
        id: hh_id,
        is_posted: "0",
        is_deleted: "0",
        user_id: auth.id?.toString(),
      }));
    }
    await saveMembers(hh_id);
    setLoading(false);
    return hh_id;
  };

  const saveMembers = async (hh_id: any) => {
    setLoading(true);
    let memberList = household.members;
    if (household.members.length) {
      household.members.map(async (m, key) => {
        if (m.id) {
          await updateMember(m);
        } else {
          m.hh_id = hh_id;
          let m_id = await addNewMember(m);
          memberList[key].id = m_id;
        }
      });
      // setMembers([...memberList]);
    }
    setLoading(false);
  };

  // const loadSabikWardByWadaId = async (wardId: any) => {
  //   let sabikWards = await getSabikWardById(wardId);
  //   setsabikWards([...sabikWards]);
  // };
   const loadSabikWardByWadaId = async (wardId: any) => {
    let sabikWards = await getSabikWardByWardId(wardId);
    setSabikWards([...sabikWards]);
  };

  // const loadBastiByWadaId = async (wardId: any) => {
  //   let bastis = await getBastiByWardId(wardId);
  //   setBastis([...bastis]);
  // };

  const loadBastiBySabikWadaId = async (sabikWardId: any) => {
    let bastis = await getBastiBySabikWardId(sabikWardId);
    setBastis([...bastis]);
  };

  const loadMargaByBastiId = async (bastiId: any) => {
    let margas = await getMargaByBastiId(bastiId);
    setMargas([...margas]);
  };

  const loadJaatiByJaatiSamuhaId = async (jaati_samuha_id: any) => {
    let jaatis = await getJaatiBySamuhaId(parseInt(jaati_samuha_id));
    setJaatis([...jaatis]);
  };

  const loadAllJaati = async () => {
    let jaatis = await getAllJaatis();
    setJaatis([...jaatis]);
  };

  const loadCountryByCountrySamuhaId = async (country_samuha_id: any) => {
    let cs = await getCountryBySamuhaId(parseInt(country_samuha_id));
    setCountrySamuhas([...cs]);
  };

  const loadAllCountry = async () => {
    let countries = await getAllCountrys();
    setCountries([...countries]);
  };

  const handleChange = (e: any) => {
    // if (e.target.name === "ward_id") {
    //   loadBastiBySabikWadaId(e.target.value);
    // }

    if (e.target.name === "ward_id") {
      loadSabikWardByWadaId(e.target.value);
    }
    if (e.target.name === "sabikWard_id") {
      loadBastiBySabikWadaId(e.target.value);
    }
        if (e.target.name === "basti_id") {
      loadMargaByBastiId(e.target.value);
    }
    if (e.target.name === "jaati_samuha_id") {
      if (e.target.value) {
        loadJaatiByJaatiSamuhaId(e.target.value);
      } else {
        loadAllJaati();
      }
    }
    if (e.target.name === "country_samuha_id") {
      if (e.target.value) {
        loadCountryByCountrySamuhaId(e.target.value);
      } else {
        loadAllCountry();
      }
    }
    if (e.target.name === "num_of_member") {
      if (e.target.value > 30) return;
      setMembersInHousehold(e.target.value, household.members);
    }
    setHousehold((household) => ({
      ...household,
      [e.target.name]: e.target.value,
    }));
  };
  const setMembersInHousehold = (num_of_member: string, hhm: IMember[]) => {
    console.log(num_of_member, hhm)
    var newMemberList_ = [] as IMember[];
    // let existingMembersCount = hhm.length;
    // if (existingMembersCount > parseInt(num_of_member)) {
    //   newMemberList_ = hhm;
    //   for (
    //     let x = 0;
    //     x <= existingMembersCount - parseInt(num_of_member);
    //     x++
    //   ) {
    //     newMemberList_.splice(-1);
    //   }
    // } else if (parseInt(num_of_member) > existingMembersCount) {
    //   for (let i = 0; i < parseInt(num_of_member), i++) {
    //     newMemberList_.push(memberDefault);
    //   }
    // }
    for (let i = 0; i < parseInt(num_of_member); i++) {
      console.log("zzz", i)
      let newMember = {} as IMember
      if(hhm.length > i){
        newMember = {... hhm[i]}
        // newMemberList_.push(hhm[i]);
      }else{
        newMember = {...memberDefault}
      }
      if(i === 0 ){
        newMember.first_name = household.hoh_first_name
        newMember.last_name = household.hoh_last_name
        newMember.gender_id = household.hoh_gender
        newMember.mobile_num = household.hoh_contact_num
        newMember.relation_with_hoh_id = "1"
        
      }else{
        newMember.last_name = household.hoh_last_name
      }
      newMemberList_.push(newMember);
    }
    console.log("nm", newMemberList_)
    setHousehold((household) => ({
      ...household,
      members: [...newMemberList_],
    }));
  };
  const handleArrayChangeInHousehold = (name: string, value: any) => {
    setHousehold((household) => ({
      ...household,
      [name]: value,
    }));
  };

  const handleMemberChange = (index: number, name: string, value: any) => {
    let mems = [...household.members];
    let mem = mems[index];
    mem = { ...mem, [name]: value };
    mems[index] = mem;
    handleArrayChangeInHousehold("members", mems);
  };

  const validate = (hh: IHousehold) => {
    let allErrors = [] as IError[];
    Object.keys(hh).forEach((key) => {
      if (householdRequired.indexOf(key) > -1 && hh[key] === "") {
        var newError = {} as IError;
        newError.name = key;
        newError.message = getErrorMessage(key);
        allErrors.push(newError);
      }
    });
    hh.members.map((m: IMember, mk: any) => {
      Object.keys(m).forEach((mkey) => {
        if (memberRequired.indexOf(mkey) > -1 && m[mkey] === "") {
          var newError = {} as IError;
          newError.name = mkey + "-" + mk;
          newError.message = getErrorMessage(mkey);
          allErrors.push(newError);
        }
      });
    });

    setErrors([...allErrors]);
    return allErrors.length;
  };

  const getErrorMessage = (key: string) => {
    let msg = key + " is required";
    switch (key) {
      case "ward_id": {
        msg = "वडाको नाम";
        break;
      }
      case "sabikWard_id": {
        msg = "साविक. वडा";
        // msg = "टोलको नाम";
        break;
      }

      case "basti_id": {
        msg = "साविक वडा";
        // msg = "टोलको नाम";
        break;
      }
      case "marga_id": {
        msg = "बस्तिको नाम";
        // msg = "मार्गको नाम";
        break;
      }
      case "hoh_first_name": {
        msg = "घरमुलीको नाम छुटेको छ।";
         break;
      }
      case "hoh_last_name": {
        msg = "घरमुलीको थर छुटेको छ।";
         break;
      }
      case "dob_bs": {
        msg = "जन्ममिति छुटेको छ।";
         break;
      }
      case "first_name": {
        msg = "सदस्यको नाम छुटेको छ।";
         break;
      }
      case "last_name": {
        msg = "सदस्यको थर छुटेको छ।";
         break;
      }
      case "relation_with_hoh_id": {
        msg = "घरमुलीसँग नाता छुटेको छ।";
         break;
      }
      // case "gender_id": {
      //   msg = "जन्ममिति छुटेको छ।";
      //    break;
      // }
      case "gender_id": {
        msg = "लिङ्ग छुटेको छ।";
         break;
      }
      // case "gender_id": {
      //   msg = "लिङ्ग छुटेको छ।";
      //    break;
      // }
    }
    return msg;
  };

  const complete = async () => {
    let hh_id = await saveHousehold();
    let errorLength = validate(household);
    if (errorLength === 0) {
      await updateHousehold({ ...household, is_complete: "1", is_deleted: "0", id: hh_id });
      history.push("/village-profile-app/app");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  if (loading) {
    return <div className="loading">Loading..</div>;
  }
  return (
    <div className="vp-form-wrapper">
      <button
        className="btn btn-warning back-btn"
        onClick={() => history.goBack()}
      >
        Back
      </button>
      <div className="save-btns">
        <div>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => scrollTo("ward_id")}
          >
            &#x2191;
          </button>
          <button
            className="btn btn-sm btn-info"
            onClick={() => scrollTo("last")}
          >
            &#x2193;
          </button>
        </div>
        <div>
          {/* <button className="btn btn-sm btn-primary" onClick={saveHousehold}>
            Save
          </button> */}
          {/* <button
            className="btn btn-sm btn-secondary"
            onClick={saveAndExitHousehold}
          >
            Save & Exit
          </button> */}
        </div>
      </div>
      <div className="vp-form">
        <GharKoBiabarn
          hh={household}
          handleChange={handleChange}
          wards={wards}
          sabikWards={sabikWards}
          bastis={bastis}
          margas={margas}
          jaatis={jaatis}
          jaati_samuhas={jaatiSamuhas}
          dharmas={dharmas}
          mother_tongues={mother_tongues}
          handleArrayChangeInHousehold={handleArrayChangeInHousehold}
          errors={errors}
        />
        <PariwarKoBibaran
          household={household}
          handleMemberChange={handleMemberChange}
          occupations={occupations}
          technical_skills={technical_skills}
          handleArrayChangeInHousehold={handleArrayChangeInHousehold}
          errors={errors}
        />
        <GharKoDetailBiabarn
          hh={household}
          handleChange={handleChange}
          wards={wards}
          countries={countries}
          country_samuhas={country_samuhas}
          handleArrayChangeInHousehold={handleArrayChangeInHousehold}
          errors={errors}
        />
        <div className="" style={{ height: "15vh" }} id="last">
          <div className="" style={{textAlign: "center", marginTop:"20px"}}>
            <div className="btn btn-success" onClick={complete}>
              पुरा भयो ।
            </div>
            {errors.length ? (
              <>
                <h2>Please add follwing fields</h2>
                <ol className="error-list">
                  {errors.map((error) => (
                    <li onClick={() => scrollTo(error.name)}>
                      {error.message}
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
