
import { Button } from 'primereact/button';
import { useTheme } from '../context/ThemeContext';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      label={`Toggle Theme (Current: ${theme})`}
      onClick={toggleTheme}
      style={{ backgroundColor: 'var(--primary-color)' }}
    />
  );
}
