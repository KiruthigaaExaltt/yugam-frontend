import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function FormUI() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Username: ${username}\nEmail: ${email}`);
  };

  return (
    <Card title="Form Component">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        
        <span className="p-float-label">
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </span>

        <Button
          type="submit"
          label="Submit"
          icon="pi pi-check"
          className="p-button-success"
        />
      </form>
    </Card>
  );
}
