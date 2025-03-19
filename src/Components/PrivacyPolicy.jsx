// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PrivacyPolicy = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center p-6">
//       <div className="bg-white max-w-4xl p-8 shadow-lg rounded-lg">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Privacy Policy
//         </h1>

//         <p className="text-gray-700 mb-4">
//           Your privacy is important to us. We respect your personal data and
//           ensure its safety. However, our system collects certain data when you
//           interact with our platform, such as cookies, browsing history, and
//           session details. These are used to improve functionality and enhance
//           your user experience. By using our services, you acknowledge and
//           accept that certain data points may be gathered to optimize platform
//           performance. While we do not engage in unnecessary data collection,
//           some essential data is required for platform security and smooth
//           operation.
//         </p>

//         <p className="text-gray-700 mb-4">
//           By continuing to use this service, you agree that your interactions
//           may be analyzed for improving performance and customization. This
//           includes usage patterns, page visits, and clicks to offer a more
//           seamless experience. Your personal data will never be sold to third
//           parties, and any shared data is strictly for analytical or functional
//           enhancements. However, we may share anonymized insights with trusted
//           partners to refine our services and develop better solutions. You can
//           choose to limit data collection through browser settings, though it
//           may impact certain features.
//         </p>

//         <p className="text-gray-700 mb-4">
//           Privacy policies are subject to updates as we refine our practices to
//           align with evolving standards. Changes will be reflected here, and
//           while we recommend checking periodically, we understand that most
//           users won’t. If you continue using the platform after updates, it
//           implies your acceptance of the revised terms. We ensure that all
//           modifications aim to improve transparency and user control, without
//           affecting your overall experience negatively. However, should any
//           concerns arise, our team is available to address your queries.
//         </p>

//         <p className="text-gray-700 mb-4">
//           While we employ stringent security measures to protect your data, no
//           online platform can be completely risk-free. Encryption, firewalls,
//           and authentication mechanisms are used to safeguard information, but
//           we advise caution when sharing sensitive details. Cyber threats and
//           potential breaches are challenges faced by all digital systems, and
//           while we strive to mitigate them, users should also take necessary
//           precautions. Choosing strong passwords, avoiding public Wi-Fi for
//           logins, and enabling two-factor authentication are recommended
//           practices for better security.
//         </p>

//         <p className="text-gray-700 mb-4">
//           We do not collect sensitive personal data unless explicitly provided
//           by you for specific purposes. If you wish to modify or remove any
//           stored data, you may request account adjustments. Deleting your
//           account will remove most of your information, though certain records
//           may be retained for operational reasons. Our goal is to keep your data
//           usage minimal while still offering a smooth experience. You have
//           control over the information you provide, and we respect your choices
//           when it comes to data retention and deletion.
//         </p>

//         <p className="text-gray-700 mb-4">
//           Third-party links may be present on our platform, but we hold no
//           responsibility for their privacy policies. If you navigate to external
//           sites, their data collection practices are beyond our control. We
//           encourage users to read their privacy terms before engaging with
//           external platforms. Our platform only collaborates with trusted
//           partners, but ultimate responsibility for third-party interactions
//           lies with the user. Exercise discretion while providing information
//           outside our ecosystem, as different platforms may have varying levels
//           of security and compliance.
//         </p>

//         <p className="text-gray-700 mb-4">
//           Cookies are used to enhance user experience, personalize content, and
//           track website interactions. You can modify your browser settings to
//           control or block cookies, though doing so may limit functionality.
//           These small data files help us understand user behavior, optimize site
//           performance, and provide a tailored experience. Our platform ensures
//           cookies are utilized responsibly, strictly for improving usability and
//           navigation efficiency. If you disable them, some features may not work
//           as intended, impacting your overall interaction with the platform.
//         </p>

//         <p className="text-gray-700 mb-4">
//           Creating an account allows for better personalization, and we store
//           minimal data to maintain your preferences. Should you wish to delete
//           your account, the option is available, but some information may
//           persist for operational purposes. Account removal does not guarantee
//           complete erasure of historical interactions, though all personal
//           identifiers will be eliminated. We respect your right to control your
//           data and provide necessary tools to manage your account settings
//           effectively. If you need further assistance, our support team is
//           available to guide you.
//         </p>

//         <p className="text-gray-700 mb-4">
//           This privacy policy, while detailed, serves to reassure users of our
//           commitment to data protection. We appreciate that most visitors will
//           simply scroll past, and that’s perfectly fine. Ultimately, our
//           approach to privacy is simple: minimal collection, maximum security,
//           and complete transparency. If you’ve made it this far,
//           congratulations! But if not, don’t worry—you can simply click the
//           button below and continue using our platform as usual.
//         </p>

