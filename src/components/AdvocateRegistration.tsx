import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  FileText,
  Camera,
  Save,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AdvocateFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  experience: string;
  barCouncilId: string;
  description: string;
  profileImage: string;
}

interface AdvocateRegistrationProps {
  onChatbotOpen: () => void;
}

const AdvocateRegistration: React.FC<AdvocateRegistrationProps> = ({
  onChatbotOpen,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<AdvocateFormData>({
    name: "",
    email: "",
    phone: "",
    location: "regLocation.dhaka",
    specialization: "regSpec.criminal",
    experience: "",
    barCouncilId: "",
    description: "",
    profileImage: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const locations = [
    "regLocation.dhaka",
    "regLocation.chittagong",
    "regLocation.sylhet",
    "regLocation.rajshahi",
    "regLocation.khulna",
    "regLocation.barishal",
    "regLocation.rangpur",
    "regLocation.mymensingh",
  ];

  const specializations = [
    "regSpec.criminal",
    "regSpec.family",
    "regSpec.business",
    "regSpec.property",
    "regSpec.labor",
    "regSpec.cyber",
    "regSpec.tax",
    "regSpec.constitutional",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          profileImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for now (in real app, would send to backend)
    const existingAdvocates = JSON.parse(
      localStorage.getItem("registeredAdvocates") || "[]",
    );
    const newAdvocate = {
      id: Date.now(),
      name: formData.name,
      specialization: t(formData.specialization),
      rating: 4.5,
      experience: `${formData.experience}+ ${t("advocates.years") || "years"}`,
      location: t(formData.location),
      phone: formData.phone,
      image:
        formData.profileImage ||
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      cases: 0,
      available: true,
      description: formData.description,
      barCouncilId: formData.barCouncilId,
    };

    existingAdvocates.push(newAdvocate);
    localStorage.setItem(
      "registeredAdvocates",
      JSON.stringify(existingAdvocates),
    );
    setIsSubmitted(true);

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "regLocation.dhaka",
        specialization: "regSpec.criminal",
        experience: "",
        barCouncilId: "",
        description: "",
        profileImage: "",
      });
      setImagePreview("");
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("advocateReg.successTitle")}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("advocateReg.successMessage")}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = "#home")}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t("advocateReg.backToHome")}
              </button>
              <button
                onClick={onChatbotOpen}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {t("advocateReg.chatWithBot")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("advocateReg.title")}
            </h1>
            <p className="text-gray-600 mt-2">{t("advocateReg.subtitle")}</p>
          </div>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t("advocateReg.uploadPhoto")}
                </p>
              </div>

              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.fullName")} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder={t("advocateReg.fullNamePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.emailAddress")} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.mobileNumber")} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder={t("advocateReg.phonePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.workplace")} *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {t(location)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Award className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.specialization")} *
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {t(spec)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("advocateReg.experienceYears")} *
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="50"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-2" />
                  {t("advocateReg.barCouncilId")} *
                </label>
                <input
                  type="text"
                  name="barCouncilId"
                  value={formData.barCouncilId}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="BC-12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("advocateReg.aboutYourself")}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder={t("advocateReg.aboutPlaceholder")}
                />
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                {t("advocateReg.termsAgree")}{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  {t("advocateReg.termsConditions")}
                </a>{" "}
                {t("advocateReg.and")}
                <a href="#" className="text-blue-600 hover:underline ml-1">
                  {t("advocateReg.privacyPolicy")}
                </a>{" "}
                {t("advocateReg.agreeText")}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {t("advocateReg.submitBtn")}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {t("advocateReg.needHelp")}
          </h3>
          <p className="text-gray-700 mb-4">{t("advocateReg.helpDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm">{t("phone.hotline")}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm">support@legalaid.bd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocateRegistration;
