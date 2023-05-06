import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getIncompleteHouseholds, IHousehold } from "../../db/models/Household";
import { getMembersbyHousehold } from "../../db/models/Member";
import { getAllUsers, IUser } from "../../db/models/UserModel";

export default function IncompleteData() {
  const [households, setHousholds] = useState([] as IHousehold[]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    checkUser();
  }, []);

  const getHouseholds = async (auth_: IUser) => {
    setLoading(true);
    let hhs = await getIncompleteHouseholds(auth_.id ? auth_.id.toString() : "");
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

  const checkUser = async () => {
    let auth_ = await getAllUsers();
    if (auth_.length) {
      getHouseholds(auth_[0]);
    }
  };
  console.log(households);
  if (loading) {
    return <div className="vp-home">Loading...</div>;
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
            <th>SN</th>
            <th>Id</th>
            <th>HOH</th>
            <th>Members</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {households.length ? (
            households.map((hh, key) => (
              <tr key={key}>
                <td>{++key}</td>
                <td>{hh.id}</td>
                <td>{hh.hoh_first_name}</td>
                <td>{hh.members?.length}</td>
                <td>
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
