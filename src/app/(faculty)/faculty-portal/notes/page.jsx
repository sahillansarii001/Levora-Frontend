'use client';
import { UploadCloud, File, Trash2, Download, Search, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UploadNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    className: '',
    subject: '',
    lesson: '',
    topic: '',
    category: 'notes'
  });
  const [file, setFile] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/materials`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setNotes(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess('');
    
    const data = new FormData();
    data.append('file', file);
    data.append('title', formData.title || file.name);
    data.append('className', formData.className);
    data.append('subject', formData.subject);
    data.append('lesson', formData.lesson);
    data.append('topic', formData.topic);
    data.append('category', formData.category);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/materials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setSuccess('File uploaded successfully!');
        setFormData({ title: '', className: '', subject: '', lesson: '', topic: '', category: 'notes' });
        setFile(null);
        fetchNotes();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Upload Notes</h1>
            <p className="text-sm text-slate-500 mt-1">Upload and manage study materials for your classes.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Area */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Upload New File</h3>
              
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}
              {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium">{success}</div>}
              
              <form onSubmit={handleSubmit}>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-[var(--color-navy)] transition-colors cursor-pointer group mb-6 relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="bg-sky/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-sky" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">{file ? file.name : 'Click to upload or drag and drop'}</p>
                  <p className="text-xs text-slate-500">PDF, DOCX, PPTX, or ZIP (max. 50MB)</p>
                </label>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
                    <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Chapter 1 Notes" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class</label>
                    <select required name="className" value={formData.className} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] transition-all">
                      <option value="" disabled>Select Class</option>
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <select required name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] transition-all">
                      <option value="" disabled>Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Social Studies">Social Studies</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lesson</label>
                      <input type="text" name="lesson" value={formData.lesson} onChange={handleInputChange} placeholder="Optional" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic</label>
                      <input type="text" name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Optional" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] transition-all" />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={uploading} className="w-full mt-2 flex justify-center items-center gap-2 bg-[var(--color-navy)] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                    {uploading ? 'Uploading...' : <><Plus size={18} /> Upload Note</>}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Files List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900">Recent Uploads</h3>
              </div>
              
              <div className="divide-y divide-slate-100">
                {loading ? (
                  <div className="p-12 text-center text-slate-500 font-medium">Loading notes...</div>
                ) : notes.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-medium">No notes uploaded yet.</div>
                ) : (
                  notes.map((note) => (
                    <div key={note._id || note.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                          <File size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{note.title || note.originalFilename || 'Untitled'}</h4>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                            <span>{note.className || 'Class'}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{note.subject || 'Subject'}</span>
                            {note.lesson && (
                              <>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{note.lesson}</span>
                              </>
                            )}
                            {note.topic && (
                              <>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{note.topic}</span>
                              </>
                            )}
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}</span>
                          </div>
                          {note.uploadedBy && (
                            <div className="mt-2 text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md inline-block">
                              Uploaded by: {note.uploadedBy}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-sky hover:bg-sky/10 rounded-lg transition-colors" title="Download">
                          <Download size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
