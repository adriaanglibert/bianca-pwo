import Center from 'components/Center';
import Nav from 'components/Nav';
import React from 'react'
import Spinner from 'components/Spinner';

const Loading = () => {
    return (
        <>
            <Nav/>

            <Center>
                <Spinner />
            </Center>
        </>
    )
}

export default Loading
