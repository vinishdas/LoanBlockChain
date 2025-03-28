const teamMembers = [
    {
      name: "Holden Caulfield",
      Usn: "4sf22cs056",
      description: "DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
      image: "https://dummyimage.com/200x200",
    },
    {
      name: "Alper Kamu",
      role: "Designer",
      description: "DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
      image: "https://dummyimage.com/201x201",
    },
    {
      name: "Atticus Finch",
      role: "UI Developer",
      description: "DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
      image: "https://dummyimage.com/204x204",
    },
  ];
  
  const CollegeLoanStaus = () => {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20 ">
            <h1 className="text-2xl font-medium title-font   text-[#008568] tracking-widest text-left mt-10">Loan Verification</h1>
            
          </div>
          <div className="flex flex-wrap -m-4 ">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 lg:w-1/2 rounded-xl hover:border-2 border-[#02C39A] transition-all hover:shadow-2xl  ">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={member.image}
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 className="title-font font-medium text-lg text-gray-900">{member.name}</h2>
                    <h3 className="text-gray-500 mb-3">{member.Usn}</h3>
                    <p className="mb-4">{member.description}</p>
                    <button className="w-[100px] border-2 rounded-lg   p-2 transition-all ease-in active:bg-[#2c9960] active:text-white active:rounded-xl">Confirm</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default CollegeLoanStaus;
  