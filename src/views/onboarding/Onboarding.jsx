import Button from 'components/Button';
import Center from 'components/Center';
import Nav from 'components/Nav';
import React from 'react';
import { SETTINGS } from 'constants/routes';
import Step from '../../components/Step';
import general from 'styling/general.module.scss';
import steps from 'data/onboarding.json';
import styles from 'views/onboarding/Onboarding.module.scss'
import useData from 'hooks/useData';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Onboarding = () => {
    let history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const {t} = useTranslation();
    const [, setData] = useData(null, () => history.push(SETTINGS));

    const updateSeenOnboarding = () => {
        setData({
            seenOnboarding: true
        })
    }

    return (
        <>
            <Nav>
                <Button onClick={() => updateSeenOnboarding()}>
                    {t("skip")}
                </Button>
            </Nav>

            <Center styling={styles.container}>
                {
                    steps.map((step, index) => index === activeStep &&
                        <Step key={step.title} step={step} setActiveStep={setActiveStep}  />
                    )
                }

                <div className={styles.bar}>
                    <nav className={styles.controls}>
                        <Button
                            styling={styles.button}
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep(activeStep - 1)}>
                            {t('previous')}
                        </Button>

                        <div className={styles.dots}>
                            {
                                steps.map((step, index) =>
                                <button
                                    key={index}
                                    className={`${styles.dot} ${index === activeStep && styles.active}`}
                                    onClick={() => setActiveStep(index)}
                                    >
                                    <span className={general.srOnly}>
                                        {t('step')} {index + 1}
                                    </span>
                                </button>)
                            }
                        </div>

                        {
                            activeStep !== steps.length - 1 ?
                            <Button
                                styling={styles.button}
                                onClick={() => setActiveStep(activeStep + 1)}>
                                {t('next')}
                            </Button> :
                            <Button
                                onClick={() => updateSeenOnboarding()}
                                variant="success"
                                styling={styles.button}>
                                {t('start')}
                            </Button>
                        }
                    </nav>
                </div>
            </Center>
        </>
    )
}

export default Onboarding
