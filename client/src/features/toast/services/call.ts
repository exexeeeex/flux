import toast from 'react-hot-toast';

export const callToast = (error: boolean, message: string) => {
    if (error) toast.error(message);
    else toast.success(message);
};
