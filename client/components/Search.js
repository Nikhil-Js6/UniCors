import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context'
import styles from '../styles/Search.module.css'
import { SearchOutlined } from '@ant-design/icons'
import People from './cards/People'
import axios from 'axios'

const Search = ({ searchUsers, setSearchUsers, setConversationId, messenger, handleFollow, handleUnfollow }) => {

    const [state] = useContext(UserContext);

    const [query, setQuery] = useState('');

    const [message, setMessage] = useState('');
    const [type, setType] = useState(1);

    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState(false);

    useEffect(() => {
        handleSearch();
    }, [query]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setType(type);
        setTimeout(() => {
            setMessage('');
        }, 3500);
    }

    const handleSearch = async (e) => {
        e && e.preventDefault();
        if (query) {
            setLoading(true);
            try {
                const res = await axios.get(`/search-user/${query}`);
                if (!res.data.length) {
                    alertMessage('No Users Found!', 2); 
                    return;
                }
                const filteredUsers =  res.data.filter(user => user._id !== state.userInfo._id);
                setSearchUsers(filteredUsers);
                alertMessage('User fetched successfully!', 1);
                setLoading(false);
            } 
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    }

    return (
        <div className={styles.formWrapper}>
            <span className={`${styles.message} ${type === 1 ? styles.success : styles.error }`}>
                { message }
            </span>
            <form className={styles.searchForm} onSubmit={(e) => handleSearch(e)}>
                {icon && <SearchOutlined />}
                <input 
                    className={styles.searchInput}
                    placeholder='Search...'
                    value={query}
                    onFocus={() => setIcon(true)}
                    onChange={(e) => {
                        setSearchUsers([]);
                        setQuery(e.target.value);
                    }}
                />
                <button type='submit' className={styles.searchButton}>Search <SearchOutlined /></button>
            </form>
        {
            searchUsers?.map((user) => (
                <People 
                    user={user} 
                    loading={loading} 
                    messenger={messenger}
                    handleFollow={handleFollow} 
                    handleUnfollow={handleUnfollow} 
                    setConversationId={setConversationId}
                    key={user._id}
                />
            ))
        }
        </div>
    )
}

export default Search
