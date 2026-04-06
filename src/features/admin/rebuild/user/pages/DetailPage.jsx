import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { useUserController } from "../hooks/useUserController";
import ProfileCard from "../components/ProfileCard";
import UserInfoCard from "../components/UserInfoCard";
import UserStatsCard from "../components/UserStatsCard";
import ErrorState from "../components/ErrorState";
import {
  getMappedRole,
  getUserStatus,
  getRoleChecks,
} from "../helper/userDetailHelper";

export default function DetailUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowByRole, loading } = useUserController();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const userRole = location.state?.role;

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const data = await handleShowByRole(id, userRole);
        if (data) {
          setUser(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching user detail:", err);
        setError(true);
      }
    };

    if (userRole) {
      fetchUserDetail();
    } else {
      setError(true);
    }
  }, [id, userRole]);

  if (loading) {
    return (
      <div className="max-w-7xl">
        <BreadCrumbs 
        manual={[
          { label: "Detail Pengguna" },
        ]}/>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return <ErrorState onBack={() => navigate(-1)} />;
  }

  const mappedRole = getMappedRole(user);
  const userStatus = getUserStatus(user);
  const isPremium = user.is_premium === 1 || user.profile?.is_premium === 1;
  const { isTeacher, isStudent, isSchool } = getRoleChecks(mappedRole);

  return (
    <div className="max-w-7xl flex flex-col gap-6">
      <BreadCrumbs manual={[
          { label: "Detail Pengguna" },
        ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            user={user}
            mappedRole={mappedRole}
            userStatus={userStatus}
            isPremium={isPremium}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <UserInfoCard user={user} mappedRole={mappedRole} />

          <UserStatsCard
            user={user}
            isTeacher={isTeacher}
            isStudent={isStudent}
            isSchool={isSchool}
          />

          <div className="bg-white shadow-md rounded-xl p-4 flex justify-end">
            <button
              className="px-6 py-2 bg-[#8B8B8B] text-white hover:bg-gray-600 rounded-lg transition-colors"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}