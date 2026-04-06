import React from 'react';

const TeamCircles = ({ teams = [] }) => {
  const displayTeams = teams
    .filter(team => team && (team.position || team.photo_url))
    .slice(0, 5);

  const showVectors = displayTeams.length >= 1;

  return (
    <div className="w-full py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="relative w-full">

          {showVectors && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 hidden lg:block bg-gradient-to-r from-[#E45E14] to-[#CA2323]"
              style={{
                backgroundColor: "#F36A3E",
                maskImage: 'url(/svg/Vector6.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/svg/Vector6.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center'
              }}
            />
          )}

          {showVectors && (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 hidden lg:block bg-gradient-to-r from-[#E45E14] to-[#CA2323]"
              style={{
                backgroundColor: "#F36A3E",
                maskImage: 'url(/svg/Vector6.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/svg/Vector6.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center'
              }}
            />
          )}

          <div className="flex flex-wrap justify-center items-end gap-4 lg:gap-0 lg:justify-center relative">
            {displayTeams.map((team, index) => (
              <div
                key={team.id || index}
                className="flex flex-col items-center group transition-transform duration-300 hover:scale-110 hover:z-50 lg:-ml-12 first:ml-0"
                style={{ zIndex: displayTeams.length - index }}
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-[209px] lg:h-[209px] rounded-full overflow-hidden shadow-xl ring-4 ring-white transition-all duration-300 group-hover:shadow-2xl">
                  <img
                    src={team.photo || "/images/default-avatar.png"}
                    alt={team.position}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center mt-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {team.position || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeamCircles;
