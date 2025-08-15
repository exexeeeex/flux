import { ChatCard } from '@/entities/chat';
import { useEffect, type FC } from 'react';
import { useChatStore } from '../../store';

export const ChatList: FC = () => {
    const { chats, getChats, error } = useChatStore();

    useEffect(() => {
        getChats();
    }, [getChats]);

    if (error) return <p className='text-red-600'>{error}</p>;
    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 5px',
            }}
            className='w-full gap-2'
        >
            {chats && chats.length >= 1 ? (
                chats.map((chat) => (
                    <ChatCard
                        chat={chat}
                        key={chat.id}
                        select={() => console.log(chat.id)}
                    />
                ))
            ) : (
                <h3
                    style={{ display: 'flex', margin: 'auto' }}
                    className='text-white font-semibold'
                >
                    Чатов нет!
                </h3>
            )}
        </section>
    );
};
