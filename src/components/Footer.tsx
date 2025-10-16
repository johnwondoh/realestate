"use client";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const brandLogos = [
    { name: "REA Group", href: "#" },
    { name: "realestate.com.au", href: "#" },
    { name: "realcommercial.com.au", href: "#" },
    { name: "PropTrack", href: "#" },
    { name: "Flatmates", href: "#" },
    { name: "Mortgage Choice", href: "#" },
    { name: "property", href: "#" },
  ];

  const internationalSites = [
    { name: "India", href: "#" },
    { name: "United States", href: "#" },
    { name: "International properties", href: "#" },
  ];

  const partnerSites = [
    { name: "news.com.au", href: "#" },
    { name: "foxsports.com.au", href: "#" },
    { name: "Mansion Global", href: "#" },
    { name: "askizzy.org.au", href: "#" },
    { name: "proptiger.com", href: "#" },
  ];

  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          {brandLogos.map((logo, index) => (
            <a
              key={index}
              href={logo.href}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {logo.name === "REA Group" && (
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
              )}
              <span className="text-sm font-medium">{logo.name}</span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              International sites
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {internationalSites.map((site, index) => (
                <span key={index} className="flex items-center">
                  <a
                    href={site.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {site.name}
                  </a>
                  {index < internationalSites.length - 1 && (
                    <span className="ml-4 text-gray-400">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Partner sites</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {partnerSites.map((site, index) => (
                <span key={index} className="flex items-center">
                  <a
                    href={site.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {site.name}
                  </a>
                  {index < partnerSites.length - 1 && (
                    <span className="ml-4 text-gray-400">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            realestate.com.au is owned and operated by ASX-listed REA Group Ltd
            (REA:ASX) © REA Group Ltd. By accessing or using our platform, you
            agree to our{" "}
            <a
              href="#"
              className="text-gray-900 hover:underline font-medium"
            >
              Terms of Use.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
