import { useState } from "react";
import "./App.css";

 
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<null | { name: string; Email: string; Message: string }[]>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if( name === '' || email === '' || message === ''){
      setError('All fields are required.')
    }else{
      setSubmittedData(()=>[{
        ...submittedData,
        name:name,
        Email:email,
        Message:message
      }]);
      setName('');
      setEmail('');
      setMessage('');
    }

  };

  return (
    <>
      
      <div className="App">
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            data-testid="name-input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            data-testid="email-input"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            data-testid="message-input"
          />
          <button type="submit" data-testid="submit-button">
            Submit
          </button>
        </form>
        {error && (
          <p data-testid="error-message" className="error">
            {error}
          </p>
        )}
        {submittedData && (
          <div data-testid="submitted-data" className="submitted-data">
            <h2>Submitted Information</h2>
            <p>
              <strong>Name:</strong> {submittedData[0].name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData[0].Email}
            </p>
            <p>
              <strong>Message:</strong> {submittedData[0].Message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
