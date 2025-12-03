import { FaBeer, FaCoffee, FaApple } from 'react-icons/fa';
import { Button } from 'primereact/button';

export default function ReactIcon() {
  return (
    <div className="flex gap-3">
      <Button
        label="Beer"
        icon={<FaBeer size={20} />}
        className="p-button-success"
      />
      <Button
        label="Coffee"
        icon={<FaCoffee size={20} />}
        className="p-button-warning"
      />
      <Button
        label="Apple"
        icon={<FaApple size={20} />}
        className="p-button-info"
      />
    </div>
  );
}
