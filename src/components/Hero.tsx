import React from "react";
import { MessageCircle, Shield, Clock, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onChatbotOpen: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChatbotOpen }) => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("hero.title")}
            <br />
            <span className="text-blue-600">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onChatbotOpen}
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t("hero.emergencyBtn")}
            </button>
            <button
              onClick={onChatbotOpen}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t("hero.chatBtn")}
            </button>
          </div>

          {/* Hero Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={t("hero.legalAdvice")}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t("hero.legalAdvice")}</h3>
                <p className="text-sm">{t("hero.fromExperts")}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={t("hero.legalHelp")}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t("hero.legalHelp")}</h3>
                <p className="text-sm">{t("hero.available247")}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={t("hero.advocateNetwork")}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">
                  {t("hero.advocateNetwork")}
                </h3>
                <p className="text-sm">{t("hero.nationwide")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("hero.smartChatbot")}
            </h3>
            <p className="text-gray-600">{t("hero.smartChatbotDesc")}</p>
            <div className="mt-4">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="AI Chatbot"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("hero.locationBased")}
            </h3>
            <p className="text-gray-600">{t("hero.locationBasedDesc")}</p>
            <div className="mt-4">
              <img
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Location Service"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("hero.service247")}
            </h3>
            <p className="text-gray-600">{t("hero.service247Desc")}</p>
            <div className="mt-4">
              <img
                src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="24/7 Service"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t("hero.safeSecure")}
            </h3>
            <p className="text-gray-600">{t("hero.safeSecureDesc")}</p>
            <div className="mt-4">
              <img
                src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Security"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
