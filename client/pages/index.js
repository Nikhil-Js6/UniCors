import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context'
import Head from 'next/head'
import PostCard from '../components/cards/PostCard';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true,
});

const Home = ({ posts }) => {

    const [state] = useContext(UserContext);

    const [postFeed, setPostFeed] = useState([]);

    useEffect(() => {
        socket?.on('new-post', (newPost) => {
            setPostFeed([newPost, ...posts]);
        });
        socket.on('post-deleted', (deletedPost) => {
            console.log(deletedPost);
            let newPosts = postFeed.filter((post, deletedPost) => {
                return post._id !== deletedPost._id;
            })
            setPostFeed(newPosts);
            console.log(newPosts);
        });
    }, []);

    const collection = postFeed.length ? postFeed : posts;
    
    const head = () => (
        <Head>
            <title> UniCors - A social network by Developers.</title>
            <meta 
                name='description'
                content='A social network for developers by developers'
            />
            <meta 
                property='og:description'
                content='A social network for developers by developers'
            />
            
            <meta property='og:type' content='website'/>
            <meta property='og:site_name'content='UniCors'/>
            <meta property='og:url' content='https://unicors.com'/>
            
            <meta 
                property='og:image:secure_url' 
                content='https://unicors.com/images/noImage.com'
            />
        </Head>
    ) 

    return (
        <div className={styles.homeWrapper}>
            { head() }
            <span className={styles.bg}>
                <span className={styles.title}>Home</span>
            </span>
            <div className={styles.cardWrapper}>
                <PostCard page={'home'} userPosts={collection}/>
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {

    const { data } = await axios.get('/all-posts');

    if (data) {
        return {
            props: {
                posts: data
            }
        }
    } 
    else {
        return {
            props: {
                posts: null
            }
        }
    }
}

export default Home
