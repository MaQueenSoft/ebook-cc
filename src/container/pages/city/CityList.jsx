import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { citySchema } from "../../../schemas";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/tables/table";
// import { useDispatch } from "react-redux";
import { city_columns } from "../../../components/tables/tableheader";
import {
  deleteCity, getAllCitys, addCity,
  updateCity
} from "../../../redux/city/actions";
import {
  getAllCountrys
} from "../../../redux/country/actions";
import {
  getAllStates
} from "../../../redux/state/actions";
import { Dialog, Transition, } from "@headlessui/react";
import Pagination from "../../../components/Pagination";
import { FallingLinesLoader } from "../../../components/spinners/Spinner";
import Breadcrumb from "../../../components/Breadcrumb";
import ConfirmationModal from "../../../components/ConfirmationModal";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

function CityList() {
  const pages = [{ title: "City List", href: "/city-list" }];
  const [modalOpenFlage, setmodalOpenFlage] = useState(false);
  const [city_id, setCityid] = useState('')
  const [confirmationModal, setConfirmationModal] = useState({
    status: false,
    city_id: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, list: cityList } = useSelector(
    (state) => state.city
  );
  const { list: countryList } = useSelector(
    (state) => state.country
  );
  const { list: stateList } = useSelector(
    (state) => state.state
  );
  useEffect(() => {
    document.title = "Starter-Pack | Citys";
    dispatch(getAllCitys());
    dispatch(getAllCountrys());
    dispatch(getAllStates());
  }, []);
  const initialValues = {
    city_id: "",
    city_name: "",
    city_status: "",
    city_state_id: "",
  };

  const [formCity, setFormCity] = useState(initialValues);


  const handleDrawer = (type, id, obj) => {
    if (type === "edit", id) {
      setCityid(id);
      const initialValues = {
        city_id: obj.city_id,
        city_name: obj.city_name,
        city_state_id: obj.city_state_id,
        city_status: obj.city_status,
      };
      setFormCity(initialValues);
    } else {
      setCityid("")
      setFormCity(initialValues);
    }
    if (modalOpenFlage === false) {
      setmodalOpenFlage(true);
    }
  };
  const onDeleteOpen = (city_id) => {
    setConfirmationModal({ city_id, status: true });
  };

  const onDeleteCity = (city_id) => {
    dispatch(deleteCity(city_id));
    setConfirmationModal({ city_id: null, status: false });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: formCity,
      validationSchema: citySchema,
      onSubmit: (values, action) => {
      let body = {
        city_id: city_id,
        city_status: true,
        city_name: values.city_name,
        city_state_id: values.city_state_id,
      }
      if (city_id === undefined || city_id === null || city_id === "") dispatch(addCity(body));
      else dispatch(updateCity(city_id, body));
      action.resetForm();
      if (modalOpenFlage === true) {
        dispatch(getAllCitys());
        setmodalOpenFlage(false);
      };
      navigate("/city-list");
    }
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ConfirmationModal
        open={confirmationModal.status}
        setOpen={setConfirmationModal}
        onDelete={() => onDeleteCity(confirmationModal.city_id)}
      />
      <Breadcrumb pages={pages} />
      <div className="">
        <h1 className="text-xl font-semibold text-gray-900">City List</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the Citys.
        </p>
      </div>
      <div className="mt-4 flex">
        <Link
          onClick={() => handleDrawer("add", "", {})}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-auto"
        >
          Add City
        </Link>
      </div>

      {
        loading ? (
          <FallingLinesLoader />
        ) : (
          <Table
            columns={city_columns({ onDeleteOpen, handleDrawer })}
            data={cityList}
          />
        )
      }


      <div>
        <Transition.Root show={modalOpenFlage} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setmodalOpenFlage}
          >
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                      <form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">

                        <div className="h-0 flex-1 overflow-y-auto">
                          <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <Dialog.Title className="text-lg font-medium text-white">
                              {city_id?"Update":"Add"} City
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                  onClick={() => setmodalOpenFlage(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter City Name
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.city_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter City Name"
                                    name="city_name"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.city_name && touched.city_name ? (
                                    <p className="text-red-600 text-sm">{errors.city_name}</p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="mt-1 pt-2 pb-2 sm:col-span-2 sm:mt-0">
                                {/* {values.city_state_id} */}
                                <select
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  name="city_state_id"
                                  id="city_state_id"
                                  value={values.city_state_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option> Select State </option>
                                  {stateList.map((state, i) => (
                                    <option selected={state.state_id ===values.city_state_id?"selected":""} key={i} value={state.state_id}>
                                      {state.state_name}
                                    </option>
                                  ))}
                                </select>

                                {errors.city_state_id && touched.city_state_id ? (
                                  <div className="text-sm text-red-600">{errors.city_state_id}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              setmodalOpenFlage(false)
                            }
                            }
                          >
                            Cancel
                          </button>
                          <button
                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {city_id ? 'Update' : 'Add'}
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}
export default CityList;