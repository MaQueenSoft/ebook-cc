import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import { useState } from 'react';
import Breadcrumb from "../../../components/Breadcrumb";
import { authorSchema } from "../../../schemas";
import { uploadFile } from "../../../helper/UploadLib";
import Table from "../../../components/tables/table";
import { author_column } from "../../../components/tables/tableheader";
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

function Author() {

  const initialValues = {
    author_id: "",
    author_name: "",
    description:"",
    author_photo: "",
    author_photo_path: "",
    facebook_link:"",
    instagram_link:"",
    twitter_link:"",
    youtube_link:"",
    author_status: false
  };



  const [isLoading, setLoader] = useState(false);
  const [AuthorList, setAuthorList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [isTable, setTable] = useState(true);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [modalOpenFlage, setmodalOpenFlage] = useState(false);
  const [author_id, setCategoryId] = useState('');
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
    getAllAuthor();
    getAllCategory();
  }, []);




  const pages = [{ title: "Author's", href: "/author" }];

  const handleDrawer = (type, id, obj) => {
    if (type === "edit") {
      setCategoryId(id);
      const initialValues = {
        author_id: obj.author_id,
        author_name: obj.author_name,
        author_photo_path: obj.author_photo_path,
        facebook_link:obj.facebook_link,
        instagram_link:obj.instagram_link,
        twitter_link:obj.twitter_link,
        youtube_link:obj.youtube_link,
        author_status: obj.author_status,
        fk_cat_id:obj.fk_cat_id
      };
      setFormCategory(initialValues);
      setTempLogo(obj.author_photo_path);
      // setTempBanner(obj.sub_category_banner_path);
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
    let querySnapshot = await getAllMaster({ tableName: "ebook_author" });
    if (querySnapshot.length > 0) {
      setCategoryList(querySnapshot);
      setLoading(false);
    }
  };

  const getAllAuthor = async () => {
    //setAuthorList([]);
    let querySnapshot = await getAllMaster({ tableName: "ebook_author" });
    if (querySnapshot.length > 0) {
      setAuthorList(querySnapshot);
      setLoading(false);
    }
  };

  const onDeleteOpen = async (author_id) => {
    let result = await confirmationLib({ Type: "Delete" });
    if (result.isConfirmed) {
      await removeMaster({ tableName: "ebook_author", pk_Id: author_id });
      getAllAuthor();
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
      tableName: "ebook_author",
      tableItem: body,
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    enableReinitialize: true,
    initialValues: formCategory,
    validationSchema: authorSchema,
    onSubmit: async (values, action) => {

      setLoader(true);

      let body = {
        author_id: values.author_id,
        author_name: values.author_name,
        author_photo: categoryLogo?.name ? categoryLogo?.name : null,
        author_photo_path: values.author_photo_path,
       facebook_link:values.facebook_link,
        instagram_link:values.instagram_link,
        twitter_link:values.twitter_link,
        youtube_link:values.youtube_link,     
        author_status: enabled, 
        fk_cat_id:values.fk_cat_id,
      }

      let document_id = new Date().getTime();

      if (!author_id || categoryLogo || categoryBanner) {
        let logoStorageRef;
        let bannerStorageRef;
        if (categoryLogo) {

          const logoParts = categoryLogo.name.split('.');
          const lastLogoExtension = logoParts[logoParts.length - 1];
          let LogoImageName = document_id + "_logo." + lastLogoExtension;
          logoStorageRef = await uploadFile({
            folderName: "author",
            imageName: LogoImageName,
            urlName: categoryBase64Icon,
          });
          body.author_photo_path = logoStorageRef ? logoStorageRef : null;
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

      if (author_id === undefined || author_id === null || author_id === "") {
        body.document_id = document_id.toString();
        body.author_id = document_id.toString();
        body.created_date = new Date().toLocaleString() + "";
        saveCategory(body);
      } else {
        body.author_photo = body.author_photo_path ? body.author_photo_path : body.author_photo;
        body.author_status = enabled;
        body.document_id = author_id ? author_id.toString() : document_id.toString();
        body.author_id = author_id ? author_id.toString() : document_id.toString();
        body.updated_date = new Date().toLocaleString() + "";
        saveCategory(body);
      }

      action.resetForm();

      if (modalOpenFlage === true) {
        getAllAuthor();
        setmodalOpenFlage(false);
        setLoader(false);
      };

      getAllAuthor();
      navigate("/author");
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
        <h5 className="text-xl font-semibold text-gray-900 mt-1">Author's List ({AuthorList.length})</h5>

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
          Add Author
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
                  columns={author_column({ onDeleteOpen, handleDrawer })}
                  data={AuthorList}
                />
              ) : (
                <Box className='mt-1 p-3'>
                  <Grid container spacing={{ xs: 3 }}>
                    {
                      AuthorList.map((data, index) => (
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
                                  <IconButton aria-label="Edit Category" onClick={() => handleDrawer("edit", data?.author_id, data)}>
                                    <ModeEditOutlinedIcon />
                                  </IconButton>
                                  <IconButton aria-label="Delete Category" onClick={() => {onDeleteOpen(data?.author_id)}}>
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
                                {author_id ? "Update" : "Add"} Category
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

                          {/* Author Name */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Author's Name
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.author_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Author's Name"
                                    name="author_name"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.author_name && touched.author_name ? (
                                    <p className="text-red-600 text-sm">{errors.author_name}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* author's Photo */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Choose Author's Photo
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.author_photo}
                                    onChange={(e) => {
                                      handleChange(e)
                                      onFileChange(e, 'category_logo')
                                    }}
                                    onBlur={handleBlur}
                                    type="file"
                                    placeholder="Enter Author's Photo"
                                    name="author_photo"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.author_photo && touched.author_photo ? (
                                    <p className="text-red-600 text-sm">{errors.author_photo}</p>
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
                          
                        {/* discription */}
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Description
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={4}
                                    name="description"
                                    id="description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                                  {errors.description && touched.description ? (
                                    <p className="text-red-600 text-sm">{errors.description}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Facebook Link */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Facebook Link
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.facebook_link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Facebook Link"
                                    name="facebook_link"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.facebook_link && touched.facebook_link ? (
                                    <p className="text-red-600 text-sm">{errors.facebook_link}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                        {/* Instagram Link */}
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Instagram Link
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.instagram_link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Instagram Link"
                                    name="instagram_link"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.instagram_link && touched.instagram_link ? (
                                    <p className="text-red-600 text-sm">{errors.instagram_link}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                        {/* Twitter Link */}
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Twitter Link
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.twitter_link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Twitter Link"
                                    name="twitter_link"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.twitter_link && touched.twitter_link ? (
                                    <p className="text-red-600 text-sm">{errors.twitter_link}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                        {/* Youtube Link */}
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Enter Youtube Link
                                  </label>
                                </div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <input
                                    value={values.youtube_link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder="Enter Youtube Link"
                                    name="youtube_link"
                                    autoComplete="off"
                                    className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                                  />
                                  {errors.youtube_link && touched.youtube_link ? (
                                    <p className="text-red-600 text-sm">{errors.youtube_link}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                        {/* status */}
                        <div className="flex flex-1  flex-col justify-between">
                              <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="mt-1 mb-4 sm:col-span-2 sm:mt-0">
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

                                              

                        {/* cancel button  */}
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
                          {/* submit button */}
                          <button
                            type="submit"
                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {author_id ? 'Update' : 'Add'}
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

export default Author;
