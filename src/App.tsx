import ThemeButton from "./components/ThemeButton";
import ExampleTheme from "./components/ExampleTheme";
import FormUI from "./components/FormUI";
import { ThemeProvider } from "../src/context/ThemeContext";
import ExampleCard from "./components/ExampleCard";
// import ExamplePostApi from './components/examplePostApi/ExamplePostApi';
import BaseLayout from "./layouts/BaseLayout";
import ExampleMiniProfileNotificationCard from "./components/ExampleMiniProfileNotificationCard";
import { Routes, Route } from "react-router-dom";
import TailwindFlexCard from "./components/TailwindFlexCard";
import TailwindPDF from "./components/pdf/TailwindPDF";
import Invoice from "./components/pdf/Invoice";
import InvoiceLineBreak from "./components/pdf/InvoiceLineBreak";
import ExcelExportTable from "./components/excel/ExcelExportTable";
import SampleComponent from "./components/pdf/SampleComponent";
// import Example from './components/intersectionObserver/Example';
import LazyLoadSection from "./components/intersectionObserver/LazyLoadSection";
import NotificationPopup from "./components/springWebAnimation/NotificationPopup";
import ExampleCalendar from "./components/ExampleCalender";
import ChartDashboard from "./components/chart/ChartDashboard";
import ExampleDebounce from "./components/ExampleDebounce";
// import ExamplePostApi from './components/examplePostApi/ExamplePostApi';
import HtmlToImageCard from "./components/htmlToImage/HtmlToImageCard";
import ExampleRechart from "./components/rechart/ExampleRechart";
import ExampleSonnerDemo from "./components/ExampleSonnerDemo";
import ExampleForm from "./components/ExampleForm";
import ExampleMarquee from "./components/ExampleMarquee";
import ExampleVideo from "./components/video/ExampleVideo";

import { useEffect } from "react";
import { requestPermission } from "./firebase/requestPermission";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseInit";
import Footer from "./components/footer/Footer";
import ExamplePageHeader from "./components/exaltfiles/ExamplePageHeader";
import ExampleNewNavBar from "./components/exaltfiles/ExampleNewNavBar";
import ExalttSmallCard from "./components/exaltfiles/ExalttSmallCard";
import ExampleQuickAction from "./components/exampleQuickAction/ExampleQuickAction";
import ExampleSingleLineCard from "./components/singleLineCard/ExampleSingleLineCard";
import UsersPage from "./components/table/UsersPage";

import Barcard from "./components/Barcard";
import Examplefiltrbar from "./components/HOC/filterbar/Examplefiltrbar";
import DashboardCard from "./components/DashboardCard";
import LoginPage from "./components/login/LoginPage";

// import ExalttSmallCard from "./components/exaltfiles/ExalttSmallCard";
// import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   const themeName = 'lara-light-blue';
  //    const existingLink = document.getElementById('theme-css') as HTMLLinkElement;
  //   if (existingLink) {
  //     existingLink.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
  //   } else {
  //     const link = document.createElement('link');
  //     link.id = 'theme-css';
  //     link.rel = 'stylesheet';
  //     link.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
  //     document.head.appendChild(link);
  //   }
  //   const existingVariable = document.getElementById('variable-css') as HTMLLinkElement;
  //   if (existingVariable) {
  //     existingVariable.href = 'http://localhost:5173/src/styles/variables.css';
  //   } else {
  //     const link = document.createElement('link');
  //     link.id = 'variable-css';
  //     link.rel = 'stylesheet';
  //     link.href = '../styles/variables.css';
  //     document.head.appendChild(link);
  //   }
  // }, []);
  // return (
  //     <ThemeProvider>
  //        <BaseLayout >
  //       <div className="p-4 flex flex-column gap-4">
  //         {/* <h1 className='testing'>checking the font</h1> */}
  //         <ThemeButton />
  //         {/* <ExamplePostApi /> */}
  //         <ExampleMiniProfileNotificationCard />
  //         <ExampleCard />
  //         <h1>PrimeReact Theme Toggle with Context</h1>

  //         <ExampleTheme />
  //         <FormUI />
  //         <ReactIcon />
  //         <SmallCard />
  //         <ExampleNavbar />
  //         <ExampleTable />

  //       </div>
  //       </BaseLayout>
  //     </ThemeProvider>
  // );

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);

      alert(payload.notification?.title);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      {/* <BaseLayout> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route
            path="/toggle"
            element={
              <div className="p-4 flex flex-col gap-4">
                <ThemeButton />
                {/* <ExamplePostApi /> */}
                <TailwindFlexCard />
                <ExampleMiniProfileNotificationCard />
                <h1>PrimeReact Theme Toggle with Context</h1>
                <ExampleTheme />
                <FormUI />
              </div>
            }
          />
          {/* <Route path="/pageheader" element={<ExamplePageHeader />} />
          <Route path="/newnavbar" element={<ExampleNewNavBar />} /> */}
          <Route
            path="/header-navbar"
            element={
              <div className="flex flex-col gap-4">
                <ExamplePageHeader />
                <ExampleNewNavBar />
                <ExampleCard />
                <ExalttSmallCard />
                <ExampleQuickAction />
                <ExampleSingleLineCard />
                <UsersPage />
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/video" element={<ExampleVideo />} />
          <Route path="/marquee" element={<ExampleMarquee />} />
          <Route path="/exampleForm" element={<ExampleForm />} />
          <Route path="/sonner" element={<ExampleSonnerDemo />} />
          <Route path="/htmltoimage" element={<HtmlToImageCard />} />
          <Route path="/debounce" element={<ExampleDebounce />} />
          <Route path="/recharts" element={<ExampleRechart />} />
          <Route path="/chart" element={<ChartDashboard />} />
          <Route path="/calender" element={<ExampleCalendar />} />
          <Route path="/springWebAnimation" element={<NotificationPopup />} />
          <Route path="/intersectionObserver" element={<LazyLoadSection />} />
          <Route path="/InvoiceLineBreak" element={<InvoiceLineBreak />} />
          <Route path="/samplecomponent" element={<SampleComponent />} />
          <Route path="/excelTable" element={<ExcelExportTable />} />
          <Route path="/pdfinvoive" element={<Invoice />} />
          <Route path="/pdf" element={<TailwindPDF />} />
          <Route path="/card" element={<ExampleCard />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/dashboard" element={<DashboardCard />} />
          <Route path="/filterbar" element={<Examplefiltrbar />} />
          <Route path="/barcard" element={<Barcard />} />
        </Route>
      </Routes>
      {/* </BaseLayout> */}
    </ThemeProvider>
  );
}

export default App;
