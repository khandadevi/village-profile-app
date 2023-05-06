import { useEffect, useState } from "react";
import { IHousehold } from "../../../db/models/Household";
import { gender_choice, residence_types, residence_district } from "../../../enums";
import InputComponent from "./FormComponent/InputComponent";
import RadioComponent from "./FormComponent/RadioComponent";
import SelectComponent from "./FormComponent/SelectComponent";

export default function GharKoBiabarn(props: any) {
  let {
    bastis,
    sabikWards,
    wards,
    margas,
    hh,
    jaatis,
    jaati_samuhas,
    dharmas,
    mother_tongues,
    errors,
  } = props;
  let { handleChange, handleArrayChangeInHousehold } = props;
  const [household, setHousehold] = useState({ ...hh } as IHousehold);
  useEffect(() => {
    setHousehold({ ...hh });
  }, [hh]);

  const checkGeoLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (positions: any) => {
        handleArrayChangeInHousehold("latitude", positions.coords.latitude);
        handleArrayChangeInHousehold("longitude", positions.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getHohPhoto = async () => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      let video = document.querySelector("#hoh_imagevideo") as HTMLVideoElement;
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => (video.srcObject = stream))
        .catch(console.error);

      let click_photo = document.querySelector(
        "#hoh_imageclick-photo"
      ) as HTMLButtonElement;

      video.style.display = "block";
      click_photo.style.display = "block";
      let existingImage = document.getElementById("imageDisplay");
      if (existingImage) {
        existingImage.style.display = "none";
      }
    }
  };

  const clickPhoto = async () => {
    let video = document.querySelector("#hoh_imagevideo") as HTMLVideoElement;
    let canvas = document.querySelector(
      "#hoh_imagecanvas"
    ) as HTMLCanvasElement;
    canvas!.getContext("2d").drawImage(video, 0, 0, 240,320);
    let image_data_url = canvas.toDataURL("image/jpeg");
    video.style.display = "none";
    canvas.style.display = "block";
    let click_photo = document.querySelector(
      "#hoh_imageclick-photo"
    ) as HTMLButtonElement;
    let reset = document.querySelector(
      "#hoh_imagereset-photo"
    ) as HTMLButtonElement;
    click_photo.style.display = "none";
    reset.style.display = "block";
    let existingImage = document.getElementById("imageDisplay");
    if (existingImage) {
      existingImage.style.display = "none";
    }
    handleArrayChangeInHousehold("hoh_image", image_data_url);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false,
      video: {
        facingMode: "environment",
      }, })
