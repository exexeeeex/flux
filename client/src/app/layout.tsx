import { AuthenticationForm } from '@/features/auth';
import { useAuthenticationStore } from '@/features/auth/store/auth';
import { BasePage } from '@/pages';

export const Layout = () => {
    const { isAuthenticated } = useAuthenticationStore();

    return (
        <main className='w-full h-full'>
            {isAuthenticated ? (
                <BasePage />
            ) : (
                <section
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className='w-full h-full'
                >
                    <AuthenticationForm />
                </section>
            )}
        </main>
    );
};
