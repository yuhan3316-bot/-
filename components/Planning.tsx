
import React, { useState } from 'react';
import { PlanningTask } from '../types';

interface Props {
  items: PlanningTask[];
  setItems: React.Dispatch<React.SetStateAction<PlanningTask[]>>;
}

const Planning: React.FC<Props> = ({ items, setItems }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'packing' | 'shopping'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<PlanningTask | null>(null);

  const toggleTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleOpenEdit = (task: PlanningTask) => {
    setEditingTask({ ...task });
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;
    setItems(prev => prev.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    if (window.confirm('確定要移除此項清單嗎？')) {
      setItems(prev => prev.filter(t => t.id !== id));
      setEditingTask(null);
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: PlanningTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      type: activeFilter === 'all' ? 'todo' : activeFilter,
      completed: false
    };
    setItems(prev => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const filteredTasks = activeFilter === 'all' ? items : items.filter(t => t.type === activeFilter);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex p-1.5 bg-beige-200 rounded-3xl space-x-1 border border-beige-300">
        {(['all', 'todo', 'packing', 'shopping'] as const).map(f => (
          <button 
            key={f} 
            onClick={() => setActiveFilter(f)} 
            className={`flex-grow py-2.5 rounded-2xl text-[10px] font-black uppercase transition-all ${
              activeFilter === f ? 'bg-white text-clay-green soft-shadow scale-[1.02]' : 'text-brown-soft'
            }`}
          >
            {f === 'all' ? '全部' : f === 'todo' ? '待辦' : f === 'packing' ? '行李' : '購物'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 soft-shadow border border-beige-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-2xl font-black text-brown-deep leading-none">行前準備</h3>
            <p className="text-[10px] text-brown-soft font-black uppercase tracking-widest mt-2">PREPARATION PROGRESS</p>
          </div>
          <span className="text-4xl font-black text-clay-green">
            {items.length > 0 ? Math.round((items.filter(t => t.completed).length / items.length) * 100) : 0}%
          </span>
        </div>
        <div className="w-full h-4 bg-beige-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-clay-green transition-all duration-1000 ease-out" 
            style={{ width: `${items.length > 0 ? (items.filter(t => t.completed).length / items.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-2 soft-shadow border border-beige-200 flex space-x-2 focus-within:ring-2 focus-within:ring-clay-green transition-all">
        <input 
          type="text" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="還漏掉什麼嗎？寫下來吧！" 
          className="flex-grow bg-transparent border-none focus:ring-0 font-bold text-brown-deep placeholder:text-brown-soft/40 px-4 py-3"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button 
          onClick={handleAddTask} 
          className="bg-clay-green text-white w-12 h-12 rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-md"
        >
          <i className="fa-solid fa-plus text-lg"></i>
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? filteredTasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => handleOpenEdit(task)}
            className={`flex items-center space-x-4 bg-white p-5 rounded-3xl border transition-all cursor-pointer group active:scale-[0.98] ${
              task.completed ? 'opacity-40 bg-beige-50/50' : 'soft-shadow border-beige-200 hover:border-clay-green'
            }`}
          >
            <div 
              onClick={(e) => toggleTask(task.id, e)}
              className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                task.completed ? 'bg-clay-green border-clay-green' : 'bg-white border-beige-300 hover:border-clay-green shadow-inner'
              }`}
            >
              {task.completed && <i className="fa-solid fa-check text-white text-xs"></i>}
            </div>
            <div className="flex-grow overflow-hidden">
              <p className={`font-black text-brown-deep text-base truncate ${task.completed ? 'line-through decoration-brown-soft decoration-2' : ''}`}>
                {task.title}
              </p>
              <p className="text-[9px] text-brown-soft font-black uppercase tracking-tighter opacity-60">
                {task.type === 'todo' ? '待辦清單' : task.type === 'packing' ? '行李檢查' : '購物清單'}
              </p>
            </div>
            <i className="fa-solid fa-pen text-brown-soft opacity-0 group-hover:opacity-40 transition-opacity text-xs"></i>
          </div>
        )) : (
          <div className="py-16 text-center opacity-20 flex flex-col items-center">
            <i className="fa-solid fa-ghost text-5xl mb-4"></i>
            <p className="font-black">目前沒有任何項目</p>
          </div>
        )}
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center px-4 pb-4 bg-brown-deep/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] soft-shadow p-8 space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-brown-deep">編輯項目</h3>
                <p className="text-[10px] text-brown-soft font-black uppercase tracking-widest">List Item Editor</p>
              </div>
              <button onClick={() => setEditingTask(null)} className="w-10 h-10 bg-beige-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-xmark text-brown-deep"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">項目名稱</label>
                <input 
                  type="text" 
                  value={editingTask.title} 
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold text-lg"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">項目類別</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['todo', 'packing', 'shopping'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setEditingTask({...editingTask, type: t})}
                      className={`py-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${
                        editingTask.type === t ? 'border-clay-green bg-clay-green text-white' : 'border-beige-200 text-brown-soft opacity-60'
                      }`}
                    >
                      {t === 'todo' ? '待辦' : t === 'packing' ? '行李' : '購物'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <button 
                onClick={handleSaveEdit} 
                className="w-full py-5 bg-clay-green text-white rounded-[2rem] font-black soft-shadow active:scale-95 transition-all shadow-lg"
              >
                儲存更改
              </button>
              <button 
                onClick={() => deleteTask(editingTask.id)} 
                className="w-full py-4 text-accent-orange font-black text-sm active:scale-95 flex items-center justify-center"
              >
                <i className="fa-solid fa-trash-can mr-2"></i> 刪除此項目
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;