stream.getTracks().forEach((track) => track.stop())
  };

  const resetPhoto = async () => {
    let canvas = document.querySelector(
      "#hoh_imagecanvas"
    ) as HTMLCanvasElement;
    let reset = document.querySelector(
      "#hoh_imagereset-photo"
    ) as HTMLButtonElement;
    reset.style.display = "none";
    canvas.style.display = "none";
    let existingImage = document.getElementById("imageDisplay");
    if (existingImage) {
      existingImage.style.display = "none";
    }
    getHohPhoto();
  };
  return (
    <>
      <div className={`form-group`} id="1">
      <h5> A. घरको विवरण</h5>
        <RadioComponent
          options={wards}
          wrapperClass="options-verical"
          label={"1. वडाको नाम"}
          name="ward_id"
          id="ward_id"
          handleChange={handleChange}
          defaultValue={household.ward_id}
          errors={errors}
        />

        <RadioComponent
          options={sabikWards}
          wrapperClass="options-verical"
          label={"2. साविक वडा"}
          // label={"2. टोलको नाम"}
          name="sabikWard_id"
          handleChange={handleChange}
          defaultValue={household.sabikWard_id}
          id={"sabikWard_id"}
          errors={errors}
        />

        <RadioComponent
          options={bastis}
          wrapperClass="options-verical"
          label={"3. बस्तीको नाम"}
          // label={"2. टोलको नाम"}
          name="basti_id"
          handleChange={handleChange}
          defaultValue={household.basti_id}
          id={"basti_id"}
          errors={errors}
        />

        <RadioComponent
          options={margas}
          wrapperClass="options-verical"
          label={"4. टोलको नाम"}
          // label={"3. मार्गको नाम"}
          name="marga_id"
          handleChange={handleChange}
          defaultValue={household.marga_id}
          id={"marga_id"}
          errors={errors}
        />
      </div>

      <div className={`form-group`} id="2">
             <InputComponent
          name={"house_num"}
          label={"5. घर नं."}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.house_num}
          palceholder={"घर नं"}
          type={"number"}
          id={"house_num"}
          errors={errors}
        />

        <InputComponent
          name={"hoh_first_name"}
          label={"6. घरमुलीको नाम"}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.hoh_first_name}
          palceholder={"घरमुलीको नाम"}
          type={"text"}
          id={"hoh_first_name"}
          errors={errors}
        />

        <InputComponent
          name={"hoh_last_name"}
          label={"7. घरमुलीको थर"}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.hoh_last_name}
          palceholder={"घरमुलीको थर"}
          type={"text"}
          id={"hoh_last_name"}
          errors={errors}
        />
         <InputComponent
          name={"hoh_eng_name"}
          label={"8. Household Full Name (English)"}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.hoh_eng_name}
          palceholder={"Household Full Name (English)"}
          type={"text"}
          id={"hoh_eng_name"}
          errors={errors}
        />
       {/* <InputComponent
          name={"hoh_last_name"}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.hoh_last_name}
          palceholder={"घरमुलीको थर (नेपाली)"}
          type={"text"}
          id={"hoh_last_name"}
          errors={errors}
        /> */}
        {/* 
        <RadioComponent
          options={hoh_roles}
          wrapperClass="options-verical"
          label={"6. घरमुली"}
          name="hoh_role"
          handleChange={handleChange}
          defaultValue={household.hoh_role}
          id={"hoh_role"}
          errors={errors}
        /> */}

<InputComponent
          name={"hoh_contact_num"}
          label={" 9. घरमुलीको सम्पर्क"}
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.hoh_contact_num}
          palceholder={"घरमुलीको सम्पर्क"}
          type={"number"}
          id={"hoh_contact_num"}
          errors={errors}
        />


        <RadioComponent
          options={gender_choice}
          wrapperClass="options-verical"
          label={"10. घरमुलीको लिंग"}
          name="hoh_gender"
          handleChange={handleChange}
          defaultValue={household.hoh_gender}
          id={"hoh_gender"}
          errors={errors}
        />
        <SelectComponent
          options={jaati_samuhas}
          wrapperClass="options-verical"
          label={"11. जातजाति समुह"}
          name="jaati_samuha_id"
          handleChange={handleChange}
          defaultValue={household.jaati_samuha_id}
          id={"jaati_samuha_id"}
          placeholder="जातजाति"
          errors={errors}
        />
        <SelectComponent
          options={jaatis}
          wrapperClass="options-verical"
          label={"12. जाति"}
          name="jaati_id"
          handleChange={handleChange}
          defaultValue={household.jaati_id}
          id={"jaati_id"}
          placeholder="जाति"
          errors={errors}
        />
        <SelectComponent
          options={dharmas}
          wrapperClass="options-verical"
          label={"13. धर्म"}
          name="religion_id"
          handleChange={handleChange}
          defaultValue={household.religion_id}
          id={"religion_id"}
          placeholder="धर्म"
          errors={errors}
        />

        <SelectComponent
          options={mother_tongues}
          wrapperClass="options-verical"
          label={"14. मातृभाषा"}
          name="mother_tongue_id"
          handleChange={handleChange}
          defaultValue={household.mother_tongue_id}
          id={"mother_tongue_id"}
          placeholder="मातृभाषा"
          errors={errors}
        />
<RadioComponent
          options={residence_types}
          wrapperClass="options-verical"
          label={"15. बसोबासको प्रकार?"}
          name="resident_type"
          handleChange={handleChange}
          defaultValue={household.resident_type}
          id={"resident_type"}
          errors={errors}
        /> 

