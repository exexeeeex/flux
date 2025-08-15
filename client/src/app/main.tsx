import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthenticationProvider } from '@/features/auth';
import { Toaster } from 'react-hot-toast';
import '@/app/assets/styles/index.css';
import './assets/styles/_zeroing.css';
import './assets/styles/_global.css';

createRoot(document.getElementById('root')!).render(
    <AuthenticationProvider>
        <RouterProvider router={router} />
        <Toaster
            position='bottom-right'
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 3000,
                removeDelay: 1000,
                style: {
                    backgroundColor: 'var(--color-neutral-700)',
                    color: 'var(--text-amber-50)',
                },
            }}
        />
    </AuthenticationProvider>,
);
