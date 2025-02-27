import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CreateBlog = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [editorContent, setEditorContent] = useState();

    const onSubmit = async (data) => {
        // console.log(data)
        const photo = data.thumb[0];
        const formData = new FormData();
        formData.append("image", photo);

        // Sending image to imgbb server
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`,
            formData
        );
        const thumb = response.data.data.display_url;
        const contentData = {
            title: data.title,
            thumb,
            content: editorContent,
            createdAt: new Date().toISOString(),
            status: 'draft'
        }
        try {
            const { data } = await axiosSecure.post('/contents', contentData)
            if (data?.insertedId) {
                toast.success('blog created Successfully.....');
                reset();
                setEditorContent('')
                navigate('/dashboard/content-management')
            } else {
                toast.error('Failed to create blog!.');
            }
        } catch (err) {
            console.log('error while posting content', err)
        }
    }

    return (
        <div className='bg-gray-100 dark:bg-Red/60 lg:my-10 md:my-20 rounded-md shadow-lg lg:w-7/12 md:w-9/12 w-11/12 mx-auto bg-Red/5 md:p-8 p-5 lg:mt-1 my-5'>
            <Helmet>
                <title>Dashboard || Create blog</title>
            </Helmet>
            <h1 className='text-center font-bold text-Red drop-shadow-md text-2xl'>Create A Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* title */}
                <div className="mt-4 md:ml-5">
                    <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder='Enter title'
                        className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 placeholder-Red/40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                        {...register('title', {
                            required: 'Title is required',
                        })}
                    />
                    {errors.title && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.title.message}</p>}
                </div>

                {/* thumbnail */}
                <div className="mt-4 md:ml-5 col-span-2">
                    <label
                        htmlFor="thumb"
                        className="block mb-2 text-sm font-medium text-Red dark:text-gray-200"
                    >
                        Thumbneil
                    </label>
                    <input
                        type="file"
                        id="thumb"
                        accept='image/*'
                        className="block w-full px-3 py-2 mt-2 text-sm text-Red bg-white border border-gray-200 rounded-lg file:bg-Red/10 file:text-Red file:font-bold file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                        {...register('thumb', {
                            required: 'Thumbnail is required',
                            validate: {
                                fileType: (value) =>
                                    value[0]?.type.startsWith('image/') || 'File must be an image',
                                fileSize: (value) =>
                                    value[0]?.size < 2 * 1024 * 1024 || 'File size must be less than 2MB',
                            },
                        })}
                    />
                    {errors.thumb && (
                        <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">
                            {errors.thumb.message}
                        </p>
                    )}
                </div>

                {/* Jodit React Editor for Content */}
                <div className="mt-4 md:ml-5">
                    <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200">
                            Content
                        </label>
                    </div>
                    <JoditEditor
                        ref={editor}
                        value={editorContent}
                        onBlur={(newContent) => setEditorContent(newContent)}
                        // onChange={(newContent) => setEditorContent(newContent)}
                        config={{
                            placeholder: 'Start typing your blog content here...',
                        }}
                    />
                    {errors.content && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.content.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="mt-6 col-span-2 md:ml-5">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 uppercase"
                    >
                        Create Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;