import { MapContainer, TileLayer } from "react-leaflet";
import MarkerPosition from "./MarkerPosition";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import background from "./images/pattern-bg.png";
import "./App.css";

function App() {
  const [Address, setAddress] = useState(null);
  const [ipaddress, setIpAddress] = useState("");

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=192.212.174.101`
        );
        const data = await res.json();
        setAddress(data);
      } catch (e) {
        console.trace(e);
      }
    };
    getInitialData();
  }, []);

  const getEnteredAddress = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipaddress)
          ? `ipAddress=${ipaddress}`
          : checkDomain.test(ipaddress)
          ? `domain=${ipaddress}`
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  };

  return (
    <>
      <section className="relative">
        <div className="absolute w-full -z-10">
          <img
            src={background}
            alt="background"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="max-w-xl mx-auto p-8">
          <h1 className="font-bold text-2xl lg:text-3xl text-white pb-8 text-center">
            IP Address Tracker
          </h1>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="w-full flex"
          >
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address or domain"
              className="w-full py-2 px-4 rounded-l-lg focus:outline-none"
              value={ipaddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black py-2 px-4 rounded-r-lg text-white"
            >
              My IP Address
            </button>
          </form>
        </div>

        {Address && (
          <>
            <article className="contaent p-8">
              <div
                className="bg-white rounded-xl p-8 shadow max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left -mb-12 relative lg:-mb-32"
                style={{
                  zIndex: 10000,
                }}
              >
                <article className="lg:border-r lg:border-slate-400 p-6">
                  <h2 className="text-sm uppercase text-slate-600">
                    IP Address
                  </h2>
                  <p className="font-bold text-slate-900 text-2xl">
                    {Address.ip}
                  </p>
                </article>

                <article className="lg:border-r lg:border-slate-400 p-6">
                  <h2 className="text-sm uppercase text-slate-600">Location</h2>
                  <p className="font-bold text-slate-900 text-2xl">
                    {Address.location.city}, {Address.location.region}
                  </p>
                </article>

                <article className="lg:border-r lg:border-slate-400 p-6">
                  <h2 className="text-sm uppercase text-slate-600">Timezone</h2>
                  <p className="font-bold text-slate-900 text-2xl">
                    UTC {Address.location.timezone}
                  </p>
                </article>

                <article className="p-6">
                  <h2 className="text-sm uppercase text-slate-600">ISP</h2>
                  <p className="font-bold text-slate-900 text-2xl">
                    {Address.isp ? Address.isp : "Not Found"}
                  </p>
                </article>
              </div>
            </article>
            <MapContainer
              center={[Address.location.lat, Address.location.lng]}
              zoom={13}
              className="MapContainer"
              style={{ height: "100vh", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerPosition Address={Address} />
            </MapContainer>
          </>
        )}
      </section>
    </>
  );
}

export default App;
