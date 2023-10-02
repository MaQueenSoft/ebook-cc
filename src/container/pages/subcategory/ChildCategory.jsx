import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import { useState } from 'react';
import Breadcrumb from "../../../components/Breadcrumb";
import { sub_categorySchema } from "../../../schemas";
import { uploadFile } from "../../../helper/UploadLib";
import Table from "../../../components/tables/table";
import { sub_category_columns } from "../../../components/tables/tableheader";
import { ChevronLeftIcon, ChevronRightIcon, TableCellsIcon, Squares2X2Icon, TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import { FallingLinesLoader } from "../../../components/spinners/Spinner";
import { useFormik } from "formik";
import { confirmationLib } from "../../../helper/CommonLib";
import {
  insertMaster,
  updateMaster,
  removeMaster,
  getSingleDataMaster,
  getAllMaster,
} from "../../../helper/QueryLib";
import { Box, Grid, Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { green, red, grey } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ChildCategory() {

  const initialValues = {
    fk_cat_id: "",
    subcategory_id: "",
    sub_category_name: "",
    sub_category_banner: "",
    sub_category_logo: "",
    sub_category_logo_path: "",
    sub_category_banner_path: "",
    sub_category_status: false
  };

  const [isLoading, setLoader] = useState(false);
  const [SubcategoryList, setSubCategoryList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [isTable, setTable] = useState(true);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [modalOpenFlage, setmodalOpenFlage] = useState(false);
  const [subcategory_id, setCategoryId] = useState('');
  let [formCategory, setFormCategory] = useState(initialValues);
  const [categoryLogo, setCategoryLogo] = useState(null)
  const [categoryBase64Icon, setCategoryBase64Icon] = useState(null)
  const [tempLogo,setTempLogo] = useState(null);
  const [tempBanner,setTempBanner]=useState(null);
  const [categoryBase64Banner, setCategoryBase64Banner] = useState(null)  
  const [categoryBanner, setCategoryBanner] = useState(null)
  const [enabled, setEnabled] = useState(true);
  
  useEffect(() => {
    document.title = "Starter-Pack | Category";
    getAllSubCategory();
    getAllCategory();
  }, []);

  const abc = 10;


  const pages = [{ title: "SubCategory List", href: "/subCategory" }];

  const handleDrawer = (type, id, obj) => {
    if (type === "edit") {
      setCategoryId(id);
      const initialValues = {
        subcategory_id: obj.subcategory_id,
        sub_category_name: obj.sub_category_name,
        sub_category_logo_path: obj.sub_category_logo_path,
        sub_category_banner_path: obj.sub_category_banner_path,
        sub_category_status: obj.sub_category_status,
        fk_cat_id:obj.fk_cat_id
      };
      setFormCategory(initialValues);
      setTempLogo(obj.sub_category_logo_path);
      setTempBanner(obj.sub_category_banner_path);
    } else {
      setCategoryId(null)
      setTempLogo(null);
      setTempBanner(null);
      setFormCategory(initialValues);
    }
    if (modalOpenFlage === false) {
      setmodalOpenFlage(true);
    }
  };

  const getAllCategory = async () => {
    let querySnapshot = await getAllMaster({ tableName: "ebook_categories" });
    if (querySnapshot.length > 0) {
      setCategoryList(querySnapshot);
      setLoading(false);
    }
  };

  const getAllSubCategory = async () => {
    //setSubCategoryList([]);
    let querySnapshot = await getAllMaster({ tableName: "ebook_subcategory" });
    if (querySnapshot.length > 0) {
      setSubCategoryList(querySnapshot);
      setLoading(false);
    }
  };

  const onDeleteOpen = async (subcategory_id) => {
    let result = await confirmationLib({ Type: "Delete" });
    if (result.isConfirmed) {
      await removeMaster({ tableName: "ebook_subcategory", pk_Id: subcategory_id });
      getAllSubCategory();
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
  const saveCategory = async (body) => {
    let docRef = await insertMaster({
      tableName: "ebook_subcategory",
      tableItem: body,
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    enableReinitialize: true,
    initialValues: formCategory,
    validationSchema: sub_categorySchema,
    onSubmit: async (values, action) => {

      setLoader(true);

      let body = {
        sub_category_name: values.sub_category_name,
        sub_category_banner: categoryBanner?.name ? categoryBanner?.name : null,
        sub_category_logo: categoryLogo?.name ? categoryLogo?.name : null,
        sub_category_logo_path: values.sub_category_logo_path,
        sub_category_banner_path: values.sub_category_banner_path,
        sub_category_status: enabled,
        fk_cat_id:values.fk_cat_id,
      }

      let document_id = new Date().getTime();

      if (!subcategory_id || categoryLogo || categoryBanner) {
        let logoStorageRef;
        let bannerStorageRef;
        if (categoryLogo) {

          const logoParts = categoryLogo.name.split('.');
          const lastLogoExtension = logoParts[logoParts.length - 1];
          let LogoImageName = document_id + "_logo." + lastLogoExtension;
          logoStorageRef = await uploadFile({
            folderName: "subCategory",
            imageName: LogoImageName,
            urlName: categoryBase64Icon,
          });
          body.sub_category_logo_path = logoStorageRef ? logoStorageRef : null;
        }
        if (categoryBanner) {
          const bannerParts = categoryBanner.name.split('.');
          const lastbannerExtension = bannerParts[bannerParts.length - 1];
          let BannerImageName = document_id + "_banner." + lastbannerExtension;
          bannerStorageRef = await uploadFile({
            folderName: "subCategory",
            imageName: BannerImageName,
            urlName: categoryBase64Banner,
          });
          body.sub_category_banner_path = bannerStorageRef ? bannerStorageRef : null;
        }
      }

      if (subcategory_id === undefined || subcategory_id === null || subcategory_id === "") {
        body.document_id = document_id.toString();
        body.subcategory_id = document_id.toString();
        body.created_date = new Date().toLocaleString() + "";
        saveCategory(body);
      } else {
        body.sub_category_banner = body.sub_category_banner_path ? body.sub_category_banner_path : body.sub_category_banner;
        body.sub_category_logo = body.sub_category_logo_path ? body.sub_category_logo_path : body.sub_category_logo;
        body.sub_category_status = enabled;
        body.document_id = subcategory_id ? subcategory_id.toString() : document_id.toString();
        body.subcategory_id = subcategory_id ? subcategory_id.toString() : document_id.toString();
        body.updated_date = new Date().toLocaleString() + "";
        saveCategory(body);
      }

      action.resetForm();

      if (modalOpenFlage === true) {
        getAllSubCategory();
        setmodalOpenFlage(false);
        setLoader(false);
      };

      getAllSubCategory();
      navigate("/subCategory");
    }
  });
  const onFileChange = (e, type) => {
    const file = e.target.files[0];
    const fileName = file.name;

    if (type == "category_logo") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryLogo(file);
        setCategoryBase64Icon(e.target.result);
        setTempLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryBanner(file);
        setCategoryBase64Banner(e.target.result);
        setTempBanner(e.target.result);
      };
      reader.readAsDataURL(file);
    }

  };


  return (
   
    <div className="main-section">
      <Loading className='backdrop-blur-md' loading={isLoading} background="#383838c9" loaderColor="#ffffff" />
      <Breadcrumb pages={pages} />

      {/* List View Icons */}
      <div className="table-title flex space-x-3">
        <h5 className="text-xl font-semibold text-gray-900 mt-1">Sub-Category List ({SubcategoryList.length})</h5>

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

      {/* Add Button */}
      <div className="mt-4 flex">
        <Link
          onClick={() => handleDrawer("add", "", {})}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-auto"
        >
          Add Sub-Category
        </Link>
      </div>

      {
        loading ? (
          <FallingLinesLoader />
        ) : (
          <div>
            {
              isTable ? (
                <Table
                  columns={sub_category_columns({ onDeleteOpen, handleDrawer })}
                  data={SubcategoryList}
                />
              ) : (
                <Box className='mt-1 p-3'>
                  <Grid container spacing={{ xs: 3 }}>
                    {
                      SubcategoryList.map((data, index) => (
                        <Grid key={index} item lg={3} md={3} sm={12} xs={12}>
                            <Box className='mt-0'>
                              <Card sx={{ maxWidth: 345 }} className="rounded-lg">
                                <CardHeader
                                  avatar={
                                    <Avatar className="shadow-sm" sx={{ bgcolor: grey[300] }} aria-label={data?.sub_category_name} src={data?.sub_category_logo_path} />
                                  }
                                  title={data?.sub_category_name}
                                  subheader={dateFormat(data)}
                                />
                                <CardMedia
                                  component="img"
                                  height="194"
                                  image={data?.sub_category_banner_path}
                                  alt={data?.sub_category_name}
                                />
                                <CardActions >
                                  <IconButton aria-label="Edit Category" onClick={() => handleDrawer("edit", data?.subcategory_id, data)}>
                                    <ModeEditOutlinedIcon />
                                  </IconButton>
                                  <IconButton aria-label="Delete Category" onClick={() => {onDeleteOpen(data?.subcategory_id)}}>
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

      {/* Add/Edit form  */}
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
                                {subcategory_id ? "Update" : "Add"} Category
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
                          
                          {/* category dropdown */}

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

                          {/* Category Name */}
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
                                    value={values.sub_category_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Category Name"
                                    name="sub_category_name"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.sub_category_name && touched.sub_category_name ? (
                                    <p className="text-red-600 text-sm">{errors.sub_category_name}</p>
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
                                    value={values.sub_category_logo}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'category_logo')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Category Logo"
                                    name="sub_category_logo"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.sub_category_logo && touched.sub_category_logo ? (
                                    <p className="text-red-600 text-sm">{errors.sub_category_logo}</p>
                                  ) : null}
                                </div>
                                <div className="col-span-full">
                                    {
                                      tempLogo ?
                                      <img className="shadow-sm mt-4 w-20" src={tempLogo} /> : null
                                    }
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
                                    value={values.sub_category_banner}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'category_banner')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Category Banner"
                                    name="sub_category_banner"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.sub_category_banner && touched.sub_category_banner ? (
                                    <p className="text-red-600 text-sm">{errors.sub_category_banner}</p>
                                  ) : null}
                                </div>
                                <div className="col-span-full">
                                    {
                                      tempBanner ?
                                      <img className="shadow-sm mt-4 w-40" src={tempBanner} /> : null
                                    }
                                </div>
                              </div>
                            </div>



                            <div className="flex flex-1 flex-col justify-between">
                              <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                    <Switch.Group as="div" className="flex items-center mt-3">
                                        <Switch
                                            checked={enabled}
                                            onChange={(e) => setEnabled(!enabled)}
                                            className={classNames(
                                              enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                            aria-hidden="true"
                                            className={classNames(
                                              enabled ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                            />
                                        </Switch>
                                        <Switch.Label as="span" className="ml-3 text-sm">
                                            <span className="font-small text-gray-500">Enable / Disable</span>
                                        </Switch.Label>
                                    </Switch.Group>
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
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {subcategory_id ? 'Update' : 'Add'}
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

  )
}

export default ChildCategory;
