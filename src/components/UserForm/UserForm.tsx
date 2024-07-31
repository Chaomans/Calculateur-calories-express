import React, { useState } from "react";
import { Coefficients, DefaultUserInfos, UserInfos } from "../../utils/types";
import styles from "./UserForm.module.scss";

type UserFormProps = {
  coeffs: Coefficients;
  defaultUserInfos: DefaultUserInfos;
  setUserInfos: React.Dispatch<UserInfos | DefaultUserInfos>;
  handleSubmit: (infos: UserInfos) => void;
};

const UserForm = ({
  coeffs,
  defaultUserInfos,
  setUserInfos,
  handleSubmit,
}: UserFormProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [infos, setInfos] = useState<DefaultUserInfos | UserInfos>({
    ...defaultUserInfos,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInfos({ ...infos });
    handleSubmit(infos as UserInfos);
    setSubmitted(true);
  };

  const onChange = (value: string, id: string) => {
    const newInfos: DefaultUserInfos = { ...infos };
    if (id === "sex") {
      newInfos.sex = value;
      setInfos({ ...newInfos });
    }
    if (id === "activity" || id === "goal") {
      newInfos[id] = parseFloat(value);
      setInfos({ ...newInfos });
    }
    if (id === "age" || id === "weight" || id === "height") {
      newInfos[id] = parseInt(value);
      setInfos({ ...newInfos });
    }
    checkForm(newInfos);
  };

  const checkForm = (infos: DefaultUserInfos) => {
    for (const [_, v] of Object.entries(infos)) {
      if (v === null) {
        return;
      }
    }
    setIsValid(true);
  };

  return (
    <form action="" onSubmit={(e) => onSubmit(e)} className={styles.form}>
      <div className={styles.age}>
        <label htmlFor="age" className={styles.label}>
          Âge
        </label>
        <input
          id="age"
          name="age"
          type="text"
          pattern="[0-9]{2}"
          onChange={(e) => onChange(e.target.value, e.target.id)}
          className={styles.input}
          disabled={submitted}
        />
      </div>
      <div className={styles.sex}>
        <p className={styles.sexLabel}>Sexe</p>
        <div className={styles.radios}>
          <div className={styles.radio}>
            <label htmlFor="sex1" className={styles.label}>
              Homme
            </label>
            <input
              id="sex1"
              name="sex"
              value="H"
              type="radio"
              onClick={(e) =>
                onChange(e.currentTarget.value, e.currentTarget.name)
              }
              className={styles.input}
              disabled={submitted}
            />
          </div>
          <div className={styles.radio}>
            <label htmlFor="sex2" className={styles.label}>
              Femme
            </label>
            <input
              id="sex2"
              name="sex"
              value="F"
              type="radio"
              onClick={(e) =>
                onChange(e.currentTarget.value, e.currentTarget.name)
              }
              className={styles.input}
              disabled={submitted}
            />
          </div>
        </div>
      </div>
      <div className={styles.height}>
        <label htmlFor="height" className={styles.label}>
          Taille (cm)
        </label>
        <input
          id="height"
          name="height"
          type="text"
          pattern="[0-9]{3}"
          onChange={(e) => onChange(e.target.value, e.target.id)}
          className={styles.input}
          disabled={submitted}
        />
      </div>
      <div className={styles.weight}>
        <label htmlFor="weight" className={styles.label}>
          Poids (kg)
        </label>
        <input
          id="weight"
          name="weight"
          type="text"
          pattern="[0-9]{2}|[0-9]{3}"
          onChange={(e) => onChange(e.target.value, e.target.id)}
          className={styles.input}
          disabled={submitted}
        />
      </div>
      <div className={styles.activity}>
        <label htmlFor="activity" className={styles.label}>
          Activité
        </label>
        <select
          name="activity"
          id="activity"
          onChange={(e) => onChange(e.target.value, e.target.id)}
          disabled={submitted}
          className={styles.select}
        >
          {coeffs.activity.map((coeff) => (
            <option
              value={coeff.value}
              key={coeff.value}
              className={styles.option}
            >
              <span className={styles.activityType}>{coeff.type}</span> -{" "}
              {coeff.text}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.goal}>
        <label htmlFor="goal" className={styles.label}>
          Goal
        </label>
        <select
          name="goal"
          id="goal"
          onChange={(e) => onChange(e.target.value, e.target.id)}
          disabled={submitted}
          className={styles.select}
        >
          {coeffs.goal.map((coeff) => (
            <option
              value={coeff.value}
              key={coeff.value}
              className={styles.option}
            >
              {coeff.text}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.submit} disabled={!isValid || submitted}>
        Calculer
      </button>
    </form>
  );
};

export default UserForm;
