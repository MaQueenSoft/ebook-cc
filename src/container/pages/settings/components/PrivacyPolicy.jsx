import React, { useEffect, useState, useRef } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Loading from "react-fullscreen-loading";
import { Switch } from '@headlessui/react'
import { Editor } from '@tinymce/tinymce-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PrivacyPolicy() {

    const [isLoading, setLocading] = useState(false);
    const didYouKnowENEditorRef = useRef(null);
    const didYouKnowAREditorRef = useRef(null);
    const smartReportCommentENEditorRef = useRef(null);
    const smartReportCommentAREditorRef = useRef(null);
    const tipsENEditorRef = useRef(null);
    const tipsAREditorRef = useRef(null);

    return (
        <div>
            <Loading className='backdrop-blur-md' loading={isLoading} background="#383838c9" loaderColor="#ffffff" />
            <form onSubmit={(e) => {e.preventDefault(); setLocading(!isLoading)}}>
                <div className="space-y-6">

                    <div className="border-b border-gray-900/10 pb-8">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Terms & Conditions</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">You have to update the Ads ID to earn money from Ads. [Get Ads ID from Google AdMob Account]</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="col-span-full">
                                <Editor
                                    //tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                    //tinymceScriptSrc={'https://cdn.tiny.cloud/1/vzc822ybbaa517i2jfue6ss7dh90h6zj93fl28k4obrhofj6/tinymce/6/tinymce.min.js'}
                                    apiKey='vzc822ybbaa517i2jfue6ss7dh90h6zj93fl28k4obrhofj6'
                                    onInit={(evt, editor) => {
                                        didYouKnowENEditorRef.current = editor
                                    }}
                                    initialValue="<p>These terms and conditions outline the rules and regulations for the use of Application Name/Website, located at </p>
                                    <span style='text-align: left;'>https://maqueensoft.com</span><p>ENTER YOU PRIVACY & POLICY</p>"
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                                    
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                    Save & Update
                    </button>
                </div>
            </form>
        </div>
    )

}

export default PrivacyPolicy;