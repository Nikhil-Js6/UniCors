import { useState, useContext } from 'react'
import { UserContext } from '../context'
import styles from '../styles/Search.module.css'
import { SearchOutlined } from '@ant-design/icons'
import People from './cards/People'
import axios from 'axios'


const Search = ({ searchUsers, setSearchUsers, fetchUserPosts, fetchFollowings, handleFollow, handleUnfollow }) => {

    const [state, setState] = useContext(UserContext);

    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState('');
    const [type, setType] = useState(1);

    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState(false);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setType(type);
        setTimeout(() => {
            setMessage('');
        }, 3500);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        // setQuery('');
        if (query) {
            try {
                const res = await axios.get(`/search-user/${query}`);
                if (!res.data.length) {
                    alertMessage('No Users Found!', 2); 
                    return;
                }
                setSearchUsers(res.data);
                alertMessage('User fetched successfully!', 1);
                console.log(users);
            } 
            catch (err) {
                console.log(err);
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
                        handleSearch(e);
                    }}
                />
                <button type='submit' className={styles.searchButton}>Search <SearchOutlined /></button>
            </form>
        {
            searchUsers?.map((user) => (
                <People user={user} loading={loading} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
            ))
        }
        </div>
    )
}

export default Search