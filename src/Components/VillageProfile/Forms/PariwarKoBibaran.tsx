import React, { useState } from "react";
// import { ITrainingDetail, IVehicle } from "../../../db/models/Member";
import {
  developmentOption,
  disability_card_types,
  disability_types,
  disease_names,
  education_faculties,
  education_leave_reasons,
  education_levels,
  education_statuses,
  gender_choice,
  marital_statuses,
  relations,
  socialNetworks,
  vehicle_types,
  yes_nos,
} from "../../../enums";
import Multiselect from "multiselect-react-dropdown";
import InputComponent from "./FormComponent/InputComponent";
import SelectComponent from "./FormComponent/SelectComponent";

// const initialTechSkill = {
//   skill_id: "",
//   source: "0",
//   duration: "",
// } as ITrainingDetail;
// const initialVehicle = {
//   vehicle_type: "",
//   vehicle_type_id: "",
//   count: "1",
// } as IVehicle;

export default function PariwarKoBibaran(props: any) {
  let { household, occupations, technical_skills, errors } = props;
  // console.log("pppp", household)
  let { handleMemberChange } = props;
  // const [techSkill, setTechSkill] = useState(initialTechSkill);
  // const [vehicle, setVehicle] = useState(initialVehicle);
  const [age, setAge] = useState<number | undefined>();

  // const handleTechSkillChange = (e: any) => {
  //   setTechSkill((techSkill) => ({
  //     ...techSkill,
  //     [e.target.name]: e.target.value,
  //   }));
  //   if (e.target.name == "skill_id") {
      
  //     let skill = technical_skills.find((s: any) => s.id == e.target.value);
  //     setTechSkill((techSkill) => ({
  //       ...techSkill,
  //       skill_name: skill.name,
  //     }));
  //   }
  // };

  // const handleVehicleChange = (e: any) => {
  //   setVehicle((vehicle) => ({
  //     ...vehicle,
  //     [e.target.name]: e.target.value,
  //   }));
  //   if (e.target.name == "vehicle_type_id") {
  //     let v = vehicle_types.find((s: any) => s.id == e.target.value);
  //     setVehicle((vehicle) => ({
  //       ...vehicle,
  //       vehicle_type_name: v.name,
  //     }));
  //   }
  // };

  // const saveTechSkill = (key: any, cmd: string, skill_name?: any) => {
  //   let newTechSkills;
  //   if (cmd == "add") {
  //     newTechSkills = household.members[key].technical_skills ?? [];
  //     newTechSkills.push(techSkill);
  //   } else {
  //     newTechSkills = household.members[key].technical_skills ?? [];
  //     const index = newTechSkills.findIndex(
  //       (obj: any) => obj.skill_name === skill_name
  //     );
  //     newTechSkills.splice(index, 1);
  //   }
  //   handleMemberChange(key, "technical_skills", newTechSkills);
  //   setTechSkill({ ...initialTechSkill });
  // };

  const getAge = (memberKey: string, newAge: string) => {
    let dateAd = new Date().getFullYear();
    let dateBs = 2079;
    let newYear = newAge.split("-");
    setAge(undefined);
    if (newYear.length > 0) {
      if (newYear[0].length === 4) {
        setAge(dateBs - parseInt(newYear[0]));
        // console.log("=======", (dateBs - parseInt(newYear[0])))
        // handleMemberChange(memberKey, "age", (dateBs - parseInt(newYear[0])));
        // age: (dateBs - parseInt(newYear[0])),
      }
    }
    // handleMemberChange(memberKey, "age", (dateBs - parseInt(newYear[0])));
    handleMemberChange(memberKey, "dob_bs", newAge);
    
    
    
  };

  // const saveVehicle = (key: any, cmd: string, vehicle_name?: any) => {
  //   let newVehicles;
  //   if (cmd == "add") {
  //     newVehicles = household.members[key].vehicles ?? [];
  //     newVehicles.push(vehicle);
  //   } else {
  //     newVehicles = household.members[key].vehicles ?? [];
  //     const index = newVehicles.findIndex(
  //       (obj: any) => obj.vehicle_type_name === vehicle_name
  //     );
  //     newVehicles.splice(index, 1);
  //   }
  //   handleMemberChange(key, "vehicles", newVehicles);
  //   setVehicle({ ...initialVehicle });
  // };



  

  return (
    <>
      {household.members &&
        household.members.map((member: any, memberKey: any) => (
          <>
          {  memberKey % 2 == 0 && (
                <>
            <div
              className={`form-group member-form-one`}
              key={"member-form-one-" + memberKey}
            >
           
                                
                <h5> B.  सदस्यको विवरण</h5>
              <h5> Member: {memberKey + 1} *</h5>
              {  memberKey == 0 && (
                <>

<InputComponent
                name={"first_name"}
                label={"19. घरमुलीको नाम:* "} 
                disabled = {true}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "first_name", e.target.value)
                }
                
                defaultValue={member.first_name}
                palceholder={"नाम"}
                type={"text"}
                id={"first_name-" + memberKey}
                errors={errors}
              />
             
<InputComponent
                name={"last_name"}
                label={"20. घरमुलीको थर:*"}
                disabled = {true}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "last_name", e.target.value)
                }
                defaultValue={member.last_name}
                palceholder={"थर"}
                type={"text"}
                id={"last_name-" + memberKey}
                errors={errors}
              />

          <SelectComponent
                options={gender_choice}
                disabled = {true}
                wrapperClass="options-verical"
                label={"21. घरमुलीको लिंग*"}
                name="gender_id"
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "gender_id", e.target.value)
                }
                defaultValue={member.gender_id}
                id={"gender_id-" + memberKey}
                placeholder="लिंग"
                errors={errors}
              />
              <SelectComponent
                options={relations}
                wrapperClass="options-verical"
                label={"22. घरमुलीको नाता: *"}
                disabled = {true}
                name="relation_with_hoh_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "relation_with_hoh_id",
                    e.target.value
                  )
                }
                defaultValue={member.relation_with_hoh_id}
                id={"relation_with_hoh_id-" + memberKey}
                placeholder="नाता"
                errors={errors}
              />
              <InputComponent
                name={"mobile_num"}
                label={"23. घरमुलीको मोवाईल नम्बर:"}
                disabled = {true}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "mobile_num", e.target.value)
                }
                defaultValue={member.mobile_num}
                palceholder={"मोवाईल नम्बर"}
                type={"number"}
                id={"mobile_num-" + memberKey}
                errors={errors}
              />  
 <InputComponent
                name={"dob_bs"}
                label={`24. घरमुलीको जन्ममितिः * ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => {
                  getAge(memberKey, e.target.value);
                }}
                defaultValue={member.dob_bs}
                palceholder={"Ex: 2065-10-24"}
                type={"text"}
                id={"dob_bs-" + memberKey}
                errors={errors}
              />  

{/* <InputComponent
                name={"age"}
                label={` उमेर ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => 
                  handleMemberChange(memberKey, "age", e.target.value)
                }
                defaultValue={member.age ?? age }
                palceholder={"Ex: 14"}
                type={"number"}
                id={"age-" + memberKey}
                errors={errors}
              />  */}



  




                </>)}
       
               
               
               
                {  memberKey != 0 && (
                <>

<InputComponent
                name={"first_name"}
                label={"19. सदस्यको नाम:*"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "first_name", e.target.value)
                }
                
                defaultValue={member.first_name}
                palceholder={"नाम"}
                type={"text"}
                id={"first_name-" + memberKey}
                errors={errors}
              />
<InputComponent
                name={"last_name"}
                label={"20. सदस्यको थर:*"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "last_name", e.target.value)
                }
                defaultValue={member.last_name}
                palceholder={"थर"}
                type={"text"}
                id={"last_name-" + memberKey}
                errors={errors}
              />

              
              {/* <InputComponent
                name={"citizenship_num"}
                label={"17. सदस्यको नागरिकता नं."}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "citizenship_num",
                    e.target.value
                  )
                }
                defaultValue={member.citizenship_num}
                palceholder={"नागरिकता नं."}
                type={"text"}
                id={"citizenship_num-" + memberKey}
                errors={errors}
              /> */}

            
              <SelectComponent
                options={gender_choice}
                wrapperClass="options-verical"
                label={"21. सदस्यको लिंग *"}
                name="gender_id"
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "gender_id", e.target.value)
                }
                defaultValue={member.gender_id}
                id={"gender_id-" + memberKey}
                placeholder="लिंग"
                errors={errors}
              />
              <SelectComponent
                options={relations}
                wrapperClass="options-verical"
                label={"22. घरमुलीको नाता:*"}
                name="relation_with_hoh_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "relation_with_hoh_id",
                    e.target.value
                  )
                }
                defaultValue={member.relation_with_hoh_id}
                id={"relation_with_hoh_id-" + memberKey}
                placeholder="नाता"
                errors={errors}
              />

               
               
               
              <InputComponent
                name={"dob_bs"}
                label={`23. जन्ममितिः * ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => {
                  getAge(memberKey, e.target.value);
                }}
                defaultValue={member.dob_bs}
                palceholder={"Ex: 2065-10-24"}
                type={"text"}
                id={"dob_bs-" + memberKey}
                errors={errors}
              />  
             { age > 15 && (
  <>

              <InputComponent
                name={"mobile_num"}
                label={"24. मोवाईल नम्बर:"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "mobile_num", e.target.value)
                }
                defaultValue={member.mobile_num}
                palceholder={"मोवाईल नम्बर"}
                type={"number"}
                id={"mobile_num-" + memberKey}
                errors={errors}
              />   
                </>)}



</>)}

<label className="label" id={"is_married-" + memberKey}>
                25. वैवाविक स्थितिः{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="is_married"
                  key={"वैवाविक स्थितिः" + memberKey}
                  value={member.is_married ?? ""}
                  onChange={(e) =>
                    handleMemberChange(memberKey, "is_married", e.target.value)
                  }
                >
                  <option value={""}>----- वैवाविक स्थिति ------</option>

                  <option value={"0"}>अविवाहित</option>
                  <option value={"1"}>विवाहित</option>
                </select>
              </div>
              {member.is_married == "1" && (
                <div className="child-section">
                  <label
                    className="label"
                    id={"marital_status_id-" + memberKey}
                  >
                    a. स्थिति{" "}
                  </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      name="marital_status_id"
                      key={"वैवाविक स्थितिः" + memberKey}
                      value={member.marital_status_id ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "marital_status_id",
                          e.target.value
                        )
                      }
                    >
                      {marital_statuses.map((ms, keym) => (
                        <option
                          value={ms.id}
                          key={"वैवाविक स्थितिःoption" + keym}
                        >
                          {ms.name}
                        </option>
                      ))}
                    </select>
                  </div>
                 
                  <label className="label" id={"age_on_marriage-" + memberKey}>
                    b. विबाह हुँदाको उमेर{" "}
                  </label>
                  <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="age_on_marriage"
                      key={"विबाह हुँदाको उमेर" + memberKey}
                      value={member.age_on_marriage ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "age_on_marriage",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 26"
                    />
                  </div>
                 
                 
                  </div>



              )}

                  <label className="label" id={"resident_place-" + memberKey}>
                26. बसोबास गर्ने ठाउः
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="resident_place"
                  key={"बसोबास गर्ने ठाउः" + memberKey}
                  value={member.resident_place ?? ""}
                  onChange={(e) =>
                    handleMemberChange(
                      memberKey,
                      "resident_place",
                      e.target.value
                    )
                  }
                >
                  <option value={""}>----- बसोबास गर्ने ठाउ ------</option>
                  <option value={"गाउँ"}>पुर्ण गाउँ</option>
                  <option value={"काठमान्डौ उपत्यका"}>काठमान्डौ उपत्यका</option>
                  <option value={"गाउँ/शहर"}>गाउँ/शहर</option>
                  <option value={"रामेछाप जिल्ला अन्य पालिका"}>रामेछाप जिल्ला अन्य पालिका</option>
                  <option value={"बागमती प्रदेश"}>बागमती प्रदेश</option>
                  <option value={"बिदेश"}>बिदेश</option>
                  <option value={"अन्य जिल्ला"}>अन्य जिल्ला</option>
                </select>
             
             

                  {/* <label className="label" id={"marriage_year-" + memberKey}>
                    b. विवाह भएको सालः{" "}
                  </label> */}
                  {/* <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="marriage_year"
                      key={"वैवाविक स्थितिः" + memberKey}
                      value={member.marriage_year ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "marriage_year",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 2077"
                    />
                  </div> */}

                                

              
              {/* <InputComponent
                label={"25. मासिक आय:"}
                wrapperClass={"options-verical"}
                name={"monthly_income"}
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "monthly_income",
                    e.target.value
                  )
                }
                defaultValue={member.monthly_income}
                palceholder={"मासिक आय"}
                type={"text"}
                id={"monthly_income-" + memberKey}
                errors={errors}
              /> */}
            </div>

            {/* <div
              className={`form-group member-form-two`}
              
              id={14 + 2 + memberKey}
              key={"member-form-two-" + memberKey}
            >
              <h5>शैक्षिक र पेशागत विवरण</h5>
              <h5>Member: {memberKey + 1} **</h5> */}
              


              <SelectComponent
                options={education_statuses}
                wrapperClass="options-verical"
                label={"27.सदस्यको पढाईको अवस्थाः"}
                name="education_status_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "education_status_id",
                    e.target.value
                  )
                }
                defaultValue={member.education_status_id}
                id={"education_status_id-" + memberKey}
                placeholder="शैक्षिक अवस्थाः"
                errors={errors}
              />
              {member.education_status_id == "1" && (
                <div className="child-section">
                  <SelectComponent
                    options={education_leave_reasons}
                    wrapperClass="options-verical"
                    label={"a. विद्यालयनै नजानुको कारण"}
                    name="education_leave_reason"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_leave_reason",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_leave_reason}
                    id={"education_leave_reason-" + memberKey}
                    placeholder="विद्यालयनै नजानुको कारण"
                    errors={errors}
                  />
                </div>
              )}

{member.education_status_id == "2" && (
                <div className="child-section">
                  <SelectComponent
                    options={education_leave_reasons}
                    wrapperClass="options-verical"
                    label={"a. बिद्यालय बिचैमा छोड्‌नुको कारण"}
                    name="education_leave_reason"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_leave_reason",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_leave_reason}
                    id={"education_leave_reason-" + memberKey}
                    placeholder="बिद्यालय बिचैमा छोड्‌नुको कारण"
                    errors={errors}
                  />
                </div>
              )}
              <SelectComponent
                options={education_levels}
                wrapperClass="options-verical"
                label={"28. सदस्यको शैक्षिक स्तरः"}
                name="education_level_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "education_level_id",
                    e.target.value
                  )
                }
                defaultValue={member.education_level_id}
                id={"education_level_id-" + memberKey}
                placeholder="शैक्षिक स्तरः"
                errors={errors}
              />
              {
              member.education_level_id == "8" ||
              member.education_level_id == "9" ||
              member.education_level_id == "10" ? (
                <div className="child-section">
                  <SelectComponent
                    options={education_faculties}
                    wrapperClass="options-verical"
                    label={"a. बिसय"}
                    name="education_faculty"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_faculty",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_faculty}
                    id={"education_faculty-" + memberKey}
                    placeholder="बिसय"
                    errors={errors}
                  />
                </div>
              ) : (
                ""
              )}

              {/* <SelectComponent
                options={yes_nos}
                wrapperClass="options-verical"
                label={"29. अनौपचारिक शिक्षा लिएको छ?"}
                name="has_informal_education"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "has_informal_education",
                    e.target.value
                  )
                }
                defaultValue={member.has_informal_education}
                id={"has_informal_education-" + memberKey}
                placeholder="शैक्षिक स्तरः"
                errors={errors}
              /> */}

{/* { age > 15 && (
  <> */}

{/* <SelectComponent
                options={yes_nos}
                wrapperClass="options-verical"
                label={"30. प्राविधिक सिप"}
                name="has_technical_training"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "has_technical_training",
                    e.target.value
                  )
                }
                defaultValue={member.has_technical_training}
                id={"has_technical_training-" + memberKey}
                placeholder="प्राविधिक सिप"
                errors={errors}
                key={"प्राविधिक सिप ?" + memberKey}
              />

              {member.has_technical_training == "1" && (
                <div className="child-section">
                  {member.technical_skills.map((ts: any, ts_key: any) => (
                    <>
                      <button
                        className="btn btn-outline-secondary btn-sm btn-block"
                        key={"technical_skills" + ts_key}
                        onClick={() =>
                          saveTechSkill(memberKey, "remove", ts.skill_name)
                        }
                      >
                        {ts.skill_name} - {ts.duration}
                      </button>
                      <br />
                    </>
                  ))}
                  <SelectComponent
                    options={technical_skills}
                    wrapperClass="options-verical"
                    label={"a. सिपको नामः"}
                    key={"a.सिपको नामः" + memberKey}
                    name="skill_id"
                    handleChange={handleTechSkillChange}
                    defaultValue={techSkill.skill_id}
                    id={"skill_id-" + memberKey}
                    placeholder="प्राविधिक सिप"
                    errors={errors}
                  />
                  <label className="label">b. सिप हासिलः </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      key={"b सिप हासिलः" + memberKey}
                      name="source"
                      value={techSkill.source}
                      onChange={handleTechSkillChange}
                      
                    >
                      <option
                        value={""}
                        key={"29.0 सिप हासिलःoption-1" + memberKey}
                      >
                        ------ सिप हासिल ------
                      </option>
                      <option
                        value={"0"}
                        key={"29.1 सिप हासिलःoption1" + memberKey}
                      >
                        स्वज्ञान
                      </option>
                      <option
                        value={"1"}
                        key={"29.1 सिप हासिलःoption2" + memberKey}
                      >
                        तालिम
                      </option>
                    </select>
                  </div>
                  {techSkill.source == "1" && (
                    <>
                      <label className="label">
                        c. तालिम लिएको भए तालिमको अविधिः महिनामा{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        key={
                          "तालिम लिएको भए तालिमको अविधिः महिनामा" + memberKey
                        }
                        // value={}
                        onChange={handleTechSkillChange}
                        placeholder="Ex: 3"
                      />
                    </>
                  )}
                  <button
                    onClick={() => saveTechSkill(memberKey, "add")}
                    className="btn btn-sm btn-success"
                  >
                    Add
                  </button>
                </div>
              )} */}
{/* </>
)} */}
<SelectComponent
                options={occupations}
                wrapperClass="options-verical"
                label={"29. मुख्य पेशा"}
                name="main_occupation_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "main_occupation_id",
                    e.target.value
                  )
                }
                defaultValue={member.main_occupation_id}
                id={"main_occupation_id-" + memberKey}
                placeholder="मुख्य पेशा"
                errors={errors}
              />


{ age > 12 && (
  <>

<label className="label" id={"has_voter_card-" + memberKey}>
               30. भोटर कार्ड भएको नभएको ?{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="has_voter_card"
                  key={"भोटर कार्ड भएको नभएको ?" + memberKey}
                  value={member.has_voter_card ?? "0"}
                  onChange={(e) =>
                    handleMemberChange(
                      memberKey,
                      "has_voter_card",
                      e.target.value
                    )
                  }
                >
                  <option value={"0"}>छैन</option>
                  <option value={"1"}>छ</option>
                </select>
              </div>

              {member.has_voter_card == "1" && (
                <div className="child-section">
                  <label
                    className="label"
                    id={"voter_card_location-" + memberKey}
                  >
                    a. भोटर कार्ड कुन स्थानको भएको?
                  </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      name="voter_card_location"
                      key={"भोटर कार्ड भएको नभएको ?" + memberKey}
                      value={member.voter_card_location ?? "0"}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "voter_card_location",
                          e.target.value
                        )
                      }
                    >
                      <option value={"गाउँपालिका"}>गाउँपालिका</option>
                      <option value={"गाउँपालिका बाहिर (रामेछाप जिल्ला)"}>
                        गाउँपालिका बाहिर (रामेछाप जिल्ला)
                      </option>
                      <option value={"काठमान्डौ"}>काठमान्डौ</option>
                      <option value={"अन्य जिल्ला"}>अन्य जिल्ला</option>
                    </select>
                  </div>
                </div>
              )}

</>
)}
              {/* <SelectComponent
                options={occupations}
                wrapperClass="options-verical"
                label={"32. सहायक पेशा:"}
                name="other_occupation_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "other_occupation_id",
                    e.target.value
                  )
                }
                defaultValue={member.other_occupation_id}
                id={"other_occupation_id-" + memberKey}
                placeholder="सहायक पेशा"
                errors={errors}
              /> */}
 {/* <label className="label" id={"has_pension-" + memberKey}>
                33. तपाई पेन्सन बुझ्नुहुन्छ?{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="has_pension"
                  key={"तपाई पेन्सन बुझ्नुहुन्छ?" + memberKey}
                  value={member.has_pension ?? "0"}
                  onChange={(e) =>
                    handleMemberChange(memberKey, "has_pension", e.target.value)
                  }
                >
                  <option value={"0"}>छैन</option>
                  <option value={"1"}>छ</option>
                </select>
              </div> */}
              
{/* {member.has_pension == "1" && (
                <>
                  <label className="label" id={"pension_income-" + memberKey}>
                    a. पेन्सन आम्दानी मासिक (रू.){" "}
                  </label>
                  <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="pension_income"
                      key={"पेन्सन आम्दानी मासिक (रू.)" + memberKey}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "pension_income",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 25000"
                      defaultValue={member.pension_income ?? ""}
                    />
                  </div>
                </>
              )} */}

             
            {/* </div> */}
           
           




            </div>
</>
          )}

{  memberKey% 2 == 1 && (
                <>
            <div
              className={`form-group member-form-two`}
              key={"member-form-one-" + memberKey}
            >
           
                                
                <h5> B.  सदस्यको विवरण</h5>
              <h5> Member: {memberKey + 1} *</h5>
              {  memberKey == 0 && (
                <>

<InputComponent
                name={"first_name"}
                label={"19. घरमुलीको नाम:* "} 
                disabled = {true}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "first_name", e.target.value)
                }
                
                defaultValue={member.first_name}
                palceholder={"नाम"}
                type={"text"}
                id={"first_name-" + memberKey}
                errors={errors}
              />
             
<InputComponent
                name={"last_name"}
                label={"20. घरमुलीको थर:*"}
                disabled = {true}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "last_name", e.target.value)
                }
                defaultValue={member.last_name}
                palceholder={"थर"}
                type={"text"}
                id={"last_name-" + memberKey}
                errors={errors}
              />

<SelectComponent
                options={gender_choice}
                disabled = {true}
                wrapperClass="options-verical"
                label={"21. घरमुलीको लिंग*"}
                name="gender_id"
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "gender_id", e.target.value)
                }
                defaultValue={member.gender_id}
                id={"gender_id-" + memberKey}
                placeholder="लिंग"
                errors={errors}
              />
              <SelectComponent
                options={relations}
                wrapperClass="options-verical"
                label={"22. घरमुलीको नाता: *"}
                disabled = {true}
                name="relation_with_hoh_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "relation_with_hoh_id",
                    e.target.value
                  )
                }
                defaultValue={member.relation_with_hoh_id}
                id={"relation_with_hoh_id-" + memberKey}
                placeholder="नाता"
                errors={errors}
              />
 <InputComponent
                name={"dob_bs"}
                label={`23. घरमुलीको जन्ममितिः * ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => {
                  getAge(memberKey, e.target.value);
                }}
                defaultValue={member.dob_bs}
                palceholder={"Ex: 2065-10-24"}
                type={"text"}
                id={"dob_bs-" + memberKey}
                errors={errors}
              />  
              <InputComponent
                name={"mobile_num"}
                label={"24. घरमुलीको मोवाईल नम्बर:"}
                disabled = {true}
                    wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "mobile_num", e.target.value)
                }
                defaultValue={member.mobile_num}
                palceholder={"मोवाईल नम्बर"}
                type={"number"}
                id={"mobile_num-" + memberKey}
                errors={errors}
              />


