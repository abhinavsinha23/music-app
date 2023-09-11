import React, { useState } from 'react';

function InfoPage() {
  const [currentSection, setCurrentSection] = useState('about');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return (
          <div>
            <h2>About us</h2>
            <p>
              <strong>Our Story:</strong> hadhkdsahdaiurjkbhkhfghdfosjhfdhsfjghskfhslfhsfhsfhjawdwoajhdhdiuwqerwhjerktbnfvsivbnxzibnvisnvbsrdifvbsv
            </p>
            <p>
              <strong>Our Team:</strong> we are a dedicated team of music enthusiasts and hfhfksdhfkhfksdhfkshfksdhfksdfhkdsjhf
            </p>
            <p>
              <strong>Our Values:</strong> sfdhjsdhfkshfkhsdfkhsdfkhsdfkhskdfhskdfhskdfhskdfhksdfhksfhkshfkshfksfhkhrquwayeguqwiugslgjhguihtupesahdffj
            </p>
          </div>
        );
      case 'privacy-policy':
        return (
          <div>
          <h2>Privacy policy</h2>
          <p>
            <strong>Our Story:</strong> fhkdhfsheiufkfzjhfieurgtxkjhgkxhgkxhgisdfdhgosfjoshfisdhfisdhjfshfiusghshdfihsfishdofhsidfhisfhisfhisdfhids
          </p>
          <p>
            <strong>Our Team:</strong> dfhkhfkhsdfkhsdkfhskfhksfhksfhsfhksfhiweurhewiuhfkznxfsiduhfgishdfiosdhfisdhfi
          </p>
          <p>
            <strong>Our Values:</strong> ehirfhzdskfjhsdfhisfhiweshfeihwsifhisdhshfskfhjsfhkshfisrfhuihfnisfhnsiudbfuisbf
          </p>
        </div>
          
        );
      case 'terms-of-use':
        return (
          <div>
          <h2>Terms of use</h2>
          <p>
            <strong>Our Story:</strong> [Your Company Name] was founded with a vision to revolutionize the [industry/niche] industry. Since our inception in [year], we have been on a relentless journey to provide innovative solutions that make a difference in the lives of our customers.
          </p>
          <p>
            <strong>Our Team:</strong> At the heart of our success is our talented and dedicated team of professionals. With diverse expertise and a shared commitment to excellence, we work collaboratively to push boundaries and achieve remarkable results.
          </p>
          <p>
            <strong>Our Values:</strong> Integrity, innovation, and customer satisfaction are the cornerstones of our business. We are driven by a passion to continuously improve, adapt to change, and deliver products and services that exceed expectations.
          </p>
        </div>
        );
      case 'contact-us':
        return (
          <div>
          <h2>Contact</h2>
          <p>
            <strong>Our Story:</strong> [Your Company Name] was founded with a vision to revolutionize the [industry/niche] industry. Since our inception in [year], we have been on a relentless journey to provide innovative solutions that make a difference in the lives of our customers.
          </p>
          <p>
            <strong>Our Team:</strong> At the heart of our success is our talented and dedicated team of professionals. With diverse expertise and a shared commitment to excellence, we work collaboratively to push boundaries and achieve remarkable results.
          </p>
          <p>
            <strong>Our Values:</strong> Integrity, innovation, and customer satisfaction are the cornerstones of our business. We are driven by a passion to continuously improve, adapt to change, and deliver products and services that exceed expectations.
          </p>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{height: '60%'}}>
      <h1>Info Page</h1>
      <p>This is the Info Page where you can find information about:</p>
      <ul style={{listStyleType: 'none'}}>
        <li>
          <p onClick={() => handleSectionChange('about')}>
            About
          </p>
        </li>
        <li>
          <p onClick={() => handleSectionChange('privacy-policy')}>
            Privacy Policy
          </p>
        </li>
        <li>
          <p onClick={() => handleSectionChange('terms-of-use')}>
            Terms of Use
          </p>
        </li>
        <li>
          <p onClick={() => handleSectionChange('contact-us')}>
            Contact Us
          </p>
        </li>
      </ul>
      {renderSection()}
    </div>
  );
}

export default InfoPage;