import React, { useState } from "react";
import { MapPin, Star, Phone, MessageCircle, Award, Clock } from "lucide-react";
import LocationDetector from "./LocationDetector";
import { useLanguage } from "../context/LanguageContext";

interface Advocate {
  id: number;
  name: string;
  nameEn?: string;
  specialization: string;
  specializationEn?: string;
  rating: number;
  experience: string;
  experienceEn?: string;
  location: string;
  locationEn?: string;
  phone: string;
  image: string;
  cases: number;
  available: boolean;
  description?: string;
  barCouncilId?: string;
}

interface AdvocateSuggestionProps {
  customAdvocates?: Advocate[];
}

const AdvocateSuggestion: React.FC<AdvocateSuggestionProps> = ({
  customAdvocates = [],
}) => {
  const [selectedLocation, setSelectedLocation] = useState("ঢাকা");
  const { language, t } = useLanguage();

  const handleLocationDetected = (location: string) => {
    setSelectedLocation(location);
  };

  const defaultAdvocates: Advocate[] = [
    {
      id: 1,
      name: "ব্যারিস্টার আহমেদ করিম",
      nameEn: "Barrister Ahmed Karim",
      specialization: "ফৌজদারি আইন",
      specializationEn: "Criminal Law",
      rating: 4.9,
      experience: "১৫+ বছর",
      experienceEn: "15+ years",
      location: "ঢাকা",
      locationEn: "Dhaka",
      phone: "০১৭১১-১২৩৪৫৬",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      cases: 450,
      available: true,
    },
    {
      id: 2,
      name: "অ্যাডভোকেট ফাতেমা খাতুন",
      nameEn: "Advocate Fatema Khatun",
      specialization: "পারিবারিক আইন",
      specializationEn: "Family Law",
      rating: 4.8,
      experience: "১২+ বছর",
      experienceEn: "12+ years",
      location: "ঢাকা",
      locationEn: "Dhaka",
      phone: "০১৮১৫-৭৮৯০১২",
      image:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      cases: 320,
      available: true,
    },
    {
      id: 3,
      name: "ব্যারিস্টার রহিম উদ্দিন",
      nameEn: "Barrister Rahim Uddin",
      specialization: "ব্যবসায়িক আইন",
      specializationEn: "Business Law",
      rating: 4.7,
      experience: "১০+ বছর",
      experienceEn: "10+ years",
      location: "ঢাকা",
      locationEn: "Dhaka",
      phone: "০১৯১২-৩৪৫৬৭৮",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300",
      cases: 280,
      available: false,
    },
    {
      id: 4,
      name: "অ্যাডভোকেট নাসির হোসেন",
      nameEn: "Advocate Nasir Hossain",
      specialization: "সম্পত্তি আইন",
      specializationEn: "Property Law",
      rating: 4.6,
      experience: "৮+ বছর",
      experienceEn: "8+ years",
      location: "চট্টগ্রাম",
      locationEn: "Chittagong",
      phone: "০১৭২২-৯৮৭৬৫৪",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      cases: 190,
      available: true,
    },
  ];

  // Combine default advocates with custom registered advocates
  const allAdvocates = [...defaultAdvocates, ...customAdvocates];

  const locations = [
    { bn: "ঢাকা", en: "Dhaka" },
    { bn: "চট্টগ্রাম", en: "Chittagong" },
    { bn: "সিলেট", en: "Sylhet" },
    { bn: "রাজশাহী", en: "Rajshahi" },
    { bn: "খুলনা", en: "Khulna" },
    { bn: "বরিশাল", en: "Barishal" },
  ];

  const filteredAdvocates = allAdvocates.filter(
    (advocate) => advocate.location === selectedLocation,
  );

  return (
    <section id="advocates" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("advocates.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("advocates.description")}
          </p>

          {/* Advocate Section Images */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt={t("advocates.experiencedAdvocate")}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold">
                  {t("advocates.experiencedAdvocate")}
                </h3>
                <p className="text-sm">{t("advocates.years15")}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt={t("advocates.professionalService")}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold">
                  {t("advocates.professionalService")}
                </h3>
                <p className="text-sm">{t("advocates.allLegalSolutions")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Location Detection */}
        <LocationDetector onLocationDetected={handleLocationDetected} />

        {/* Location Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-lg font-semibold text-gray-800">
              {t("advocates.selectLocation")}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((location) => (
              <button
                key={location.bn}
                onClick={() => setSelectedLocation(location.bn)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLocation === location.bn
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
                }`}
              >
                {language === "bn" ? location.bn : location.en}
              </button>
            ))}
          </div>
        </div>

        {/* Advocates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocates.map((advocate) => (
            <div
              key={advocate.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={advocate.image}
                    alt={
                      language === "bn"
                        ? advocate.name
                        : advocate.nameEn || advocate.name
                    }
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {language === "bn"
                        ? advocate.name
                        : advocate.nameEn || advocate.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {language === "bn"
                        ? advocate.specialization
                        : advocate.specializationEn || advocate.specialization}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {advocate.rating} {t("advocates.rating")}
                      </span>
                      {advocate.available && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {t("advocates.available")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      {t("advocates.experience")}
                    </p>
                    <p className="font-bold text-gray-900">
                      {language === "bn"
                        ? advocate.experience
                        : advocate.experienceEn || advocate.experience}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Award className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      {t("advocates.caseSolved")}
                    </p>
                    <p className="font-bold text-gray-900">{advocate.cases}+</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">
                    {language === "bn"
                      ? advocate.location
                      : advocate.locationEn || advocate.location}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {t("advocates.call")}
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("advocates.chat")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">
              {t("advocates.notFound")}
            </h3>
            <p className="mb-6">{t("advocates.contactUs")}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {t("advocates.specialHelp")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvocateSuggestion;
