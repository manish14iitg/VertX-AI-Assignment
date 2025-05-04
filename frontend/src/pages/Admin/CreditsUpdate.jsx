import React, { useState } from "react";
import { useAppStore } from "../../store/store";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import AdminUserCards from "../../components/AdminUserCards";

function CreditsUpdate() {
  const { userInfo } = useAppStore();
  const [credits, setCredits] = useState(null);

  return (
    <div>
      {userInfo?.role == "admin" && (
        <div>
          <div className="flex ">
            <div className="w-64 flex-shrink-0 h-full sticky top-0">
              <SideBar type="admin" className="sticky" />
            </div>
            <div className="flex flex-col flex-1">
              <Header
                setCredits={setCredits}
                credits={credits}
                className="w-full"
              />
              <AdminUserCards />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditsUpdate;
