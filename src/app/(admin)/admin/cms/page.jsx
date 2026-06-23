'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Megaphone, X, FileEdit, Globe, BookOpen, Users, GraduationCap, Target, Save, Menu, Award, MessageSquare, Layout, Phone, Mail, GripVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function MegaCMS() {
  const [activeMenu, setActiveMenu] = useState('notices');
  const [data, setData] = useState({ notices: [], courses: [], faculty: [], materials: [], results: [], testimonials: [] });
  const [siteContent, setSiteContent] = useState({});
  const [activePageEdit, setActivePageEdit] = useState('homepage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [selectedSectionForField, setSelectedSectionForField] = useState('');
  const [newFieldData, setNewFieldData] = useState({ name: '', value: '', type: 'plain' });
  const [newSectionData, setNewSectionData] = useState({ name: '' });
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleSort = (sectionsArr) => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const _sectionsArr = [...sectionsArr];
    const draggedItemContent = _sectionsArr.splice(dragItem.current, 1)[0];
    _sectionsArr.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    
    setSiteContent(prev => {
       const next = { ...prev };
       const pageKeys = Object.keys(next).filter(k => k.startsWith(activePageEdit));
       
       const savedValues = {};
       pageKeys.forEach(k => {
          savedValues[k] = next[k];
          delete next[k];
       });
       
       _sectionsArr.forEach(section => {
          pageKeys.filter(k => {
             const parts = k.split('.');
             const s = parts.length > 2 ? parts[1] : 'General';
             return s === section;
          }).forEach(k => {
             next[k] = savedValues[k];
          });
       });
       
       return next;
    });
  };

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
      fetchData('testimonials', 'testimonials'),
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
    const item = data[endpoint].find(i => i.id === id);
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
      // Determine the current sequence of sections
      const keys = Object.keys(siteContent).filter(k => k.startsWith(activePageEdit) && !k.endsWith('._layout'));
      const grouped = keys.reduce((acc, key) => {
        const parts = key.split('.');
        const section = parts.length > 2 ? parts[1] : 'general';
        if (!acc[section]) acc[section] = [];
        acc[section].push(key);
        return acc;
      }, {});
      const layoutOrder = Object.keys(grouped).join(',');

      const updates = Object.keys(siteContent)
        .filter(key => key.startsWith(activePageEdit) && !key.endsWith('._layout'))
        .map(key => {
          const parts = key.split('.');
          const page = parts[0];
          const section = parts.length > 2 ? parts[1] : 'general';
          return { key, value: siteContent[key], page, section };
        });

      // Append layout definition
      updates.push({
        key: `${activePageEdit}._layout`,
        value: layoutOrder,
        page: activePageEdit,
        section: 'system'
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ page: activePageEdit, updates })
      });
      
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success('Content saved successfully!');
      } else {
        toast.error('Server Error: ' + (json.message || 'Unknown error'));
      }
    } catch (err) { 
      toast.error('Save failed: ' + err.message); 
    }
  };

  const handleAddNewField = (e) => {
    e.preventDefault();
    if (!newFieldData.name) return;
    
    const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
    const nameSlug = slugify(newFieldData.name);
    
    const isRich = newFieldData.type === 'rich';
    const isImage = newFieldData.type === 'image';
    const suffix = isRich ? '.content' : (isImage ? '_image' : '');
    const fullKey = `${activePageEdit}.${selectedSectionForField}.${nameSlug}${suffix}`;

    let finalValue = newFieldData.value;
    if (isRich && !finalValue.startsWith('<')) {
      finalValue = `<p>${finalValue}</p>`;
    }

    setSiteContent(prev => ({ ...prev, [fullKey]: finalValue }));
    setIsAddFieldModalOpen(false);
    setNewFieldData({ name: '', value: '', type: 'plain' });
  };

  const handleAddTemplate = (template) => {
    const uniqueId = Math.floor(Math.random() * 1000);
    const sectionSlug = `${template.id}_${uniqueId}`;
    
    const newFields = {};
    template.fields.forEach(field => {
      let value = '';
      const isRich = field === 'content' || field.startsWith('answer');
      const suffix = isRich ? '.content' : '';

      if (template.id === 'seo_content' && isRich) {
        value = `<p>Levora Academy is a great place for students to learn and grow. We help you build a bright future with our easy classes. Our teachers are very kind and care about your success. We want every student to do their very best in school.</p><p>You can study many fun subjects here. We have courses for math, science, and computer coding. We make learning easy to understand. When you join our school, you get all the help you need to get good grades. We give you great books and simple notes to study at home.</p><p>Our school has helped many students achieve their dreams. We focus on clear teaching and lots of practice. We believe that hard work pays off. We are here to guide you every step of the way. Choosing Levora Academy is a smart choice for your education and your life.</p>`;
      } else if (field === 'title') {
        value = `Premium ${template.name}`;
      } else if (field === 'subtitle') {
        value = `Experience the best ${template.name.toLowerCase()} with our world-class facilities and expert guidance.`;
      } else if (field === 'bg_image' || field.includes('image')) {
        value = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
      } else if (isRich) {
        value = `<p>Write your detailed ${template.name.toLowerCase()} content here...</p>`;
      } else {
        value = `New ${field}`;
      }
      
      newFields[`${activePageEdit}.${sectionSlug}.${field}${suffix}`] = value;
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
              {row.data.map((td, j) => (
                <td key={j} className={`px-6 py-4 ${j === 0 ? 'whitespace-nowrap font-medium text-slate-900' : ''}`}>
                  {td}
                </td>
              ))}
              <td className="px-6 py-4">
                <div className="flex justify-end items-center gap-2">
                  <button onClick={() => onEdit(row.id)} className="text-slate-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-lg" title="Edit">
                    <FileEdit size={16} />
                  </button>
                  <button onClick={() => onDel(row.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
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
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2 md:sticky md:top-28 h-fit">
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
      <div className="flex-1 min-w-0 space-y-6">
        
        {/* Header bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 capitalize font-poppins">{activeMenu.replace('website', 'Website Editor')}</h1>
          {activeMenu === 'website' ? (
             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
               <button onClick={() => setIsAddSectionModalOpen(true)} className="btn-outline inline-flex items-center justify-center text-sm px-5 bg-white whitespace-nowrap">
                 <Plus size={18} className="mr-2" /> Add New Section
               </button>
               <button onClick={saveWebsiteContent} className="btn-primary inline-flex items-center justify-center text-sm px-5 bg-green-600 hover:bg-green-700 whitespace-nowrap">
                 <Save size={18} className="mr-2" /> Save Changes
               </button>
             </div>
          ) : (
             <button onClick={() => { setFormData({}); setEditId(null); setError(''); setIsModalOpen(true); }} className="btn-primary inline-flex items-center justify-center text-sm px-5 w-full md:w-auto whitespace-nowrap">
               <Plus size={18} className="mr-2 shrink-0" /> Add New
             </button>
          )}
        </div>

        {/* Dynamic Content Views */}
        {loading ? <div className="p-8 text-center text-slate-500">Loading CMS Data...</div> : (
          <>
            {activeMenu === 'notices' && renderTable(
              ['Title', 'Type', 'Audience', 'Date'],
              data.notices.map(n => ({ id: n.id, data: [<strong key={n.id}>{n.title}</strong>, <span key={n.id+"1"} className="uppercase text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">{n.type}</span>, n.targetAudience, new Date(n.createdAt).toLocaleDateString()] })),
              (id) => handleDelete('notices', id, 'notices'),
              (id) => handleEditClick(id, 'notices')
            )}
            
            {activeMenu === 'courses' && renderTable(
              ['Code', 'Title', 'Category', 'Fee'],
              data.courses.map(c => ({ id: c.id, data: [c.courseCode, <strong>{c.title}</strong>, c.category, `₹${c.fee}`] })),
              (id) => handleDelete('courses', id, 'courses'),
              (id) => handleEditClick(id, 'courses')
            )}

            {activeMenu === 'faculty' && renderTable(
              ['Name', 'Subject', 'Email', 'Role'],
              data.faculty.map(f => ({ id: f.id, data: [<strong>{f.name}</strong>, f.subject, f.email, <span key={f.id} className="uppercase text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{f.role}</span>] })),
              (id) => handleDelete('faculty', id, 'faculty'),
              (id) => handleEditClick(id, 'faculty')
            )}

            {activeMenu === 'materials' && renderTable(
              ['Title', 'Class & Subject', 'Chapter', 'Category', 'Premium'],
              data.materials.map(m => ({ id: m.id, data: [<strong>{m.title}</strong>, `${m.className||'N/A'} - ${m.subject||'N/A'}`, m.lesson||'N/A', m.category, m.isPremium ? <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Yes</span> : <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-bold">No</span>] })),
              (id) => handleDelete('materials', id, 'materials'),
              (id) => handleEditClick(id, 'materials')
            )}

            {activeMenu === 'results' && renderTable(
              ['Student Name', 'Course', 'Rank', 'Score/Percentage'],
              data.results.map(r => ({ id: r.id, data: [<strong>{r.studentName}</strong>, r.course, `AIR ${r.rank || '-'}`, r.score ? `${r.score}` : `${r.percentage}%`] })),
              (id) => handleDelete('results', id, 'results'),
              (id) => handleEditClick(id, 'results')
            )}

            {activeMenu === 'testimonials' && renderTable(
              ['Name', 'Role', 'Quote'],
              data.testimonials.map(t => ({ id: t.id, data: [<strong>{t.name}</strong>, t.role, t.quote?.substring(0, 50) + '...'] })),
              (id) => handleDelete('testimonials', id, 'testimonials'),
              (id) => handleEditClick(id, 'testimonials')
            )}

            {activeMenu === 'website' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                 <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
                   {['homepage', 'about', 'courses', 'faculty', 'study-materials', 'results', 'contact'].map(p => (
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

                     const sectionsArr = Object.keys(grouped);

                     return sectionsArr.map((section, index) => {
                       const sectionKeys = grouped[section];
                       const displaySection = section.replace(/_\d+$/, '').replace(/_/g, ' ');
                       return (
                         <div 
                            key={section} 
                            draggable
                            onDragStart={(e) => dragItem.current = index}
                            onDragEnter={(e) => dragOverItem.current = index}
                            onDragEnd={() => handleSort(sectionsArr)}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group"
                         >
                           <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center cursor-move">
                             <div className="flex items-center gap-3">
                               <GripVertical className="text-slate-400 hover:text-gold transition-colors" size={20} />
                               <h3 className="text-lg font-bold text-navy capitalize font-poppins">
                                 {displaySection} Section
                               </h3>
                             </div>
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
                                                } else toast.error(data.message);
                                              } catch (err) { toast.error('Upload failed'); }
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Notice Type</label>
                      <select value={formData.type||'general'} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none">
                        <option value="general">General</option>
                        <option value="exam">Exam</option>
                        <option value="holiday">Holiday</option>
                        <option value="result">Result</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Send to (Audience)</label>
                      <select value={formData.targetAudience||'all'} onChange={e=>setFormData({...formData, targetAudience: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none">
                        <option value="all">Everyone (All)</option>
                        <option value="students">Students Only</option>
                        <option value="faculties">Faculties Only</option>
                        <option value="parents">Parents Only</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {activeMenu === 'courses' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="Course Code (e.g. JEE-01)" value={formData.courseCode||''} onChange={e=>setFormData({...formData, courseCode: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="text" required placeholder="Title" value={formData.title||''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <textarea placeholder="Description" rows="3" value={formData.description||''} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg resize-y"/>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" required placeholder="Fee (₹)" value={formData.fee||''} onChange={e=>setFormData({...formData, fee: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="text" placeholder="Duration (e.g. 1 Year)" value={formData.duration||''} onChange={e=>setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <select value={formData.category||'Foundation'} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="Foundation">Foundation</option>
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                      <option value="Crash Course">Crash Course</option>
                      <option value="Other">Other</option>
                    </select>
                    <select value={formData.mode||'offline'} onChange={e=>setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <select value={formData.status||'active'} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
              {activeMenu === 'faculty' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="Name" value={formData.name||''} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="email" required placeholder="Email" value={formData.email||''} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="password" required={!editId} placeholder="Password" value={formData.password||''} onChange={e=>setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="text" required placeholder="Subject" value={formData.subject||''} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" required placeholder="Phone" value={formData.phone||''} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="text" placeholder="Qualification (e.g. M.Sc, B.Tech)" value={formData.qualification||''} onChange={e=>setFormData({...formData, qualification: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    <input type="number" placeholder="Years of Experience" value={formData.experience||''} onChange={e=>setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <textarea placeholder="Short Introduction (1-2 sentences)" rows="2" value={formData.shortIntro||''} onChange={e=>setFormData({...formData, shortIntro: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Profile Image URL" value={formData.profileImage||''} onChange={e=>setFormData({...formData, profileImage: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg"/>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if(!e.target.files[0]) return;
                          const fd = new FormData();
                          fd.append('image', e.target.files[0]);
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/upload`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                              body: fd
                            });
                            const data = await res.json();
                            if(data.success) {
                              setFormData({...formData, profileImage: data.url});
                            } else toast.error(data.message);
                          } catch (err) { toast.error('Upload failed'); }
                        }}
                      />
                      <button type="button" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium border border-slate-200 h-full whitespace-nowrap">
                        Upload Image
                      </button>
                    </div>
                  </div>
                </>
              )}
              {activeMenu === 'materials' && (
                <>
                  <input type="text" required placeholder="Title (e.g. Thermodynamics Part 1)" value={formData.title||''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <div className="grid grid-cols-2 gap-4">
                    <select required value={formData.className||'11th'} onChange={e=>setFormData({...formData, className: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="9th">Class 9th</option>
                      <option value="10th">Class 10th</option>
                      <option value="11th">Class 11th</option>
                      <option value="12th">Class 12th</option>
                    </select>
                    <input type="text" required placeholder="Subject (e.g. Physics)" value={formData.subject||''} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  </div>
                  <input type="text" required placeholder="Chapter/Lesson Name (e.g. Chapter 1: Motion)" value={formData.lesson||''} onChange={e=>setFormData({...formData, lesson: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <div className="flex gap-2">
                    <input type="text" required placeholder="File URL (e.g. PDF link)" value={formData.fileUrl||''} onChange={e=>setFormData({...formData, fileUrl: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg"/>
                    <div className="relative">
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if(!e.target.files[0]) return;
                          const fd = new FormData();
                          fd.append('image', e.target.files[0]);
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/upload`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                              body: fd
                            });
                            const data = await res.json();
                            if(data.success) {
                              setFormData({...formData, fileUrl: data.url});
                            } else {
                              toast.error(data.message);
                            }
                          } catch (err) { toast.error('Upload failed'); }
                        }}
                      />
                      <button type="button" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium border border-slate-200 h-full whitespace-nowrap">
                        Upload File
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select required value={formData.category||'notes'} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="notes">Levora Notes</option>
                      <option value="textbook">Textbook</option>
                      <option value="pyqs">PYQs</option>
                      <option value="assignment">Assignment</option>
                      <option value="formula">Formula Sheet</option>
                    </select>
                    <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                      <input type="checkbox" checked={formData.isPremium||false} onChange={e=>setFormData({...formData, isPremium: e.target.checked})} className="w-4 h-4 text-gold focus:ring-gold rounded border-slate-300"/>
                      <span className="text-sm font-medium text-slate-700">Is Premium Resource?</span>
                    </label>
                  </div>
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
              {activeMenu === 'testimonials' && (
                <>
                  <input type="text" required placeholder="Name (e.g. Rahul Sharma)" value={formData.name||''} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <input type="text" required placeholder="Role (e.g. JEE Topper 2024 or Parent)" value={formData.role||''} onChange={e=>setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                  <textarea required placeholder="Testimonial Quote" rows="3" value={formData.quote||''} onChange={e=>setFormData({...formData, quote: e.target.value})} className="w-full px-4 py-2 border rounded-lg resize-y"/>
                  <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <input type="checkbox" checked={formData.isParent||false} onChange={e=>setFormData({...formData, isParent: e.target.checked})} className="w-4 h-4 text-gold focus:ring-gold rounded border-slate-300"/>
                    <span className="text-sm font-medium text-slate-700">Is this a Parent Testimonial?</span>
                  </label>
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
                    <input type="radio" checked={newFieldData.type === 'plain'} onChange={()=>setNewFieldData({...newFieldData, type: 'plain'})} className="text-gold focus:ring-gold"/> Plain Text
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" checked={newFieldData.type === 'rich'} onChange={()=>setNewFieldData({...newFieldData, type: 'rich'})} className="text-gold focus:ring-gold"/> Rich Text
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" checked={newFieldData.type === 'image'} onChange={()=>setNewFieldData({...newFieldData, type: 'image'})} className="text-gold focus:ring-gold"/> Image
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Content</label>
                <textarea required={newFieldData.type !== 'image'} rows="4" placeholder={newFieldData.type === 'image' ? 'Enter a placeholder image URL, or leave blank to upload later...' : 'Enter your text here...'} value={newFieldData.value} onChange={e=>setNewFieldData({...newFieldData, value: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"/>
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
                { id: 'programs', name: 'Programs Widget', icon: <BookOpen className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays the school and JEE/NEET programs', fields: ['title', 'subtitle'] },
                { id: 'why', name: 'Why Levora Widget', icon: <Target className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Highlights the key features of the academy', fields: ['title', 'subtitle', 'feature_1_title', 'feature_1_desc', 'feature_2_title', 'feature_2_desc', 'feature_3_title', 'feature_3_desc', 'feature_4_title', 'feature_4_desc'] },
                { id: 'parents_support', name: 'Parents Support', icon: <Users className="text-pink-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'How we support parents (Reports, PTMs, etc.)', fields: ['title', 'subtitle', 'support_1_title', 'support_1_desc', 'support_2_title', 'support_2_desc', 'support_3_title', 'support_3_desc', 'support_4_title', 'support_4_desc'] },
                { id: 'cta_block', name: 'Call To Action', icon: <Target className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Full-width banner for generating admissions.', fields: ['title', 'subtitle'] },
                { id: 'notes', name: 'Notes System Widget', icon: <FileEdit className="text-blue-400 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Highlights the structured study materials', fields: ['title', 'subtitle'] },
                { id: 'faculty_showcase', name: 'Faculty Widget', icon: <Users className="text-purple-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays top faculty members from database', fields: ['title', 'subtitle'] },
                { id: 'results_showcase', name: 'Results Widget', icon: <Award className="text-orange-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays student results from database', fields: ['title', 'subtitle', 'link_text', 'stat_1_value', 'stat_1_label', 'stat_2_value', 'stat_2_label', 'stat_3_value', 'stat_3_label', 'stat_4_value', 'stat_4_label'] },
                { id: 'coding', name: 'Coding Courses Widget', icon: <Globe className="text-cyan-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Displays the Levora Coder courses', fields: ['title', 'subtitle'] },
                { id: 'testimonials', name: 'Testimonials Widget', icon: <MessageSquare className="text-pink-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Student testimonials carousel', fields: ['title', 'subtitle'] },
                
                { id: 'about_vision', name: 'Vision & Mission', icon: <Target className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'About page Vision and Mission section.', fields: ['vision_title', 'vision_content', 'mission_title', 'mission_content'] },
                { id: 'about_founder', name: 'Founder Message', icon: <Users className="text-purple-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'About page Founder message and photo.', fields: ['founder_title', 'founder_message', 'founder_name', 'founder_role', 'founder_image'] },
                { id: 'contact_info', name: 'Contact Info', icon: <Phone className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Contact page Information cards.', fields: ['title', 'subtitle', 'address', 'phone', 'email'] },
                { id: 'contact_form', name: 'Contact Form', icon: <Mail className="text-gold mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Contact page inquiry form.', fields: ['form_title'] },
                { id: 'courses_grid', name: 'Courses Grid', icon: <BookOpen className="text-sky mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic filterable courses grid.', fields: ['title', 'subtitle'] },
                { id: 'faculty_grid', name: 'Faculty Grid', icon: <Users className="text-navy mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic faculty grid.', fields: ['title', 'subtitle'] },
                { id: 'results_grid', name: 'Results Grid', icon: <Target className="text-gold mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic student results grid.', fields: ['title', 'subtitle'] },
                { id: 'materials_grid', name: 'Materials Grid', icon: <FileEdit className="text-green-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'Dynamic study materials downloads grid.', fields: ['title', 'subtitle'] },
                { id: 'seo_content', name: 'SEO Content Block', icon: <BookOpen className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={36}/>, desc: 'SEO text block with paragraph content.', fields: ['content'] },
                
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
