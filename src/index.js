import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// User Registration Component
const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', verificationCode: '' });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a random verification code
    const code = Math.floor(100000 + Math.random() * 900000);
    setGeneratedCode(code);
    setIsVerificationSent(true);
    alert(`A verification code has been generated: ${code}`);
  };

  const handleGoogleLogin = () => {
    setFormData({
      name: 'Google User',
      email: 'google@user.com',
      password: '',
    });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (formData.verificationCode === String(generatedCode)) {
      setIsCodeValid(true);
      alert('Verification successful!');
      navigate('/setup-organisation');
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      {!isVerificationSent ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleVerificationSubmit}>
            <input
              type="text"
              placeholder="Enter verification code"
              value={formData.verificationCode}
              onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
              required
            />
            <button type="submit">Verify and Continue</button>
          </form>
          {isCodeValid && (
            <div>
              <p>Verification successful! You can now continue to setup your organization.</p>
              <button onClick={() => navigate('/setup-organisation')}>Proceed to Setup Organization</button>
            </div>
          )}
        </div>
      )}
      <div>
        <p>Or</p>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
      </div>
    </div>
  );
};

// Setup Organisation Component
const SetupOrganisation = () => {
  const [companyData, setCompanyData] = useState({ name: '', website: '', description: '' });
  const [metaDescription, setMetaDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [webpages, setWebpages] = useState([
    { url: 'Home', status: 'scraped', data: ['title', 'meta tags'] },
    { url: 'About Us', status: 'pending', data: [] },
    { url: 'Contact', status: 'scraped', data: ['contact info', 'form data'] },
  ]);

  const handleFetchMetaDescription = async () => {
    const url = companyData.website;

    if (!url) return;

    setLoading(true);

    try {
      const response = await fetch(`https://api.screenshotapi.net/scrape?url=${url}&output=json`);
      const data = await response.json();
      const metaDesc = data?.meta?.description || 'No meta description found';
      setMetaDescription(metaDesc);
      setCompanyData((prevData) => ({ ...prevData, description: metaDesc }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meta description:', error);
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', companyData);
  };

  const handleWebpageClick = (url) => {
    const selectedPage = webpages.find((page) => page.url === url);
    alert(`Scraped Data for ${url}: ${selectedPage.data.join(', ')}`);
  };

  return (
    <div className="container">
      <h2>Setup Organisation</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyData.name}
          onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Company Website URL"
          value={companyData.website}
          onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
          required
        />
        <button type="button" onClick={handleFetchMetaDescription}>
          Fetch Meta Description
        </button>
        {loading && <p>Loading...</p>}
        <textarea
          placeholder="Company Description"
          value={companyData.description || metaDescription}
          onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* Webpages Status Section */}
      <div className="webpages">
        <h3>Detected Webpages</h3>
        <ul>
          {webpages.map((page) => (
            <li key={page.url}>
              <button onClick={() => handleWebpageClick(page.url)}>
                {page.url} - {page.status}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Chatbot Integration & Testing Component
const ChatbotIntegration = () => {
  const [isTestPassed, setIsTestPassed] = useState(false);
  const [isIntegrationSuccessful, setIsIntegrationSuccessful] = useState(false);

  const handleTestChatbot = () => {
    setIsTestPassed(true);
  };

  const handleIntegration = (option) => {
    if (option === 'instructions') {
      alert('Instructions to integrate chatbot: Copy-paste the code within <head> tag of your website.');
    } else {
      alert('Mailing instructions to your developer...');
    }
  };

  const handleTestIntegration = () => {
    setIsIntegrationSuccessful(true);
  };

  return (
    <div className="container">
      <h2>Chatbot Integration & Testing</h2>
      <button onClick={handleTestChatbot}>Test Chatbot</button>
      {isTestPassed && (
        <div>
          <p>Chatbot test successful! Proceeding with integration.</p>
          <button onClick={() => handleTestIntegration()}>Test Integration</button>
        </div>
      )}

      {isIntegrationSuccessful ? (
        <div className="success-ui">
          <h3>Integration Successful!</h3>
          <p>Chatbot has been successfully integrated on your website!</p>
          <button onClick={() => alert('Exploring Admin Panel')}>Explore Admin Panel</button>
          <button onClick={() => alert('Start talking to your chatbot')}>Start talking to your chatbot</button>
          <div className="social-buttons">
            <button>Share on Facebook</button>
            <button>Share on Twitter</button>
            <button>Share on LinkedIn</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => handleIntegration('instructions')}>Integrate on Your Website</button>
          <button onClick={() => handleIntegration('mail')}>Mail Instructions to Developer</button>
        </div>
      )}
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/setup-organisation" element={<SetupOrganisation />} />
        <Route path="/chatbot-integration" element={<ChatbotIntegration />} />
      </Routes>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
