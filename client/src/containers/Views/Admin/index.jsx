import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Table from "../../../components/table";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  useEffect(() => {
    getHostels();
  }, []);

  const [hostels, setHostels] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenRoom, setIsOpenRoom] = useState(false);
  let [gender, setGender] = useState("male");
  let [name, setName] = useState("");
  let [max_rooms, setMax_rooms] = useState("");
  const [selected, setSelected] = useState({ name: "select" });
  let [max_number_of_occupants, setMax_number_of_occupants] = useState("");
  // let [hostel_id, setHostel_id] = useState("");
  let [room_number, setRoom_number] = useState("");
  let [rank, setRank] = useState("last");

  function closeModal() {
    setIsOpen(false);
  }

  function closeRoomModal() {
    setIsOpenRoom(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openRoomModal() {
    setIsOpenRoom(true);
  }

  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  function handleRankChange(e) {
    setRank(e.target.value);
  }

  async function submitData(e) {
    e.preventDefault();
    let data = {
      gender,
      name,
      max_rooms,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/hostels", data);
      console.log(res.data);
      toast("successful");
    } catch (error) {
      console.log(error);
    }
  }

  async function submitRoomData(e) {
    e.preventDefault();
    let data = {
      hostel_id: selected.id,
      room_number,
      max_number_of_occupants,
      rank,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/hostels/${selected.id}/rooms`,
        data
      );
      console.log(res.data);
      toast("successful");
    } catch (error) {
      console.log(error);
    }
  }

  const getHostels = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/hostels");
      setHostels(res.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {hostels.length === 0 ? <></> : <Table hostels={hostels} />}

      <Transition appear show={isOpenRoom} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRoomModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-2"
                  >
                    Add Room
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <form onSubmit={submitRoomData}>
                      <div className="pb-4">
                        <label
                          for="countries"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Hostel
                        </label>
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {selected.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <i class="fa-solid fa-chevron-down"></i>
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {hostels.map((person, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={person}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div class="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Room Number
                        </label>
                        <input
                          value={room_number}
                          onChange={(e) => setRoom_number(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="304"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Maximum number of occupants
                        </label>
                        <input
                          value={max_number_of_occupants}
                          required
                          onChange={(e) =>
                            setMax_number_of_occupants(e.target.value)
                          }
                          class="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="default - 4"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="countries"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Rank
                        </label>
                        <select
                          id="countries"
                          required
                          value={rank}
                          onChange={handleRankChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="last">last</option>
                          <option value="middle">middle</option>
                          <option value="top">top</option>
                        </select>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          // onClick={closeModal}
                        >
                          submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-2"
                  >
                    Add Hostel
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <form onSubmit={submitData}>
                      <div class="mb-4">
                        <label
                          for="countries"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          gender
                        </label>
                        <select
                          id="countries"
                          value={gender}
                          onChange={handleGenderChange}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Hostel Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          placeholder="name"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="username"
                        >
                          Maximum Rooms
                        </label>
                        <input
                          value={max_rooms}
                          required
                          onChange={(e) => setMax_rooms(e.target.value)}
                          class="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="default - 3"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          // onClick={closeModal}
                        >
                          submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div class="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
        <button
          data-te-ripple-init
          data-te-ripple-color="light"
          className="hover:scale-110  mt-3 cursor-pointer rounded-full p-5 text-white bg-cyan-500 "
        >
          <i className="fa-sharp fa-solid fa-plus m-2"></i>
        </button>
        <ul class="absolute z-0 flex translate-y-full flex-col items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[60%] group-hover:opacity-100">
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              onClick={openRoomModal}
              className="hover:scale-110 mx-5 mb-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
            >
              <i class="fa-solid fa-bed"></i>
            </div>
          </li>
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              onClick={openModal}
              className="hover:scale-110 mx-5 mb-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
            >
              <i class="fa-solid fa-hotel"></i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Admin;
