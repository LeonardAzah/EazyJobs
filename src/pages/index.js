import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import profile from "./profile";

export default function Home() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);
      if (web5 && did) {
        await configureProtocol(web5, did);
        await fetchDings(web5, did);
      }
    };
    initWeb5();
  }, []);

  useEffect(() => {
    if (!web5 || !myDid) return;
    const intervalId = setInterval(async () => {
      console.log(`this log is in intervalId`);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [web5, myDid]);

  return (
    <div className="app-container">
      <main>
        <Sidebar />
        <section>
          <profile />
        </section>
      </main>
    </div>
  );
}
