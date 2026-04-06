import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import clsx from "clsx";
import TasksTab from "./tabs/TaskTab";
import JournalTab from "./tabs/JournalTab";
import StudentTab from "./tabs/StudentTab";
import { useClassController } from "../hooks/useClassController";

export default function ClassDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("students");
  const { handleShow, loading, selectedItem } = useClassController();

  useEffect(() => {
    if (id) {
      handleShow(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="p-6 text-red-600">
        Kelas tidak ditemukan.
      </div>
    );
  }

  const data = selectedItem;

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs 
        role="sekolah" 
        manual={[
          { label: `${data.name} (${data.teacher.name})` }
        ]}
      />

      <PageHeader
        title={data.name}
        subtitle={`Oleh: ${data.teacher.name}`}
        stats={[
          `${data.total_students} Siswa`,
          `${data.total_assignments} Tugas`,
          `${data.total_journals} Jurnal`
        ]}
        backgroundImage={data.background.image}
      />

      <div className="flex flex-col">
        <div className="flex flex-wrap justify-start gap-6 text-sm md:text-base">
          {[
            { key: "students", label: "Daftar Siswa" },
            { key: "tasks", label: "Daftar Tugas" },
            { key: "journals", label: "Daftar Jurnal" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={clsx(
                "pb-2 transition-colors inter text-xs duration-200 relative whitespace-nowrap",
                activeTab === item.key
                  ? "text-[#464646] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary-red after:rounded-full"
                  : "text-[#464646] hover:text-[#000405] font-medium"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="h-[0.5px] bg-[#D9D9D9] w-full"></div>
      </div>

      <div>
        {activeTab === "tasks" && (
          <TasksTab classId={id}  />
        )}

        {activeTab === "journals" && (
          <JournalTab classId={id} />
        )}

        {activeTab === "students" && (
          <StudentTab 
            classId={id}  
          />
        )}
      </div>
    </div>
  );
}