{/* <InputComponent
                name={"age"}
                label={` उमेर ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => 
                  handleMemberChange(memberKey, "age", e.target.value)
                }
                defaultValue={member.age ?? age }
                palceholder={"Ex: 14"}
                type={"number"}
                id={"age-" + memberKey}
                errors={errors}
              />  */}







                </>)}
       
               
               
               
                {  memberKey != 0 && (
                <>

<InputComponent
                name={"first_name"}
                label={"19. सदस्यको नाम:*"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "first_name", e.target.value)
                }
                
                defaultValue={member.first_name}
                palceholder={"नाम"}
                type={"text"}
                id={"first_name-" + memberKey}
                errors={errors}
              />
<InputComponent
                name={"last_name"}
                label={"20. सदस्यको थर:*"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "last_name", e.target.value)
                }
                defaultValue={member.last_name}
                palceholder={"थर"}
                type={"text"}
                id={"last_name-" + memberKey}
                errors={errors}
              />

              
              {/* <InputComponent
                name={"citizenship_num"}
                label={"17. सदस्यको नागरिकता नं."}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "citizenship_num",
                    e.target.value
                  )
                }
                defaultValue={member.citizenship_num}
                palceholder={"नागरिकता नं."}
                type={"text"}
                id={"citizenship_num-" + memberKey}
                errors={errors}
              /> */}

            
              <SelectComponent
                options={gender_choice}
                wrapperClass="options-verical"
                label={"21. सदस्यको लिंग *"}
                name="gender_id"
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "gender_id", e.target.value)
                }
                defaultValue={member.gender_id}
                id={"gender_id-" + memberKey}
                placeholder="लिंग"
                errors={errors}
              />
              <SelectComponent
                options={relations}
                wrapperClass="options-verical"
                label={"22. घरमुलीको नाता:*"}
                name="relation_with_hoh_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "relation_with_hoh_id",
                    e.target.value
                  )
                }
                defaultValue={member.relation_with_hoh_id}
                id={"relation_with_hoh_id-" + memberKey}
                placeholder="नाता"
                errors={errors}
              />

               
              <InputComponent
                name={"dob_bs"}
                label={`23. जन्ममितिः * ${age ? `${age} वर्ष` : ""}`}
                wrapperClass={"options-verical"}
                handleChange={(e: any) => {
                  getAge(memberKey, e.target.value);
                }}
                defaultValue={member.dob_bs}
                palceholder={"Ex: 2065-10-24"}
                type={"text"}
                id={"dob_bs-" + memberKey}
                errors={errors}
              />  
             { age > 15 && (
  <>

              <InputComponent
                name={"mobile_num"}
                label={"24. मोवाईल नम्बर:"}
                wrapperClass={"options-verical"}
                handleChange={(e: any) =>
                  handleMemberChange(memberKey, "mobile_num", e.target.value)
                }
                defaultValue={member.mobile_num}
                palceholder={"मोवाईल नम्बर"}
                type={"number"}
                id={"mobile_num-" + memberKey}
                errors={errors}
              />   
                </>)}



