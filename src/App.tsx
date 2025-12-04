
import ThemeButton from './components/ThemeButton';
import ExampleTheme from './components/ExampleTheme';
import FormUI from './components/FormUI';
import { ThemeProvider } from '../src/context/ThemeContext';
import ReactIcon from './components/ReactIcon';
import ExampleCard from './components/ExampleCard';
import ExamplePostApi from './components/examplePostApi/ExamplePostApi';
import SmallCard from './components/SmallCard';

function App() {
  return (
      <ThemeProvider>
        <div className="p-4 flex flex-column gap-4">
          <ThemeButton />
          <ExamplePostApi />
          <ExampleCard />
          <h1>PrimeReact Theme Toggle with Context</h1>

          <ExampleTheme />
          <FormUI />
          <ReactIcon />
          <SmallCard />
        </div>
      </ThemeProvider>
  );
}

export default App;
