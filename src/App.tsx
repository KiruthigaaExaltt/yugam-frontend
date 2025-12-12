
import ThemeButton from './components/ThemeButton';
import ExampleTheme from './components/ExampleTheme';
import FormUI from './components/FormUI';
import { ThemeProvider } from '../src/context/ThemeContext';
import ReactIcon from './components/ReactIcon';
import ExampleCard from './components/ExampleCard';
// import ExamplePostApi from './components/examplePostApi/ExamplePostApi';
import SmallCard from './components/SmallCard';
import BaseLayout from './layouts/BaseLayout';
import ExampleNavbar from './components/ExampleNavBar';
import ExampleTable from './components/ExampleTable';
import ExampleMiniProfileNotificationCard from './components/ExampleMiniProfileNotificationCard';
import { Routes, Route } from "react-router-dom";
import TailwindFlexCard from './components/TailwindFlexCard';
import TailwindPDF from './components/pdf/TailwindPDF';
import Invoice from './components/pdf/Invoice';
import InvoiceLineBreak from './components/pdf/InvoiceLineBreak';
import ExcelExportTable from './components/excel/ExcelExportTable';
import SampleComponent from './components/pdf/SampleComponent';
// import Example from './components/intersectionObserver/Example';
import LazyLoadSection from './components/intersectionObserver/LazyLoadSection';
import NotificationPopup from './components/springWebAnimation/NotificationPopup';
import ExampleCalendar from './components/ExampleCalender';
import ChartDashboard from './components/chart/ChartDashboard';
import ExampleDebounce from './components/ExampleDebounce';
// import ExamplePostApi from './components/examplePostApi/ExamplePostApi';
import HtmlToImageCard from './components/htmlToImage/HtmlToImageCard';
import ExampleRechart from './components/rechart/ExampleRechart';
import ExampleSonnerDemo from './components/ExampleSonnerDemo';
import ExampleForm from './components/ExampleForm';
import ExampleMarquee from './components/ExampleMarquee';


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

  return (
    <ThemeProvider>
      <BaseLayout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-4 flex flex-col gap-4">
                <ThemeButton />
                {/* <ExamplePostApi /> */}
                <TailwindFlexCard />
                <ExampleMiniProfileNotificationCard />
                <ExampleCard />
                <h1>PrimeReact Theme Toggle with Context</h1>
                <ExampleTheme />
                <FormUI />
                <ReactIcon />
                <SmallCard />
                <ExampleNavbar />
                <ExampleTable />
              </div>
            }
          />  
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
          <Route path="/table" element={<ExampleTable />} />
          <Route path="/navbar" element={<ExampleNavbar />} />
          <Route path="/card" element={<ExampleCard />} />
        </Routes>
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;