</>)}

<label className="label" id={"is_married-" + memberKey}>
                25. वैवाविक स्थितिः{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="is_married"
                  key={"वैवाविक स्थितिः" + memberKey}
                  value={member.is_married ?? ""}
                  onChange={(e) =>
                    handleMemberChange(memberKey, "is_married", e.target.value)
                  }
                >
                  <option value={""}>----- वैवाविक स्थिति ------</option>

                  <option value={"0"}>अविवाहित</option>
                  <option value={"1"}>विवाहित</option>
                </select>
              </div>
              {member.is_married == "1" && (
                <div className="child-section">
                  <label
                    className="label"
                    id={"marital_status_id-" + memberKey}
                  >
                    a. स्थिति{" "}
                  </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      name="marital_status_id"
                      key={"वैवाविक स्थितिः" + memberKey}
                      value={member.marital_status_id ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "marital_status_id",
                          e.target.value
                        )
                      }
                    >
                      {marital_statuses.map((ms, keym) => (
                        <option
                          value={ms.id}
                          key={"वैवाविक स्थितिःoption" + keym}
                        >
                          {ms.name}
                        </option>
                      ))}
                    </select>
                  </div>
                 
                  <label className="label" id={"age_on_marriage-" + memberKey}>
                    b. विबाह हुँदाको उमेर{" "}
                  </label>
                  <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="age_on_marriage"
                      key={"विबाह हुँदाको उमेर" + memberKey}
                      value={member.age_on_marriage ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "age_on_marriage",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 26"
                    />
                  </div>
                 
                 
                  </div>



              )}

                  <label className="label" id={"resident_place-" + memberKey}>
                26. बसोबास गर्ने ठाउः
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="resident_place"
                  key={"बसोबास गर्ने ठाउः" + memberKey}
                  value={member.resident_place ?? ""}
                  onChange={(e) =>
                    handleMemberChange(
                      memberKey,
                      "resident_place",
                      e.target.value
                    )
                  }
                >
                  <option value={""}>----- बसोबास गर्ने ठाउ ------</option>
                  <option value={"गाउँ"}>पुर्ण गाउँ</option>
                  <option value={"काठमान्डौ उपत्यका"}>काठमान्डौ उपत्यका</option>
                  <option value={"गाउँ/शहर"}>गाउँ/शहर</option>
                  <option value={"रामेछाप जिल्ला अन्य पालिका"}>रामेछाप जिल्ला अन्य पालिका</option>
                  <option value={"बागमती प्रदेश"}>बागमती प्रदेश</option>
                  <option value={"बिदेश"}>बिदेश</option>
                  <option value={"अन्य जिल्ला"}>अन्य जिल्ला</option>
                </select>
             
             

                  {/* <label className="label" id={"marriage_year-" + memberKey}>
                    b. विवाह भएको सालः{" "}
                  </label> */}
                  {/* <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="marriage_year"
                      key={"वैवाविक स्थितिः" + memberKey}
                      value={member.marriage_year ?? ""}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "marriage_year",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 2077"
                    />
                  </div> */}

                                

              
              {/* <InputComponent
                label={"25. मासिक आय:"}
                wrapperClass={"options-verical"}
                name={"monthly_income"}
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "monthly_income",
                    e.target.value
                  )
                }
                defaultValue={member.monthly_income}
                palceholder={"मासिक आय"}
                type={"text"}
                id={"monthly_income-" + memberKey}
                errors={errors}
              /> */}
            </div>

            {/* <div
              className={`form-group member-form-two`}
              
              id={14 + 2 + memberKey}
              key={"member-form-two-" + memberKey}
            >
              <h5>शैक्षिक र पेशागत विवरण</h5>
              <h5>Member: {memberKey + 1} **</h5> */}
              


              <SelectComponent
                options={education_statuses}
                wrapperClass="options-verical"
                label={"27.सदस्यको पढाईको अवस्थाः"}
                name="education_status_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "education_status_id",
                    e.target.value
                  )
                }
                defaultValue={member.education_status_id}
                id={"education_status_id-" + memberKey}
                placeholder="शैक्षिक अवस्थाः"
                errors={errors}
              />
              {member.education_status_id == "1" && (
                <div className="child-section">
                  <SelectComponent
                    options={education_leave_reasons}
                    wrapperClass="options-verical"
                    label={"a. विद्यालयनै नजानुको कारण"}
                    name="education_leave_reason"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_leave_reason",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_leave_reason}
                    id={"education_leave_reason-" + memberKey}
                    placeholder="विद्यालयनै नजानुको कारण"
                    errors={errors}
                  />
                </div>
              )}

