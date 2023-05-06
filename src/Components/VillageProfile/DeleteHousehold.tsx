import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHouseholdById, IHousehold } from "../../db/models/Household";
import VPForm from "./Forms/VPForm";

export default function DeleteHousehold() {
  let { id } = useParams<{ id: any }>();
  const [household, setHousehold] = useState({} as IHousehold);
  useEffect(() => {
    getHousehold();
  }, []);

  const getHousehold = async () => {
  
    let hh = await getHouseholdById(id);
    setHousehold({ ...hh,is_deleted: "1"});
  };
  if (household) {
    return <VPForm data={{ household: household }} />;
  } else {
    return <div className="vp-home">Server Loading...</div>;
  }
}

