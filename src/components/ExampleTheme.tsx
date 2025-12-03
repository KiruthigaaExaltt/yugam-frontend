
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import { useTheme } from '../context/ThemeContext';

export default function ExampleTheme() {
  // const { theme } = useTheme();

  return (
    <Card title="Example Theme Component">
      <p>This component automatically updates when the theme changes.</p>
      <Button label="Sample Button" icon="pi pi-check" className="p-button-success" />
    </Card>
  );
}
