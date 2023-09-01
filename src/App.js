import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentification/authentification";
import Home from "./components/home";
import User from "./components/user/user";
import UserDetails from "./components/user/userDetails";
import Meeting from "./components/meeting/meeting";
import Project from "./components/project/project";
import TechnicalTest from "./components/technicalTest/technicalTest";
import Leave from "./components/leave/leave";
import Interview from "./components/interview/interview";
import Complaint from "./components/complaint/complaint";
import Absence from "./components/absence/absence";
import Poste from "./components/poste/poste";
import QuestionResponse from "./components/questionResponse/questionResponse";
import Navigation from "./components/navigation/navigation";
import HomeScreenCandidate from "./components/navigationCandidate/navigationCandidate";

import PosteCandidate from "./components/postecandidate/posteCandidate";
import SignUp from "./components/Sign up/signup";
import CreateQuestionResponse from "./components/technicalTest/createQuestionPesponse";
import ListesQuesRep from "./components/technicalTest/listesQuestRep";
import CreatetechnicalTest from "./components/technicalTest/createTechnicalTest";
import CreateProject from "./components/project/addproject";
import CreateInterview from "./components/interview/addInterview";
import CreateMeeting from "./components/meeting/addMeeting";

import CreatePoste from "./components/poste/addPoste";
import InterviewCandidate from "./components/interviewCandidate/interviewCandidate";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Navigation />}>
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/userDetail" element={<UserDetails />} />
          <Route path="/dashboard/meeting" element={<Meeting />} />

          <Route path="/dashboard/project" element={<Project />} />
          <Route path="/dashboard/techtest" element={<TechnicalTest />} />
          <Route path="/dashboard/leave" element={<Leave />} />
          <Route path="/dashboard/interview" element={<Interview />} />
          <Route path="/dashboard/complaint" element={<Complaint />} />
          <Route path="/dashboard/absence" element={<Absence />} />
          <Route path="/dashboard/poste" element={<Poste />} />
          <Route path="/dashboard/listequesrep" element={<ListesQuesRep />} />
          <Route path="/dashboard/addproject" element={<CreateProject />} />
          <Route path="/dashboard/addInterview" element={<CreateInterview />} />
          <Route path="/dashboard/addMeeting" element={<CreateMeeting />} />

          <Route path="/dashboard/addPoste" element={<CreatePoste />} />

          <Route
            path="/dashboard/createQuesRep"
            element={<CreateQuestionResponse />}
          />
          <Route
            path="/dashboard/questionResponse"
            element={<QuestionResponse />}
          />
          <Route
            path="/dashboard/createTechnicalTest"
            element={<CreatetechnicalTest />}
          />
        </Route>
        <Route path="/dashboardCandidate" element={<HomeScreenCandidate />}>
          <Route
            path="/dashboardCandidate/posteCandidate"
            element={<PosteCandidate />}
          />
          <Route
            path="/dashboardCandidate/EntretienCandidate"
            element={<InterviewCandidate />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
