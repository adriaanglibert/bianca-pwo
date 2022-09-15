import Heading from 'components/Heading';
import React from 'react';
import styles from './Step.module.scss';

const Step = ({step}) => {
    // Strange bug when using process directly in the href.
    const PUBLIC_URL = process?.env.PUBLIC_URL;

    return (
        <article className={styles.step}>
            <Heading>
                {step.title}
            </Heading>

            {
                step.prefix &&
                <p>
                    {step.prefix}
                </p>
            }

            {
                step.image &&
                <img
                    loading="eager"
                    width={600}
                    height={550}
                    alt={step.title}
                    src={`${PUBLIC_URL}/images/${step.image}`} />
            }

            {
                step.suffix &&
                <p>
                    {step.suffix}
                </p>
            }
        </article>
    )
}

export default Step
