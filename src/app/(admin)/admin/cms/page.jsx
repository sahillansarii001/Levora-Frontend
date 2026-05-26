'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Megaphone, X, FileEdit, Globe, BookOpen, Users, GraduationCap, Target, Save, Menu, Award, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function MegaCMS() {
  const [activeMenu, setActiveMenu] = useState('notices');
  const [data, setData] = useState({ notices: [], courses: [], faculty: [], materials: [], results: [] });
  const [siteContent, setSiteContent] = useState({});
  const [activePageEdit, setActivePageEdit] = useState('homepage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [selectedSectionForField, setSelectedSectionForField] = useState('');
  const [newFieldData, setNewFieldData] = useState({ name: '', value: '', isRich: false });
  const [newSectionData, setNewSectionData] = useState({ name: '' });
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchData = async (endpoint, key) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (json.success) setData(prev => ({ ...prev, [key]: json.data }));
    } catch (err) { console.error(`Failed to fetch ${key}`); }
  };

  const fetchSiteContent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content`);
      const json = await res.json();
      if (json.success) setSiteContent(json.data);
    } catch (err) { console.error('Failed to load content'); }
  };

  useEffect(() => {
    Promise.all([
      fetchData('notices', 'notices'),
      fetchData('courses', 'courses'),
      fetchData('faculty', 'faculty'),
      fetchData('materials', 'materials'),
      fetchData('results', 'results'),
      fetchSiteContent()
    ]).then(() => setLoading(false));
  }, []);

  const handleDelete = async (endpoint, id, key) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/${endpoint}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchData(endpoint, key);
    } catch (err) { console.error('Delete failed'); }
  };

  const handleEditClick = (id, endpoint) => {
    const item = data[endpoint].find(i => i._id === id);
    if (!item) return;
    setFormData(item);
    setEditId(id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e, endpoint, key) => {
    e.preventDefault();
    try {
      const url = editId ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/${endpoint}/${editId}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/${endpoint}`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        setFormData({});
        setEditId(null);
        fetchData(endpoint, key);
      } else {
        setError(json.message);
      }
    } catch (err) { setError('Network Error'); }
  };

  const saveWebsiteContent = async () => {
    try {
      const updates = Object.keys(siteContent)
        .filter(key => key.startsWith(activePageEdit))
        .map(key => {
          const parts = key.split('.');
          const page = parts[0];
          const section = parts.length > 2 ? parts[1] : 'general';
          return { key, value: siteContent[key], page, section };
        });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ page: activePageEdit, updates })
      });
      
      const json = await res.json();
      if (res.ok && json.success) {
        alert('Content saved successfully!');
      } else {
        alert('Server Error: ' + (json.message || 'Unknown error'));
      }
    } catch (err) { 
      alert('Save failed: ' + err.message); 
    }
  };

  const handleAddNewField = (e) => {
    e.preventDefault();
    if (!newFieldData.name) return;
    
    const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
    const nameSlug = slugify(newFieldData.name);
    
    const suffix = newFieldData.isRich ? '.content' : '';
    const fullKey = `${activePageEdit}.${selectedSectionForField}.${nameSlug}${suffix}`;

    let finalValue = newFieldData.value;
    if (newFieldData.isRich && !finalValue.startsWith('<')) {
      finalValue = `<p>${finalValue}</p>`;
    }

    setSiteContent(prev => ({ ...prev, [fullKey]: finalValue }));
    setIsAddFieldModalOpen(false);
    setNewFieldData({ name: '', value: '', isRich: false });
  };

  const handleAddTemplate = (template) => {
    const uniqueId = Math.floor(Math.random() * 1000);
    const sectionSlug = `${template.id}_${uniqueId}`;
    
    const newFields = {};
    template.fields.forEach(field => {
      const isRich = field === 'content' || field.startsWith('answer');
      const suffix = isRich ? '.content' : '';
      newFields[`${activePageEdit}.${sectionSlug}.${field}${suffix}`] = isRich ? '<p>Start typing here...</p>' : 'Edit this text...';
    });

    setSiteContent(prev => ({ ...prev, ...newFields }));
    setIsAddSectionModalOpen(false);
  };

  const handleDeleteSection = (sectionPrefix) => {
    if (!confirm('Are you sure you want to delete this entire section?')) return;
    setSiteContent(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        if (k.startsWith(`${activePageEdit}.${sectionPrefix}.`)) {
          delete next[k];
        }
      });
      return next;
    });
  };

  const renderTable = (headers, rows, onDel, onEdit) => (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-6 py-4">{h}</th>)}
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              {row.data.map((td, j) => <td key={j} className="px-6 py-4">{td}</td>)}
              <td className="px-6 py-4 text-right">
                <button onClick={() => onEdit(row.id)} className="text-slate-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-lg mr-2" title="Edit">
                  <FileEdit size={16} />
                </button>
                <button onClick={() => onDel(row.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="p-8 text-center text-slate-500">No data found.</div>}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar Split-Pane */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <div className="bg-navy p-6 rounded-2xl text-white shadow-sm">
          <h2 className="text-xl font-bold font-poppins mb-1">Mega CMS</h2>
          <p className="text-xs text-white/70">Centralized Data Hub</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 space-y-1">
          <MenuButton icon={<Megaphone size={18}/>} label="Notices" active={activeMenu==='notices'} onClick={()=>setActiveMenu('notices')} />
          <MenuButton icon={<Globe size={18}/>} label="Website Content" active={activeMenu==='website'} onClick={()=>setActiveMenu('website')} />
          <div className="my-2 border-t border-slate-100 pt-2"></div>
          <MenuButton icon={<BookOpen size={18}/>} label="Courses" active={activeMenu==='courses'} onClick={()=>setActiveMenu('courses')} />
          <MenuButton icon={<Users size={18}/>} label="Faculty" active={activeMenu==='faculty'} onClick={()=>setActiveMenu('faculty')} />
          <MenuButton icon={<GraduationCap size={18}/>} label="Study Materials" active={activeMenu==='materials'} onClick={()=>setActiveMenu('materials')} />
          <MenuButton icon={<Target size={18}/>} label="Results" active={activeMenu==='results'} onClick={()=>setActiveMenu('results')} />
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 space-y-6">
        
        {/* Header bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 capitalize font-poppins">{activeMenu.replace('website', 'Website Editor')}</h1>
          {activeMenu === 'website' ? (
             <div className="flex gap-3">
               <button onClick={() => setIsAddSectionModalOpen(true)} className="btn-outline inline-flex items-center text-sm px-5 bg-white">
                 <Plus size={18} className="mr-2" /> Add New Section
               </button>
               <button onClick={saveWebsiteContent} className="btn-primary inline-flex items-center text-sm px-5 bg-green-600 hover:bg-green-700">
                 <Save size={18} className="mr-2" /> Save Changes
               </button>
             </div>
          ) : (
             <button onClick={() => { setFormData({}); setEditId(null); setError(''); setIsModalOpen(true); }} className="btn-primary inline-flex items-center text-sm px-5">
               <Plus size={18} className="mr-2" /> Add New
             </button>
          )}
        </div>

        {/* Dynamic Content Views */}
        {loading ? <div className="p-8 text-center text-slate-500">Loading CMS Data...</div> : (
          <>
            {activeMenu === 'notices' && renderTable(
              ['Title', 'Type', 'Audience', 'Date'],
              data.notices.map(n => ({ id: n._id, data: [<strong key={n._id}>{n.title}</strong>, <span key={n._id+"1"} className="uppercase text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">{n.type}</span>, n.targetAudience, new Date(n.createdAt).toLocaleDateString()] })),
              (id) => handleDelete('notices', id, 'notices'),
              (id) => handleEditClick(id, 'notices')
            )}
            
            {activeMenu === 'courses' && renderTable(
              ['Code', 'Title', 'Category', 'Fee'],
              data.courses.map(c => ({ id: c._id, data: [c.courseCode, <strong>{c.title}</strong>, c.category, `₹${c.fee}`] })),
              (id) => handleDelete('courses', id, 'courses'),
              (id) => handleEditClick(id, 'courses')
            )}

            {activeMenu === 'faculty' && renderTable(
              ['Name', 'Subject', 'Email', 'Role'],
              data.faculty.map(f => ({ id: f._id, data: [<strong>{f.name}</strong>, f.subject, f.email, <span key={f._id} className="uppercase text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{f.role}</span>] })),
              (id) => handleDelete('faculty', id, 'faculty'),
              (id) => handleEditClick(id, 'faculty')
            )}

            {activeMenu === 'materials' && renderTable(
              ['Title', 'Category', 'Board', 'Premium'],
              data.materials.map(m => ({ id: m._id, data: [<strong>{m.title}</strong>, m.category, m.board, m.isPremium ? 'Yes' : 'No'] })),
              (id) => handleDelete('materials', id, 'materials'),
              (id) => handleEditClick(id, 'materials')
            )}

            {activeMenu === 'results' && renderTable(
              ['Student Name', 'Course', 'Rank', 'Score/Percentage'],
              data.results.map(r => ({ id: r._id, data: [<strong>{r.studentName}</strong>, r.course, `AIR ${r.rank || '-'}`, r.score ? `${r.score}` : `${r.percentage}%`] })),
              (id) => handleDelete('results', id, 'results'),
              (id) => handleEditClick(id, 'results')
            )}

            {activeMenu === 'website' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                 <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
                   {['homepage', 'about', 'contact'].map(p => (
                     <button key={p} onClick={()=>setActivePageEdit(p)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize whitespace-nowrap ${activePageEdit===p?'bg-navy text-white':'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{p.replace('-', ' ')}</button>
                   ))}
                 </div>
                 <div className="space-y-8">
                   {(() => {
                     // Group keys by section
                     const keys = Object.keys(siteContent).filter(k=>k.startsWith(activePageEdit));
                     if (keys.length === 0) {
                       return (
                         <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                           <Globe size={48} className="mx-auto text-slate-300 mb-4" />
                           <h3 className="text-xl font-bold text-slate-700 mb-2">No Content Yet</h3>
                           <p className="text-slate-500 mb-6 max-w-md mx-auto">This page currently has no dynamic content sections. Click the button below to choose a template and start building.</p>
                           <button onClick={() => setIsAddSectionModalOpen(true)} className="btn-primary inline-flex items-center text-sm px-6">
                             <Plus size={18} className="mr-2" /> Add First Section
                           </button>
                         </div>
                       );
                     }

                     const grouped = keys.reduce((acc, key) => {
                       const parts = key.split('.');
                       const section = parts.length > 2 ? parts[1] : 'General';
                       if (!acc[section]) acc[section] = [];
                       acc[section].push(key);
                       return acc;
                     }, {});

                     return Object.entries(grouped).map(([section, sectionKeys]) => {
                       const displaySection = section.replace(/_\d+$/, '').replace(/_/g, ' ');
                       return (
                         <div key={section} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group">
                           <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                             <h3 className="text-lg font-bold text-navy capitalize font-poppins">
                               {displaySection} Section
                             </h3>
                             <button onClick={() => handleDeleteSection(section)} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100" title="Delete Section">
                               <Trash2 size={18} />
                             </button>
                           </div>
                           <div className="p-6 space-y-6">
                           {sectionKeys.map(key => {
                             const isRich = key.includes('content') || (typeof siteContent[key] === 'string' && siteContent[key].includes('<p>'));
                             
                             // Get the friendly name (e.g. homepage.hero.title -> Title)
                             const parts = key.split('.');
                             const fieldName = parts.length > 2 ? parts.slice(2).join(' ') : parts[1];
                             
                             return (
                               <div key={key}>
                                 <label className="block text-sm font-bold text-slate-700 mb-2 capitalize">
                                   {fieldName.replace(/[-_]/g, ' ')}
                                 </label>
                                 
                                 {key.includes('image') ? (
                                    <div className="flex items-start gap-4">
                                      {siteContent[key] && (
                                        <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                          <img src={siteContent[key]} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                      )}
                                      <div className="flex-1 space-y-2">
                                        <input 
                                          type="text" 
                                          value={siteContent[key] || ''} 
                                          onChange={(e) => setSiteContent(p=>({...p, [key]: e.target.value}))} 
                                          className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-slate-50 focus:bg-white transition-colors"
                                          placeholder="https://..."
                                        />
                                        <div className="relative">
                                          <input 
                                            type="file" 
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={async (e) => {
                                              if(!e.target.files[0]) return;
                                              const formData = new FormData();
                                              formData.append('image', e.target.files[0]);
                                              try {
                                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/upload`, {
                                                  method: 'POST',
                                                  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                                                  body: formData
                                                });
                                                const data = await res.json();
                                                if(data.success) {
                                                  setSiteContent(p=>({...p, [key]: data.url}));
                                                } else alert(data.message);
                                              } catch (err) { alert('Upload failed'); }
                                            }}
                                          />
                                          <button type="button" className="text-sm px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors border border-slate-200">
                                            Or Upload Image from Computer
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : isRich ? (
                                     <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                       <ReactQuill theme="snow" value={siteContent[key] || ''} onChange={(v) => setSiteContent(p=>({...p, [key]: v}))} className="h-48 mb-10 border-none"/>
                                     </div>
                                  ) : (
                                     <textarea rows={key.includes('subtitle')?3:1} value={siteContent[key] || ''} onChange={(e) => setSiteContent(p=>({...p, [key]: e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy outline-none resize-y bg-slate-50 hover:bg-white transition-colors text-slate-700"/>
                                  )}
                               </div>
                             );
                           })}
                         </div>
                           <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                             <button onClick={() => { setSelectedSectionForField(section); setIsAddFieldModalOpen(true); }} className="text-sm font-medium text-navy hover:text-gold flex items-center transition-colors">
                               <Plus size={16} className="mr-1"/> Add Field to <span className="capitalize ml-1">{displaySection}</span>
                             </button>
                           </div>
                         </div>
                       );
                     });
                   })()}
                 </div>
               </div>
            )}
          </>
        )}
      </div>

      {/* Creation Modal (Dynamic based on activeMenu) */}
      {isModalOpen && activeMenu !== 'website' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-poppins text-slate-900 capitalize">{editId ? 'Edit' : 'Create'} {activeMenu.slice(0,-1)}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={(e) => handleSubmit(e, activeMenu, activeMenu)} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
              
              {/* Dynamic Form Fields based on Menu */}
              {activeMenu === 'notices' && (
                <>
                  <input type="text" required placeholder="Title" value={formData.title||''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"/>
                  <textarea required rows="4" placeholder="Content" value={formData.content||''} onChange={e=>setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"/>
                </>
              )}
              {activeMenu === 'courses' && (
                <>
                  <input type="text" required placeholder="Course Code (e.g. JEE-01)" value={formData.courseCode||''} onChange={e=>setFormData({...formData, courseCode: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" required placeholder="Title" value={formData.title||''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="number" required placeholder="Fee" value={formData.fee||''} onChange={e=>setFormData({...formData, fee: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                </>
              )}
              {activeMenu === 'faculty' && (
                <>
                  <input type="text" required placeholder="Name" value={formData.name||''} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="email" required placeholder="Email" value={formData.email||''} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="password" required placeholder="Password" value={formData.password||''} onChange={e=>setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" required placeholder="Subject" value={formData.subject||''} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" required placeholder="Phone" value={formData.phone||''} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                </>
              )}
              {activeMenu === 'materials' && (
                <>
                  <input type="text" required placeholder="Title" value={formData.title||''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" required placeholder="File URL (e.g. PDF link)" value={formData.fileUrl||''} onChange={e=>setFormData({...formData, fileUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <select required value={formData.category||'notes'} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="notes">Notes</option><option value="pyqs">PYQs</option><option value="assignment">Assignment</option>
                  </select>
                </>
              )}
              {activeMenu === 'results' && (
                <>
                  <input type="text" required placeholder="Student Name" value={formData.studentName||''} onChange={e=>setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" placeholder="Course" value={formData.course||''} onChange={e=>setFormData({...formData, course: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="number" placeholder="Rank (if applicable)" value={formData.rank||''} onChange={e=>setFormData({...formData, rank: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="number" placeholder="Percentage" value={formData.percentage||''} onChange={e=>setFormData({...formData, percentage: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                </>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="bg-gold text-navy px-6 py-2 rounded-lg font-bold shadow-sm">{editId ? 'Update' : 'Save'} {activeMenu.slice(0,-1)}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Field Modal */}
      {isAddFieldModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-poppins text-slate-900">
                Add Field to <span className="capitalize">{selectedSectionForField.replace(/_\d+$/, '').replace(/_/g, ' ')}</span>
              </h2>
              <button onClick={() => setIsAddFieldModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddNewField} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Field Name</label>
                <input type="text" required placeholder="e.g. Title, Description, Button Text" value={newFieldData.name} onChange={e=>setNewFieldData({...newFieldData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"/>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" checked={!newFieldData.isRich} onChange={()=>setNewFieldData({...newFieldData, isRich: false})} className="text-gold focus:ring-gold"/> Plain Text
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" checked={newFieldData.isRich} onChange={()=>setNewFieldData({...newFieldData, isRich: true})} className="text-gold focus:ring-gold"/> Rich Text (Formatting)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Content</label>
                <textarea required rows="4" placeholder="Enter your text here..." value={newFieldData.value} onChange={e=>setNewFieldData({...newFieldData, value: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"/>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddFieldModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="bg-gold text-navy px-6 py-2 rounded-lg font-bold shadow-sm">Add Field</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Section Modal (Template Gallery) */}
      {isAddSectionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold font-poppins text-slate-900">Add Content Block</h2>
                <p className="text-sm text-slate-500 mt-1">Choose a template to quickly add a new section to the {activePageEdit} page.</p>
              </div>
              <button onClick={() => setIsAddSectionModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm"><X size={24} /></button>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto bg-slate-50/30">
              {[
                { id: 'hero', name: 'Hero Banner', icon: <Layout className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Large header banner with title and subtitle.', fields: ['title', 'subtitle', 'bg_image'] },
                { id: 'text', name: 'Rich Article', icon: <BookOpen className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'A full-width text editor for articles and paragraphs.', fields: ['title', 'content'] },
                { id: 'stats', name: 'Statistics', icon: <Target className="text-purple-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Display key numbers or achievements visually.', fields: ['stat_1_title', 'stat_1_value', 'stat_2_title', 'stat_2_value'] },
                { id: 'faq', name: 'FAQ Block', icon: <Users className="text-orange-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'A list of questions and detailed answers.', fields: ['question', 'answer'] },
                { id: 'programs', name: 'Programs Widget', icon: <BookOpen className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays the school and JEE/NEET programs', fields: [] },
                { id: 'why', name: 'Why Levora Widget', icon: <Target className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Highlights the key features of the academy', fields: [] },
                { id: 'notes', name: 'Notes System Widget', icon: <FileEdit className="text-blue-400 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Highlights the structured study materials', fields: [] },
                { id: 'faculty_showcase', name: 'Faculty Widget', icon: <Users className="text-purple-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays top faculty members from database', fields: [] },
                { id: 'results_showcase', name: 'Results Widget', icon: <Award className="text-orange-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays student results from database', fields: [] },
                { id: 'coding', name: 'Coding Courses Widget', icon: <Globe className="text-cyan-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays the Levora Coder courses', fields: [] },
                { id: 'testimonials', name: 'Testimonials Widget', icon: <MessageSquare className="text-pink-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Student testimonials carousel', fields: [] },
                
                { id: 'about_vision', name: 'Vision & Mission', icon: <Target className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'About page Vision and Mission section.', fields: ['vision_title', 'vision_content', 'mission_title', 'mission_content'] },
                { id: 'about_founder', name: 'Founder Message', icon: <Users className="text-purple-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'About page Founder message and photo.', fields: ['founder_title', 'founder_message', 'founder_name', 'founder_role', 'founder_image'] },
                { id: 'contact_info', name: 'Contact Info', icon: <Phone className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Contact page Information cards.', fields: ['title', 'subtitle', 'address', 'phone', 'email'] },
                { id: 'contact_form', name: 'Contact Form', icon: <Mail className="text-gold mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Contact page inquiry form.', fields: ['form_title'] },
                { id: 'courses_grid', name: 'Courses Grid', icon: <BookOpen className="text-sky mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic filterable courses grid.', fields: ['title', 'subtitle'] },
                { id: 'faculty_grid', name: 'Faculty Grid', icon: <Users className="text-navy mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic faculty grid.', fields: ['title', 'subtitle'] },
                { id: 'results_grid', name: 'Results Grid', icon: <Target className="text-gold mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic student results grid.', fields: ['title', 'subtitle'] },
                { id: 'materials_grid', name: 'Materials Grid', icon: <FileEdit className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic study materials downloads grid.', fields: ['title', 'subtitle'] },
                
                { id: 'custom', name: 'Blank Section', icon: <Plus className="text-slate-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Start completely from scratch and add fields manually.', fields: ['title'] },
              ].map(tpl => (
                <button 
                  key={tpl.id} 
                  onClick={() => handleAddTemplate(tpl)} 
                  className="text-left bg-white border border-slate-200 p-6 rounded-2xl hover:border-gold hover:shadow-lg transition-all group flex flex-col items-start relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    {tpl.icon}
                    <h4 className="font-bold text-lg mb-2 text-slate-800">{tpl.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{tpl.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function MenuButton({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium ${active ? 'bg-navy text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-navy'}`}>
      <span className="mr-3 opacity-90">{icon}</span>
      {label}
    </button>
  );
}
