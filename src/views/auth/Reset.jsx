import { REGISTER, RESET } from "constants/routes";
import { React, useState } from "react";

import  Button from 'components/Button';
import Card from "components/Card";
import Center from "components/Center";
import Heading from "components/Heading";
import Input from 'components/Input';
import Route from 'components/Route';
import general from 'styling/general.module.scss';
import { sendPasswordResetEmail } from "firebase-config";
import useAuthentication from 'hooks/useAuthentication';
import { useTranslation } from 'react-i18next';

function Reset() {
  useAuthentication(RESET);
  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  return (
    <Center>
      <Card>
        <Heading as={2}>
          {t('actions.resetting_password')}
        </Heading>

        <p>
        {t('actions.resetting_password_instructions')}
        </p>

        <Input
            styling={general.mt0}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email.placeholder")}
          >
          {t('email.label')}
        </Input>

        <Button
            variant="success"
            onClick={() => sendPasswordResetEmail(email)}>
            {t('actions.reset')}
        </Button>

        <Route styling={general.center} to={REGISTER}>
            {t('actions.not_registered')}
        </Route>
      </Card>
    </Center>
  );
}

export default Reset;
