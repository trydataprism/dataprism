import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları - Terms of Service",
  description: "Hizmet kullanım şartları ve koşulları",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
              Terms of Service
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
                    Subject to these Terms of Service (this "Agreement"),{" "}
                    <strong className="text-white">Dataprism Inc.</strong>{" "}
                    ("Vercel", "we", "us" and/or "our") provides access to
                    Vercel's Services. "Services" means, collectively, any
                    products or services made available by Vercel or its
                    affiliates; provided that, your use of certain Services
                    requires acceptance of additional terms as set forth in{" "}
                    <a
                      href="#schedule"
                      className="text-blue-400 hover:underline"
                    >
                      Schedule I
                    </a>{" "}
                    hereto; and provided further, that, for the avoidance of
                    doubt, any software that we provide exclusively under open
                    source licenses (including, without limitation, Next.js) are
                    not covered by this Agreement. By using or accessing the
                    Services, you acknowledge that you have read, understand,
                    and agree to be bound by this Agreement.
                  </p>
                </div>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="introduction"
                  >
                    Introduction
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Welcome to Vercel's platform. These Terms of Service
                      govern your use of our services, including our website,
                      applications, and any related services provided by Vercel.
                    </p>
                    <p>
                      By accessing or using our services, you agree to be bound
                      by these terms. If you disagree with any part of these
                      terms, then you may not access our services.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="age-eligibility"
                  >
                    Age and Eligibility
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      You must be at least 13 years old to use our services. If
                      you are under 18, you represent that you have your parent
                      or guardian's permission to use the services.
                    </p>
                    <p>
                      You represent and warrant that you have the right,
                      authority, and capacity to enter into this agreement and
                      to abide by all of the terms and conditions set forth
                      herein.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="temporary-license"
                  >
                    Temporary Use License
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Subject to your compliance with these Terms, Vercel grants
                      you a limited, non-exclusive, non-transferable, revocable
                      license to access and use the services for your personal
                      or commercial use.
                    </p>
                    <p>
                      This license does not include any resale or commercial use
                      of our services or its contents, any derivative use of our
                      services or its contents, or any use of data mining,
                      robots, or similar data gathering and extraction tools.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="your-content"
                  >
                    Your Content
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      You retain ownership of any intellectual property rights
                      that you hold in content that you submit, post, or display
                      on or through the services ("Your Content").
                    </p>
                    <p>
                      By submitting, posting, or displaying Your Content, you
                      grant Vercel a worldwide, non-exclusive, royalty-free
                      license to use, copy, reproduce, process, adapt, modify,
                      publish, transmit, display, and distribute Your Content.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="hobby-plan"
                  >
                    Hobby Plan
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Our Hobby Plan is designed for personal, non-commercial
                      use. Commercial use of the Hobby Plan is prohibited and
                      may result in account suspension.
                    </p>
                    <p>
                      If you need to use Vercel for commercial purposes, please
                      upgrade to one of our paid plans that support commercial
                      usage.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h2
                    className="text-3xl font-semibold text-white mb-6"
                    id="acceptable-use"
                  >
                    Acceptable Use
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      You agree not to use the services for any unlawful purpose
                      or in any way that could damage, disable, overburden, or
                      impair our services.
                    </p>
                    <p>
                      Prohibited activities include but are not limited to:
                      violating laws, infringing intellectual property rights,
                      distributing malware, spamming, or engaging in any form of
                      harassment.
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
                      href="#introduction"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Introduction
                    </a>
                    <a
                      href="#age-eligibility"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Age and Eligibility
                    </a>
                    <a
                      href="#temporary-license"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Temporary Use License
                    </a>
                    <a
                      href="#your-content"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Your Content
                    </a>
                    <a
                      href="#hobby-plan"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Hobby Plan
                    </a>
                    <a
                      href="#acceptable-use"
                      className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                    >
                      Acceptable Use
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
