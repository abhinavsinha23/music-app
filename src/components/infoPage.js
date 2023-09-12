import React, { useState } from 'react';
import '../App.css';
import '../index.css';



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
            <strong>Our Story:</strong> <p>
              At [Your Company Name], our journey began with a shared passion for music and technology. We envisioned a world where music could seamlessly integrate with the digital landscape, making it accessible to all. That vision led us to create our Music API, a platform that empowers developers, musicians, and music enthusiasts to harness the power of music in innovative ways.
            </p><strong>Our Team:</strong>
            <p>
               Our team is a diverse group of music enthusiasts, developers, and creatives who are united by the belief that music has the potential to transcend boundaries and connect people from all walks of life. With expertise in both music and technology, we work tirelessly to curate, develop, and deliver the best solutions through our API. We are driven by our collective love for music and our commitment to making it an integral part of the digital world.
            </p><strong>Our Values:</strong>
            <p>
               Our values are the foundation of everything we do. We believe in innovation, pushing boundaries, and constantly seeking new ways to enhance the music experience. Integrity is at our core; we prioritize the security and privacy of our users' data. Collaboration is key, and we actively seek partnerships and feedback to improve our API continually. Above all, we are passionate about fostering a deep connection between music and technology, making music not just a sound but a vibrant part of our digital lives.
            </p>
          </div>
        );
      case 'privacy-policy':
        return (
          <div>
          <h2>Privacy policy</h2> <strong>Our Commitments:</strong> 
          <p>
            At FAKEMUSIC INC, we are committed to safeguarding your privacy and protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you use our Music API. By accessing or using the Service, you consent to the practices described in this Privacy Policy.
          </p><strong>Info companies collect:</strong>
          <p>
             We may collect personal information such as your name, email address, and payment information when you register for our Service or make transactions. Additionally, we may gather non-personal information, including device information, location data, and usage statistics, to improve our Service and provide a better user experience. We also use cookies and similar technologies to track your interactions with our Service. You have the option to disable cookies through your browser settings; however, this may limit your ability to access certain features of our Service.
          </p><strong>Information use</strong>
          <p>
             We use your personal information to provide you with access to our Music API and to process your requests, including processing payments, sending you updates, and responding to your inquiries. We may use your non-personal information to analyze user behavior, monitor the performance of our Service, and make improvements. Your data will not be sold, rented, or shared with third parties for marketing purposes without your explicit consent. We may share your information with our trusted service providers and partners who assist us in delivering and maintaining our Service, subject to strict confidentiality agreements.
          </p><strong>Data Security and Retention:</strong>
          <p>
             We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We retain your data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy and as required by applicable laws and regulations. After that, we securely delete or anonymize your information. Please note that while we strive to protect your data, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee its absolute security.
          </p>
        </div>
          
        );
      case 'terms-of-use':
        return (
          <div>
          <h2>Terms of use</h2>
          <p>
          By accessing or using our Music API (the "Service"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please refrain from using the Service. Your use of the Service is contingent upon your acceptance of and adherence to these terms, which govern your relationship with [Your Company Name] in connection with the Service.
          </p>
          <p>
          You agree to use the Service only for lawful purposes and in accordance with all applicable laws and regulations. You may not use the Service for any illegal or unauthorized purpose or engage in any activities that violate the rights of others or harm the Service's integrity. [Your Company Name] reserves the right to terminate or suspend your access to the Service at its discretion if you are found to be in violation of these terms.
          </p>
          <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you believe your account has been compromised or used without your permission, please contact us immediately. We reserve the right to modify or terminate the Service at any time, without notice, and shall not be liable to you or any third party for any modification, suspension, or termination of the Service. These terms constitute the entire agreement between you and [Your Company Name] regarding the use of the Service, and they supersede any prior agreements or understandings.
          </p>
        </div>
        );
      case 'contact-us':
        return (
          <div style={{height: '100%'}}>
            <h2>Contact</h2>
            <p>
            We value your feedback, questions, and concerns. If you need assistance, have inquiries about our Music API, or wish to provide us with your valuable insights, please don't hesitate to get in touch with us. We are here to help and are committed to providing you with the best possible support. [Your Company Name] was founded with a vision to revolutionize the [industry/niche] industry. Since our inception in [year], we have been on a relentless journey to provide innovative solutions that make a difference in the lives of our customers.
            </p><strong>Contact details:</strong>
            <p>
               Email:
                [Your Contact Email Address]</p>
                <p>
                Phone: [479374927492749273492374927492749873249724927384983279324798]</p>
                <p>Mailing Address: [Your Company Mailing Address]
               Email:
                </p>
                <p>
               Address:
                [742 evergreen terrace]</p>
            
            
            
            
            <p>
            Whether you prefer to reach out via email, give us a call, or send us a letter, we look forward to hearing from you. Your feedback helps us improve our service and ensures that your experience with our Music API is exceptional. Thank you for choosing [Your Company Name].
            </p>
        </div>
        );
      default:
        return null;
    }
  };

  const changeStyle = (e) => {
    e.target.style.opacity = '0.6'
    e.target.style.textDecoration = 'underline'
  }

  const removeStyle = (e) => {
    e.target.style.opacity = '1'
    e.target.style.textDecoration = 'none'
  }

  return (
    <div className='infoContainer' style={{width:'50%', marginLeft: '520px', fontSize: 'larger', backgroundColor: 'red', marginBottom: '1%', minHeight: '100vh'}}>
      <h1>Info Page</h1>
      <p>This is the Info Page where you can find information about:</p>
      <ul style={{listStyleType: 'none',}}>
        <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-around'}}>
          <li>
            <p onClick={() => handleSectionChange('about')} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>
              About
            </p>
          </li>
          <li>
            <p onClick={() => handleSectionChange('privacy-policy')} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>
              Privacy Policy
            </p>
          </li>
          <li>
            <p onClick={() => handleSectionChange('terms-of-use')} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>
              Terms of Use
            </p>
          </li>
          <li>
            <p onClick={() => handleSectionChange('contact-us')} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>
              Contact Us
            </p>
          </li>
        </div>
      </ul>
      {renderSection()}
    </div>
  );
}

export default InfoPage;