//         <div className="flex justify-center">
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;
import React from "react";

const Policies = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-semibold mb-6">Policies</h1>
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg text-gray-700">
        {/* Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p>Our privacy policy outlines how we collect, use, and protect your personal information. We gather various data points to enhance user experience, optimize performance, and improve service delivery. By accessing our platform, you agree to data collection practices that enable seamless interaction with our services.</p>
          <p>Personal information is stored securely and utilized strictly for operational purposes. We ensure encryption methods align with industry standards, preventing unauthorized access. While we make every effort to protect your data, users must acknowledge inherent risks associated with online data storage.</p>
          <p>Third-party integrations may access non-identifiable user data for analytics and performance monitoring. Users are encouraged to regularly review privacy settings and adjust preferences according to their comfort levels. Any modifications to this policy will be communicated via platform notifications.</p>
          <p>By using our services, you implicitly consent to data collection methods that support usability enhancements. Users may opt out of non-essential data tracking, although doing so may impact functionality. Transparency remains a priority in ensuring user trust and security.</p>
        </section>

        {/* Refund Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
          <p>Refund requests are evaluated based on compliance with outlined terms. Users must submit valid reasons for requesting refunds, accompanied by relevant transaction details. Processing time may vary depending on individual case complexity and verification requirements.</p>
          <p>Refund eligibility is determined by service usage and adherence to platform policies. Partial refunds may be issued where applicable, ensuring fair treatment for all users. Users initiating refund requests must adhere to stipulated timelines and conditions.</p>
          <p>We reserve the right to decline refund requests that do not meet predefined criteria. Automated systems verify eligibility, and any discrepancies may require additional manual review. Ensuring fairness and consistency remains a priority in refund processing.</p>
          <p>Refund disbursements follow standard financial protocols and may take several business days to reflect in user accounts. Users are advised to contact support for further assistance regarding refund processing timelines.</p>
        </section>

        {/* Terms of Service */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p>By accessing our platform, users agree to abide by all specified terms and conditions. Any breach of these terms may result in service restrictions, suspensions, or termination. Continuous monitoring ensures compliance and safeguards platform integrity.</p>
          <p>Users must ensure accuracy in all provided information. Any misrepresentation or fraudulent activity will lead to immediate account action. All transactions are subject to verification and security protocols.</p>
          <p>We hold no liability for disruptions caused by external factors such as service outages or third-party failures. Users acknowledge that digital services are subject to variable performance conditions beyond direct control.</p>
          <p>Updates to these terms may occur periodically, and users are responsible for reviewing them. Continued platform usage implies agreement to all revised terms.</p>
        </section>

        {/* Data Retention Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Retention Policy</h2>
          <p>User data is retained for operational purposes and compliance with regulatory standards. Data storage duration varies based on usage patterns and policy stipulations. Automated systems ensure efficient data management and timely deletion of redundant records.</p>
          <p>Retention timelines differ based on data categories and applicable legal frameworks. Sensitive data undergoes periodic reviews to ensure relevance and compliance. Users can request data deletion, subject to applicable retention policies.</p>
          <p>Secure storage mechanisms are in place to prevent unauthorized access. Encrypted backups minimize risks associated with data loss or corruption. Data removal follows structured protocols to maintain consistency and security.</p>
          <p>Regular audits validate adherence to data retention guidelines. Policy updates are communicated transparently, ensuring user awareness regarding data handling practices.</p>
        </section>

        {/* Security Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Security Policy</h2>
          <p>Security remains a top priority, and we implement robust measures to safeguard user data. Advanced encryption techniques protect sensitive information, ensuring data integrity and confidentiality. Users are advised to utilize strong authentication methods for enhanced security.</p>
          <p>We continuously monitor for potential threats and vulnerabilities. Regular security updates reinforce platform resilience against cyber threats. Users must exercise caution while sharing login credentials and personal information.</p>
          <p>Access controls limit unauthorized data exposure. Multi-layered security mechanisms ensure compliance with global security standards. Users are encouraged to report suspicious activities for prompt investigation.</p>
          <p>Ongoing security assessments and audits reinforce commitment to maintaining a safe digital environment. Updates to security protocols are communicated through official channels, ensuring transparency and user awareness.</p>
        </section>
      </div>
      <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600" onClick={() => window.location.href = "/"}>Back to Home</button>
    </div>
  );
};

export default Policies;