{member.education_status_id == "2" && (
                <div className="child-section">
                  <SelectComponent
                    options={education_leave_reasons}
                    wrapperClass="options-verical"
                    label={"a. बिद्यालय बिचैमा छोड्‌नुको कारण"}
                    name="education_leave_reason"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_leave_reason",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_leave_reason}
                    id={"education_leave_reason-" + memberKey}
                    placeholder="बिद्यालय बिचैमा छोड्‌नुको कारण"
                    errors={errors}
                  />
                </div>
              )}
              <SelectComponent
                options={education_levels}
                wrapperClass="options-verical"
                label={"28. सदस्यको शैक्षिक स्तरः"}
                name="education_level_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "education_level_id",
                    e.target.value
                  )
                }
                defaultValue={member.education_level_id}
                id={"education_level_id-" + memberKey}
                placeholder="शैक्षिक स्तरः"
                errors={errors}
              />
              {member.education_level_id == "7" ||
              member.education_level_id == "8" ||
              member.education_level_id == "9" ||
              member.education_level_id == "10" ? (
                <div className="child-section">
                  <SelectComponent
                    options={education_faculties}
                    wrapperClass="options-verical"
                    label={"a. बिसय"}
                    name="education_faculty"
                    handleChange={(e: any) =>
                      handleMemberChange(
                        memberKey,
                        "education_faculty",
                        e.target.value
                      )
                    }
                    defaultValue={member.education_faculty}
                    id={"education_faculty-" + memberKey}
                    placeholder="बिसय"
                    errors={errors}
                  />
                </div>
              ) : (
                ""
              )}

              {/* <SelectComponent
                options={yes_nos}
                wrapperClass="options-verical"
                label={"29. अनौपचारिक शिक्षा लिएको छ?"}
                name="has_informal_education"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "has_informal_education",
                    e.target.value
                  )
                }
                defaultValue={member.has_informal_education}
                id={"has_informal_education-" + memberKey}
                placeholder="शैक्षिक स्तरः"
                errors={errors}
              /> */}

