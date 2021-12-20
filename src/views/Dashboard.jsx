import Button from 'components/Button';
import {FiSettings} from "react-icons/fi";
import Nav from 'components/Nav';
import React, { useContext, useState } from 'react'
import { SETTINGS } from 'constants/routes';
import { logout } from 'firebase-config';
import { useTranslation } from 'react-i18next';
import Container from 'components/Container';
import Heading from 'components/Heading';
import Week from './settings/Week';
import { UserContext } from 'context';
import Card from 'components/Card';
import styling from './Dashboard.module.scss';
import general from '../styling/general.module.scss';

const Dashboard = () => {
    const [d] = useContext(UserContext);
    const [defaultActivities, setDefaultActivities] = useState(d?.settings);

    const {t} = useTranslation();

    return (
        <>
            <Nav>
                <Button to={SETTINGS} variant="light" icon={<FiSettings/>}>
                    {t('actions.settings')}
                </Button>
            </Nav>

            <Container>
                <div className={styling.container}>
                    <aside className={styling.sidebar}>
                        <Card styling={general.m0}>
                            Help
                        </Card>
                    </aside>

                    <main className={styling.main}>
                        <div>
                            <Heading>
                                Augustus
                            </Heading>
                        </div>

                        <Week
                            activities={defaultActivities}
                        />
                    </main>
                </div>
            </Container>
        </>
    )
}

export default Dashboard
