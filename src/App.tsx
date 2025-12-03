
import ThemeButton from './components/ThemeButton';
import ExampleTheme from './components/ExampleTheme';
import FormUI from './components/FormUI';
import { ThemeProvider } from '../src/context/ThemeContext';
import ReactIcon from './components/ReactIcon';
import ExampleCard from './components/ExampleCard';
import ExamplePostApi from './components/ExamplePostApi';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="p-4 flex flex-column gap-4">
          <ThemeButton />
          <ExamplePostApi />
          <ExampleCard />
          <h1>PrimeReact Theme Toggle with Context</h1>

          <ExampleTheme />
          <FormUI />
          <ReactIcon />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
