import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

// import fetch from "isomorphic-unfetch";

const Show = () => {
  const [deletes, setDeletes] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [getData, setgetData] = useState("");
  const [getShowData, setgetShowData] = useState([]);
  const [getDataDetail, setgetDataDetail] = useState("");
  const [itemId, setItemId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [create, setCreate] = useState(true);
  const [edited, setEdited] = useState(false);
  const [getId, setgetId] = useState(true);
  const [paginate, setPaginate] = useState([]);
  const [pagesData, setPagesData] = useState("");
  const [firstNameValidate, setfirstNameValidate] = useState(false);
  const [lastNameValidate, setlastNameValidate] = useState("");
  const [emailValidate, setemailValidate] = useState("");
  const [phoneValidate, setphoneValidate] = useState("");
  const [addressValidate, setaddressValidate] = useState("");

  const router = useRouter();

  useEffect(() => {
    showDatas();
    const timeOut = setTimeout(() => setShowMap(true), showDatas());
    return () => clearTimeout(timeOut);
  }, []);

  const showDatas = async pages => {
    setPagesData(pages);
    const page = pages ?? "";
    const res = await fetch(
      `${process.env.BASE_URL}/api/identity?page=${page}`,
      {
        method: "GET"
      }
    );
    const json = await res.json();
    setgetData(json);
    setgetShowData(json.users);
    let content = [];
    for (let i = 1; i <= json.maxPage; i++) {
      const item = i;
      content.push({ item });
    }
    setPaginate(content);
  };

  const setHandleCreate = () => {
    setCreate(false);
    setEdited(false);
    setFirstName("");
    setlastName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  const validation = () => {
    firstName ? setfirstNameValidate(false) : setfirstNameValidate(true);
    lastName ? setlastNameValidate(false) : setlastNameValidate(true);
    email ? setemailValidate(false) : setemailValidate(true);
    phone ? setphoneValidate(false) : setphoneValidate(true);
    address ? setaddressValidate(false) : setaddressValidate(true);
  };

  const postData = async e => {
    e.preventDefault;
    validation();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address
    };
    // console.log(JSON.stringify(data));
    if (
      firstName != "" &&
      lastName != "" &&
      email != "" &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      phone != "" &&
      address != ""
    ) {
      const postD = await fetch("http://localhost:3000/api/identity", {
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(result => {
          setCreate(true);
          setShowMap(false);
          setTimeout(() => {
            setShowMap(true);
            showDatas();
            result.json(200, "success");
          }, 200);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const handleDeleteGetId = _id => {
    setgetId(_id);
    setDeletes(false);
  };
  const deleteDatas = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/identity/${getId}`, {
      method: "DELETE"
    })
      .then(result => {
        setDeletes(true);
        setShowMap(false);
        setTimeout(() => {
          setShowMap(true);
          showDatas();
          result.json(200, "success");
        }, 200);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleEditGetDetails = async item => {
    setgetId(item._id);
    setCreate(false);
    setEdited(true);
    setFirstName(item.firstName);
    setlastName(item.lastName);
    setEmail(item.email);
    setPhone(item.phone);
    setAddress(item.address);
  };
  const updateDatas = async e => {
    e.preventDefault;
    validation();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address
    };
    if (
      firstName != "" &&
      lastName != "" &&
      email != "" &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      phone != "" &&
      address != ""
    ) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/identity/${getId}`,
        {
          method: "PUT",
          body: JSON.stringify(data)
        },
        {}
      )
        .then(result => {
          setCreate(true);
          setShowMap(false);
          setTimeout(() => {
            setShowMap(true);
            showDatas();
            result.json(200, "success");
          }, 200);
        })
        .catch(err => {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
        });
    }
  };
  const Loading = (
    <div className="bg-slate-800 bg-opacity-5 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className=" px-16 py-14 rounded-md text-center">
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  );

  const CreateComponent = (
    <div className="mt-4">
      <button
        onClick={setHandleCreate}
        className="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mb-4"
      >
        Tambah
      </button>
      {create ? (
        ""
      ) : (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
          <div className="bg-white px-16 py-14 rounded-md text-center z-50">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Form Create
            </h1>
            <div className="md:container md:mx-auto mt-4">
              <form>
                <div className="overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setFirstName(e.target.value)}
                          value={firstName}
                        />
                        {firstNameValidate ? (
                          <div className="text-red-500">
                            First Name Harus di isi
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setlastName(e.target.value)}
                          value={lastName}
                        />
                        {lastNameValidate ? (
                          <div className="text-red-500">
                            Last Name Harus di isi
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                        />
                        {emailValidate ? (
                          <div className="text-red-500">Email Harus di isi</div>
                        ) : email.match(
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                          ) ? (
                          ""
                        ) : email ? (
                          <div className="text-red-500">Email Salah</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone-address"
                          id="phone-address"
                          autoComplete="phone"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setPhone(e.target.value)}
                          value={phone}
                        />
                        {phoneValidate ? (
                          <div className="text-red-500">
                            No telpon Harus di isi
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={e => setAddress(e.target.value)}
                          value={address}
                        />
                        {addressValidate ? (
                          <div className="text-red-500">
                            Alamat Harus di isi
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <button
              className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
              onClick={() => setCreate(true)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={edited == false ? postData : updateDatas}
            >
              {edited == false ? "Tambah" : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="">
      {showMap == true ? "" : Loading}
      {showMap && (
        <div className="flex items-center justify-center">
          <div className="container">
            {CreateComponent}
            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 table-auto">
              <thead className="text-white">
                {getShowData.map(item => (
                  <tr
                    className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                    key={item._id}
                  >
                    <th className="p-3 text-left">Number</th>
                    <th className="p-3 text-left">First Name</th>
                    <th className="p-3 text-left">Last Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Street Address</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                ))}
              </thead>
              <tbody className="flex-1 sm:flex-none">
                {getShowData.map((item, index) => (
                  <tr
                    className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                    key={item._id}
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {index + 1}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {item.firstName}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {item.lastName}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {item.email}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {item.phone}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {item.address}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      <button
                        className="px-4 py-1 text-sm text-white bg-blue-400 rounded mr-1"
                        onClick={() => handleEditGetDetails(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-1 text-sm text-white bg-red-400 rounded"
                        onClick={() => handleDeleteGetId(item._id)}
                      >
                        deletes
                      </button>
                      {deletes ? (
                        ""
                      ) : (
                        <div className="bg-slate-800 bg-opacity-10 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
                          <div className="bg-white px-16 py-14 rounded-md text-center">
                            <h1 className="text-xl mb-4 font-bold text-slate-500">
                              Do you Want Deletes
                            </h1>
                            <button
                              className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                              onClick={() => {
                                setDeletes(true);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                              onClick={deleteDatas}
                            >
                              Ok
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 z-0">
        <div className="flex-1 flex justify-between sm:hidden">
          <div
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {
              let pages =
                getData.curPage == 1
                  ? ""
                  : getData.curPage <= getData.maxPage
                  ? showDatas(getData.curPage - 1)
                  : "";
            }}
          >
            Previous
          </div>
          <div
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {
              getData.curPage < getData.maxPage ? showDatas(pagesData + 1) : "";
            }}
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{getData.curPage}</span> to
              <span className="font-medium"> {getData.maxPage}</span> of
              <span className="font-medium"> {getData.total} </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <div
                className="relative inline-flex cursor-pointer items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => {
                  let pages =
                    getData.curPage == 1
                      ? ""
                      : getData.curPage <= getData.maxPage
                      ? showDatas(getData.curPage - 1)
                      : "";
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              {paginate.map(item => (
                <div className="" key={item.item}>
                  <div
                    aria-current="page"
                    className="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                    onClick={() => {
                      showDatas(item.item);
                    }}
                  >
                    {item.item}
                  </div>
                </div>
              ))}
              <div
                className="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => {
                  getData.curPage < getData.maxPage
                    ? showDatas(parseInt(getData.curPage) + 1)
                    : parseInt(getData.maxPage);
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
