import Button from "components/Button";
import React from "react";
import { UserContext } from "context";
import { logout } from "firebase-config";
import styling from "./Nav.module.scss";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Nav = ({ children }) => {
  const { t } = useTranslation();
  const [user, setData] = useContext(UserContext);

  const signOut = async () => {
    try {
      await logout();
      setData(null);
    } catch {
      toast.error(t("errors.sign_out"));
    }
  };

  return (
    <nav className={styling.navbar}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={process.env.REACT_APP_WEBSITE}
      >
        <img src="/images/logo.png" alt="logo" />
      </a>

      <div className={styling.buttons}>
        {children}
        {user && (
          <Button onClick={() => signOut()} variant="danger">
            {t("actions.sign_out")}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
