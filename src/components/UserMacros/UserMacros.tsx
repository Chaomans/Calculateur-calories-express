import { Macros, UserInfos } from "../../utils/types";

type UserMacrosProps = {
  macros: Macros | null;
  userInfos: UserInfos;
};

const UserMacros = ({ macros, userInfos }: UserMacrosProps) => {
  return (
    macros && (
      <div className="macros">
        <div className="calories">{Math.round(macros.calories)} Cal</div>
        <div className="other">
          <div className="proteins">{Math.round(macros.proteins)} g</div>
          <div className="glucids">{Math.round(macros.glucids)} g</div>
          <div className="lipids">{Math.round(macros.lipids)} g</div>
        </div>
        <div className="resume">dfezfezfezfez</div>
      </div>
    )
  );
};

export default UserMacros;
