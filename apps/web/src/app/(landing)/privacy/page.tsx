import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Privacy Policy",
  description:
    "Dataprism web analitik platformu veri gizliliği ve kullanım politikası",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mb-8">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 text-balance">
              Privacy Policy
            </h1>
            <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-white/60 rounded-full mr-3"></div>
              <p className="text-gray-300 text-sm font-medium">
                Last Updated August 19, 2024
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200 leading-relaxed mb-6 text-lg">
                        This Privacy Policy describes how{" "}
                        <strong className="text-white font-semibold">
                          DataPrism Inc.
                        </strong>{" "}
                        ("DataPrism", "we", "us" and/or "our") collects, uses,
                        and shares your personal information when you use our
                        web analytics services. By using our services, you agree
                        to the collection and use of information in accordance
                        with this policy.
                      </p>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        We are committed to protecting your privacy and ensuring
                        the security of your personal data while providing you
                        with powerful web analytics and data insights tools.
                      </p>
                    </div>
                  </div>
                </div>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="information-collection"
                    >
                      Information We Collect
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We collect information you provide directly to us, such as
                      when you create an account, use our services, or contact
                      us for support. This may include your name, email address,
                      and any other information you choose to provide.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We also automatically collect certain information about
                      your device and how you interact with our services,
                      including your IP address, browser type, and usage
                      patterns for web analytics purposes.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="how-we-use"
                    >
                      How We Use Your Information
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We use the information we collect to provide, maintain,
                      and improve our web analytics services, to communicate
                      with you, and to develop new features and services for
                      data insights.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We may also use your information to send you technical
                      notices, support messages, and updates about our services.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="information-sharing"
                    >
                      Information Sharing
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      as described in this policy.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We may share your information with service providers who
                      assist us in operating our website and providing our
                      services, or when required by law.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="data-security"
                    >
                      Data Security
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      However, no method of transmission over the internet or
                      electronic storage is 100% secure, and we cannot guarantee
                      absolute security.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="cookies-tracking"
                    >
                      Cookies and Tracking
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We use cookies and similar tracking technologies to
                      enhance your experience on our website and to understand
                      how you use our services for analytics purposes.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      You can control cookie settings through your browser
                      preferences, though disabling cookies may affect some
                      functionality of our services.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="third-party"
                    >
                      Third-Party Services
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Our website may contain links to third-party websites or
                      services. We are not responsible for the privacy practices
                      of these third parties.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We encourage you to review their privacy policies before
                      providing any personal information to third-party
                      services.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="children-privacy"
                    >
                      Children's Privacy
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      If you are a parent or guardian and believe your child has
                      provided us with personal information, please contact us
                      immediately.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="changes-policy"
                    >
                      Changes to This Policy
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We may update this privacy policy from time to time. We
                      will notify you of any changes by posting the new policy
                      on this page and updating the "Last updated" date.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Your continued use of our services after any changes
                      constitutes acceptance of the updated policy.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="contact-us"
                    >
                      Contact Us
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      If you have any questions about this privacy policy or our
                      data practices, please contact us at{" "}
                      <a
                        href="mailto:privacy@dataprism.app"
                        className="text-white underline decoration-white/30 hover:decoration-white/60 transition-all duration-200"
                      >
                        privacy@dataprism.app
                      </a>
                      .
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We are committed to addressing your privacy concerns and
                      will respond to your inquiries as soon as possible.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      On this page
                    </h3>
                  </div>
                  <nav className="space-y-3">
                    <a
                      href="#information-collection"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Information We Collect
                      </span>
                    </a>
                    <a
                      href="#how-we-use"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        How We Use Your Information
                      </span>
                    </a>
                    <a
                      href="#information-sharing"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Information Sharing
                      </span>
                    </a>
                    <a
                      href="#data-security"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Data Security
                      </span>
                    </a>
                    <a
                      href="#cookies-tracking"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Cookies and Tracking
                      </span>
                    </a>
                    <a
                      href="#third-party"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Third-Party Services
                      </span>
                    </a>
                    <a
                      href="#children-privacy"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Children's Privacy
                      </span>
                    </a>
                    <a
                      href="#changes-policy"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Changes to This Policy
                      </span>
                    </a>
                    <a
                      href="#contact-us"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Contact Us
                      </span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
