
import React, { useState } from 'react';
import { PlayCircle, FileText, CheckCircle2, ChevronRight, Search, Filter } from 'lucide-react';

const courses = [
  { id: 1, title: 'Biomedical Engineering 101', level: 'Beginner', lessons: 24, progress: 45, image: 'https://picsum.photos/seed/bio/400/250' },
  { id: 2, title: 'Advanced Human Anatomy', level: 'Advanced', lessons: 18, progress: 10, image: 'https://picsum.photos/seed/anatomy/400/250' },
  { id: 3, title: 'Medical Device Electronics', level: 'Intermediate', lessons: 12, progress: 80, image: 'https://picsum.photos/seed/med/400/250' },
  { id: 4, title: 'Diagnostic Systems Architecture', level: 'Expert', lessons: 30, progress: 0, image: 'https://picsum.photos/seed/diag/400/250' },
  { id: 5, title: 'Biomaterials Science', level: 'Beginner', lessons: 15, progress: 100, image: 'https://picsum.photos/seed/bio2/400/250' },
  { id: 6, title: 'Clinical Engineering Mgmt', level: 'Intermediate', lessons: 22, progress: 25, image: 'https://picsum.photos/seed/clin/400/250' },
];

const LearningHub: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search learning paths..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(tag => (
            <button 
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                filter === tag ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.filter(c => filter === 'All' || c.level === filter).map(course => (
          <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-800 uppercase tracking-widest border border-white/50">
                {course.level}
              </div>
              {course.progress === 100 && (
                <div className="absolute top-4 right-4 text-emerald-500 bg-white p-1 rounded-full border-2 border-emerald-500">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{course.title}</h4>
              <div className="flex items-center text-slate-500 text-xs mb-6 space-x-4">
                <span className="flex items-center gap-1"><PlayCircle size={14} /> {course.lessons} Lessons</span>
                <span className="flex items-center gap-1"><FileText size={14} /> 4 Assignments</span>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-400">PROGRESS</span>
                  <span className="font-bold text-blue-600">{course.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <button className="w-full mt-6 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                  {course.progress > 0 ? (course.progress === 100 ? 'Review' : 'Continue') : 'Start Learning'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningHub;
