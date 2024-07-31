import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App/App";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>),
  {
    basename: import.meta.env.PROD ? "/Calculateur-calories-express/" : "/",
  }
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
