import Button from 'components/Button';
import Nav from 'components/Nav';
import React from 'react'
import { SETTINGS } from 'constants/routes';
import { logout } from 'firebase-config';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const {t} = useTranslation();

    return (
        <>
            <Nav>
                <Button to={SETTINGS}>
                    {t('actions.settings')}
                </Button>
            </Nav>

            <div>
                Dashboard
                <button onClick={logout}>logout</button>
            </div>
        </>
    )
}

export default Dashboard
