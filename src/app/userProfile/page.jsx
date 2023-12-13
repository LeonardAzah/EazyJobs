"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Web5 } from "@web5/api";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import Link from "next/link";
import { BsBackpack4Fill } from "react-icons/bs";
import ProfileModal from "@/components/ProfileModal";

const UserProfile = () => {
  const router = useRouter();
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [careerModal, setCareerModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");
  const [aboutMe, setAbountMe] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [companyName, setCompnayName] = useState("");
  const [position, setPosition] = useState("");
  const [term, setTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [institution, setInstitution] = useState("");
  const [field, setField] = useState("");
  const [degree, setDegree] = useState("");
  const [edStartDate, setEdStartDate] = useState("");
  const [edEndDate, setEdEndDate] = useState("");

  const [showButton, setShowButton] = useState(false);
  const [showButtonEd, setShowButtonEd] = useState(false);
  const [edModal, setEdModal] = useState(false);
  const [careers, setCareers] = useState([]);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const connectWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setDid(did);
      if (web5 && did) {
        await getProfile(web5);
        await getCareers(web5);
        await getEducations(web5);
      }
    };
    connectWeb5();
  }, []);

  const getCareers = async (web5) => {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: "https://schema.org/Occupation",
        },
        dateSort: "createdAscending",
      },
    });
    for (let record of records) {
      const data = await record.data.json();
      const career = { record, data, id: record.id };
      setCareers([...careers, career]);
      console.log(career);
    }
  };

  const getEducations = async (web5) => {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: "https://schema.org/EducationalOccupationalProgram",
        },
        dateSort: "createdAscending",
      },
    });
    for (let record of records) {
      const data = await record.data.json();
      const education = { record, data, id: record.id };
      setEducations([...educations, education]);
      console.log(education);
    }
  };
  const handleCreateProfile = async (e) => {
    e.preventDefault();
    const { record } = await web5.dwn.records.write({
      data: {
        firstName,
        lastName,
        email,
        role,
        phone,
        country,
        countryCode,
        city,
        aboutMe,
        github,
        linkedIn,
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

  const handleEducationalProfile = async (e) => {
    e.preventDefault();
    const { record } = await web5.dwn.records.write({
      data: {
        institution,
        field,
        degree,
        edEndDate,
        edEndDate,
      },
      message: {
        schema: "https://schema.org/EducationalOccupationalProgram",
        dataFormat: "application/json",
        published: true,
      },
    });
    const data = await record.data.json();
    const education = { record, data, id: record.id };
    setEducations([...educations, education]);

    const { status } = await record.send(did);
    console.log(education);
    console.log(status);
  };

  const handleCreateCareer = async (e) => {
    e.preventDefault();
    const { record } = await web5.dwn.records.write({
      data: {
        companyName,
        position,
        term,
        startDate,
        endDate,
        activities,
      },
      message: {
        schema: "https://schema.org/Occupation",
        dataFormat: "application/json",
        published: true,
      },
    });

    const data = await record.data.json();
    const career = { record, data, id: record.id };
    setCareers([...careers, career]);

    const { status } = await record.send(did);

    console.log(status);
  };

  const getProfile = async (web5) => {
    const { records } = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
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

  const deleteCareer = async (item) => {
    let deletedCareer;
    let index = 0;

    for (let career of careers) {
      if (item.id === career.id) {
        deletedCareer = career;
        break;
      }
      index++;
    }

    careers.splice(index, 1);

    // Delete the record.
    await web5.dwn.records.delete({
      message: {
        recordId: deletedCareer.id,
      },
    });
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

  const handleButtonClick = () => {
    setShowButton(!showButton);
  };

  const handleEdButtonClick = () => {
    setShowButtonEd(!showButtonEd);
  };

  return (
    <>
      <div className="flex p-14 flex-col">
        <div className="bg-white p-4 rounded w-full relative lg:w-[624px]">
          <div className="flex justify-between items-start align-top ">
            <div>
              <h1 className=" mt-[1.25rem] max-md:text-center text-h6 font-bold  ">
                {profile && profile.firstName}
              </h1>
              <h2 className="text-base text-center text-blue-600  w-full">
                {profile && profile.role}
              </h2>
            </div>
            <div className="flex justify-around items-center gap-4">
              <Link href={`${profile && profile.github}`}>
                {" "}
                <FaGithub />
              </Link>
              <Link href={`${profile && profile.linkedIn}`}>
                {" "}
                <FaLinkedin />
              </Link>
              <button onClick={() => setShowModal(true)}>
                {" "}
                <FaEdit />
              </button>
            </div>
          </div>
          <div className="relative z-10 lg:w-[624px] max-md:w-full mt-[2.75rem]">
            <p className="font-inter text-[16px] leading-[150%] max-md:w-full max-md:mx-auto max-md:text-center">
              {profile && profile.aboutMe}
            </p>
          </div>
        </div>
        <div className="mt-12 relative min-h-[40px] lg:w-[624px] h-fit max-md:w-full max-md:mx-auto">
          <div className=" flex justify-between lg:min-w-[550px] w-full max-md:min-w-full h-8 mt-10">
            <p className="font-poppins text-xl font-bold">Career</p>
            <div className="flex gap-x-5">
              <button
                className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded "
                onClick={() => setCareerModal(true)}
              >
                <IoAddCircleOutline width={32} height={32} />
              </button>
              <button
                onClick={handleButtonClick}
                className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded"
              >
                <FaRegEdit width={32} height={32} />
              </button>
            </div>
          </div>
          {careers.map((career) => (
            <div className="bg-white max-md:w-full w-full" key={career.id}>
              <div className="flex items-start mb-10">
                <div className="group flex gap-x-5 max-md:w-full">
                  <div className="flex flex-col gap-y-5 items-center">
                    <BsBackpack4Fill
                      width={32}
                      height={32}
                      className="w-[52px] h-[52px] min-h-[52px] min-w-[52px] bg-odf rounded-full flex justify-center items-center "
                    />
                  </div>
                  <div className="max-md:w-full">
                    <div className="flex gap-4 justify-between lg:min-w-[550px] w-full max-md:min-w-[270px]">
                      <p className="mb-2 font-poppins text-base font-bold leading-[150%]">
                        {career.data.position}
                      </p>
                      <div
                        className={`flex gap-x-5 ${
                          showButton ? "visible" : "hidden"
                        } `}
                      >
                        <button className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded ">
                          <FaRegEdit width={32} height={32} />
                        </button>
                        <button className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded">
                          <MdDelete
                            width={32}
                            height={32}
                            onClick={deleteCareer(career)}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 font-inter font-semibold">
                      {career.data.companyName}
                    </p>
                    <div className="mt-3 flex gap-x-2">
                      <span className="bg-odf-light text-odf rounded-lg flex items-center justify-center font-inter text-xs w-fit gap-[1px] p-2 h-[38px] font-semibold">
                        {career.data.term}
                      </span>
                      <span className="bg-odf-light text-odf rounded-lg flex items-center justify-center font-inter text-xs w-fit gap-[1px] p-2 h-[38px] font-semibold">
                        {career.data.startDate} - {career.data.endDate}
                      </span>
                    </div>
                    <div className="my-5  pl-5">{career.data.activities}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative min-h-[40px] w-[624px] h-fit max-md:w-full max-md:mx-auto">
          <div className="flex justify-between md:min-w-[550px] w-full max-md:min-w-[270px] h-8 mt-10">
            <p className="font-poppins text-xl font-bold">Education</p>
            <div className="flex gap-x-5">
              <button
                className="cursor-pointer  flex w-fit p-2 bg-[#F4F4F4] rounded"
                onClick={() => setEdModal(true)}
              >
                <IoAddCircleOutline width={24} height={24} />
              </button>
              <button
                className="cursor-pointer flex w-fit p-2 rounded bg-[#F4F4F4]"
                onClick={handleEdButtonClick}
              >
                <FaRegEdit width={24} height={24} />
              </button>
            </div>
          </div>
          <div className=" bg-white max-md:items-center w-full">
            <div className="flex items-start mb-10 max-md:w-full">
              <div className="group flex gap-x-5 max-md:w-full">
                <div className="flex flex-col gap-y-5 items-center">
                  <span className="w-[52px] h-[52px] min-h-[52px] min-w-[52px] bg-odf rounded-full flex justify-center items-center">
                    <MdCastForEducation height={32} width={32} />
                  </span>
                </div>

                {educations.map((ed) => (
                  <div
                    className="flex justify-between md:min-w-[550px] w-full max-md:min-w-[270px]"
                    key={ed.id}
                  >
                    <div className="max-md:w-full">
                      <div className="flex gap-4 justify-between md:min-w-[550px] w-full max-md:min-w-[270px]">
                        <p className="mb-2 font-poppins text-base font-bold leading-[150%]">
                          {ed.data.institution}
                        </p>
                        <div
                          className={`flex gap-x-5 ${
                            showButtonEd ? "visible" : "hidden"
                          } `}
                        >
                          <button className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded ">
                            <FaRegEdit width={32} height={32} />
                          </button>
                          <button className="cursor-pointer  flex w-fit p-2 bg-[#FaFaFa] rounded">
                            <MdDelete
                              width={32}
                              height={32}
                              // onClick={deleteCareer(career)}
                            />
                          </button>
                        </div>
                      </div>
                      <p className="mb-3 font-inter text-base font-semibold leading-[150%]">
                        {ed.data.field}
                      </p>

                      <div className="flex gap-4 mb-5">
                        <span className="bg-odf-light text-odf rounded-lg flex items-center justify-center font-inter text-xs w-fit gap-[1px] p-2 w-fit h-[40px] px-2 text-sm font-semibold ">
                          {ed.data.degree}
                        </span>
                        <span className="bg-odf-light text-odf rounded-lg flex items-center justify-center font-inter text-xs w-fit gap-[1px] p-2 w-fit h-[40px] px-4 font-semibold">
                          {ed.data.edStartDate} - {ed.data.edEndDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProfileModal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left overflow-scroll">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Complete your profile
            </h3>
            <form onSubmit={handleCreateProfile} className="space-y-6 relative">
              <div>
                <label
                  for="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  for="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  for="role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Prefered role/position
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div>
                <label
                  for="countryCode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Country code
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="country"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Country
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="aboutMe"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  About me
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={aboutMe}
                  onChange={(e) => setAbountMe(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="github"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Github Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="linkedIn"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  LinkedIn Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 font-bold text-white py-3 px-6 rounded w-full"
              >
                Save
              </button>
            </form>
          </div>
        </ProfileModal>

        <ProfileModal
          isVisible={careerModal}
          onClose={() => setCareerModal(false)}
        >
          <form onSubmit={handleCreateCareer} className="space-y-6 relative">
            <div>
              <label
                for="companyName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={companyName}
                onChange={(e) => setCompnayName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="position"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Position
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="term"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Term
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
              >
                <option value="full-time">Full time contract</option>
                <option value="contracter">Contracter</option>
                <option value="part-time">Part time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label
                for="startDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="endDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="activities"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Duties Completed
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 font-bold text-white py-3 px-6 rounded w-full"
            >
              Save
            </button>
          </form>
        </ProfileModal>

        <ProfileModal isVisible={edModal} onClose={() => setEdModal(false)}>
          <form
            onSubmit={handleEducationalProfile}
            className="space-y-6 relative"
          >
            <div>
              <label
                for="institutionName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Institution Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="field"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Major/Field
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="degree"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Term
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              >
                <option value="high-school">High School / ged</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor Degree</option>
                <option value="master">Master Degree</option>
                <option value="doctoral">Doctoral Degree</option>
                <option value="bootcamp">Bootcamp</option>
              </select>
            </div>
            <div>
              <label
                for="edStartDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="date"
                value={edStartDate}
                onChange={(e) => setEdStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="endDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5"
                type="date"
                value={edEndDate}
                onChange={(e) => setEdEndDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 font-bold text-white py-3 px-6 rounded w-full"
            >
              Save
            </button>
          </form>
        </ProfileModal>
      </div>
    </>
  );
};

export default UserProfile;
