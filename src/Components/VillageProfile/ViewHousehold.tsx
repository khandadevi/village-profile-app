import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSabikWardById, ISabikWard } from "../../db/models/SabikWardModel";
import {getBastiById, getBastiBySabikWardId, getBastiByWardId, IBasti} from "../../db/models/BastiModel";
import { getDharmaById, IDharma } from "../../db/models/DharmaModel";
import { getHouseholdById, IHousehold } from "../../db/models/Household";
import { getJaatiById, getAllJaatis, IJaati } from "../../db/models/JaatiModel";
import { getMargaById, IMarga } from "../../db/models/MargaModel";
import { getMembersbyHousehold, IMember } from "../../db/models/Member";
import { getWardById, IWard } from "../../db/models/WardModel";
import {
  gender_choice,
  hoh_roles,
  mother_tongues,
  residence_types,
  yes_nos,
} from "../../enums";

export default function ViewHousehold() {
  let { id } = useParams<{ id: any }>();
  const history = useHistory();

  const [household, setHousehold] = useState({} as IHousehold);
  const [ward, setWard] = useState({} as IWard);
  const [marga, setMarga] = useState({} as IMarga);
  const [sabikWard, setSabikWard] = useState({} as ISabikWard);
  const [basti, setBasti] = useState({} as IBasti);
  const [jaati, setJaati] = useState({} as IJaati);
  const [dharma, setDharma] = useState({} as IDharma);
  const [members, setMembers] = useState([] as IMember[]);

  useEffect(() => {
    getHousehold();
  }, []);

  const getHousehold = async () => {
    let hh = await getHouseholdById(id);
    setHousehold({ ...hh });
    getWard(hh);
    getMarga(hh);
    getSabikWard(hh);
    getBasti(hh);
    getJaati(hh);
    getDharma(hh);
    getMembers(hh);
  };
  const getWard = async (hh: IHousehold) => {
    let w = await getWardById(hh.ward_id);
    setWard(w);
  };
  const getSabikWard = async (hh: IHousehold) => {
    let sw= await getSabikWardById(hh.sabikWard_id);
    setSabikWard(sw);
  };

   const getBasti = async (hh: IHousehold) => {
    let b = await getBastiById(hh.basti_id);
    setBasti(b);
  };

  const getMarga = async (hh: IHousehold) => {
    let m = await getMargaById(hh.marga_id);
    setMarga(m);
  };
  const getJaati = async (hh: IHousehold) => {
    let j = await getJaatiById(hh.jaati_id);
     setJaati(j);
  };
  const getDharma = async (hh: IHousehold) => {
    let d = await getDharmaById(hh.religion_id);
    setDharma(d);
  };
  const getMembers = async (hh: IHousehold) => {
    let mems = await getMembersbyHousehold(hh.id.toString());
    setMembers([...mems]);
  };

  const findInEnumById = (options: any, id: string) => {
    let v = options.find((s: any) => s.id === id);
    if (v) {
      return v.name;
    }
    return "";
  };

  if (household) {
    return (
      <div className="view-household">
        <button
          className="btn btn-warning back-btn"
          onClick={() => history.goBack()}
        >
          Back
        </button>
        {household.is_posted == "0" && (
          <button
            className="btn btn-danger"
            onClick={() =>
              history.push("/village-profile-app/app/edit/" + household.id)
            }
          >
            Edit
          </button>
        )}

        <h3>{household.hoh_first_name}</h3>

        <img src={household.hoh_image} alt="" />
        
        <p>
          Ward: <h4>{ward?.name}</h4>
        </p>

          <p>
         Sabik Ward: <h4>{sabikWard?.name}</h4>
        </p>
        <p>
          Basti:<h4> {basti?.name}</h4>
        </p>
        <p>
          Marga:<h4> {marga?.name}</h4>
        </p>
        <p>
          House No:<h4> {household.house_num}</h4>
        </p>
        <p>
          HOH Gender:
          <h4> {findInEnumById(gender_choice, household.hoh_gender)}</h4>
        </p>
        {/* <p>
          HOH Role:
          <h4> {findInEnumById(hoh_roles, household.hoh_role)}</h4>
        </p> */}
        <p>
          Jaati:
          <h4> {jaati?.name}</h4>
        </p>
        <p>
          Dharma:
          <h4>{dharma?.name}</h4>
        </p>
        <p>
          Mattribhasa:
          <h4>{findInEnumById(mother_tongues, household.mother_tongue_id)}</h4>
        </p>
        <p>
          Resident Type :
          <h4>{findInEnumById(residence_types, household.resident_type)}</h4>
        </p>
        <p>
          Migration Date:<h4> {household.migration_date}</h4>
        </p>
        <p>
          Geo Code:
          <h4>
            {" "}
            Lat: {household.latitude} Long: {household.longitude}
          </h4>
        </p>
        <p>
          Mobile Number: <h4>{household.mobile_num}</h4>
        </p>
        {/* <p>
          Missing Member:
          <h4>
            {findInEnumById(yes_nos, household.has_missing_deceased_member)}
          </h4>
          
        </p>
        <p>
          Animal Count: <h4>{household.animal_count}</h4>
          
        </p>
        <p>
          Business Count: <h4>{household.business_count}</h4>
        </p>
        <p>
          Rent Business Count: <h4>{household.rent_business_count}</h4>
        </p>
        <p>
          Annual Expense:<h4>{household.annual_expense}</h4>
        </p>
        <p>
          Foreign Member:
          <h4>{findInEnumById(yes_nos, household.has_foreign_member)}</h4>
        
        </p> */}
        <h4>Members</h4>
        {members && members.length ? (
          <>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, key) => (
                  <tr key={key}>
                    <td>{++key}</td>
                    <td>{m.id}</td>
                    <td>{m.first_name}</td>
                    <td>{m.mobile_num}</td>
                    <td>{/* Show Edit/View Option here */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "No Members"
        )}

        <p>
          Responder Name:<h4>{household.responder_name}</h4>
        </p>
        <img src={household.responder_image} alt="" />
      </div>
    );
  } else {
    return <div className="vp-home">Server Loading...</div>;
  }
}
