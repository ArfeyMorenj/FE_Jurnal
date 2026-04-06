import React, { useEffect, useState, useMemo } from 'react';
import Button from '../../../components/common/Button';
import JourneyCard from '../components/JourneyCard';
import TeamCircles from '../components/TeamCircles';
import CompanyLogo from '../components/CompanyLogo';
import { FiTrendingUp } from "react-icons/fi";
import { SECTION_IDS } from '../../../constants/sections';
import { useHistory } from '../../admin/tentang/hostory/hooks/useHistory';
import LoadingSpinner from '../../../components/LoadingSpinner';
import HtmlText from '../../../utils/HtmlText';
import useAboutSection from '../../admin/tentang/tentang-kami/controller/useAboutSection';
import { useParsedAbout } from '../hooks/useParsedAbout';
import { useTableHistory } from '../../admin/tentang/hostory/hooks/useTableHistory';
import { useSponsorSection } from '../../admin/tentang/sponsor/hooks/useSponsorSection';
import useTeamDevSection from '../../admin/tentang/timDev/controller/useTeamDevSection';


export default function MiJurnalAbout() {
  const { aboutData, fetchAbout, dataVersion } = useAboutSection();
  const { history, loading: loadingHistory } = useHistory(SECTION_IDS.TENTANG_KAMI);
  const { list, loading } = useTableHistory(SECTION_IDS.TENTANG_KAMI);
  const { fetchData, loading: loadingSponsor } = useSponsorSection(SECTION_IDS.TENTANG_KAMI);

  const [sponsorDescription, setSponsorDescription] = useState("");
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();

      if (data) {
        setSponsorDescription(data.description);

        const formatted = (data.image || []).map((img, index) => ({
          id: index,
          logo: img.image,
          name: data.description
        }));

        setSponsors(formatted);
      }
    };

    load();
  }, []); 

  const { teamData, loading: loadingTeam } = useTeamDevSection();


  useEffect(() => {
    if (dataVersion > 0) {
      fetchAbout();
    }
  }, [dataVersion, fetchAbout]);

  const { paragraph1, paragraph2, imgAbout, imgStory } = useParsedAbout(aboutData);

  if (loadingHistory) return <LoadingSpinner />;
  
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-2 md:px-6 py-16">

        <section className="mb-5">
          <div className="flex flex-row gap-2 md:gap-6 items-stretch">
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div
                className="shadow-2xl w-[30px] h-[25px] md:w-[64.41px] md:h-[57.34px] bg-gradient-to-r from-[#E45E14] to-[#CA2323]"
                style={{
                  maskImage: "url(/svg/Vector6.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "url(/svg/Vector6.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
              <div className="border-l-2 border-[#E45E14] h-full" />
            </div>

            <div className="flex-1">
              <h2 className="text-[20px] font-semibold text-[#D22027] mb-4">
                TENTANG KAMI
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div
                    className="text-black/70 text-base md:text-[24px]"
                    dangerouslySetInnerHTML={{ __html: paragraph1 }}
                  />

                  <div
                    className="text-black/70 leading-relaxed text-sm md:text-[20px] mt-6 mb-4 md:mb-16"
                    dangerouslySetInnerHTML={{ __html: paragraph2 }}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <div className="relative w-[250px] h-[250px] mx-auto">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${imgAbout})` }}
                    />
                    <img
                      src="/images/backgrounds/Vector3.png"
                      alt="vector3"
                      className="absolute -top-4 left-0 w-20 h-20"
                    />
                    <img
                      src="/images/backgrounds/Vector3.png"
                      alt="vector3"
                      className="absolute bottom-0 right-1 w-16 h-16"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cerita Kami */}
        <section>
          <div className="flex gap-4 md:gap-12 items-stretch">
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div
                className="shadow-2xl w-[30px] h-[25px] md:w-[64.41px] md:h-[57.34px] bg-gradient-to-r from-[#E45E14] to-[#CA2323]"
                style={{
                  maskImage: "url(/svg/Vector6.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "url(/svg/Vector6.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
              <div className="border-l-2 border-[#E45E14] h-full" />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="mb-4">
                <h2 className="text-[20px] font-semibold text-[#E45E14]">
                  CERITA KAMI
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div
                    className="text-gray-700 text-base md:text-2xl leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: aboutData?.description_story_us || "",
                    }}
                  />
                </div>

                <div className="w-full md:w-auto">
                  <div className="relative w-[300px] h-[300px] mx-auto">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${imgStory})` }}
                    />
                    <img
                      src="/images/backgrounds/Vector3.png"
                      alt="vector3"
                      className="absolute -top-4 left-0 w-24 h-24"
                    />
                    <img
                      src="/images/backgrounds/Vector3.png"
                      alt="vector3"
                      className="absolute bottom-0 right-1 w-18 h-18"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-6 flex flex-col md:flex-row items-start gap-4">
                  <div
                    className="text-black/70 text-[20px] md:text-[28px] font-semibold md:max-w-[70%]"
                    dangerouslySetInnerHTML={{
                      __html: aboutData?.description_achievement || "",
                    }}
                  />
                  <img
                    src="/svg/medal-star.svg"
                    alt="medal-star"
                    className="w-28 h-28 mt-32"
                  />
                </div>
              </div>
              <div className="w-full mt-20 text-center px-4">
                <p className="text-[24px] md:text-[32px] font-bold">
                  {teamData?.deskripsiSingkat || "Loading..."}
                </p>
              </div>
              <div className="mt-20">
                <TeamCircles teams={teamData.teamMembers} />

              </div>

              <div className="mt-20 flex flex-col lg:flex-row items-center justify-center gap-8">
      
              <div className="flex flex-col items-start gap-4">
                <p className="text-[20px] md:text-[24px] font-medium max-w-[700px]">
                {sponsorDescription || "Loading..."}
                </p>

                <div
                  className="shadow-2xl w-[30px] h-[25px] md:w-[64.41px] md:h-[57.34px] bg-gradient-to-r from-[#E45E14] to-[#CA2323]"
                  style={{
                    maskImage: "url(/svg/Vector6.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: "url(/svg/Vector6.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
              </div>

              <CompanyLogo companies={sponsors} />

            </div>

              {loadingHistory ? (
                <div className="flex justify-center items-center py-20 w-full">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="mt-20">
                  <p className="text-[24px] font-semibold mb-4">{history?.history_title}</p>
                  <img src="/svg/star.svg" alt="starr" className="mb-4" />

                  <div className="w-full">
                    <div className="overflow-x-auto hide-scrollbar p-2">
                      <div className="flex gap-4 w-max">
                        {list.map((journey) => (
                          <JourneyCard
                            key={journey.id}
                            year={journey.year}
                            description={journey.description}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center gap-10 mt-20 w-full mb-20">
                    <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium max-w-[620px] text-center lg:text-left leading-relaxed">
                      {history?.presentation_description}
                    </p>

                    <div className="flex items-end gap-6">
                      <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-full border-[3px] md:border-[4px] border-orange-600 flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-orange">
                          {history?.presentation_value}%
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-end gap-2">
                        <FiTrendingUp className="w-10 h-10 sm:w-12 sm:h-12 md:w-30 md:h-30 text-[#C73A2F]" strokeWidth={2.2} />
                        <div className="h-[3px] w-10 sm:w-12 md:w-20 bg-red-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        <section className="overflow-x-hidden px-3">
          <div className="bg-gradient-to-bl from-[#CA2323] to-[#E45E14] rounded-3xl w-full max-w-[1345px] mx-auto px-5 md:pl-3.5">
            <div className="flex gap-6 md:gap-10">
              <div className="flex flex-col items-center flex-shrink-0 mb-20 pt-8 md:pt-0">
                <div className="h-6 w-[2px] bg-white hidden md:block"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="flex-1 w-[2px] bg-white"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 text-white mt-3 px-4 py-8">
                <div className="mb-6 space-y-6">
                  <HtmlText
                    html={history?.commitment_long_description}
                    className="text-white/90 leading-relaxed"
                    limit={null}
                  />
                </div>
                 <div className="flex justify-center mt-6">
                  <img
                    src="/svg/Group3265.svg"
                    alt=""
                    className="w-[120px] sm:w-[150px] md:w-[300px] lg:w-[770px] h-auto"
                  />
                </div>
                <div className="w-full max-w-[800px] mx-auto mt-8 px-2">
                  <p className="text-center font-bold text-[20px] sm:text-[28px] md:text-[42px] lg:text-[60px] leading-tight">
                  {history?.commitment_short_description}
                  </p>
                </div>
                <div className="flex justify-center mt-6 sm:mt-8">
                  <a
                    href="https://play.google.com/store/apps/developer?id=Hummatech"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="bg-white border-2 border-orange-500 rounded-[15px] px-4 sm:px-5 md:px-16 py-2 md:py-4 font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2"
                    >
                      <img
                        src="/images/backgrounds/google-play.png"
                        alt="Google Play"
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-15 md:h-15"
                      />
                      <div className="leading-tight">
                        <p className="text-[10px] sm:text-sm text-black">DAPATKAN DI</p>
                        <p className="font-extrabold text-xs sm:text-sm md:text-[30px] text-black">Google Play</p>
                      </div>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}