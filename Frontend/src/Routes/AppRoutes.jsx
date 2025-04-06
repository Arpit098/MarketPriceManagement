import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../Ui/Admin/Admin";
import ConsultancyManagement from "../Components/Desktop/Admin/ConsultantManagement";
import ManageListing from "../Components/Desktop/Admin/ManageListing";
import Home from "../Ui/Home";
import Dashboard from "../Ui/Admin/Dashboard";
import Header from "../Components/Navigation/HeaderSwither";
import ProductMart from "../Components/Desktop/Admin/ProductMart";
import StaffManagement from "../Components/Desktop/Admin/StaffManagement";
import SubscriberManagement from "../Components/Desktop/Admin/SubscriberManagement";
import ManageSubscribersPlans from "../Components/Desktop/Admin/ManageSubscribersPlans";
import PaymentIntigrationGatway from "../Components/Desktop/Admin/PaymentIntigrationGatway";
import ManageBidds from "../Components/Desktop/Admin/ManageBidds";
import BasicServices from "../Components/Desktop/Admin/BasicServices";
import ValueAddedServieves from "../Components/Desktop/Admin/ValueAddedServieves";
import ManageUserRole from "../Components/Desktop/Admin/ManageUserRole";
import SocialMediaIntigration from "../Components/Desktop/Admin/SocialMediaIntigration";
import ContactDeveloper from "../Components/Desktop/Admin/ContactDeveloper";
import Feedback from "../Components/Desktop/Admin/Feedback";
import ProductCategories from "../Components/Desktop/Admin/ProductCategories";
import SmsIntigration from "../Components/Desktop/Admin/SmsIntigration";
import ScrollRestoration from "../Components/Common/ScrollRestoration";
import Register from "../Ui/Auth/Register";
import Login from "../Ui/Auth/Login";
import Subscriber from "../Ui/Subscriber/Subscriber";
import Dashbord from "../Components/Desktop/Subscriber/Dashbord";
import SubscriberManageListing from "../Components/Desktop/Subscriber/SubscriberManageListing";
import ProtectedRoute from "./ProtectedRoute";
import Subscription from "../Ui/Subscription";
import ContactUs from "../Ui/ContactUs";
import AboutUs from "../Ui/About";
// import Artical from "../Components/Desktop/Subscriber/Artical";
import SubscriberComp from "../Components/Desktop/Subscriber/subscriber";
import SubBasicService from "../Components/Desktop/Subscriber/SubBasicService";
import SubValueAdded from "../Components/Desktop/Subscriber/SubValueAdded";
import SubBidding from "../Components/Desktop/Subscriber/SubBidding";
import SubFeedback from "../Components/Desktop/Subscriber/SubFeedback";
import CommonContactDeveloper from "../Components/Common/ContactDeveloper";
import Consultant from "../Ui/Consultant/Consultant";
import CounsultentDashbord from "../Components/Desktop/Counsultent/Dashbord";
import ConsultantProfile from "../Components/Desktop/Counsultent/ConsultantProfile";
import PaymentDetails from "../Components/Desktop/Counsultent/PaymentDetails";
import SuccessStories from "../Components/Desktop/Counsultent/SucessStory";
import Collection from "../Components/Desktop/Counsultent/Collection";
import SubjectUpdates from "../Components/Desktop/Counsultent/SubjectUpdate";
import LivePrograms from "../Components/Desktop/Counsultent/LivePrograms";
import WeeklyConsultation from "../Components/Desktop/Counsultent/WeeklyConsultation";
import QuestionsAnswers from "../Components/Desktop/Counsultent/QuestionsAnswers";
import CropUpdates from "../Components/Desktop/Counsultent/CropUpdates";
import ConsultantArticles from "../Components/Desktop/Counsultent/Articles";
import RemunerationDetails from "../Components/Desktop/Counsultent/RemunerationDetails";
import ConsultantNotifications from "../Components/Desktop/Counsultent/ConsultantNotifications";
import ConsultantGovSchme from "../Components/Desktop/Counsultent/ConsultantGovSchme";
import ReportsPage from "../Components/Desktop/Counsultent/ReportPage";
import Articles from "../Components/Desktop/Counsultent/Articles";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} />
          <Route
            path="Counsultancy-managment"
            element={
              <ProtectedRoute>
                <ConsultancyManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="ManageListing"
            element={
              <ProtectedRoute>
                <ManageListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="Dashbord"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="ProductMart"
            element={
              <ProtectedRoute>
                <ProductMart />
              </ProtectedRoute>
            }
          />
          <Route
            path="Staff-Management"
            element={
              <ProtectedRoute>
                <StaffManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="Subscriber-Management"
            element={
              <ProtectedRoute>
                <SubscriberManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="Manage-Subscribers-Plans"
            element={
              <ProtectedRoute>
                <ManageSubscribersPlans />
              </ProtectedRoute>
            }
          />
          <Route
            path="Payment-Intigration-Gatway"
            element={
              <ProtectedRoute>
                <PaymentIntigrationGatway />
              </ProtectedRoute>
            }
          />
          <Route
            path="Manage-Bidds"
            element={
              <ProtectedRoute>
                <ManageBidds />
              </ProtectedRoute>
            }
          />
          <Route
            path="Basic-Services"
            element={
              <ProtectedRoute>
                <BasicServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="Value-Added-Servieves"
            element={
              <ProtectedRoute>
                <ValueAddedServieves />
              </ProtectedRoute>
            }
          />
          <Route
            path="ManageUserRole"
            element={
              <ProtectedRoute>
                <ManageUserRole />
              </ProtectedRoute>
            }
          />
          <Route
            path="contactDeveloper"
            element={
              <ProtectedRoute>
                <ContactDeveloper />
              </ProtectedRoute>
            }
          />
          <Route
            path="Feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="socialmedia-intigration"
            element={
              <ProtectedRoute>
                <SocialMediaIntigration />
              </ProtectedRoute>
            }
          />
          <Route
            path="Product-Categories"
            element={
              <ProtectedRoute>
                <ProductCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="Sms-Intigration"
            element={
              <ProtectedRoute>
                <SmsIntigration />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Subscriber Routes */}
        <Route
          path="/subscriber"
          element={
            <ProtectedRoute>
              <Subscriber />
            </ProtectedRoute>
          }
        >
          <Route index element={<Subscriber />} />
          <Route
            path="Dashbord"
            element={
              <ProtectedRoute>
                <Dashbord />
              </ProtectedRoute>
            }
          />
          <Route
            path="ManageListing"
            element={
              <ProtectedRoute>
                <SubscriberManageListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="Subscriber-profile"
            element={
              <ProtectedRoute>
                <SubscriberComp />
              </ProtectedRoute>
            }
          />
          <Route
            path="Basic-services"
            element={
              <ProtectedRoute>
                <SubBasicService />
              </ProtectedRoute>
            }
          />
          <Route
            path="Value-Added-Services"
            element={
              <ProtectedRoute>
                <SubValueAdded />
              </ProtectedRoute>
            }
          />
          <Route
            path="Bidding"
            element={
              <ProtectedRoute>
                <SubBidding />
              </ProtectedRoute>
            }
          />
          <Route
            path="Feedback"
            element={
              <ProtectedRoute>
                <SubFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="ContactDeveloper"
            element={
              <ProtectedRoute>
                <CommonContactDeveloper />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Consultent Routes */}
        <Route
    path="/consultant"
          element={
            <ProtectedRoute>
              <Consultant />
            </ProtectedRoute>
          }
        >
          <Route index element={<consultant />} />
          <Route
            path="Dashbord"
            element={
              <ProtectedRoute>
                <CounsultentDashbord />
              </ProtectedRoute>
            }
          />
          <Route
            path="consultantprofile"
            element={
              <ProtectedRoute>
                <ConsultantProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="paymentdetails"
            element={
              <ProtectedRoute>
                <PaymentDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="Successstories"
            element={
              <ProtectedRoute>
                <SuccessStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="collections"
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            }
          />
          <Route
            path="SubjectUpdates"
            element={
              <ProtectedRoute>
                <SubjectUpdates />
              </ProtectedRoute>
            }
          />
          <Route
            path="LivePrograms"
            element={
              <ProtectedRoute>
                <LivePrograms />
              </ProtectedRoute>
            }
          />
          <Route
            path="WeeklyConsultation"
            element={
              <ProtectedRoute>
                <WeeklyConsultation />
              </ProtectedRoute>
            }
          />
          <Route
            path="QuestionsAnswers"
            element={
              <ProtectedRoute>
                <QuestionsAnswers />
              </ProtectedRoute>
            }
          />
          <Route
            path="CropUpdates"
            element={
              <ProtectedRoute>
                <CropUpdates />
              </ProtectedRoute>
            }
          />
          <Route
            path="Articles"
            element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            }
          />
          <Route
            path="RemunerationDetails"
            element={
              <ProtectedRoute>
                <RemunerationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="ConsultantNotifications"
            element={
              <ProtectedRoute>
                <ConsultantNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="ConsultantGovSchme"
            element={
              <ProtectedRoute>
                <ConsultantGovSchme />
              </ProtectedRoute>
            }
          />
          <Route
            path="ReportsPage"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Login Registration Route */}
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
