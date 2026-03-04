import React, { useState } from "react";
import {
  Phone,
  Users,
  Scale,
  Clock,
  FileText,
  CheckCircle,
  MessageCircle,
  User,
  Mail,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SomjhotaPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    party1Name: "",
    party1Email: "",
    party1Phone: "",
    party2Name: "",
    party2Email: "",
    party2Phone: "",
    disputeType: "dispute.family",
    description: "",
    preferredTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const disputeTypes = [
    "dispute.family",
    "dispute.property",
    "dispute.business",
    "dispute.contract",
    "dispute.neighbor",
    "dispute.other",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        party1Name: "",
        party1Email: "",
        party1Phone: "",
        party2Name: "",
        party2Email: "",
        party2Phone: "",
        disputeType: "dispute.family",
        description: "",
        preferredTime: "",
      });
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("somjhota.successTitle")}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("somjhota.successMessage")}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 font-medium">
                {t("somjhota.nextSteps")}
              </p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>• {t("somjhota.nextStep1")}</li>
                <li>• {t("somjhota.nextStep2")}</li>
                <li>• {t("somjhota.nextStep3")}</li>
              </ul>
            </div>
            <button
              onClick={() => (window.location.href = "#home")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t("somjhota.backToHome")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Scale className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t("somjhota.title")}
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
              {t("somjhota.subtitle")}
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t("somjhota.heroDescription")}
            </p>

            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-4xl mx-auto">
              <img
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t("somjhota.title")}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {t("somjhota.peacefulSolution")}
                  </h3>
                  <p className="text-lg">{t("somjhota.withExpertMediation")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("somjhota.featuresTitle")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("somjhota.featuresDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-4 rounded-full w-fit mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature1Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature1Desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-600 p-4 rounded-full w-fit mb-6">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature2Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature2Desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-600 p-4 rounded-full w-fit mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature3Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature3Desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-600 p-4 rounded-full w-fit mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature4Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature4Desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-600 p-4 rounded-full w-fit mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature5Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature5Desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-teal-600 p-4 rounded-full w-fit mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("somjhota.feature6Title")}
              </h3>
              <p className="text-gray-700">{t("somjhota.feature6Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("somjhota.howItWorks")}
            </h2>
            <p className="text-xl text-gray-600">{t("somjhota.simpleSteps")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {t("step.1")}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("somjhota.step1Title")}
              </h3>
              <p className="text-gray-600">{t("somjhota.step1Desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {t("step.2")}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("somjhota.step2Title")}
              </h3>
              <p className="text-gray-600">{t("somjhota.step2Desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {t("step.3")}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("somjhota.step3Title")}
              </h3>
              <p className="text-gray-600">{t("somjhota.step3Desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {t("step.4")}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("somjhota.step4Title")}
              </h3>
              <p className="text-gray-600">{t("somjhota.step4Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("somjhota.applyTitle")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("somjhota.applyDescription")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Party 1 Information */}

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t("somjhota.party1Info")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.name")} *
                    </label>
                    <input
                      type="text"
                      name="party1Name"
                      value={formData.party1Name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder={t("somjhota.party1NamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.email")} *
                    </label>
                    <input
                      type="email"
                      name="party1Email"
                      value={formData.party1Email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.phone")} *
                    </label>
                    <input
                      type="tel"
                      name="party1Phone"
                      value={formData.party1Phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder={t("somjhota.phonePlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Party 2 Information */}

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t("somjhota.party2Info")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.name")} *
                    </label>
                    <input
                      type="text"
                      name="party2Name"
                      value={formData.party2Name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder={t("somjhota.party2NamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.email")} *
                    </label>
                    <input
                      type="email"
                      name="party2Email"
                      value={formData.party2Email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.phone")} *
                    </label>
                    <input
                      type="tel"
                      name="party2Phone"
                      value={formData.party2Phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder={t("somjhota.phonePlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Dispute Information */}

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {t("somjhota.disputeInfo")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.disputeType")} *
                    </label>
                    <select
                      name="disputeType"
                      value={formData.disputeType}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    >
                      {disputeTypes.map((type) => (
                        <option key={type} value={type}>
                          {t(type)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("somjhota.preferredTime")}
                    </label>
                    <input
                      type="text"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                      placeholder={t("somjhota.preferredTimePlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("somjhota.disputeDescription")} *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder={t("somjhota.disputeDescPlaceholder")}
                  />
                </div>
              </div>

              {/* Terms and Submit */}

              <div className="border-t pt-6">
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    {t("somjhota.termsAgree")}{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      {t("somjhota.termsConditions")}
                    </a>{" "}
                    {t("somjhota.and")}
                    <a href="#" className="text-blue-600 hover:underline ml-1">
                      {t("somjhota.privacyPolicy")}
                    </a>{" "}
                    {t("somjhota.agreeText")}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("somjhota.submitBtn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("somjhota.wantToKnowMore")}
          </h2>
          <p className="text-xl mb-8">{t("somjhota.contactDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">
              <Phone className="h-5 w-5 mr-2" />
              ০১৮৪৪-৪৪৪৪৪৪
            </div>
            <div className="flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">
              <Mail className="h-5 w-5 mr-2" />
              mediation@legalaid.bd
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SomjhotaPage;
