import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Loading from "react-fullscreen-loading";
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function AdmobAds() {

    const [isLoading, setLocading] = useState(false);
    const [enabled, setEnabled] = useState(false);

    return (
        <div>
            <Loading className='backdrop-blur-md' loading={isLoading} background="#383838c9" loaderColor="#ffffff" />
            <form onSubmit={(e) => {e.preventDefault(); setLocading(!isLoading)}}>
                <div className="space-y-6">

                    <div className="border-b border-gray-900/10 pb-8">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Google Admob</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">You have to update the Ads ID to earn money from Ads. [Get Ads ID from Google AdMob Account]</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="banner-ad-id" className="block text-sm font-medium leading-6 text-gray-900">
                                    Banner Ads
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder=" Eg. ca-app-pub-3940256099942544/6300978111"
                                        type="text"
                                        name="banner-ad-id"
                                        id="banner-ad-id"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <Switch.Group as="div" className="flex items-center mt-3">
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
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
                                        {/* <span className="text-gray-500">(Save 10%)</span> */}
                                    </Switch.Label>
                                </Switch.Group>
                                    
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="inst-ad-id" className="block text-sm font-medium leading-6 text-gray-900">
                                    Insterstial Ads
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder=" Eg. ca-app-pub-3940256099942544/1033173712"
                                        type="text"
                                        name="inst-ad-id"
                                        id="inst-ad-id"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <Switch.Group as="div" className="flex items-center mt-3">
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
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
                                        {/* <span className="text-gray-500">(Save 10%)</span> */}
                                    </Switch.Label>
                                </Switch.Group>

                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="rewarded-ad-id" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rewarded Ads
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder=" Eg. ca-app-pub-3940256099942544/5224354917"
                                        type="text"
                                        name="rewarded-ad-id"
                                        id="rewarded-ad-id"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <Switch.Group as="div" className="flex items-center mt-3">
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
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
                                        {/* <span className="text-gray-500">(Save 10%)</span> */}
                                    </Switch.Label>
                                </Switch.Group>

                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="native-ad-id" className="block text-sm font-medium leading-6 text-gray-900">
                                    Native Advance Ads
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder=" Eg. ca-app-pub-3940256099942544/2247696110"
                                        type="text"
                                        name="native-ad-id"
                                        id="native-ad-id"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <Switch.Group as="div" className="flex items-center mt-3">
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
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
                                        {/* <span className="text-gray-500">(Save 10%)</span> */}
                                    </Switch.Label>
                                </Switch.Group>

                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="openapp-ad-id" className="block text-sm font-medium leading-6 text-gray-900">
                                    OpenApp Ads
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder=" Eg. ca-app-pub-3940256099942544/3419835294"
                                        type="text"
                                        name="openapp-ad-id"
                                        id="openapp-ad-id"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <Switch.Group as="div" className="flex items-center mt-3">
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
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
                                        {/* <span className="text-gray-500">(Save 10%)</span> */}
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

export default AdmobAds;