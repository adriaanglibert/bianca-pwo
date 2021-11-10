import Heading from 'components/Heading';
import React from 'react';
import styles from './Step.module.scss';

const Step = ({step}) => {
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
                    src={`/images/${step.image}`} />
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
