import React, { useState } from 'react';
import axios from 'axios';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || 'your_imgbb_api_key'; // Setup in .env

const Register = () => {
    const [role, setRole] = useState<'user' | 'advocate' | 'student'>('user');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        location: '',
        gender: '',
        // Advocate specific
        workplace: '',
        details: '',
        barCouncilId: '',
        experience: '',
        expertise: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadImageToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
        return res.data.data.url;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let imageUrl = '';
            if (imageFile) {
                imageUrl = await uploadImageToImgBB(imageFile);
            }

            const payload = {
                ...formData,
                role,
                image: imageUrl,
                experience: formData.experience ? Number(formData.experience) : undefined,
                expertise: formData.expertise ? formData.expertise.split(',').map(s => s.trim()) : undefined,
            };

            const { data } = await axios.post('http://localhost:5000/api/auth/register', payload);

            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.hash = '#home';
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Register Account
                </h2>

                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-8">
                    {(['user', 'advocate', 'student'] as const).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`px-6 py-2 rounded-md transition-colors ${role === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* General Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input type="text" name="name" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                            <input type="email" name="email" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                            <input type="text" name="phone" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password *</label>
                            <input type="password" name="password" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" name="location" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select name="gender" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>

                        {/* Advocate Specific Fields */}
                        {role === 'advocate' && (
                            <>
                                <div className="md:col-span-2 border-t pt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Workplace *</label>
                                    <input type="text" name="workplace" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bar Council ID *</label>
                                    <input type="text" name="barCouncilId" required onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Experience (Years) *</label>
                                    <input type="number" name="experience" required min="0" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Areas of Expertise (Comma separated) *</label>
                                    <input type="text" name="expertise" required placeholder="Criminal Law, Family Law..." onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Detailed About Me</label>
                                    <textarea name="details" rows={4} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                        >
                            {loading ? 'Registering...' : 'Complete Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
