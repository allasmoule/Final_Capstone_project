import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const CoursePlayer = () => {
    const courseId = window.location.hash.split('/')[1] || '';
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/courses/${courseId}`, config);

                if (data.isLocked) {
                    setError('You do not have access to this course. Please purchase it first.');
                } else {
                    setCourse(data);
                }
            } catch (err: any) {
                setError('Failed to load course details');
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    const handleBack = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo.role === 'admin') window.location.hash = '#admin';
        else window.location.hash = '#student-dashboard';
    };

    if (loading) return <div className="text-center py-20 text-xl font-medium">Loading Course...</div>;

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-red-50 text-red-600 p-6 rounded-lg shadow max-w-md w-full text-center">
                <p className="font-bold text-lg mb-4">{error}</p>
                <button onClick={handleBack} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Back to Dashboard</button>
            </div>
        </div>
    );

    if (!course) return null;

    const activeVideo = course.videos ? course.videos[activeVideoIndex] : null;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="font-bold text-lg md:text-xl truncate">{course.title}</h1>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Main Player Area */}
                <div className="flex-1 flex flex-col bg-black">
                    {activeVideo ? (
                        <div className="relative w-full h-0 pb-[56.25%] flex-1">
                            {/* Simple iframe for YouTube/Vimeo URLs. If raw mp4, use video tag */}
                            {activeVideo.videoUrl.includes('youtube') || activeVideo.videoUrl.includes('youtu.be') || activeVideo.videoUrl.includes('vimeo') ? (
                                <iframe
                                    src={activeVideo.videoUrl}
                                    title={activeVideo.title}
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    src={activeVideo.videoUrl}
                                    controls
                                    className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center border border-gray-800 m-8 rounded-xl bg-gray-900">
                            <p className="text-gray-500">No videos available for this course.</p>
                        </div>
                    )}

                    {activeVideo && (
                        <div className="p-6 bg-gray-900 border-t border-gray-800">
                            <h2 className="text-2xl font-bold mb-2">{activeVideo.title}</h2>
                            <p className="text-gray-400">Duration: {activeVideo.duration || 'Unknown'}</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Playlist */}
                <div className="lg:w-96 bg-gray-800 border-l border-gray-700 flex flex-col h-[50vh] lg:h-auto overflow-y-auto">
                    <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
                        <h3 className="font-bold text-lg">Course Content</h3>
                        <p className="text-sm text-gray-400">{course.videos?.length || 0} videos</p>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {course.videos?.map((vid: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveVideoIndex(idx)}
                                className={`w-full flex items-start gap-3 p-4 border-b border-gray-700/50 hover:bg-gray-700 transition-colors text-left ${activeVideoIndex === idx ? 'bg-gray-700 border-l-4 border-l-blue-500' : ''}`}
                            >
                                <PlayCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${activeVideoIndex === idx ? 'text-blue-500' : 'text-gray-400'}`} />
                                <div>
                                    <p className={`font-medium line-clamp-2 ${activeVideoIndex === idx ? 'text-white' : 'text-gray-300'}`}>
                                        {idx + 1}. {vid.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{vid.duration}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
