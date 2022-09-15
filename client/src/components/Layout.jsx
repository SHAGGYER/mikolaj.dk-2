import React from 'react';
import HttpClient from "../services/HttpClient";

function Layout(props) {
    console.log(props)

    return (
        <></>
    );
}

Layout.getInitialProps = async ({req}) => {
    let token;
    if (req) {
        // server
        return {page: {}};
    } else {
        // client
        const {data} = await HttpClient().get("/api/auth/init")
        return {authData: data};
    }
};

export default Layout;