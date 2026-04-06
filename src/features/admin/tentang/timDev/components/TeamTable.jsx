import { Trash2 } from 'lucide-react';
import InputField from "../../../../../components/common/InputField";
import { useDeleteModal } from '../../../../../store/useDeleteModal';

const TeamTable = ({ teamMembers = [], onDeleteMember, onUpdateMember, errors = {} }) => {
  const { openDeleteModal } = useDeleteModal();

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[750px]"> 
        <div className="bg-[#AA494E] text-white rounded-t-lg">
          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-3 font-medium">Foto</div>
            <div className="col-span-7 font-medium">Jabatan / Tugas</div>
            <div className="col-span-2 font-medium text-center">Aksi</div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-b-lg overflow-hidden">
          {teamMembers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada anggota tim. Klik "Tambah Anggota" untuk menambahkan.
            </div>
          ) : (
            teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="col-span-3">
                  <div className="relative w-16 h-16 mx-auto">
                    <div
                      className={`w-16 h-16 rounded-full bg-gray-200 border-2 ${
                        errors[`teams.${idx}.photo`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } flex items-center justify-center overflow-hidden`}
                    >
                      {member.preview ? (
                        <img
                          src={member.preview}
                          className="w-full h-full object-cover"
                          alt={`Team ${idx}`}
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">Foto</div>
                      )}

                      {!member.preview && (
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) =>
                            onUpdateMember(idx, "photo", e.target.files[0])
                          }
                        />
                      )}
                    </div>

                    {member.preview && (
                      <>
                        <button
                          type="button"
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs z-20 hover:bg-red-600 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateMember(idx, "photo", null);
                          }}
                        >
                          ×
                        </button>

                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) =>
                            onUpdateMember(idx, "photo", e.target.files[0])
                          }
                        />
                      </>
                    )}

                    {errors[`teams.${idx}.photo`] && (
                      <p className="text-red-500 text-xs mt-1 text-center">
                        {errors[`teams.${idx}.photo`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-7 flex flex-col justify-center h-24">
                  <InputField
                    value={member.position}
                    onChange={(e) =>
                      onUpdateMember(idx, "position", e.target.value)
                    }
                    placeholder="Masukkan jabatan/tugas"
                    className={`mb-0 ${
                      errors[`teams.${idx}.position`] ? "border-red-500" : ""
                    }`}
                    error={errors[`teams.${idx}.position`]}
                  />
                </div>

                <div className="col-span-2 flex justify-center items-center">
                  <button
                    type="button"
                    className="p-2 text-red-500 hover:text-red-700 transition-colors relative z-20"
                    onClick={() => openDeleteModal(idx, () => onDeleteMember(idx))}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamTable;
