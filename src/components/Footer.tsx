import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  Clock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <Phone className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-bold text-lg">
                  {t("footer.emergencyLine")}
                </h3>
                <p className="text-sm opacity-90">{t("footer.available24")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="font-bold text-xl">
                  {t("footer.nationalEmergencyNumber")}
                </p>
                <p className="text-xs">{t("footer.nationalEmergency")}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">{t("footer.womenChildrenNumber")}</p>
                <p className="text-xs">{t("footer.womenChildren")}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">
                  {t("footer.ourHotlineNumber")}
                </p>
                <p className="text-xs">{t("footer.ourHotline")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-xl mr-3 shadow-lg">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    <span className="text-sm font-bold">২৪</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{t("app.name")}</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-blue-400 p-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("nav.home")}
                  </a>
                </li>
                <li>
                  <a
                    href="#advocates"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.findAdvocate")}
                  </a>
                </li>
                <li>
                  <a
                    href="#guidelines"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.legalGuidelines")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.faq")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.termsOfUse")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {t("footer.ourServices")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.aiChatbot")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.advocateConsultation")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.legalDocuments")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.caseTracking")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.emergencyHelp")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.legalEducation")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {t("footer.contactUs")}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{t("footer.dhakaOffice")}</p>
                    <p className="text-gray-300">
                      {t("footer.chittagongOffice")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3" />
                  <p className="text-gray-300">০১৮৪৪-৪৪৪৪৪৪</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <p className="text-gray-300">help@legalaid.bd</p>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-300">{t("footer.serviceHours")}</p>
                    <p className="text-gray-300">
                      {t("footer.emergencyService")}
                    </p>
                    <p className="text-gray-300">
                      {t("footer.regularService")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{t("footer.madeIn")}</span>
              <span>•</span>
              <span>{t("footer.safeTrusted")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
