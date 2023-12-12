"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Web5 } from "@web5/api";

const UserProfile = () => {
  const router = useRouter();
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  //   const [phone, setPhone] = useState("");
  //   const [role, setRole] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [countryCode, setCountryCode] = useState("");
  //   const [city, setCity] = useState("");
  //   const [aboutMe, setAbountMe] = useState("");
  //   const [github, setGithub] = useState("");
  //   const [linkedIn, setLinkedIn] = useState("");
  useEffect(() => {
    const connectWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setDid(did);
    };
    connectWeb5();
  }, []);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    const { record } = await web5.dwn.records.write({
      data: {
        firstName,
        lastName,
        email,
      },
      message: {
        schema: "https://schema.org/Person",
        dataFormat: "application/json",
        published: true,
      },
    });
    const { status } = await record.send(did);
    console.log(status);
  };

  const handleRetrieveProfile = async (e) => {
    e.preventDefault();
    const { records } = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          // protocol: "https://jobster.com/user-profile",
          schema: "https://schema.org/Person",
        },
      },
    });

    for (let record of records) {
      const data = await record.data.json();
      const profile = { record, data, id: record.id };
      setProfile(profile.data);
    }
  };

  const createProtocolDefinition = () => {
    const jobsterProtocolDefinition = {
      protocol: "https://jobster.com/user-profile",
      published: true,
      types: {
        user: {
          schema: "https://schema.org/Person",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        user: {
          $actions: [
            {
              who: "anyone",
              can: "create",
            },
            {
              who: "anyone",
              can: "read",
            },
            {
              who: "author",
              of: "user",
              can: "update",
            },
          ],
        },
      },
    };
    return jobsterProtocolDefinition;
  };

  const queryForProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://jobster.com/user-profile",
        },
      },
    });
  };

  const installProtocolLocally = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  const configureProtocol = async (web5, did) => {
    const protocolDefinition = await createProtocolDefinition();

    const { protocols: localProtocol, status: localProtocolStatus } =
      await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });
    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
      const { protocol, status } = await installProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol.send(did);
      console.log(
        "Did the protocol install on the remote DWN?",
        configureRemoteStatus
      );
    } else {
      console.log("Protocol already installed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleCreateProfile}
        className="flex flex-col gap-3 w-1/2 m-auto mt-3 justify-center"
      >
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="border border-slate-500 px-8 py-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={role}
        placeholder="Title"
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={countryCode}
        placeholder="Country Code"
        onChange={(e) => setCountryCode(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={phone}
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <textarea
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="About me"
        value={aboutMe}
        onChange={(e) => setAbountMe(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="url"
        placeholder="Github"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="url"
        placeholder="Linkedin"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
      /> */}

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Save
        </button>
      </form>

      <h1>Retrieve Profile</h1>
      <form onSubmit={handleRetrieveProfile}>
        <button type="submit">Retrieve</button>
      </form>
      {profile && (
        <div>
          <h2>Profile</h2>
          <p>Name: {profile.firstName}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}
    </>
  );
};

export default UserProfile;
