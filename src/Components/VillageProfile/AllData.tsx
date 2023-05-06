import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getAllHousehold,
  IHousehold,
  updateHousehold,
} from "../../db/models/Household";
import { getMembersbyHousehold } from "../../db/models/Member";
import { getAllUsers, IUser } from "../../db/models/UserModel";

export default function AllData() {
  const [households, setHousholds] = useState([] as IHousehold[]);
  const history = useHistory();
  const [auth, setAuth] = useState({} as IUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHouseholds();
  }, []);

  
  const getHouseholds = async () => {
    let hhs = await getAllHousehold();
    console.log(hhs);
    let hhWithMembers = [] as IHousehold[];
    await Promise.all(
      hhs.map(async (hh) => {
        await getMembersbyHousehold(hh.id.toString());
        hhWithMembers.push(hh);
      })
    );
    setHousholds([...hhWithMembers]);
  };

  const unDeleteHousehold = async (hh: any) => {
    setLoading(true);
    // if (window.navigator.onLine) {
      hh["members"] = await getMembersbyHousehold(hh.id);
      // hh.splice(0, hh.length)
      console.log( hh)
                await updateHousehold({ ...hh, is_deleted: "0" });
                getHouseholds();
              
    // } else {
    //   alert("Please connect to WIFI!");
    // }
    setLoading(false);
  };

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
            <th>सदस्य सं.</th>
            <th>पठाएको</th>
            <th>पुरा भएको</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {households.length ? (
            households.map((hh, key) => (
              <tr key={key}>
                <td>{++key}</td>
                <td>{hh.id} {hh.user_id}</td>
                <td>
                                  <p>{hh.hoh_first_name} {hh.hoh_last_name}</p>
                  </td>
                <td>{hh.members?.length}</td>
                <td>
                  {hh.is_posted == "1" && "हो"}
                  {hh.is_posted == "0" && "होईन"}
                </td>
                <td>
                  {hh.is_complete == "1" && "हो"}
                  {hh.is_complete == "0" && "होईन"}
                </td>
                <td>
                  {hh.is_deleted =="1" &&(
                    <>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => unDeleteHousehold(hh)}
                      >
                        Undelete
                      </button>
                    </>
                  )}
                   {hh.is_posted == "0" && hh.is_deleted =="0" &&(
                    <>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          history.push("/village-profile-app/app/edit/" + hh.id)
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      history.push("/village-profile-app/app/view/" + hh.id)
                    }
                  >
                    View
                  </button>
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
