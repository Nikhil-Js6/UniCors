import '../styles/global.css'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
               
          </Head>
          <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
