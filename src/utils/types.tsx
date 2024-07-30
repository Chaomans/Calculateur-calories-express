export type Coefficients = {
  activity: Coefficient[];
  goal: Coefficient[];
};

type Coefficient = {
  value: number;
  text: string;
};

export type UserInfos = {
  age: number;
  sex: string;
  height: number;
  weight: number;
  activity: number;
  goal: number;
};

export type DefaultUserInfos = {
  age: number | null;
  sex: string | null;
  height: number | null;
  weight: number | null;
  activity: number;
  goal: number;
};

export type Macros = {
  calories: number;
  proteins: number;
  lipids: number;
  glucids: number;
};
