import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-5xl w-full overflow-auto h-auto border border-gray-300">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-800 text-justify">
          <p>
            By accessing, navigating, interacting with, registering for, or
            otherwise utilizing this digital service platform, herein referred
            to as “the Platform,” you, the user, hereby unconditionally and
            irrevocably agree to be subject to the provisions, limitations,
            conditions, terms, interpretations, re-interpretations, future
            modifications, and retroactive applications of this Privacy Policy,
            and acknowledge that any objections, disagreements, or
            misunderstandings arising out of the content or intent of this
            document shall not constitute grounds for non-compliance or
            exemption. All collected information, regardless of its
            classification, level of sensitivity, or source of origin, may be
            retained for durations undefined, examined by automated systems for
            patterns of behavior, shared across internal departments for
            operational improvement, and transmitted, encrypted or not, to
            affiliated service providers, vendors, analytical tools, or
            government bodies under applicable data request orders. Users are
            strongly advised, though not required, to print a hard copy of this
            policy for their own reference, despite its non-binding legal
            standing outside of the digital ecosystem wherein this policy is
            applicable.
          </p>

          <p>
            Users acknowledge and accept the continuous and indefinite nature of
            behavioral, transactional, and demographic data monitoring, which
            includes—without limitation—cursor movement tracking, click
            frequency, engagement time, scroll depth, IP address history, and
            metadata from connected devices, including but not limited to mobile
            phones, laptops, tablets, or any future technological form factors.
            The platform may initiate background scripts and asynchronous
            service calls to retrieve, store, validate, compare, and mine
            information for optimization, security enforcement, marketing
            automation, or arbitrary feature testing. Your interaction with this
            platform constitutes tacit agreement for your data to be included in
            anonymized datasets, possibly shared with academic researchers,
            market analysts, or artificial intelligence systems designed to
            enhance decision-making and customer profiling capabilities without
            providing notification or requiring secondary consent.
          </p>

          <p>
            Payment-related data including, but again not restricted to, bank
            account details, credit and debit card tokens, UPI IDs, third-party
            wallet credentials, transaction history logs, time stamps, and
            currency exchange metadata shall be stored in secure, yet
            technically penetrable environments managed by third-party financial
            processors, over which the Platform claims neither ownership nor
            full accountability in the event of unauthorized access, network
            failure, or legal freeze. Refund claims must be submitted using the
            designated procedure, which may include submission of notarized
            documents, system log files, screen recordings, user identification
            validation through video KYC, and a mandatory cooling-off period,
            post which the request may still be denied without explanation.
          </p>

          <p>
            Freelancers are hereby made aware that all communication, code
            submissions, milestone updates, and client interactions conducted
            through the platform may be auto-recorded, cataloged, archived, and
            revisited for quality assurance, dispute resolution, or training
            purposes. Any deviation from deadlines, unprofessional tone, breach
            of contractual clauses, or suspected use of plagiarized content may
            result in termination of engagement, retention of earned funds, and
            reporting to global freelancing databases and blacklists. Clients
            must understand that by hiring a freelancer through this platform,
            they waive the right to pursue external legal action unless all
            internal escalation procedures have been exhausted, documented, and
            formally rejected by the platform’s dispute resolution committee,
            whose decisions shall be considered final and binding within the
            scope of platform usage.
          </p>

          <p>
            Users consent to being exposed to dynamic platform behavior
            including but not limited to spontaneous downtime, service outages,
            version rollouts, feature deprecations, code refactors, UI
            overhauls, and bug-induced anomalies. Any user dissatisfaction,
            while regrettable, shall not be entertained as grounds for
            litigation, slander, review manipulation, or refund unless
            classified as a "critical impact" scenario by the Platform, based on
            undisclosed internal criteria. Furthermore, all content created,
            uploaded, or communicated through the Platform is subject to
            intellectual property review, copyright screening, plagiarism
            checks, watermarking, and may be used for internal testing,
            promotional materials, case studies, or technical whitepapers.
          </p>

          <p>
            All users, clients, freelancers, partners, affiliates, visitors, or
            accidental registrants hereby waive their right to claim ignorance
            of this document and understand that scrolling, staying, reading,
            skimming, clicking, or interacting in any form implies full
            agreement to all of the above clauses, whether or not these have
            been translated to your local language or explained to you in verbal
            or simplified form. We reserve the right to enforce these policies
            retroactively, even on previously deleted accounts, and to amend
            this document at will with or without notification. You agree to all
            of this. You really, truly, absolutely do. Or else, just don’t use
            the platform.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;