import { useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import UserMacros from "../components/UserMacros/UserMacros";
import {
  Coefficients,
  DefaultUserInfos,
  Macros,
  UserInfos,
} from "../utils/types";
import styles from "./App.module.scss";

function App() {
  const defaultUserInfos = {
    age: null,
    sex: null,
    height: null,
    weight: null,
    activity: 1.1,
    goal: 0.7,
  };
  const [userInfos, setUserInfos] = useState<UserInfos | DefaultUserInfos>({
    ...defaultUserInfos,
  });
  const [macros, setMacros] = useState<Macros | null>(null);

  const coeffs: Coefficients = {
    activity: [
      {
        value: 1.1,
        text: "Travail de bureau ou peu actif et pas d'activité physique",
        type: "Sédentaire",
      },
      {
        value: 1.2,
        text: "Travail de bureau ou peu actif et 1-2 séances par semaine",
        type: "Moyennement actif",
      },
      {
        value: 1.3,
        text: "Travail actif avec 8000 pas quotidien et 2-4 séances par semaine",
        type: "Actif",
      },
      {
        value: 1.5,
        text: "Travail actif avec 10000 pas quotidien et 3-5 séances par semaine",
        type: "Très actif",
      },
      {
        value: 1.6,
        text: "Travail actif ou physique avec 10000 pas quotidien et 4-6 séances par semaine",
        type: "Extrêmement actif",
      },
    ],
    goal: [
      {
        value: 0.7,
        text: "Perte de graisse rapide",
      },
      {
        value: 0.8,
        text: "Perte de graisse progressive",
      },
      {
        value: 1.15,
        text: "Prise de muscle",
      },
    ],
  };

  const calculateCalories = ({
    age,
    sex,
    activity,
    goal,
    height,
    weight,
  }: UserInfos) => {
    const toAdd = sex === "H" ? 5 : -161;
    const calories =
      (10 * weight + 6.25 * height - 5 * age + toAdd) * activity * goal;
    if (goal > 1) {
      const proteins = weight * 2;
      const lipids = weight * 0.8;
      return {
        calories: Math.round(calories),
        proteins: Math.round(proteins),
        lipids: Math.round(lipids),
        glucids: Math.round((calories - proteins * 4 - lipids * 9) / 4),
      };
    }

    const proteins = weight * 1.6;
    const lipids = weight * 0.4;
    return {
      calories: Math.round(calories),
      proteins: Math.round(proteins),
      lipids: Math.round(lipids),
      glucids: Math.round((calories - proteins * 4 - lipids * 9) / 4),
    };
  };

  const handleSubmit = (infos: UserInfos) => {
    setMacros(null);
    setMacros(calculateCalories(infos));
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Calculateur Calories Express</h1>
        <p className={styles.p}>Commence ton programme maintenant</p>
      </header>
      <main className={styles.main}>
        <div className={styles.infosTitle}>
          <h2 className={styles.h2}>Tes calories en 2 minutes</h2>
        </div>
        <UserForm
          coeffs={coeffs}
          setUserInfos={setUserInfos}
          defaultUserInfos={defaultUserInfos}
          handleSubmit={handleSubmit}
        />
        <UserMacros
          macros={macros}
          userInfos={userInfos as UserInfos}
          coeffs={coeffs}
        />
      </main>
    </div>
  );
}

export default App;
