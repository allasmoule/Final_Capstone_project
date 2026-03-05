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
      <div className="min-h-screen somjhota-bg flex items-center justify-center py-8 px-4">
        <div className="glass-card text-center max-w-2xl w-full">
          <div className="success-icon mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("somjhota.successTitle")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t("somjhota.successMessage")}
          </p>

          <button
            onClick={() => (window.location.href = "#home")}
            className="primary-btn"
          >
            {t("somjhota.backToHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="somjhota-bg min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Scale className="hero-icon" />
            <h1 className="hero-title">
              {t("somjhota.title")}
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            {t("somjhota.subtitle")}
          </h2>

          <p className="hero-description">
            {t("somjhota.heroDescription")}
          </p>

          {/* Hero Image */}
          <div className="hero-image">
            <img
              src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t("somjhota.title")}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {t("somjhota.featuresTitle")}
          </h2>
          <p className="section-sub">
            {t("somjhota.featuresDescription")}
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card blue">
            <Phone />
            <h3>{t("somjhota.feature1Title")}</h3>
            <p>{t("somjhota.feature1Desc")}</p>
          </div>

          <div className="feature-card green">
            <Scale />
            <h3>{t("somjhota.feature2Title")}</h3>
            <p>{t("somjhota.feature2Desc")}</p>
          </div>

          <div className="feature-card purple">
            <Users />
            <h3>{t("somjhota.feature3Title")}</h3>
            <p>{t("somjhota.feature3Desc")}</p>
          </div>

          <div className="feature-card orange">
            <Clock />
            <h3>{t("somjhota.feature4Title")}</h3>
            <p>{t("somjhota.feature4Desc")}</p>
          </div>

          <div className="feature-card red">
            <FileText />
            <h3>{t("somjhota.feature5Title")}</h3>
            <p>{t("somjhota.feature5Desc")}</p>
          </div>

          <div className="feature-card teal">
            <CheckCircle />
            <h3>{t("somjhota.feature6Title")}</h3>
            <p>{t("somjhota.feature6Desc")}</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {t("somjhota.howItWorks")}
          </h2>
          <p className="section-sub">
            {t("somjhota.simpleSteps")}
          </p>
        </div>

        <div className="steps-grid">
          {[1, 2, 3, 4].map((step) => (
            <div className="step-card" key={step}>
              <div className="step-number">{t(`step.${step}`)}</div>
              <h3>{t(`somjhota.step${step}Title`)}</h3>
              <p>{t(`somjhota.step${step}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="container-section">
        <div className="glass-card">
          <div className="text-center mb-10">
            <h2 className="section-title">
              {t("somjhota.applyTitle")}
            </h2>
            <p className="section-sub">
              {t("somjhota.applyDescription")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Party 1 */}
            <div className="form-box blue">
              <h3 className="form-title">
                <User className="mr-2" />
                {t("somjhota.party1Info")}
              </h3>

              <div className="form-grid">
                <input
                  type="text"
                  name="party1Name"
                  value={formData.party1Name}
                  onChange={handleInputChange}
                  required
                  placeholder={t("somjhota.party1NamePlaceholder")}
                  className="input"
                />
                <input
                  type="email"
                  name="party1Email"
                  value={formData.party1Email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                  className="input"
                />
                <input
                  type="tel"
                  name="party1Phone"
                  value={formData.party1Phone}
                  onChange={handleInputChange}
                  required
                  placeholder={t("somjhota.phonePlaceholder")}
                  className="input"
                />
              </div>
            </div>

            {/* Party 2 */}
            <div className="form-box green">
              <h3 className="form-title">
                <User className="mr-2" />
                {t("somjhota.party2Info")}
              </h3>

              <div className="form-grid">
                <input
                  type="text"
                  name="party2Name"
                  value={formData.party2Name}
                  onChange={handleInputChange}
                  required
                  placeholder={t("somjhota.party2NamePlaceholder")}
                  className="input"
                />
                <input
                  type="email"
                  name="party2Email"
                  value={formData.party2Email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                  className="input"
                />
                <input
                  type="tel"
                  name="party2Phone"
                  value={formData.party2Phone}
                  onChange={handleInputChange}
                  required
                  placeholder={t("somjhota.phonePlaceholder")}
                  className="input"
                />
              </div>
            </div>

            {/* Dispute */}
            <div className="form-box purple">
              <h3 className="form-title">
                <FileText className="mr-2" />
                {t("somjhota.disputeInfo")}
              </h3>

              <select
                name="disputeType"
                value={formData.disputeType}
                onChange={handleInputChange}
                required
                className="input"
              >
                {disputeTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(type)}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="textarea"
                placeholder={t("somjhota.disputeDescPlaceholder")}
              />
            </div>

            <button type="submit" className="primary-btn">
              <MessageCircle className="mr-2" />
              {t("somjhota.submitBtn")}
            </button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2>{t("somjhota.wantToKnowMore")}</h2>
        <p>{t("somjhota.contactDescription")}</p>

        <div className="contact-grid">
          <div className="contact-card">
            <Phone />
            ০১৮৪৪-৪৪৪৪৪৪
          </div>

          <div className="contact-card">
            <Mail />
            mediation@legalaid.bd
          </div>
        </div>
      </section>
    </div>
  );
};

export default SomjhotaPage;