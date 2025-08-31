import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları - Terms of Service",
  description:
    "Dataprism web analitik platformu kullanım şartları ve koşulları",
};

export default function TermsPage() {
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 text-balance">
              Terms of Service
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
                        Subject to these Terms of Service (this "Agreement"),{" "}
                        <strong className="text-white font-semibold">
                          Dataprism Inc.
                        </strong>{" "}
                        ("Dataprism", "we", "us" and/or "our") provides access
                        to Dataprism's web analytics and data insights Services.
                        "Services" means, collectively, any products or services
                        made available by Dataprism or its affiliates, including
                        our web analytics platform, data processing tools, and
                        related services; provided that, your use of certain
                        Services requires acceptance of additional terms as set
                        forth in{" "}
                        <a
                          href="#schedule"
                          className="text-white underline decoration-white/30 hover:decoration-white/60 transition-all duration-200"
                        >
                          Schedule I
                        </a>{" "}
                        hereto. By using or accessing the Services, you
                        acknowledge that you have read, understand, and agree to
                        be bound by this Agreement.
                      </p>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        If you are entering into this Agreement on behalf of a
                        company, business or other legal entity, you represent
                        that you have the authority to bind such entity to this
                        Agreement, in which case the term "you" shall refer to
                        such entity. If you do not have such authority, or if
                        you do not agree with these terms and conditions, you
                        must not accept this Agreement and may not use the
                        Services.
                      </p>
                    </div>
                  </div>
                </div>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="introduction"
                    >
                      Introduction
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Welcome to Dataprism's web analytics platform. These Terms
                      of Service govern your use of our services, including our
                      website analytics tools, data processing applications, and
                      any related services provided by Dataprism for web
                      performance monitoring and user behavior analysis.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      By accessing or using our services, you agree to be bound
                      by these terms. If you disagree with any part of these
                      terms, then you may not access our services.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="age-eligibility"
                    >
                      Age and Eligibility
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      You must be at least 13 years old to use our services. If
                      you are under 18, you represent that you have your parent
                      or guardian&apos;s permission to use the services.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      You represent and warrant that you have the right,
                      authority, and capacity to enter into this agreement and
                      to abide by all of the terms and conditions set forth
                      herein.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="temporary-license"
                    >
                      Temporary Use License
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Subject to your compliance with these Terms, Dataprism
                      grants you a limited, non-exclusive, non-transferable,
                      revocable license to access and use the services for your
                      personal or commercial use in web analytics and data
                      analysis.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      This license does not include any resale or commercial use
                      of our services or its contents, any derivative use of our
                      services or its contents, or any use of data mining,
                      robots, or similar data gathering and extraction tools.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="your-content"
                    >
                      Your Content and Data
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      You retain ownership of any intellectual property rights
                      that you hold in content that you submit, post, or display
                      on or through the services ("Your Content"), including
                      website data and analytics information.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      By submitting, posting, or displaying Your Content, you
                      grant Dataprism a worldwide, non-exclusive, royalty-free
                      license to use, copy, reproduce, process, adapt, modify,
                      publish, transmit, display, and distribute Your Content
                      for the purpose of providing analytics services.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="hobby-plan"
                    >
                      Hobby Plan
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Our Hobby Plan is designed for personal, non-commercial
                      use of web analytics. Commercial use of the Hobby Plan is
                      prohibited and may result in account suspension.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      If you need to use Dataprism for commercial purposes,
                      please upgrade to one of our paid plans that support
                      commercial usage and provide advanced analytics features.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="acceptable-use"
                    >
                      Acceptable Use
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      You agree not to use the services for any unlawful purpose
                      or in any way that could damage, disable, overburden, or
                      impair our services or compromise data privacy.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Prohibited activities include but are not limited to:
                      violating laws, infringing intellectual property rights,
                      distributing malware, spamming, or engaging in any form of
                      harassment, or using our analytics tools to collect
                      sensitive personal information without consent.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="etiquette"
                    >
                      Etiquette
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      We expect all users to maintain a respectful and
                      professional environment when using our services. This
                      includes being courteous to other users and staff members.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Harassment, hate speech, or any form of discriminatory
                      behavior will not be tolerated and may result in immediate
                      account termination.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="security-compliance"
                    >
                      Security and Compliance
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      You are responsible for maintaining the security of your
                      account and any activities that occur under your account.
                      You must notify us immediately of any unauthorized use.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      You agree to comply with all applicable laws and
                      regulations when using our services, including data
                      protection, privacy laws, and GDPR compliance for web
                      analytics data.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-white/60 rounded-full mr-6"></div>
                    <h2
                      className="text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300"
                      id="general"
                    >
                      General
                    </h2>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      These terms constitute the entire agreement between you
                      and Dataprism regarding the use of our web analytics
                      services.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      We reserve the right to modify these terms at any time.
                      Continued use of our services after changes constitutes
                      acceptance of the new terms.
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
                      href="#introduction"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Introduction
                      </span>
                    </a>
                    <a
                      href="#age-eligibility"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Age and Eligibility
                      </span>
                    </a>
                    <a
                      href="#temporary-license"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Temporary Use License
                      </span>
                    </a>
                    <a
                      href="#your-content"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Your Content and Data
                      </span>
                    </a>
                    <a
                      href="#hobby-plan"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Hobby Plan
                      </span>
                    </a>
                    <a
                      href="#acceptable-use"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Acceptable Use
                      </span>
                    </a>
                    <a
                      href="#etiquette"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Etiquette
                      </span>
                    </a>
                    <a
                      href="#security-compliance"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        Security and Compliance
                      </span>
                    </a>
                    <a
                      href="#general"
                      className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        General
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
