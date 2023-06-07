import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTherapist from './pages/RegisterTherapist';
import StudentRedirect from './pages/studentRedirect';
import TherapistRedirect from './pages/therapistRedirect';
import StagesPage from './pages/StagesPage';
import FormsPage from './pages/FormsPage';
import AssessmentPage from './pages/AssessmentPage';
import DefaultStages from './pages/DefaultStages';
import DefaultAssessments from './pages/DefaultAssessments';
import DefaultForms from './pages/DefaultForms';
import DefaultWorkflow from './pages/DefaultWorkflow'
import StagesPageStudentView from './pages/StagesPageStudentView';
import AssessmentPageStudentView from './pages/AssessmentPageStudentView';
import FormsPageStudentView from './pages/FormsPageStudentView';
import ProfilePageStudent from './pages/ProfilePageStudent';
import ProfilePageTherapist from './pages/ProfilePageTherapist';
import {
	createBrowserRouter,
	RouterProvider,
}  from "react-router-dom"
import LandStudent from './pages/LandStudent';
import LandTherapy from './pages/LandTherapist';
import ViewPDF from './components/viewPDF';
import EditFormTherapist from './pages/EditFormTherapist'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />
	},
  {
    path: "/adminPage/:display",
    element: <AdminPage />
  },
  {
    path: "/RegisterStudent",
    element: <RegisterStudent />
  },
  {
    path: "/RegisterTherapist",
    element: <RegisterTherapist />
  },
  {
    path: "/StudentRedirect",
    element: <StudentRedirect />
  },
  {
    path: "/TherapistRedirect",
    element: <TherapistRedirect />
  },
  {
    path: "/LandTherapy/:display",
    element: <LandTherapy />
  },
  {
    path: "/LandStudent/:display",
    element: <LandStudent/>
  },
  {
    path: "/StagesPage/:id",
    element: <StagesPage />
  },
  {
    path: "/ProfilePageStudent/:id",
    element: <ProfilePageStudent/>
  },
  {
    path: "/ProfilePageTherapist/:id",
    element: <ProfilePageTherapist/>
  },
  {
    path: "/FormsPage/:id",
    element: <FormsPage />
  },
  {
    path:"/EditForm/:id",
    element:<EditFormTherapist/>
  },
  {
    path: '/AssessmentPage/:id',
    element: <AssessmentPage />
  },
  {
    path: '/DefaultStages',
    element: <DefaultStages />
  },
  {
    path: '/DefaultAssessments/:stage',
    element: <DefaultAssessments />
  },
  {
    path: '/DefaultForms/:assessment',
    element: <DefaultForms />
  },
  {
    path: '/defaultWorkflow',
    element: <DefaultWorkflow />
  },
  {
    path: '/StagesPageStudentView/:id',
    element: <StagesPageStudentView />
  },
  {
    path: '/AssessmentPageStudentView/:id',
    element: <AssessmentPageStudentView />
  },
  {
    path: "/FormsPageStudentView/:id",
    element: <FormsPageStudentView />
  },
  {
    path: '/viewPDF',
    element: <ViewPDF />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}>
		
	</RouterProvider>
);