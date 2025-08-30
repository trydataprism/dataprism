import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Privacy Policy",
  description: "Veri gizliliği ve kullanım politikası",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Last Updated August 30, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <div className="backdrop-blur-lg border border-neutral-950 border-5 rounded-lg p-8 mb-8">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    This Privacy Policy describes how DataPrism Inc.
                    ("DataPrism", "we", "us" and/or "our") collects, uses, and
                    shares your personal information when you use our services.
                    By using our services, you agree to the collection and use
                    of information in accordance with this policy.
                  </p>
                </div>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="information-collection"
                  >
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We collect information you provide directly to us, such as
                      when you create an account, use our services, or contact
                      us for support. This may include your name, email address,
                      and any other information you choose to provide.
                    </p>
                    <p>
                      We also automatically collect certain information about
                      your device and how you interact with our services,
                      including your IP address, browser type, and usage
                      patterns.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="how-we-use"
                  >
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We use the information we collect to provide, maintain,
                      and improve our services, to communicate with you, and to
                      develop new features and services.
                    </p>
                    <p>
                      We may also use your information to send you technical
                      notices, support messages, and updates about our services.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="information-sharing"
                  >
                    Information Sharing
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      as described in this policy.
                    </p>
                    <p>
                      We may share your information with service providers who
                      assist us in operating our website and providing our
                      services, or when required by law.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="data-security"
                  >
                    Data Security
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction.
                    </p>
                    <p>
                      However, no method of transmission over the internet or
                      electronic storage is 100% secure, and we cannot guarantee
                      absolute security.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="cookies-tracking"
                  >
                    Cookies and Tracking
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We use cookies and similar tracking technologies to
                      enhance your experience on our website and to understand
                      how you use our services.
                    </p>
                    <p>
                      You can control cookie settings through your browser
                      preferences, though disabling cookies may affect some
                      functionality of our services.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="third-party"
                  >
                    Third-Party Services
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Our website may contain links to third-party websites or
                      services. We are not responsible for the privacy practices
                      of these third parties.
                    </p>
                    <p>
                      We encourage you to review their privacy policies before
                      providing any personal information to third-party
                      services.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="children-privacy"
                  >
                    Children's Privacy
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13.
                    </p>
                    <p>
                      If you are a parent or guardian and believe your child has
                      provided us with personal information, please contact us
                      immediately.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="changes-policy"
                  >
                    Changes to This Policy
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      We may update this privacy policy from time to time. We
                      will notify you of any changes by posting the new policy
                      on this page and updating the "Last updated" date.
                    </p>
                    <p>
                      Your continued use of our services after any changes
                      constitutes acceptance of the updated policy.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="contact-us"
                  >
                    Contact Us
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      If you have any questions about this privacy policy or our
                      data practices, please contact us at
                      privacy@dataprism.app.
                    </p>
                    <p>
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
                <div className="backdrop-blur-lg border border-neutral-950 border-5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    On this page
                  </h3>
                  <nav className="space-y-2">
                    <a
                      href="#information-collection"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Information We Collect
                    </a>
                    <a
                      href="#how-we-use"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      How We Use Your Information
                    </a>
                    <a
                      href="#information-sharing"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Information Sharing
                    </a>
                    <a
                      href="#data-security"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Data Security
                    </a>
                    <a
                      href="#cookies-tracking"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Cookies and Tracking
                    </a>
                    <a
                      href="#third-party"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Third-Party Services
                    </a>
                    <a
                      href="#children-privacy"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Children's Privacy
                    </a>
                    <a
                      href="#changes-policy"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Changes to This Policy
                    </a>
                    <a
                      href="#contact-us"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Contact Us
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