{/* { age > 15 && (
  <> */}

{/* <SelectComponent
                options={yes_nos}
                wrapperClass="options-verical"
                label={"30. प्राविधिक सिप"}
                name="has_technical_training"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "has_technical_training",
                    e.target.value
                  )
                }
                defaultValue={member.has_technical_training}
                id={"has_technical_training-" + memberKey}
                placeholder="प्राविधिक सिप"
                errors={errors}
                key={"प्राविधिक सिप ?" + memberKey}
              />

              {member.has_technical_training == "1" && (
                <div className="child-section">
                  {member.technical_skills.map((ts: any, ts_key: any) => (
                    <>
                      <button
                        className="btn btn-outline-secondary btn-sm btn-block"
                        key={"technical_skills" + ts_key}
                        onClick={() =>
                          saveTechSkill(memberKey, "remove", ts.skill_name)
                        }
                      >
                        {ts.skill_name} - {ts.duration}
                      </button>
                      <br />
                    </>
                  ))}
                  <SelectComponent
                    options={technical_skills}
                    wrapperClass="options-verical"
                    label={"a. सिपको नामः"}
                    key={"a.सिपको नामः" + memberKey}
                    name="skill_id"
                    handleChange={handleTechSkillChange}
                    defaultValue={techSkill.skill_id}
                    id={"skill_id-" + memberKey}
                    placeholder="प्राविधिक सिप"
                    errors={errors}
                  />
                  <label className="label">b. सिप हासिलः </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      key={"b सिप हासिलः" + memberKey}
                      name="source"
                      value={techSkill.source}
                      onChange={handleTechSkillChange}
                      
                    >
                      <option
                        value={""}
                        key={"29.0 सिप हासिलःoption-1" + memberKey}
                      >
                        ------ सिप हासिल ------
                      </option>
                      <option
                        value={"0"}
                        key={"29.1 सिप हासिलःoption1" + memberKey}
                      >
                        स्वज्ञान
                      </option>
                      <option
                        value={"1"}
                        key={"29.1 सिप हासिलःoption2" + memberKey}
                      >
                        तालिम
                      </option>
                    </select>
                  </div>
                  {techSkill.source == "1" && (
                    <>
                      <label className="label">
                        c. तालिम लिएको भए तालिमको अविधिः महिनामा{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        key={
                          "तालिम लिएको भए तालिमको अविधिः महिनामा" + memberKey
                        }
                        // value={}
                        onChange={handleTechSkillChange}
                        placeholder="Ex: 3"
                      />
                    </>
                  )}
                  <button
                    onClick={() => saveTechSkill(memberKey, "add")}
                    className="btn btn-sm btn-success"
                  >
                    Add
                  </button>
                </div>
              )} */}
{/* </>
)} */}
<SelectComponent
                options={occupations}
                wrapperClass="options-verical"
                label={"29. मुख्य पेशा"}
                name="main_occupation_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "main_occupation_id",
                    e.target.value
                  )
                }
                defaultValue={member.main_occupation_id}
                id={"main_occupation_id-" + memberKey}
                placeholder="मुख्य पेशा"
                errors={errors}
              />


