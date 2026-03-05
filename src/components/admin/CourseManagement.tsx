import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, X, Check, Search, Plus } from 'lucide-react';

const CourseManagement = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<any | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        thumbnail: '',
        price: 0,
        category: 'General',
        level: 'Beginner',
        videos: [] as any[]
    });

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/courses');
            setCourses(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`http://localhost:5000/api/courses/${id}`, config);
            setCourses(courses.filter(c => c._id !== id));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to delete course');
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            if (editingCourse) {
                await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, formData, config);
            } else {
                await axios.post(`http://localhost:5000/api/courses`, formData, config);
            }

            setIsFormOpen(false);
            setEditingCourse(null);
            fetchCourses();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to save course');
        }
    };

    const openEditForm = async (course: any) => {
        // Need to fetch individual course to get videos if they were locked
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`http://localhost:5000/api/courses/${course._id}`, config);

            setEditingCourse(data);
            setFormData({
                title: data.title,
                description: data.description,
                instructor: data.instructor,
                thumbnail: data.thumbnail,
                price: data.price,
                category: data.category || 'General',
                level: data.level || 'Beginner',
                videos: data.videos || []
            });
            setIsFormOpen(true);
        } catch (err: any) {
            alert('Failed to fetch full course details');
        }
    };

    const openCreateForm = () => {
        setEditingCourse(null);
        setFormData({
            title: '', description: '', instructor: '', thumbnail: '', price: 0, category: 'General', level: 'Beginner', videos: []
        });
        setIsFormOpen(true);
    };

    const addVideo = () => {
        setFormData({ ...formData, videos: [...formData.videos, { title: '', videoUrl: '', duration: '' }] });
    };

    const updateVideo = (index: number, field: string, value: string) => {
        const newVideos = [...formData.videos];
        newVideos[index][field] = value;
        setFormData({ ...formData, videos: newVideos });
    };

    const removeVideo = (index: number) => {
        const newVideos = [...formData.videos];
        newVideos.splice(index, 1);
        setFormData({ ...formData, videos: newVideos });
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center p-8">Loading Courses...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button onClick={openCreateForm} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                    <Plus className="w-5 h-5 mr-2" /> Add Course
                </button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredCourses.map((course) => (
                            <tr key={course._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded object-cover" src={course.thumbnail} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            <div className="text-sm text-gray-500">{course.instructor}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category} ({course.level})</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${course.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openEditForm(course)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="w-5 h-5 inline" /></button>
                                    <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5 inline" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'Create Course'}</h2>
                            <button onClick={() => setIsFormOpen(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                    <input type="text" value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                                    <input type="text" value={formData.thumbnail} onChange={e => setFormData({ ...formData, thumbnail: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required min="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Level</label>
                                    <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-lg">Course Videos</h3>
                                    <button type="button" onClick={addVideo} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Add Video Module</button>
                                </div>
                                {formData.videos.map((vid, idx) => (
                                    <div key={idx} className="flex gap-2 items-center mb-2 bg-gray-50 p-2 rounded">
                                        <input type="text" placeholder="Title" value={vid.title} onChange={e => updateVideo(idx, 'title', e.target.value)} className="flex-1 border border-gray-300 rounded p-1" required />
                                        <input type="text" placeholder="Video URL / ID" value={vid.videoUrl} onChange={e => updateVideo(idx, 'videoUrl', e.target.value)} className="flex-1 border border-gray-300 rounded p-1" required />
                                        <input type="text" placeholder="Duration (e.g., 10:30)" value={vid.duration} onChange={e => updateVideo(idx, 'duration', e.target.value)} className="w-32 border border-gray-300 rounded p-1" />
                                        <button type="button" onClick={() => removeVideo(idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                ))}
                                {formData.videos.length === 0 && <p className="text-sm text-gray-500">No videos added yet.</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"><Check className="w-4 h-4 mr-2" /> Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;
