import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Sonatina</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout
