'use client';

import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-5xl text-start mx-auto p-6 dark:text-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Alicia Bee Coaches (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy and is committed to protecting your personal information.
        This privacy policy outlines how we collect, use, and safeguard your data when you engage with our content on our website 
        (aliciabeecoaches.com), our video platform on YouTube (youtube.com/aliciabeecoaches), our membership community 
        (patreon.com/aliciabeecoaches), and on the following social media apps – TikTok, Fanbase, Favorited, Pinterest, and Instagram. 
        If you have any questions or concerns please contact us at <a href="mailto:hello@aliciabeecoaches.com" className="text-blue-600 underline">hello@aliciabeecoaches.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Personal Information:</strong> When you voluntarily interact with our platforms, such as subscribing to our email list or purchasing a membership, we may collect your name, email address, and payment details.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you interact with our website and platforms, such as pages visited, time spent, and links clicked.
        </li>
        <li>
          <strong>Social Media Information:</strong> When you engage with us on TikTok, Patreon, Pinterest, or YouTube, your public profile and interactions (e.g., comments, likes) may be visible to us.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Use your information to:</li>
        <li>Provide services, content, and updates.</li>
        <li>Communicate with you about memberships, classes, and promotions.</li>
        <li>Improve our website, social media presence, and overall user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share your data with trusted third-party services, such as payment processors, to fulfill services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
      <p className="mb-4">
        Our website uses cookies to improve functionality and track user behavior. You can adjust your browser settings to decline cookies if you prefer.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your data. However, no online platform can guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Links</h2>
      <p className="mb-4">
        Our platforms may contain links to third-party websites like TikTok, Patreon, Pinterest and YouTube. These websites operate under their own privacy policies, which we encourage you to review.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Access, correct, or delete your personal information.</li>
        <li>Opt-out of promotional communications.</li>
        <li>Withdraw consent for data collection at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
      <p className="mb-4">
        Our services are not directed toward children under 18. We do not knowingly collect personal information from children.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Effective Date</h2>
      <p className="mb-4">
        This privacy policy was last reviewed and posted on January 7, 2025.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;