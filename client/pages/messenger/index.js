import { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../../context'
import UserRoute from '../../routes/UserRoute'
import Conversation from '../../components/messenger/Conversation'
import Message from '../../components/messenger/Message'
import { LockOutlined, SendOutlined } from '@ant-design/icons'
import styles from '../../styles/Messenger.module.css'
import axios from 'axios'
import io from 'socket.io-client'
import Search from '../../components/Search'

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true,
});

const Messenger = () => {

    const [state] = useContext(UserContext);

    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);

    const [conversationId, setConversationId] = useState(null);

    const [text, setText] = useState('');

    const [searchUsers, setSearchUsers] = useState([]);

    const scrollRef = useRef();

    useEffect(() => {
        socket?.on('get-message', (text) => {
            fetchMessages();
        });
    }, []);

    useEffect(() => {
        if (state && state.userInfo && state.userInfo._id) {
            fetchConversations();
        }
    }, [state && state.userInfo && state.userInfo._id]);

    useEffect(() => {
        if (conversationId) {
            fetchMessages();
        }
    }, [state?.userInfo && conversationId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const res = await axios.get(`/conversations/${state.userInfo?._id}`);
            setConversations(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/message/${conversationId}`);
            setMessages(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const checkSpaces = () => {
        if (text.trim().length === 0) {
            return true;
        }
        return false;
    }

    const sendMessage = async () => {
        try {
            const res = await axios.post('/send-message', { conversationId, text });
            if (res.data) {
                socket?.emit(`send-message`, {
                    text: res.data.text 
                });
            }
            fetchMessages();
            setText('');
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <UserRoute>
            <div className={styles.messengerWrapper}>
                <div className={styles.conversations}>
                    <span className={styles.searchWrapper}>
                        <Search 
                            searchUsers={searchUsers}
                            setSearchUsers={setSearchUsers}
                            setConversationId={setConversationId}
                            messenger={true}
                        />
                        {/* <SearchOutlined style={{ color: '#1775e5'}}/>
                        <input className={styles.searchInput} placeholder='Search friends..' /> */}
                    </span>
                    <div className={styles.conversationsWrapper}>
                        <span className={styles.conversationTitle}>Conversations:</span>
                    {
                        conversations.map(conversation => (
                            <Conversation 
                                conversation={conversation}
                                setConversationId={setConversationId}
                                key={conversation._id}
                            />
                        ))
                    }
                    </div>
                </div>
                {
                conversationId
                    ?   <div className={styles.chatBox}>
                            <div className={styles.chatBoxTop}>
                            { messages.length > 0 && 
                                <div className={styles.secureMessage}>
                                    <LockOutlined /> Message in the chat are secured and encrypted. No one outside this chat can read them.
                                </div>
                            }
                            {
                                messages.length
                                  ? messages.map(message => (
                                        <Message
                                            own={message.sender._id === state.userInfo?._id}
                                            message={message}
                                            scrollRef={scrollRef}
                                            key={message._id}
                                        />
                                    ))
                                  : <span className={styles.noMessageText}>
                                        Start the chat by sending a message
                                    </span>
                            }
                            </div>
                            <div className={styles.chatBoxBottom}>
                                <textarea 
                                    className={styles.textarea} 
                                    placeholder={'Write something...'} 
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <button 
                                    className={styles.sendButton}
                                    onClick={() => sendMessage()}
                                    disabled={checkSpaces()}
                                >
                                    Send <SendOutlined />
                                </button>
                            </div>
                        </div>
                    :   <span className={styles.noConversationText}>
                            Open a conversation to start a chat
                        </span>
                }  
            </div>
        </UserRoute>
    )
}

export default Messenger
