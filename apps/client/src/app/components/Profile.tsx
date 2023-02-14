import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../lib/LoggedInUserContext';
import { LoadingContext } from '../lib/UseLoadingContext';
import { apiUrl } from '../lib/ApiUrl';
import useFetchWithError from '../lib/fetchWithError';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
    const userInfo = useContext(UserContext);
    const {addLoadingMessage} = useContext(LoadingContext);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const fetchWithError = useFetchWithError();
    const navigate = useNavigate();  
    const [profilePicture, setProfilePicture] = useState<string|undefined>('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png')
    
    // Pre-populating the form fields with user's info
    useEffect(() => {
        if (userInfo.user) {
            for (const [key, value] of Object.entries(userInfo.user)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [userInfo])


    const validatePassword = (val: string) => {
        return watch('password') === val || "The passwords do not match"
    }

    const handlePictureChange = (e: any) => {
        if (e.target.files?.length) setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
    
    const onSubmit = async (data: any) => {
        const {firstName, lastName, username, email, password, confirmPassword} = data;
        const res = await fetchWithError({
            fetchParams: [
              apiUrl("account/profile"),
              {
                method: "POST",
                body: JSON.stringify({
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  confirmPassword,
                  profilePicture
                })
              }
            ],
            errorMessage: "Failed to update profile, please try again or contact us",
            loadingMessage: "Updating profile"
        });
        if (res.message === 'success') {
            addLoadingMessage('Successfully updated profile');
            navigate(0);
        };
    }

    const renderValidationErrors = () => {
        const errorsArray = Object.keys(errors);
        return errorsArray.map((err: string) => (
            <p className='text-red-700' key={err}>{errors[err]?.message?.toString()}</p>
        ))
    }

    return (
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/*Modal content*/}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                {/*Modal header*/}
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update user
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateUserModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/*Modal body*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input {...register('firstName')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="John" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input {...register('lastName')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Doe" />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input {...register('username', {required: "A username is required", maxLength: 20})}  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="johndoe7" required={false} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input {...register('email', {required: "A valid email is required"})}  type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="john@company.com" required={false} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input {...register('password', {minLength: {value: 8, message: "Password must have at least 8 characters"}})} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="•••••••••" required={false} />
                        </div>                        
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input {...register('confirmPassword', {validate: validatePassword})} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="•••••••••" required={false} />
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload avatar</label>
                            <div className="items-center w-full sm:flex">
                                <img className="mb-4 w-20 h-20 rounded-full sm:mr-4 sm:mb-0" src={profilePicture} alt="Profile picture" />
                                <div className="w-full">
                                    <input onChange={handlePictureChange} className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                    <p className="mt-1 mb-3 text-xs font-normal text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                    <div className="flex items-center space-x-2.5">
                                        <button type="button" className="inline-flex items-center py-2 px-3 text-xs font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <svg className="mr-1 -ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                            Upload new picture
                                        </button>
                                        <button type="button" className="py-2 px-3 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderValidationErrors()}
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Update user
                        </button>
                        <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}