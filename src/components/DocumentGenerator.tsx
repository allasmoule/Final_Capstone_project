import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Save, X, Printer, CheckCircle } from 'lucide-react';

interface DocumentGeneratorProps {
    application?: any;
    onClose: () => void;
    onSaveSuccess?: (updatedApp: any) => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ application, onClose, onSaveSuccess }) => {
    const [title, setTitle] = useState(application ? `${application.disputeType.replace('dispute.', '').toUpperCase()} SETTLEMENT AGREEMENT` : 'GENERAL LEGAL DOCUMENT');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (application?.legalDocument) {
            setTitle(application.legalDocument.title);
            setContent(application.legalDocument.content);
        } else if (application) {
            // Generate boilerplate based on application data
            const date = new Date().toLocaleDateString('en-GB');
            const boilerplate = `This Settlement Agreement is made on this ${date}, by and between:
            
Party 1: ${application.party1Name} 
Email: ${application.party1Email}
Phone: ${application.party1Phone}

AND

Party 2: ${application.party2Name}
Email: ${application.party2Email}
Phone: ${application.party2Phone}

1. BACKGROUND
The parties are involved in a dispute regarding ${application.disputeType.replace('dispute.', '')} matters. Specifically: "${application.description}".
The parties desire to settle this dispute amicably through the Somjhota platform.

2. TERMS OF AGREEMENT
[Enter specific terms and conditions here...]

3. CONFIDENTIALITY
The parties agree that the terms of this settlement shall remain confidential.

4. BINDING EFFECT
This Agreement is legally binding and entered into voluntarily by both parties.

IN WITNESS WHEREOF, the parties hereby execute this Agreement.

______________________                  ______________________
${application.party1Name}                            ${application.party2Name}
Date: ________________                  Date: ________________
`;
            setContent(boilerplate);
        } else {
            // General boilerplate
            const date = new Date().toLocaleDateString('en-GB');
            const boilerplate = `This Agreement is made on this ${date}, by and between:
            
Party 1: [Name] 
Email: [Email]
Phone: [Phone]

AND

Party 2: [Name]
Email: [Email]
Phone: [Phone]

1. BACKGROUND
[State the background or purpose of the agreement...]

2. TERMS OF AGREEMENT
[Enter specific terms and conditions here...]

3. CONFIDENTIALITY
The parties agree that the terms of this settlement shall remain confidential.

4. BINDING EFFECT
This Agreement is legally binding and entered into voluntarily by both parties.

IN WITNESS WHEREOF, the parties hereby execute this Agreement.

______________________                  ______________________
[Party 1 Name]                          [Party 2 Name]
Date: ________________                  Date: ________________
`;
            setContent(boilerplate);
        }
    }, [application]);

    const handleSave = async () => {
        if (!application) return;
        setIsSaving(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
            
            const { data } = await axios.put(`/api/somjhota/${application._id}/document`, {
                title,
                content
            }, config);
            
            setSaveSuccess(true);
            setTimeout(() => {
                if (onSaveSuccess) onSaveSuccess(data);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Failed to save document', error);
            alert('Failed to save the legal document.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('printable-document');
        if (printContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // Reload to restore React state cleanly
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-800 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-800/50 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-200" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Legal Document Creator</h2>
                            <p className="text-blue-200 text-sm opacity-80">Draft and save binding agreements</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50">
                    {/* Editor Panel */}
                    <div className="md:w-1/2 p-6 border-r border-gray-200 flex flex-col gap-4 overflow-y-auto">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Document Title</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Agreement Content</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm resize-none"
                                placeholder="Draft your legal terms here..."
                            />
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="md:w-1/2 bg-gray-100 p-8 overflow-y-auto flex justify-center">
                        <div 
                            id="printable-document" 
                            className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-lg rounded-sm origin-top"
                            style={{ fontFamily: '"Times New Roman", Times, serif' }}
                        >
                            <h1 className="text-2xl font-bold text-center mb-8 underline uppercase">{title}</h1>
                            <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-justify">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="bg-white border-t border-gray-200 p-4 px-6 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {saveSuccess && <span className="flex items-center text-green-600 font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Document saved successfully!</span>}
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Printer className="w-4 h-4" /> Print / PDF
                        </button>
                        {application && (
                            <button 
                                onClick={handleSave}
                                disabled={isSaving || saveSuccess}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 transition-colors shadow-md hover:shadow-lg"
                            >
                                {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save Document</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentGenerator;
