import React, { useState } from 'react';
import axios from 'axios';
import { X, Briefcase, FileText, CheckCircle } from 'lucide-react';

interface HireModalProps {
    isOpen: boolean;
    onClose: () => void;
    advocate: any;
}

const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose, advocate }) => {
    const [caseDetails, setCaseDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !advocate) return null;

    const handleHire = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userInfoStr = localStorage.getItem('userInfo');
            if (!userInfoStr) {
                window.location.hash = '#login';
                return;
            }
            const userInfo = JSON.parse(userInfoStr);
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            await axios.post('http://localhost:5000/api/hirings', {
                advocateId: advocate.id, // Make sure ID matches the DB _id
                caseDetails
            }, config);
            
            setSuccess(true);
            setTimeout(() => {
                onClose();
                window.location.hash = '#user-dashboard'; // Redirect to see job
            }, 2000);
        } catch (err: any) {
            console.error("Failed to hire advocate", err);
            setError(err.response?.data?.message || 'Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-blue-600 p-6 text-white relative flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold mb-1">Hire Legal Representation</h2>
                        <p className="text-blue-100 text-sm">Submit your case details securely.</p>
                    </div>
                    <button onClick={onClose} className="text-white hover:bg-blue-700 p-1 rounded-full transition-colors absolute top-4 right-4 focus:outline-none">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                            <p className="text-gray-600">The advocate will review your case shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleHire}>
                            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <img src={advocate.image} alt={advocate.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{advocate.name}</h4>
                                    <p className="text-blue-600 text-sm font-medium">{advocate.specialization}</p>
                                </div>
                            </div>
                            
                            {error && <div className="text-red-500 text-center text-sm mb-4 bg-red-50 p-2 rounded">{error}</div>}

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <FileText className="w-4 h-4 mr-2" /> Describe Your Legal Issue
                                </label>
                                <textarea 
                                    required
                                    rows={4}
                                    placeholder="Please provide details about your case, important dates, and specific help required..."
                                    className="w-full border-gray-300 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-gray-700"
                                    value={caseDetails}
                                    onChange={e => setCaseDetails(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <div className="mb-6 bg-blue-50 p-4 rounded-xl flex items-start">
                                <Briefcase className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <span className="font-bold block mb-1">Important Note:</span>
                                    Submission of this form constitutes a request for representation. The advocate's official fee (if applicable) will be quoted or charged upon reviewing your case details.
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button type="button" onClick={onClose} className="w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                                    {loading ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HireModal;