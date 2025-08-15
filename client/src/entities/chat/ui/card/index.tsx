import { type FC } from 'react';
import type { ChatCardProp } from '../../models';
import { Link } from 'react-router';

export const ChatCard: FC<ChatCardProp> = ({ chat, select }) => {
    return (
        <Link
            to={{ pathname: '/', search: `?chat=${chat.id}` }}
            className='w-full h-[60px] flex items-start justify-start transition-[0.2s] text-white hover:bg-neutral-600 font-medium cursor-pointer gap-2 rounded-[10px]'
            onClick={select}
            style={{ padding: '5px' }}
        >
            <div>
                <img
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '100%',
                    }}
                    className='object-cover'
                    src={chat.recipient.avatar}
                    alt='avatar'
                />
            </div>
            <div>
                <h3 className='text-large'>{chat.recipient.username}</h3>
            </div>
        </Link>
    );
};
