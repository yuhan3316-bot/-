
import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Member } from '../types';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const handleEdit = (member: Member) => {
    setEditingMember({ ...member });
    setIsDrawerOpen(true);
    setIsNew(false);
  };

  const handleAddNew = () => {
    const newMember: Member = {
      id: `m-${Date.now()}`,
      name: '',
      avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/100/100`,
      role: '成員'
    };
    setEditingMember(newMember);
    setIsDrawerOpen(true);
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editingMember) return;
    if (isNew) {
      setMembers([...members, editingMember]);
    } else {
      setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    if (!editingMember) return;
    if (window.confirm(`確定要移除成員 ${editingMember.name} 嗎？`)) {
      setMembers(members.filter(m => m.id !== editingMember.id));
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <div className="inline-block relative group" onClick={() => handleEdit(members[0])}>
          <div className="w-24 h-24 rounded-full border-4 border-white soft-shadow overflow-hidden bg-beige-300 cursor-pointer">
             <img src={members[0]?.avatar} className="w-full h-full object-cover" alt="me" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-clay-green rounded-full border-2 border-white flex items-center justify-center cursor-pointer">
            <i className="fa-solid fa-pen text-white text-[10px]"></i>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-brown-deep">{members[0]?.name || '您的個人資料'}</h3>
        <p className="text-sm text-brown-soft italic">「讓我們一起創造回憶吧！」</p>
      </div>

      <div className="bg-white rounded-3xl p-6 soft-shadow border border-beige-200">
        <h3 className="font-bold text-brown-deep mb-6 flex justify-between items-center">
          <span>冒險夥伴們</span>
          <span className="text-xs bg-beige-200 px-3 py-1 rounded-full text-brown-soft">{members.length} 位成員</span>
        </h3>
        <div className="space-y-6">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between">
              <div 
                className="flex items-center space-x-4 cursor-pointer active:scale-95 transition-transform"
                onClick={() => handleEdit(member)}
              >
                <img src={member.avatar} className="w-12 h-12 rounded-2xl object-cover soft-shadow" alt={member.name} />
                <div>
                  <p className="font-bold text-brown-deep">{member.name}</p>
                  <p className="text-[10px] text-clay-green font-bold uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              <button className="text-brown-soft opacity-30 hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-message"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleAddNew}
        className="w-full py-4 bg-white text-clay-green rounded-2xl font-bold border-2 border-dashed border-clay-green active:scale-95 transition-all flex items-center justify-center space-x-2"
      >
        <i className="fa-solid fa-user-plus"></i>
        <span>邀請好友加入</span>
      </button>

      {/* Member Edit Drawer */}
      {isDrawerOpen && editingMember && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 bg-brown-deep/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-3xl soft-shadow border border-beige-200 p-6 space-y-4 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-brown-deep">{isNew ? '新增成員' : '編輯成員資料'}</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="text-brown-soft">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex justify-center mb-4">
               <img src={editingMember.avatar} className="w-20 h-20 rounded-2xl object-cover soft-shadow" alt="preview" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-brown-soft uppercase block mb-1">名稱</label>
                <input 
                  type="text" 
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                  className="w-full bg-beige-100 rounded-xl px-4 py-2 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-brown-soft uppercase block mb-1">擔當 / 角色</label>
                <input 
                  type="text" 
                  value={editingMember.role || ''}
                  placeholder="例如：總召、攝影..."
                  onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full bg-beige-100 rounded-xl px-4 py-2 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-clay-green text-white rounded-2xl font-bold soft-shadow active:scale-95"
              >
                儲存成員
              </button>
              {!isNew && (
                <button 
                  onClick={handleDelete}
                  className="w-full py-3 bg-white text-accent-orange border-2 border-accent-orange rounded-2xl font-bold"
                >
                  移除成員
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pt-8 text-center text-brown-soft">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">群組行程代碼</p>
        <p className="text-2xl font-black tracking-widest">#JAPAN-2025</p>
      </div>
    </div>
  );
};

export default Members;
