import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { gameSchema } from "../../../schemas";
import Table from "../../../components/tables/table";
import { game_columns } from "../../../components/tables/tableheader";

import { Dialog, Transition } from "@headlessui/react";
import { FallingLinesLoader } from "../../../components/spinners/Spinner";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { uploadFile } from "../../../helper/UploadLib";
import { confirmationLib } from "../../../helper/CommonLib";
import {
  insertMaster,
  updateMaster,
  removeMaster,
  getSingleDataMaster,
  getAllMaster,
} from "../../../helper/QueryLib";

function GameList() {
  const pages = [{ title: "Game List", href: "/game" }];
  const [modalOpenFlage, setmodalOpenFlage] = useState(false);
  const [loading, setLoading] = useState(true)
  const [game_id, setGameId] = useState('')
  const [gameBase64Icon, setGameBase64Icon] = useState(null)
  const [gameBase64Banner, setGameBase64Banner] = useState(null)
  const [gameLogo, setGameLogo] = useState(null)
  const [gameBanner, setGameBanner] = useState(null)

  const [gameList, setGameList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Starter-Pack | Game";
    getAllGame();
    getAllCategory();
  }, []);
  const initialValues = {
    game_id: "",
    game_name: "",
    fk_cat_id:"",
    game_banner: "",
    game_logo: "",
    game_logo_path: "",
    game_banner_path: "",
    game_status: 1,
  };
  let [formGame, setFormGame] = useState(initialValues);

  const handleDrawer = (type, id, obj) => {
    if (type === "edit", id) {
      setGameId(id);
      const initialValues = {
        game_id: obj.game_id,
        game_name: obj.game_name,
        fk_cat_id:obj.fk_cat_id,
        // game_banner: obj.game_banner,
        // game_logo: obj.game_logo,
        game_logo_path: obj.game_logo_path,
        game_banner_path: obj.game_banner_path,
        game_status: obj.game_status,
      };
      setFormGame(initialValues);
    } else {
      setGameId("")
      setFormGame(initialValues);
    }
    if (modalOpenFlage === false) {
      setmodalOpenFlage(true);
    }
  };

  const getAllGame = async () => {
    setGameList([]);
    let querySnapshot = await getAllMaster({ tableName: "games" });
    if (querySnapshot.length > 0) {
      setGameList(querySnapshot);
      setLoading(false);
    }
  };
  const getAllCategory = async () => {
    setCategoryList([]);
    let querySnapshot = await getAllMaster({ tableName: "categories" });
    if (querySnapshot.length > 0) {
      setCategoryList(querySnapshot);
    }
  };

  const onDeleteOpen = async (game_id) => {
    let result = await confirmationLib({ Type: "Delete" });
    if (result.isConfirmed) {
      await removeMaster({ tableName: "games", pk_Id: game_id });
      getAllGame();
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: formGame,
      validationSchema: gameSchema,
      onSubmit: async (values, action) => {
        let body = {
          game_name: values.game_name,
          fk_cat_id:values.fk_cat_id,
          game_banner: gameBanner?.name ? gameBanner?.name : null,
          game_logo: gameLogo?.name ? gameLogo?.name : null,
          game_logo_path: values.game_logo_path,
          game_banner_path: values.game_banner_path,
          game_status: values.game_status,
        }
        let document_id = new Date().getTime();
        if (!game_id || gameLogo || gameBanner) {
          let logoStorageRef;
          let bannerStorageRef;
          if (gameLogo) {

            const logoParts = gameLogo.name.split('.');
            const lastLogoExtension = logoParts[logoParts.length - 1];
            let LogoImageName = document_id + "_logo." + lastLogoExtension;
            logoStorageRef = await uploadFile({
              folderName: "game",
              imageName: LogoImageName,
              urlName: gameBase64Icon,
            });
            body.game_logo_path = logoStorageRef ? logoStorageRef : null;
          }
          if (gameBanner) {
            const bannerParts = gameBanner.name.split('.');
            const lastbannerExtension = bannerParts[bannerParts.length - 1];
            let BannerImageName = document_id + "_banner." + lastbannerExtension;
            bannerStorageRef = await uploadFile({
              folderName: "game",
              imageName: BannerImageName,
              urlName: gameBase64Banner,
            });
            body.game_banner_path = bannerStorageRef ? bannerStorageRef : null;
          }
        }

        if (game_id === undefined || game_id === null || game_id === "") {
          body.document_id = document_id.toString();
          body.game_id = document_id.toString();
          body.created_date = new Date().toLocaleString() + "";
          saveGame(body);
        } else {
          body.game_banner = body.game_banner_path ? body.game_banner_path : body.game_banner;
          body.game_logo = body.game_logo_path ? body.game_logo_path : body.game_logo;
          body.document_id = game_id ? game_id.toString() : document_id.toString();
          body.game_id = game_id ? game_id.toString() : document_id.toString();
          body.updated_date = new Date().toLocaleString() + "";

          saveGame(body);
        }
        action.resetForm();
        if (modalOpenFlage === true) {
          getAllGame();
          setmodalOpenFlage(false);
        };
        navigate("/game");
      }
    });

  const saveGame = async (body) => {
    let docRef = await insertMaster({
      tableName: "games",
      tableItem: body,
    });
  };

  const onFileChange = (e, type) => {
    const file = e.target.files[0];
    const fileName = file.name; // Extract the file name

    console.log();

    if (type == "game_logo") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGameLogo(file); //e.target.result;
        setGameBase64Icon(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGameBanner(file); //e.target.result;
        setGameBase64Banner(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=""> {/* px-4 sm:px-6 lg:px-8 */}

      <Breadcrumb pages={pages} />
      <div className="">
        <h5 className="text-xl font-semibold text-gray-900">Game List Count({gameList.length})</h5>
      </div>
      <div className="mt-4 flex">
        <Link
          onClick={() => handleDrawer("add", "", {})}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-auto"
        >
          Add Game
        </Link>
      </div>

      {
        loading ? (
          <FallingLinesLoader />
        ) : (
          <Table
            columns={game_columns({ onDeleteOpen, handleDrawer })}
            data={gameList}
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
            <div className="fixed inset-0 backdrop-contrast-50">
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

                        <div className="space-y-6 h-0 flex-1 overflow-y-auto">
                          <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <Dialog.Title className="text-lg font-medium text-white">
                                {game_id ? "Update" : "Add"} Game
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
                                    Category
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <select
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    name="fk_cat_id"
                                    id="fk_cat_id"
                                    value={values.fk_cat_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option> Select Category </option>
                                    {categoryList?.length > 0 ? (categoryList?.map((category, i) => (
                                      <option selected={category.category_id === values.fk_cat_id ? "selected" : ""} key={i} value={category.category_id}>
                                        {category.category_name}
                                      </option>
                                    ))) : null}
                                  </select>

                                  {errors.fk_cat_id && touched.fk_cat_id ? (
                                    <div className="text-sm text-red-600">{errors.fk_cat_id}</div>
                                  ) : null}
                                </div>
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
                                    Enter Game Name
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.game_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Game Name"
                                    name="game_name"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.game_name && touched.game_name ? (
                                    <p className="text-red-600 text-sm">{errors.game_name}</p>
                                  ) : null}
                                </div>
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
                                    Enter Game Logo
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.game_logo}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'game_logo')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Game Logo"
                                    name="game_logo"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.game_logo && touched.game_logo ? (
                                    <p className="text-red-600 text-sm">{errors.game_logo}</p>
                                  ) : null}
                                </div>
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
                                    Enter Game Banner
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.game_banner}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'game_banner')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Game Banner"
                                    name="game_banner"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.game_banner && touched.game_banner ? (
                                    <p className="text-red-600 text-sm">{errors.game_banner}</p>
                                  ) : null}
                                </div>
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
                            {game_id ? 'Update' : 'Add'}
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
export default GameList;