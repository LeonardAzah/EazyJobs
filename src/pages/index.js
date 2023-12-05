import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [recipientDid, setRecipientDid] = useState("");

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

  const createProtocolDefinition = () => {
    console.log("this log is in createProtocolDefinition");
  };

  const configureProtocol = async (web5, did) => {
    console.log(`this log is in configureProtocol`);
  };

  const installProtocolLocally = async (web5, protocolDefinition) => {
    console.log(`this log is in installProtocolLocally`);
  };

  const queryForProtocol = async (web5) => {
    console.log(`this log is in queryForProtocol`);
  };

  const writeToDwn = async (ding) => {
    console.log(`this log is in writeToDwn`);
  };

  const handleCopyDid = async () => {
    if (myDid) {
      try {
        await navigator.clipboard.writeText(myDid);
        setDidCopied(true);

        setTimeout(() => {
          setDidCopied(false);
        }, 3000);
      } catch (err) {
        console.log("Failed to copy DID: " + err);
      }
    }
  };

  const fetchSentMessages = async (web5, did) => {
    console.log(`this log is in fetchSentMessages`);
  };

  const fetchReceivedMessages = async (web5, did) => {
    console.log(`this log is in fetchReceivedMessages`);
  };

  const fetchDings = async (web5, did) => {
    console.log(`this log is in fetchDings`);
  };

  const handleStartNewChat = () => {
    setActiveRecipient(null);
    setShowNewChatInput(true);
  };

  const handleSetActiveRecipient = (recipient) => {
    setRecipientDid(recipient);
    setActiveRecipient(recipient);
    setShowNewChatInput(false);
  };

  const handleConfirmNewChat = () => {
    setActiveRecipient(recipientDid);
    setActiveRecipient(recipientDid);
    setShowNewChatInput(false);
    if (!groupedDings[recipientDid]) {
      groupedDings[recipientDid] = [];
    }
  };

  return (
    <div className="app-container">
      <main>
        <Sidebar />
        <section>
          <Dashboard />
        </section>
      </main>
    </div>
  );
}
