//https://geo.ipify.org/api/v2/country,city?apiKey=at_8GYPmhNj8uzngo5SAxUY09DfSI995&ipAddress=8.8.8.8
import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg.png";
function App() {
  return (
    <>
      <section className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-full h-90 -z-10">
          <img
            src={background}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <article className="p-8 relative z-10">
          <h1 className="text-2xl text-center lg:text-3xl text-white font-bold mb-8">
            IP Address Tracker
          </h1>
          <form className="flex justify-center max-w-xl mx-auto">
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address"
              className="py-2 px-4 rounded-l-lg w-full"
            />
            <button
              type="submit"
              className="bg-black py-4 px-2 hover:opacity-80 rounded-r-lg"
            >
              <img src={arrow} alt="arrow" />
            </button>
          </form>
        </article>
        <article className="bg-white rounded-lg shadow p-8 mx-8 max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:mx-auto">
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">
              IP Address
            </h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              192.212.174.101
            </p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">Location</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              Brooklyn
            </p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">TimeZone</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              Utc-5:00
            </p>
          </div>
          <div>
            <h2 className="text-sm uppercase text-slate-600 mb-3">ISP</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              SpaceX
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

export default App;
