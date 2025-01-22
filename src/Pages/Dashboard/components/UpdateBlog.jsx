import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [editorContent, setEditorContent] = useState('');
    const { id } = useParams();
    const blog = useLoaderData();

    const onSubmit = async (data) => {
        // Keep old thumbnail unless a new one is uploaded
        let thumb = blog.thumb;

        if (data.thumb && data.thumb.length > 0) {
            const photo = data.thumb[0];
            const formData = new FormData();
            formData.append("image", photo);

            // Upload image to imgbb
            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`,
                    formData
                );
                thumb = response.data.data.display_url; // Use the new image URL
            } catch (error) {
                toast.error("Failed to upload thumbnail. Please try again.");
                return;
            }
        }

        // Prepare updated content
        const contentData = {
            title: data.title || blog.title,
            thumb,
            content: editorContent || blog.content,
            createdAt: new Date().toISOString(),
            status: 'draft',
        };

        try {
            const response = await axiosSecure.patch(`/update-blog/${id}`, contentData);
            if (response.data?.modifiedCount) {
                toast.success('Blog updated successfully!');
                reset();
                setEditorContent('');
                navigate('/dashboard/content-management');
            } else {
                toast.error('No changes were made.');
            }
        } catch (err) {
            console.error('Error while updating blog:', err);
            toast.error('Failed to update blog. Please try again.');
        }
    };

    return (
        <div className='bg-gray-100 my-20 rounded-md shadow-lg lg:w-7/12 w-11/12 mx-auto bg-Red/5 p-8'>
            <h1 className='text-center font-bold text-Red drop-shadow-md text-lg px-8'>
                Update? {blog.title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mt-4 ml-5">
                    <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        defaultValue={blog.title}
                        className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg focus:border-Racing-Red focus:ring-opacity-40 placeholder-Red/40 focus:ring focus:ring-Racing-Red"
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Thumbnail */}
                <div className="mt-4 ml-5 col-span-2">
                    <label
                        htmlFor="thumb"
                        className="block mb-2 text-sm font-medium text-Red dark:text-gray-200"
                    >
                        Thumbnail
                    </label>
                    <input
                        type="file"
                        id="thumb"
                        accept="image/*"
                        className="block w-full px-3 py-2 mt-2 text-sm text-Red bg-white border border-gray-200 rounded-lg file:bg-Red/10 file:text-Red file:font-bold file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full"
                        {...register('thumb')}
                    />
                    {errors.thumb && (
                        <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">
                            {errors.thumb.message}
                        </p>
                    )}
                    {/* Current Thumbnail */}
                    <div className="mt-2">
                        <p className="block mb-2 text-sm font-medium text-Red dark:text-gray-200">Current Thumbnail:</p>
                        <img
                            src={blog.thumb}
                            alt="Default Thumbnail"
                            className="w-32 h-20 object-cover rounded-md border mt-1"
                        />
                    </div>
                </div>

                {/* Jodit React Editor for Content */}
                <div className="mt-4 ml-5">
                    <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200">
                            Content
                        </label>
                    </div>
                    <JoditEditor
                        ref={editor}
                        value={editorContent || blog.content}
                        onBlur={(newContent) => setEditorContent(newContent)}
                        config={{
                            readonly: false,
                            height: 300,
                        }}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-6 col-span-2 ml-5">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red"
                    >
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