{ age > 12 && (
  <>

<label className="label" id={"has_voter_card-" + memberKey}>
               30. भोटर कार्ड भएको नभएको ?{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="has_voter_card"
                  key={"भोटर कार्ड भएको नभएको ?" + memberKey}
                  value={member.has_voter_card ?? "0"}
                  onChange={(e) =>
                    handleMemberChange(
                      memberKey,
                      "has_voter_card",
                      e.target.value
                    )
                  }
                >
                  <option value={"0"}>छैन</option>
                  <option value={"1"}>छ</option>
                </select>
              </div>

              {member.has_voter_card == "1" && (
                <div className="child-section">
                  <label
                    className="label"
                    id={"voter_card_location-" + memberKey}
                  >
                    a. भोटर कार्ड कुन स्थानको भएको?
                  </label>
                  <div className="options-vertical">
                    <select
                      className="form-control"
                      name="voter_card_location"
                      key={"भोटर कार्ड भएको नभएको ?" + memberKey}
                      value={member.voter_card_location ?? "0"}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "voter_card_location",
                          e.target.value
                        )
                      }
                    >
                      <option value={"गाउँपालिका"}>गाउँपालिका</option>
                      <option value={"गाउँपालिका बाहिर (रामेछाप जिल्ला)"}>
                        गाउँपालिका बाहिर (रामेछाप जिल्ला)
                      </option>
                      <option value={"काठमान्डौ"}>काठमान्डौ</option>
                      <option value={"अन्य जिल्ला"}>अन्य जिल्ला</option>
                    </select>
                  </div>
                </div>
              )}

</>
)}
              {/* <SelectComponent
                options={occupations}
                wrapperClass="options-verical"
                label={"32. सहायक पेशा:"}
                name="other_occupation_id"
                handleChange={(e: any) =>
                  handleMemberChange(
                    memberKey,
                    "other_occupation_id",
                    e.target.value
                  )
                }
                defaultValue={member.other_occupation_id}
                id={"other_occupation_id-" + memberKey}
                placeholder="सहायक पेशा"
                errors={errors}
              /> */}
 {/* <label className="label" id={"has_pension-" + memberKey}>
                33. तपाई पेन्सन बुझ्नुहुन्छ?{" "}
              </label>
              <div className="options-vertical">
                <select
                  className="form-control"
                  name="has_pension"
                  key={"तपाई पेन्सन बुझ्नुहुन्छ?" + memberKey}
                  value={member.has_pension ?? "0"}
                  onChange={(e) =>
                    handleMemberChange(memberKey, "has_pension", e.target.value)
                  }
                >
                  <option value={"0"}>छैन</option>
                  <option value={"1"}>छ</option>
                </select>
              </div> */}
              
{/* {member.has_pension == "1" && (
                <>
                  <label className="label" id={"pension_income-" + memberKey}>
                    a. पेन्सन आम्दानी मासिक (रू.){" "}
                  </label>
                  <div className="options-vertical">
                    <input
                      type="number"
                      className="form-control"
                      name="pension_income"
                      key={"पेन्सन आम्दानी मासिक (रू.)" + memberKey}
                      onChange={(e) =>
                        handleMemberChange(
                          memberKey,
                          "pension_income",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 25000"
                      defaultValue={member.pension_income ?? ""}
                    />
                  </div>
                </>
              )} */}

             
            {/* </div> */}
           
           




            </div>
</>
          )}


          </>
        ))}
    </>
  );
}
