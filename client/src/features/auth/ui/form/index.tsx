import type { Sign } from '@/entities/auth';
import { callToast } from '@/features/toast';
import { useState, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuthenticationStore } from '../../store/auth';

export const AuthenticationForm: FC = () => {
    const [type, setType] = useState<'up' | 'in'>('in');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<Sign>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });
    const onSubmit: SubmitHandler<Sign> = async (data) => {
        if (type == 'in') {
            try {
                await signIn(data);
            } catch (error: any) {
                callToast(true, error.response.data.error);
            }
        } else {
            try {
                console.log(data);
                await signUp(data);
            } catch (error: any) {
                console.log(error);
                callToast(true, error.response);
            }
        }
    };
    const { signIn, signUp } = useAuthenticationStore();

    const switchType = () => {
        if (type === 'in') setType('up');
        else setType('in');
    };

    isSubmitted && errors.username && callToast(true, errors.username.message!);
    isSubmitted && errors.password && callToast(true, errors.password.message!);

    const inputStyle = 'h-[35px] rounded-[5px]';

    const inputAdditionalStyles = {
        padding: '0px 5px',
        fontSize: '20px',
        maxWidth: '300px',
        width: '100%',
    };

    return (
        <form
            style={{
                padding: '10px 20px',
                margin: 'auto',
                maxWidth: '340px',
                width: '100%',
            }}
            className='bg-neutral-800 flex justify-center items-center flex-col rounded-[10px] gap-2'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className='font-semibold text-4xl'>
                {type === 'in' ? 'Авторизация' : 'Регистрация'}
            </h2>
            <div className='flex-col flex w-full'>
                <label className='text-xl' htmlFor=''>
                    Имя пользователя
                </label>
                <input
                    style={inputAdditionalStyles}
                    className={inputStyle}
                    {...register('username', {
                        required: 'Укажите имя пользователя!',
                        minLength: {
                            value: 3,
                            message:
                                'Имя пользователя не может быть меньше 3-х символов!',
                        },
                        maxLength: {
                            value: 20,
                            message:
                                'Имя пользователя не может быть больше 20 символов!',
                        },
                    })}
                />
            </div>
            <div className='flex-col flex w-full'>
                <label className='text-xl' htmlFor=''>
                    Пароль
                </label>
                <input
                    type='password'
                    style={inputAdditionalStyles}
                    className={inputStyle}
                    {...register('password', {
                        required: 'Укажите пароль!',
                        minLength: {
                            value: 3,
                            message:
                                'Пароль не может быть меньше 3-х символов!',
                        },
                        maxLength: {
                            value: 40,
                            message: 'Пароль не может быть больше 40 символов!',
                        },
                    })}
                />
            </div>
            <button
                type='submit'
                style={{
                    backgroundColor: 'var(--color-neutral-700)',
                    fontSize: '20px',
                    transition: '0.2s linear',
                    margin: '10px auto',
                }}
                className='max-w-[200px] hover:bg-sky-700 w-full h-[40px] text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors'
            >
                Войти в аккаунт
            </button>
            <button onClick={switchType} type='reset'>
                {type === 'in' ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
            </button>
        </form>
    );
};