{household.resident_type !== "1" && (
          <div className="child-section">
        
        <RadioComponent
          options={residence_district}
          wrapperClass="options-verical"
          label={"a. पूर्व जिल्ला ?"}
          name="resident_district"
          handleChange={handleChange}
          defaultValue={household.resident_district}
          id={"resident_district"}
          errors={errors}
        />

            <InputComponent
              name={"migration_date"}
              label={"b. यस पालिकामा आउनुभएको साल (वि.स.)"}
              wrapperClass={"options-verical"}
              handleChange={handleChange}
              defaultValue={household.migration_date}
              palceholder={"पालिकामा आउनुभएको साल "}
              type={"text"}
              id={"migration_date"}
              errors={errors}
            />
            
          </div>
        )}
{household.resident_type == "3" && (
          <div className="child-section">
        
        
            <InputComponent
              name={"origin_member_count"}
              label={"c.कुल परिवार संख्या (पालिका बाहिर गरी)"}
              wrapperClass={"options-verical"}
              handleChange={handleChange}
              defaultValue={household.origin_member_count}
              palceholder={"कुल परिवार संख्या (पालिका बाहिर गरी) "}
              type={"text"}
              id={"origin_member_count"}
              errors={errors}
            />
            
          </div>
        )}

        <InputComponent
          name={"num_of_member"}
          label={"16. परिवार संख्याः"}
          
          wrapperClass={"options-verical"}
          handleChange={handleChange}
          defaultValue={household.num_of_member}
          palceholder={"परिवार संख्याः"}
          type={"number"}
          id={"num_of_member"}
          errors={errors}
          max={30}
          min={1}
        />
      

        
</div>

      <div className={`form-group`} id="5">
        <label className="label">17. घरमूलीको फोटोः</label>
        <div className="options-verical image-component">
          <video
            id="hoh_imagevideo"
            width="400"
            height="400"
            autoPlay
            style={{ display: "none" }}
          ></video>

          <canvas
            id="hoh_imagecanvas"
            width="240"
            height="320"
            style={{ display: "none" }}
          ></canvas>
          <button
            id="hoh_imageclick-photo"
            className="btn btn-sm btn-success"
            onClick={clickPhoto}
            style={{ display: "none" }}
          >
            Click Photo
          </button>
          <button
            id="hoh_imagereset-photo"
            className="btn btn-sm btn-danger"
            onClick={resetPhoto}
            style={{ display: "none" }}
          >
            Reset
          </button>
          <input
            type="hidden"
            name="hoh_image"
            id="hoh_imageresponder_image"
            onChange={(e) => handleChange(e)}
          />
          {household.hoh_image && household.id && (
            <div id="imageDisplay">
              <img src={household.hoh_image} />
            </div>
          )}
          <button className="btn btn-secondary" onClick={getHohPhoto}>
            घरमूलीको फोटो {household.hoh_image && household.id && "Reset"}
          </button>
        </div>
        <label className="label" id="geo_code">
          18. घरको जियो कोड:
        </label>
        <div className="options-verical">
          {parseFloat(household.latitude) > 0 &&
          parseFloat(household.longitude) > 0 ? (
            <>
              <input
                onChange={null}
                type="number"
                className="form-control geo-field-add-lat"
                value={household.latitude}
                name="latitude"
              />
              <input
                onChange={null}
                type="number"
                className="form-control geo-field-add-long"
                value={household.longitude}
                name="longitude"
              />
            </>
          ) : (
            <>
              <input
                onChange={null}
                type="text"
                className="form-control geo-field-add-lat"
                defaultValue={household.latitude}
                name="latitude"
              />
              <input
                onChange={null}
                type="text"
                className="form-control geo-field-add-long"
                defaultValue={household.longitude}
                name="longitude"
              />
            </>
          )}
          <button className="btn btn-secondary" onClick={checkGeoLocation}>
            घरको जियो कोड
          </button>
        </div>
              
      </div>
    </>
  );
}
