import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../Api/api";
import {
  getPendingHouseholds,
  IHousehold,
  updateHousehold,
} from "../../db/models/Household";
import {
  getMembersbyHousehold,
} from "../../db/models/Member";
import { getAllUsers, IUser } from "../../db/models/UserModel";

export default function PendingData() {
  const [households, setHousholds] = useState([] as IHousehold[]);
  const [auth, setAuth] = useState({} as IUser);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    checkUser();
  }, []);

  const getHouseholds = async (auth_: IUser) => {
    setLoading(true);
    console.log(auth_);
    let hhs = await getPendingHouseholds();
       let hhWithMembers = [] as IHousehold[];
    await Promise.all(
      hhs.map(async (hh) => {
        await getMembersbyHousehold(hh.id.toString());
        hhWithMembers.push(hh);
      })
    );
    setHousholds([...hhWithMembers]);
    setLoading(false);
  };


  const deleteHousehold = async (hh: any) => {
    setLoading(true);
    // if (window.navigator.onLine) {
      hh["members"] = await getMembersbyHousehold(hh.id);
      // hh.splice(0, hh.length)
      console.log( hh)
                await updateHousehold({ ...hh, is_deleted: "1" });
                getHouseholds(auth);
              
    // } else {
    //   alert("Please connect to WIFI!");
    // }
    setLoading(false);
  };
  const postHousehold = async (hh: any) => {
    setLoading(true);
    if (window.navigator.onLine) {
      hh["members"] = await getMembersbyHousehold(hh.id);
      try{
        let res = await api.postHousehold(hh);
        if (res.status === 200) {
          await updateHousehold({ ...hh, is_posted: 1 });
        }else{
          alert(res.data.message)
        }
        getHouseholds(auth);
      }catch(e:any){
        alert(e.toString());
      }
      
    } else {
      alert("Please connect to WIFI!");
    }
    setLoading(false);
  };

  const checkUser = async () => {
    let auth_ = await getAllUsers();
    if (auth_.length) {
      setAuth({ ...auth_[0] });
      getHouseholds(auth_[0]);
    }
  };
  if (loading) {
    return <div className="vp-home">Sending...</div>;
  }
  return (
    <div>
      <button
        className="btn btn-warning back-btn"
        onClick={() => history.goBack()}
      >
        Back
      </button>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>क्र.सं.</th>
            <th>आईडी</th>
            <th>घरमुली</th>
            <th>सदस्य सख्या</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {households.length ? (
            households.map((hh, key) => (
              <tr key={key}>
                <td>{++key}</td>
                <td>{hh.id}</td>
                <td>
                  <p>{hh.hoh_first_name} {hh.hoh_last_name}</p>
                  </td>
                <td>{hh.members.length}</td>
                <td>
                  {hh.is_posted == "0" && (
                    <>
                   <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteHousehold(hh)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          history.push("/village-profile-app/app/edit/" + hh.id)
                        }
                      >
                        Edit
                      </button>
                     
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          history.push("/village-profile-app/app/view/" + hh.id)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => postHousehold(hh)}
                      >
                        Send
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
