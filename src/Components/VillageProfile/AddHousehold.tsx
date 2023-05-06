import { useEffect, useState } from "react";
import { getAllUsers, IUser } from "../../db/models/UserModel";
import { householdDefault } from "../../defaultRequired";
import VPForm from "./Forms/VPForm";

export default function AddHousehold() {
  const [auth, setAuth] = useState({} as IUser);

  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    let auth_ = await getAllUsers();
    if (auth_.length) {
      setAuth({ ...auth_[0] });
    }
  };
  return <VPForm data={{ household: {...householdDefault, user_id: auth?.id} }} />;
}
