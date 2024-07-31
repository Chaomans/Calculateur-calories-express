import { useEffect } from "react";
import { Coefficients, Macros, UserInfos } from "../../utils/types";
import styles from "./UserMacros.module.scss";

type UserMacrosProps = {
  macros: Macros | null;
  userInfos: UserInfos;
  coeffs: Coefficients;
};

const UserMacros = ({ macros, userInfos, coeffs }: UserMacrosProps) => {
  const activityType = () => {
    const typ =
      coeffs.activity.filter((act) => act.value === userInfos.activity)[0]
        .type ?? "";
    if (userInfos.sex === "H" || typ.slice(-2) === "re")
      return typ.toLowerCase();
    return typ.toLowerCase().slice(0, -1) + "ve";
  };

  const goalType = () => {
    return coeffs.goal
      .filter((goal) => goal.value === userInfos.goal)[0]
      .text.toLowerCase();
  };

  useEffect(() => {
    if (macros) {
      document.getElementById("macros")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [macros]);

  return (
    macros && (
      <div id="macros" className={styles.macros}>
        <div className={styles.calories}>
          <p className={styles.macro}>
            {macros.calories}
            <br />
            <span className={styles.unit}>calories</span>
          </p>
        </div>
        <div className={styles.other}>
          <div className={styles.proteins}>
            <p className={styles.macro}>{macros.proteins} g</p>
          </div>
          <div className={styles.glucids}>
            <p className={styles.macro}>{macros.glucids} g</p>
          </div>
          <div className={styles.lipids}>
            <p className={styles.macro}>{macros.lipids} g</p>
          </div>
        </div>
        <p className={styles.resume}>
          Pour {userInfos.sex === "H" ? "un homme" : "une femme"}{" "}
          <span className={styles.crit}>{activityType()}</span> de{" "}
          {userInfos.age} ans qui vise une{" "}
          <span className={styles.crit}>{goalType()}</span>, l'objectif est de
          consommer <span className={styles.crit}>{macros.calories}</span>{" "}
          calories par jour réparties sur{" "}
          <span className={styles.crit}>{macros.proteins} g</span> de protéines,{" "}
          <span className={styles.crit}>{macros.glucids} g</span> de glucides,
          et <span className={styles.crit}>{macros.lipids} g</span> de lipides.
        </p>
      </div>
    )
  );
};

export default UserMacros;
