import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import TextArea from '../../../../components/common/TextArea';
import TeamTable from './components/TeamTable';
import ActionButtons from '../components/ActionButtons';
import { CARD_STYLES } from '../constants/tentangConstants';

import { useTeamForm } from './hooks/useTeamForm';
import { useTeamSection } from './hooks/useTeamSection';
import { SECTION_IDS } from '../../../../constants/sections';
import DeleteConfirmModal from '../../../../components/DeleteConfirmModal';

const Page = () => {

  const navigate = useNavigate();
  const sectionId = SECTION_IDS.TENTANG_KAMI;

  const {
    form,
    errors,
    setDescription,
    setPosition,
    setPhotoFile,
    resetTeam,
    setFromApi,
    validate,
    buildPayload,
  } = useTeamForm();

  const {
    loading,
    teamId,
    fetchData,
    createTeam,
    updateTeam
  } = useTeamSection(sectionId);

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      if (data) setFromApi(data);
    };
    load();
  }, []);


  const submitAndBack = async () => {
    if (!validate()) return;

    const payload = buildPayload();

    const ok = teamId
      ? await updateTeam(payload)
      : await createTeam(payload);

    if (ok) navigate("/admin/tentang");
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Section Tim Developer Tentang Kami
          </h1>
          <BreadCrumbs manual={[{ label: "Section Tim Dev", path: "/admin/tentang/tim-dev" }]} />
        </div>

        <div className={`${CARD_STYLES.MAIN} p-8`}>
          <div className="mb-8">
            <h2 className="text-[15px] font-bold">Section Tim Developer MiJurnal</h2>
            <p className="text-gray-500 text-xs">
              Akan tampil di bagian tengah halaman tentang kami.
            </p>
            <hr className="border border-[#D9D9D9] my-6" />
          </div>

          <TextArea
            label="Deskripsi Singkat Halaman Tim"
            name="description"
            value={form.description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Masukkan deskripsi singkat sebagai pembuka tim develop"
            required
            rows={4}
            error={errors.description}
          />

          <TeamTable
            teamMembers={form.teams}
            onDeleteMember={(idx) => resetTeam(idx)}
            onUpdateMember={(idx, field, value) => {
              if (field === "position") setPosition(idx, value);
              if (field === "photo") setPhotoFile(idx, value);
            }}
            errors={errors} 
          />
        </div>

        <div className={`${CARD_STYLES.ACTION} mt-6`}>
          <ActionButtons
            onSave={submitAndBack}
            onCancel={() => navigate(-1)}
            loading={loading}
          />
        </div>
      </div>

      <DeleteConfirmModal />
    </div>
  );
};

export default Page;