import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Video,
  Search,
  Filter,
} from "lucide-react";
import Chatbot from "./Chatbot";
import CourseCheckout from "./CourseCheckout";
import { useLanguage } from "../context/LanguageContext";

interface EducationPageProps {
  onAdvocateSuggestion?: () => void;
}

const EducationPage: React.FC<EducationPageProps> = ({
  onAdvocateSuggestion,
}) => {
  const { t } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [courses, setCourses] = useState<any[]>([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [checkoutCourse, setCheckoutCourse] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/courses');
        setCourses(data);

        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo.token) {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const ordersRes = await axios.get('http://localhost:5000/api/orders/myorders', config);
          const ids = new Set<string>();
          ordersRes.data.forEach((order: any) => {
            if (order.course) {
              ids.add(order.course._id || order.course);
            }
          });
          setPurchasedCourseIds(ids);
        }
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [checkoutCourse]); // Refresh if checkout finishes

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))].filter(Boolean);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const getLevelStyle = (level: string) => {
    if (level === "Beginner") return "bg-green-100 text-green-800";
    if (level === "Intermediate") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleCourseAction = (course: any) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (!userInfo.token) {
      window.location.hash = '#login';
      return;
    }

    if (purchasedCourseIds.has(course._id) || userInfo.role === 'admin') {
      // Go to course player
      window.location.hash = `#student-dashboard`; // Assuming we watch from dashboard for now
    } else {
      setCheckoutCourse(course);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t("education.title") || 'Legal Education Courses'}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("education.heroDescription") || 'Enhance your legal knowledge with our expertly crafted video courses.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t("education.aiVideoSuggestion") || 'AI Video Suggestion'}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Courses
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
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
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-xl font-semibold">Loading courses...</div>
          ) : (
            <>
              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => {
                  const isPurchased = purchasedCourseIds.has(course._id);
                  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                  const hasAccess = isPurchased || userInfo.role === 'admin';

                  return (
                    <div
                      key={course._id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelStyle(course.level || 'Beginner')}`}>
                            {course.level || 'Beginner'}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm text-blue-600 font-medium">
                            {course.category || 'General'}
                          </span>
                          <span className="font-bold text-lg text-gray-900">${course.price}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {course.description}
                        </p>

                        <div className="border-t pt-4 mb-4">
                          <p className="text-sm text-gray-600">
                            <strong>Instructor:</strong> {course.instructor}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCourseAction(course)}
                          className={`w-full py-3 rounded-lg font-bold transition-colors ${hasAccess
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                          {hasAccess ? 'Access Course' : 'Buy Now'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* No Results */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Courses Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("education.wantToKnowMore") || 'Want to know more?'}
          </h2>
          <p className="text-xl mb-8">{t("education.ctaDescription") || 'Ask our AI chatbot for guidance.'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Start Chatbot
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

      {/* Checkout Modal */}
      {checkoutCourse && (
        <CourseCheckout
          course={checkoutCourse}
          onClose={() => setCheckoutCourse(null)}
          onSuccess={() => {
            setCheckoutCourse(null);
            alert("Purchase successful! You can now access the course.");
            // will trigger re-render and re-fetch purchases
          }}
        />
      )}
    </div>
  );
};

export default EducationPage;
