import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Scale,
  Users,
  Home,
  Briefcase,
  Shield,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface GuidelineCategory {
  id: string;
  titleKey: string;
  icon: React.ReactNode;
  articles: Article[];
}

interface Article {
  id: number;
  titleKey: string;
  summaryKey: string;
  readTime: { bn: string; en: string };
}

interface LegalGuidelinesProps {
  onChatbotOpen: () => void;
}

const LegalGuidelines: React.FC<LegalGuidelinesProps> = ({ onChatbotOpen }) => {
  const [activeCategory, setActiveCategory] = useState("family");
  const { language, t } = useLanguage();

  const categories: GuidelineCategory[] = [
    {
      id: "family",
      titleKey: "guidelines.familyLaw",
      icon: <Users className="h-6 w-6" />,
      articles: [
        {
          id: 1,
          titleKey: "article.divorce",
          summaryKey: "article.divorceSummary",
          readTime: { bn: "৫ মিনিট", en: "5 minutes" },
        },
        {
          id: 2,
          titleKey: "article.custody",
          summaryKey: "article.custodySummary",
          readTime: { bn: "৭ মিনিট", en: "7 minutes" },
        },
        {
          id: 3,
          titleKey: "article.domesticViolence",
          summaryKey: "article.domesticViolenceSummary",
          readTime: { bn: "৬ মিনিট", en: "6 minutes" },
        },
      ],
    },
    {
      id: "property",
      titleKey: "guidelines.propertyLaw",
      icon: <Home className="h-6 w-6" />,
      articles: [
        {
          id: 4,
          titleKey: "article.landPurchase",
          summaryKey: "article.landPurchaseSummary",
          readTime: { bn: "৮ মিনিট", en: "8 minutes" },
        },
        {
          id: 5,
          titleKey: "article.inheritance",
          summaryKey: "article.inheritanceSummary",
          readTime: { bn: "১০ মিনিট", en: "10 minutes" },
        },
        {
          id: 6,
          titleKey: "article.rentDispute",
          summaryKey: "article.rentDisputeSummary",
          readTime: { bn: "৫ মিনিট", en: "5 minutes" },
        },
      ],
    },
    {
      id: "business",
      titleKey: "guidelines.businessLaw",
      icon: <Briefcase className="h-6 w-6" />,
      articles: [
        {
          id: 7,
          titleKey: "article.companyReg",
          summaryKey: "article.companyRegSummary",
          readTime: { bn: "১২ মিনিট", en: "12 minutes" },
        },
        {
          id: 8,
          titleKey: "article.businessContract",
          summaryKey: "article.businessContractSummary",
          readTime: { bn: "৯ মিনিট", en: "9 minutes" },
        },
        {
          id: 9,
          titleKey: "article.laborRights",
          summaryKey: "article.laborRightsSummary",
          readTime: { bn: "৭ মিনিট", en: "7 minutes" },
        },
      ],
    },
    {
      id: "criminal",
      titleKey: "guidelines.criminalLaw",
      icon: <Shield className="h-6 w-6" />,
      articles: [
        {
          id: 10,
          titleKey: "article.cyberCrime",
          summaryKey: "article.cyberCrimeSummary",
          readTime: { bn: "৬ মিনিট", en: "6 minutes" },
        },
        {
          id: 11,
          titleKey: "article.fileCase",
          summaryKey: "article.fileCaseSummary",
          readTime: { bn: "১১ মিনিট", en: "11 minutes" },
        },
        {
          id: 12,
          titleKey: "article.bail",
          summaryKey: "article.bailSummary",
          readTime: { bn: "৮ মিনিট", en: "8 minutes" },
        },
      ],
    },
  ];

  const activeGuidelineCategory =
    categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <section id="guidelines" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("guidelines.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("guidelines.description")}
          </p>

          {/* Guidelines Hero Image */}
          <div className="mt-8 relative overflow-hidden rounded-2xl shadow-xl max-w-4xl mx-auto">
            <img
              src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t("guidelines.title")}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {t("guidelines.learnLaw")}
                </h3>
                <p className="text-lg">{t("guidelines.readGuidelines")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                {t("guidelines.topics")}
              </h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.icon}
                    <span className="ml-3">{t(category.titleKey)}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                {activeGuidelineCategory.icon}
                <span className="ml-3">
                  {t(activeGuidelineCategory.titleKey)}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGuidelineCategory.articles.map((article) => (
                <div
                  key={article.id}
                  onClick={onChatbotOpen}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {language === "bn"
                        ? article.readTime.bn
                        : article.readTime.en}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {t(article.titleKey)}
                  </h4>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {t(article.summaryKey)}
                  </p>

                  <div className="flex items-center text-blue-600 font-medium">
                    <span>{t("guidelines.readMore")}</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Article */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {t("guidelines.specialArticle")}
                  </h4>
                  <p className="text-gray-600">{t("guidelines.learnRights")}</p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("article.fundamentalRights")}
              </h3>
              <p className="text-gray-700 mb-4">
                {t("article.fundamentalRightsSummary")}
              </p>
              <button
                onClick={onChatbotOpen}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t("guidelines.readFullArticle")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default LegalGuidelines;
