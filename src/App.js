import { MapContainer, TileLayer } from "react-leaflet";
import MarkerPosition from "./MarkerPosition";
import { useState,useEffect } from "react";
import "leaflet/dist/leaflet.css";
import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg.png";
import { map } from "leaflet";
function App() {

  const [Address, setAddress] = useState(null);
  const [ipaddress,setIpAddress]=useState("");

  const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/


  useEffect(() => {
    try{
      const getInitialData=async()=>{
        const res=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=192.212.174.101`);
        const data=await res.json();
        setAddress(data); 
      }
      getInitialData()
    }
    catch(e){
      console.trace(e)
    }
  },[])
  
  const getEnteredAddress = async () => {
    const res=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipaddress)
          ? `ipAddress=${ipaddress}`
          : checkDomain.test(ipaddress)
          ? `domain=${ipaddress}`
          : ""
      }`
      
    )
    const data = await res.json()
    setAddress(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getEnteredAddress()
    setIpAddress("")
  }
  return (
    <>
      <section className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-full h-90 -z-10">
          <img
            src={background}
            alt="background"
            className="w-full h-100 object-cover"
          />
        </div>
        <article className="p-8 relative z-10">
          <h1 className="text-2xl text-center lg:text-3xl text-white font-bold mb-8">
            IP Address Tracker
          </h1>
          <form onSubmit={handleSubmit} autoComplete="off" className="flex justify-center max-w-xl mx-auto">
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address"
              className="py-2 px-4 rounded-l-lg w-full"
              value={ipaddress}
              onChange={(e) => setIpAddress(e.target.value)}
             
            />
            <button
              type="submit"
              className="bg-black py-4 px-2 hover:opacity-80 rounded-r-lg"
            >
              <img src={arrow} alt="arrow" />
            </button>
          </form>
        </article>


       {Address && 
       <>
       <article className="bg-white rounded-lg shadow p-8 mx-8 max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:mx-auto text-center md:text-left lg:-mb-10 relative" style={{zIndex:10000}}>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">
              IP Address
            </h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              {Address.ip}
            </p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">Location</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              {Address.location.city} ,{Address.location.region}
            </p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="text-sm uppercase text-slate-600 mb-3">TimeZone</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              Utc {Address.location.timezone}
            </p>
          </div>
          <div>
            <h2 className="text-sm uppercase text-slate-600 mb-3">ISP</h2>
            <p className="font-semibold text-slate-900 md:text-xl xl:text-2xl">
              {Address.isp}
            </p>
          </div>
        </article>
        <MapContainer
          center={[Address.location.lat, Address.location.lng]}
          zoom={13}
          style={{height:"700px",width:"100vw"}}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPosition Address={Address}/>
        </MapContainer>
       </>
       }
      </section>
    </>
  );
}

export default App;
