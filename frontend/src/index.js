import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import NormalRequest from "./pages/NormalRequest";
import BasicTabs from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Detail from "./pages/Detail";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useSelector } from "react-redux";
import ProtectedStudentLayout from "./method/protectedLayout/ProtectedStudentLayout";
import ProtectedprofessorLayout from "./method/protectedLayout/ProtectedprofessorLayout";
import Error from "./pages/error";
import Header from "./components/common/header/Header";
import AppTest from "./AppTest";
import TransferGrade from "./pages/TransferGrade";
import Quit from './pages/Quit'
import ExemptionEL from "./pages/ExemptionEL";
import ExemptionTU from "./pages/ExemptionTU";
import ExemptionELN from "./pages/ExemptionELearning";
import RegistLate from "./pages/RegistLate";
import WithdrawLate from "./pages/WithdrawLate";
import InfoPage from "./pages/InfoPage";

const IsLogin = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLogin = useSelector((state) => state.login.value);

  return isLogin || token? (role === 'student' ? <BasicTabs /> : <ProfessorDashboard />): <Login />;
}

const router = createBrowserRouter([
  {
    path: 'test',
    element: <AppTest/>
  },
  {
    element: <App />,
    children: [
      {
          path: "/",
        element: <IsLogin/>,
      },
      {
        element: <ProtectedStudentLayout />,
        children:
        [
          {
            path: "normal-request",
            element: <NormalRequest />
          },
          {
            path:"transfer-grade",
            element: <TransferGrade/>,
          },
          {
            path:"quit",
            element: <Quit/>,
          },
          {
            path:"exemption-el",
            element: <ExemptionEL/>,
          },
          {
            path: "exemption-TU",
            element: <ExemptionTU/>
          },
          {
            path: "exemption-elearning",
            element: <ExemptionELN/>
          },
          {
            path: "add-subject",
            element: <RegistLate/>
          },
          {
            path: "withdraw-subject",
            element: <WithdrawLate/>
          },
          {
            path: "info-page",
            element: <InfoPage/>
          },
          {
            path: "student-detail/:form_id",
            element: < Detail/>
          },
          

        ]
      },
      {
        element: <ProtectedprofessorLayout />,
        children:
        [ 
          {
            path: "professor-dashboard/:form_type",
            element: <ProfessorDashboard/>
          },
          {
            path: "professor-dashboard/:form_type/professor-detail/:form_id",
            element: <Detail />,
          },
          {
            path: "professor-detail/:form_id",
            element: <Detail/>
          }
        ]
      },
    ]
  },
  {
    path: 'error403',
    element: <Error/>
  }
]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
  