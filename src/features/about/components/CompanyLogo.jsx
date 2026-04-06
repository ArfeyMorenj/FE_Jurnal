const CompanyLogo = ({ companies = [] }) => {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {companies.map((company, index) => (
            <div key={company.id || index} className="group relative">
              <div
                className="
                  aspect-square 
                  bg-white 
                  rounded-full 
                  shadow-lg 
                  hover:shadow-2xl 
                  transition-all 
                  duration-300 
                  flex 
                  items-center 
                  justify-center 
                  p-6 
                  sm:p-8 
                  lg:p-10
                  group-hover:scale-105
                  border border-gray-100
                "
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
