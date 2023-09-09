import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { categorySchema } from "../../../schemas";
import Table from "../../../components/tables/table";
import { category_columns } from "../../../components/tables/tableheader";
import { ChevronLeftIcon, ChevronRightIcon, TableCellsIcon, Squares2X2Icon, TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from "@headlessui/react";
import { FallingLinesLoader } from "../../../components/spinners/Spinner";
import Breadcrumb from "../../../components/Breadcrumb";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { uploadFile } from "../../../helper/UploadLib";
import { confirmationLib } from "../../../helper/CommonLib";
import {
  insertMaster,
  updateMaster,
  removeMaster,
  getSingleDataMaster,
  getAllMaster,
} from "../../../helper/QueryLib";
import { Box, Grid, Paper } from "@mui/material";
import moment from "moment";
import Loading from "react-fullscreen-loading";
//import { Grid } from "react-loader-spinner";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

function CategoryList() {

  const initialValues = {
    category_id: "",
    category_name: "",
    category_banner: "",
    category_logo: "",
    category_logo_path: "",
    category_banner_path: "",
    category_status: 1,
  };

  const pages = [{ title: "Category List", href: "/category" }];
  const [isTable, setTable] = useState(true);
  const [modalOpenFlage, setmodalOpenFlage] = useState(false);
  const [loading, setLoading] = useState(true)
  const [category_id, setCategoryId] = useState('')
  const [categoryBase64Icon, setCategoryBase64Icon] = useState(null)
  const [categoryBase64Banner, setCategoryBase64Banner] = useState(null)
  const [categoryLogo, setCategoryLogo] = useState(null)
  const [categoryBanner, setCategoryBanner] = useState(null)
  let [formCategory, setFormCategory] = useState(initialValues)
  const [categoryList, setCategoryList] = useState([])
  const [isLoading, setLoader] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Starter-Pack | Category";
    getAllCategory();
  }, []);

  const handleDrawer = (type, id, obj) => {
    if (type === "edit", id) {
      setCategoryId(id);
      const initialValues = {
        category_id: obj.category_id,
        category_name: obj.category_name,
        // category_banner: obj.category_banner,
        // category_logo: obj.category_logo,
        category_logo_path: obj.category_logo_path,
        category_banner_path: obj.category_banner_path,
        category_status: obj.category_status,
      };
      setFormCategory(initialValues);
    } else {
      setCategoryId("")
      setFormCategory(initialValues);
    }
    if (modalOpenFlage === false) {
      setmodalOpenFlage(true);
    }
  };

  const getAllCategory = async () => {
    setCategoryList([]);
    let querySnapshot = await getAllMaster({ tableName: "categories" });
    if (querySnapshot.length > 0) {
      setCategoryList(querySnapshot);
      setLoading(false);
    }
  };

  const onDeleteOpen = async (category_id) => {
    let result = await confirmationLib({ Type: "Delete" });
    if (result.isConfirmed) {
      await removeMaster({ tableName: "categories", pk_Id: category_id });
      getAllCategory();
    }
  };

  const dateFormat = (data) => {
    if(data?.created_date != null || data?.created_date != undefined){
      return moment(data?.created_date, 'MM/DD/YYYY, HH:mm:ss').format('MMMM D, YYYY, h:mm A');
    }else if(data?.updated_date != null || data?.updated_date != undefined){
      return moment(data?.updated_date, 'MM/DD/YYYY, HH:mm:ss').format('MMMM D, YYYY, h:mm A');
    }else{
      return "Not Available";
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: formCategory,
      validationSchema: categorySchema,
      onSubmit: async (values, action) => {

        setLoader(true);

        let body = {
          category_name: values.category_name,
          category_banner: categoryBanner?.name ? categoryBanner?.name : null,
          category_logo: categoryLogo?.name ? categoryLogo?.name : null,
          category_logo_path: values.category_logo_path,
          category_banner_path: values.category_banner_path,
          category_status: values.category_status,
        }

        let document_id = new Date().getTime();

        if (!category_id || categoryLogo || categoryBanner) {
          let logoStorageRef;
          let bannerStorageRef;
          if (categoryLogo) {

            const logoParts = categoryLogo.name.split('.');
            const lastLogoExtension = logoParts[logoParts.length - 1];
            let LogoImageName = document_id + "_logo." + lastLogoExtension;
            logoStorageRef = await uploadFile({
              folderName: "category",
              imageName: LogoImageName,
              urlName: categoryBase64Icon,
            });
            body.category_logo_path = logoStorageRef ? logoStorageRef : null;
          }
          if (categoryBanner) {
            const bannerParts = categoryBanner.name.split('.');
            const lastbannerExtension = bannerParts[bannerParts.length - 1];
            let BannerImageName = document_id + "_banner." + lastbannerExtension;
            bannerStorageRef = await uploadFile({
              folderName: "category",
              imageName: BannerImageName,
              urlName: categoryBase64Banner,
            });
            body.category_banner_path = bannerStorageRef ? bannerStorageRef : null;
          }
        }

        if (category_id === undefined || category_id === null || category_id === "") {
          body.document_id = document_id.toString();
          body.category_id = document_id.toString();
          body.created_date = new Date().toLocaleString() + "";
          saveCategory(body);
        } else {
          body.category_banner = body.category_banner_path ? body.category_banner_path : body.category_banner;
          body.category_logo = body.category_logo_path ? body.category_logo_path : body.category_logo;
          body.document_id = category_id ? category_id.toString() : document_id.toString();
          body.category_id = category_id ? category_id.toString() : document_id.toString();
          body.updated_date = new Date().toLocaleString() + "";
          saveCategory(body);
        }

        action.resetForm();

        if (modalOpenFlage === true) {
          getAllCategory();
          setmodalOpenFlage(false);
          setLoader(false);
        };

        navigate("/category");
      }
    });

  const saveCategory = async (body) => {
    let docRef = await insertMaster({
      tableName: "categories",
      tableItem: body,
    });
  };

  const onFileChange = (e, type) => {
    const file = e.target.files[0];
    const fileName = file.name;

    if (type == "category_logo") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryLogo(file);
        setCategoryBase64Icon(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryBanner(file);
        setCategoryBase64Banner(e.target.result);
      };
      reader.readAsDataURL(file);
    }

  };

  return (
    <div className="main-section">

      <Loading className='backdrop-blur-md' loading={isLoading} background="#383838c9" loaderColor="#ffffff" />
      <Breadcrumb pages={pages} />

      <div className="table-title flex space-x-3">
        <h5 className="text-xl font-semibold text-gray-900 mt-1">Category List ({categoryList.length})</h5>

        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            onClick={() => {setTable(true)}}
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Table</span>
            <TableCellsIcon className={`h-5 w-5 ${isTable === true ? 'text-indigo-500' : '' }`} aria-hidden="true" />
          </button>
          <button
            onClick={() => {setTable(false)}}
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Cards</span>
            <Squares2X2Icon className={`h-5 w-5 ${isTable === false ? 'text-indigo-500' : '' }`} aria-hidden="true" />
          </button>
        </span>
      </div>

      <div className="mt-4 flex">
        <Link
          onClick={() => handleDrawer("add", "", {})}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-auto"
        >
          Add Category
        </Link>
      </div>

      {/* <Table
            columns={category_columns({ onDeleteOpen, handleDrawer })}
            data={categoryList}
          /> */}

      {
        loading ? (
          <FallingLinesLoader />
        ) : (
          <div>
            {
              isTable ? (
                <Table
                  columns={category_columns({ onDeleteOpen, handleDrawer })}
                  data={categoryList}
                />
              ) : (
                <Box className='mt-1 p-3'>
                  <Grid container spacing={{ xs: 3 }}>
                    {
                      categoryList.map((data, index) => (
                        <Grid key={index} item lg={3} md={3} sm={12} xs={12}>
                            <Box className='mt-0'>
                              <Card sx={{ maxWidth: 345 }} className="rounded-lg">
                                <CardHeader
                                  avatar={
                                    <Avatar className="shadow-sm" sx={{ bgcolor: grey[300] }} aria-label={data?.category_name} src={data?.category_logo_path} />
                                  }
                                  title={data?.category_name}
                                  subheader={dateFormat(data)}
                                />
                                <CardMedia
                                  component="img"
                                  height="194"
                                  image={data?.category_banner_path}
                                  alt={data?.category_name}
                                />
                                <CardActions >
                                  <IconButton aria-label="Edit Category" onClick={() => handleDrawer("edit", data?.category_id, data)}>
                                    <ModeEditOutlinedIcon />
                                  </IconButton>
                                  <IconButton aria-label="Delete Category" onClick={() => {onDeleteOpen(data?.category_id)}}>
                                    <DeleteIcon />
                                  </IconButton>
                                </CardActions>
                              </Card>
                            </Box>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Box>
              )
            }
          </div>
        )
      }

      <div className="form-layout">
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
                                {category_id ? "Update" : "Add"} Category
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
                                    Enter Category Name
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.category_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Category Name"
                                    name="category_name"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.category_name && touched.category_name ? (
                                    <p className="text-red-600 text-sm">{errors.category_name}</p>
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
                                    Enter Category Logo
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.category_logo}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'category_logo')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Category Logo"
                                    name="category_logo"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.category_logo && touched.category_logo ? (
                                    <p className="text-red-600 text-sm">{errors.category_logo}</p>
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
                                    Enter Category Banner
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.category_banner}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'category_banner')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Category Banner"
                                    name="category_banner"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.category_banner && touched.category_banner ? (
                                    <p className="text-red-600 text-sm">{errors.category_banner}</p>
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
                            {category_id ? 'Update' : 'Add'}
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
export default CategoryList;