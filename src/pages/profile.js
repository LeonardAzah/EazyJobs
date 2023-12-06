import { useState, useEffect } from "react";
import InputArea from "@/components/InputArea";
import InputField from "@/components/InputField";
import ProfilePictureUploader from "@/components/ProfilePictureUploader";
import React from "react";
import profileSchema from "@/schema/profileSchema";
import profileProtocol from "@/protocols/profileProtocol";
import { Web5 } from "@web5/api";

const profile = () => {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");
  const [aboutMe, setAbountMe] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);
      if (web5 && did) {
        await configureProtocol(web5, did);
        await fetchProfile(web5, did);
      }
    };
    initWeb5();
  }, []);

  const createProtocolDefinition = () => {
    console.log("this log is in createProtocolDefinition");
  };

  const installProtocolLocally = async (web5, protocolDefinition) => {
    console.log(`this log is in installProtocolLocally`);
  };

  const queryForProtocol = async (web5) => {
    console.log(`this log is in queryForProtocol`);
  };

  const configureProtocol = async (web5, did) => {
    // query the list of existing protocols on the DWN
    const { protocols, status } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: profileProtocol,
        },
      },
    });

    if (status.code !== 200) {
      alert("Error querying protocols");
      console.error("Error querying protocols", status);
      return;
    }

    // if the protocol already exists, we return
    if (protocols.length > 0) {
      console.log("Protocol already exists");
      return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } =
      await web5.dwn.protocols.configure({
        message: {
          definition: protocolDefinition,
        },
      });

    console.log("Protocol configured", configureStatus, protocol);
  };
  const createProfile = async () => {
    const profile = {
      firstName,
      lastName,
      email,
      phone,
      role,
      aboutMe,
      country,
      city,
      countryCode,
      phone,
      github,
      linkedIn,
    };

    // Create the record in DWN
    const { record } = await web5.dwn.records.create({
      data: profile,
      message: {
        schema: profileSchema,
        dataFormat: "application/json",
      },
    });
    console.log(record);
    return record;
  };

  const fetchProfile = async (web5, did) => {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: schema,
        },
      },
    });
    return records;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createProfile();
  };

  return (
    <div className="p-3">
      <div>
        <form onSubmit={onSubmit}>
          <InputField
            label="First Name"
            name="firstName"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputArea
            label="About me"
            type="text"
            name="aboutMe"
            value={aboutMe}
            onChange={(e) => setAbountMe(e.target.value)}
          />
          <InputField
            label="Country"
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <InputField
            label="City"
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputField
            label="Country code"
            name="countryCode"
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />

          <InputField
            label="Phone"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            label="Github Link"
            name="github"
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <InputField
            label="Linkedin"
            name="linkedIn"
            type="url"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <InputField
            label="Prefered Role"
            name="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default profile;
