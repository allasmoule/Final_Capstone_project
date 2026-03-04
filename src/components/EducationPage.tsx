import React, { useState } from "react";
import {
  Play,
  BookOpen,
  Video,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  Search,
  Filter,
} from "lucide-react";
import Chatbot from "./Chatbot";
import { useLanguage } from "../context/LanguageContext";

interface VideoSuggestion {
  id: number;
  titleKey: string;
  descriptionKey: string;
  thumbnail: string;
  durationKey: string;
  viewsKey: string;
  likesKey: string;
  categoryKey: string;
  levelKey: string;
  instructorKey: string;
}

interface EducationPageProps {
  onAdvocateSuggestion?: () => void;
}

const EducationPage: React.FC<EducationPageProps> = ({
  onAdvocateSuggestion,
}) => {
  const { t } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("category.all");
  const [searchTerm, setSearchTerm] = useState("");

  const videoSuggestions: VideoSuggestion[] = [
    {
      id: 1,
      titleKey: "video1.title",
      descriptionKey: "video1.description",
      thumbnail:
        "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.1530",
      viewsKey: "views.25432",
      likesKey: "likes.1234",
      categoryKey: "category.constitutional",
      levelKey: "level.beginner",
      instructorKey: "instructor.ahmed",
    },
    {
      id: 2,
      titleKey: "video2.title",
      descriptionKey: "video2.description",
      thumbnail:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.2215",
      viewsKey: "views.18765",
      likesKey: "likes.987",
      categoryKey: "category.family",
      levelKey: "level.intermediate",
      instructorKey: "instructor.fatema",
    },
    {
      id: 3,
      titleKey: "video3.title",
      descriptionKey: "video3.description",
      thumbnail:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.1845",
      viewsKey: "views.32109",
      likesKey: "likes.1567",
      categoryKey: "category.property",
      levelKey: "level.intermediate",
      instructorKey: "instructor.rahim",
    },
    {
      id: 4,
      titleKey: "video4.title",
      descriptionKey: "video4.description",
      thumbnail:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.2820",
      viewsKey: "views.14893",
      likesKey: "likes.789",
      categoryKey: "category.criminal",
      levelKey: "level.advanced",
      instructorKey: "instructor.nasir",
    },
    {
      id: 5,
      titleKey: "video5.title",
      descriptionKey: "video5.description",
      thumbnail:
        "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.2510",
      viewsKey: "views.11234",
      likesKey: "likes.654",
      categoryKey: "category.business",
      levelKey: "level.advanced",
      instructorKey: "instructor.salma",
    },
    {
      id: 6,
      titleKey: "video6.title",
      descriptionKey: "video6.description",
      thumbnail:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
      durationKey: "duration.2035",
      viewsKey: "views.9876",
      likesKey: "likes.543",
      categoryKey: "category.cyber",
      levelKey: "level.beginner",
      instructorKey: "instructor.tania",
    },
  ];

  const categories = [
    "category.all",
    "category.constitutional",
    "category.family",
    "category.property",
    "category.criminal",
    "category.business",
    "category.cyber",
  ];

  const filteredVideos = videoSuggestions.filter((video) => {
    const matchesCategory =
      selectedCategory === "category.all" ||
      video.categoryKey === selectedCategory;
    const matchesSearch =
      t(video.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(video.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChatbotVideoSuggestion = () => {
    setIsChatbotOpen(true);
    // Auto-suggest videos based on user query
    setTimeout(() => {
      // This would be handled by the chatbot's message system
    }, 500);
  };

  const getLevelStyle = (levelKey: string) => {
    if (levelKey === "level.beginner") return "bg-green-100 text-green-800";
    if (levelKey === "level.intermediate")
      return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t("education.title")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("education.heroDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t("education.aiVideoSuggestion")}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("videos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t("education.seeAllVideos")}
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="h-10 w-10 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t("education.aiChatbotTitle")}
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              {t("education.aiChatbotDescription")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Video className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {t("education.smartVideoSearch")}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {t("education.topicSuggestion")}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <MessageCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {t("education.instantHelp")}
                </p>
              </div>
            </div>
            <button
              onClick={handleChatbotVideoSuggestion}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              {t("education.startChatbot")}
            </button>
          </div>
        </div>
      </section>

      {/* Video Suggestions Section */}
      <section id="videos" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("education.videoCollection")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("education.videoCollectionDesc")}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("education.searchVideos")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                >
                  {categories.map((categoryKey) => (
                    <option key={categoryKey} value={categoryKey}>
                      {t(categoryKey)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={t(video.titleKey)}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-blue-600 p-4 rounded-full hover:bg-blue-50 transition-colors">
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {t(video.durationKey)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getLevelStyle(video.levelKey)}`}
                    >
                      {t(video.levelKey)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {t(video.categoryKey)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {t(video.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {t(video.descriptionKey)}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{t(video.viewsKey)}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{t(video.likesKey)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{t(video.durationKey)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      <strong>{t("education.instructor")}</strong>{" "}
                      {t(video.instructorKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("education.noVideosFound")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("education.noVideosFoundDesc")}
              </p>
              <button
                onClick={() => setIsChatbotOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t("education.getAiHelp")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("education.wantToKnowMore")}
          </h2>
          <p className="text-xl mb-8">{t("education.ctaDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              {t("education.startChatbot")}
            </button>
            <button
              onClick={onAdvocateSuggestion}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t("education.findAdvocate")}
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onAdvocateSuggestion={onAdvocateSuggestion}
      />
    </div>
  );
};

export default EducationPage;
