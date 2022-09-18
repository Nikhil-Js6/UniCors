import '../styles/global.css'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel='icon' href='/icon.ico'/>
            <link rel='apple-touch-icon' href='/icons/icon-192x192.png'/>
            <link rel='manifest' href='/manifest.json'/>
          </Head>
          <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
