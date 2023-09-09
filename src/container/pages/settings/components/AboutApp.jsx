import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Loading from "react-fullscreen-loading";
import { Switch } from '@headlessui/react'
import { uploadFile } from "../../../../helper/UploadLib";
import { confirmationLib } from "../../../../helper/CommonLib";
import {
  insertMaster,
  updateMaster,
  removeMaster,
  getSingleDataMaster,
  getAllMaster,
  getSettingsMaster
} from "../../../../helper/QueryLib";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const initialValues = {
    "support_email": '',
    "about_app": '',
    "username": '',
    "app_name": '',
    "version": '',
    "is_under_maintainance": false
}

function AboutApp() {

    const [isLoading, setLocading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [profile, setProfile] = useState({})
    const [application, setApplication] = useState(initialValues)

    useEffect(() => {
        getAccountDetails();
    }, [])

    const getAccountDetails = async () => {

        const playload = {
            tableName: "settings",
            tableId: "account"
        }
        let querySnapshot = await getSettingsMaster(playload);
        console.log("getAccountDetails", querySnapshot);
        if (querySnapshot.hasOwnProperty('app_name')) {
            setApplication(querySnapshot);
        }

        /* const docRef = doc(db, "settings", "account");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          this.accountForm.username = docSnap.data().username;
          this.accountForm.support_email = docSnap.data().support_email;
          this.accountForm.version = docSnap.data().version;
          this.accountForm.about_app = docSnap.data().about_app;
          this.accountForm.app_name = docSnap.data().app_name;
          this.accountForm.is_under_maintainance = docSnap.data().is_under_maintainance;
          console.log("Document account data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such account document!");
        } */
    }

    return (
        <div>
            <Loading className='backdrop-blur-md' loading={isLoading} background="#383838c9" loaderColor="#ffffff" />
            <form onSubmit={(e) => {e.preventDefault(); setLocading(!isLoading)}}>
                <div className="space-y-6">

                    <div className="border-b border-gray-900/10 pb-8">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This is just for dashboard profile.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Profile Picture
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                    Change
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="desig-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Designation
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="desig-name"
                                id="desig-name"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Application</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            App information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    App Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Application/</span>
                                    <input
                                        defaultValue={application?.app_name}
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Mini Game Hub App"
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="support-email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Support Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={application?.support_email}
                                        type="email"
                                        name="support-email"
                                        id="support-email"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="app-version" className="block text-sm font-medium leading-6 text-gray-900">
                                    App Version
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={application?.version}
                                        type="text"
                                        name="app-version"
                                        id="app-version"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About App
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        defaultValue={application?.about_app}
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about game application.</p>
                            </div>

                            <div className="col-span-full">
                                <Switch.Group as="div" className="flex items-center">
                                    <Switch
                                        checked={application.is_under_maintainance}
                                        onChange={setEnabled}
                                        className={classNames(
                                            application.is_under_maintainance ? 'bg-indigo-600' : 'bg-gray-200',
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                        )}
                                    >
                                        <span
                                        aria-hidden="true"
                                        className={classNames(
                                            application.is_under_maintainance ? 'translate-x-5' : 'translate-x-0',
                                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                        )}
                                        />
                                    </Switch>
                                    <Switch.Label as="span" className="ml-3 text-sm">
                                        <span className="font-small text-gray-500">Enable / Disable (App under maintainance mode)</span>
                                    </Switch.Label>
                                </Switch.Group>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AboutApp;