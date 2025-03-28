import fincace from "../assets/undraw_finance_m6vw.svg"

const HeroSection = (props) => {
    return (
      <section className="text-gray-600 body-font m-20">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900  ">
            <span className="text-[#11B5A3] font-bold">UniFund</span> – Secure Student Loans 
              <br className="hidden lg:inline-block" />
              with Blockchain
            </h1>
            <p className="w-2xl mb-8 leading-relaxed opacity-65 ">
            EduFundChain uses blockchain to provide secure, transparent, and fast student loans, ensuring hassle-free approvals and fair terms.
            </p>
            <div className="flex justify-center">
             {props.User =="Student" &&<button className="inline-flex text-white  bg-gradient-to-r from-[#11B5A3] to-[#028090] border-0 py-2 px-6 focus:outline-none hover:brightness-110 rounded text-lg">
                Apply Loan
              </button>}
             
              
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={fincace}
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  