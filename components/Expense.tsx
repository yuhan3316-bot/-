
import React, { useState } from 'react';
import { Expense as ExpenseType } from '../types';

interface Props {
  items: ExpenseType[];
  setItems: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
}

const Expense: React.FC<Props> = ({ items, setItems }) => {
  const [editingExpense, setEditingExpense] = useState<ExpenseType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const JPY_TO_TWD = 0.22;

  const totalTwd = items.reduce((acc, curr) => 
    curr.currency === 'TWD' ? acc + curr.amount : acc + (curr.amount * JPY_TO_TWD), 0);

  const handleEdit = (expense: ExpenseType) => {
    setEditingExpense({ ...expense });
    setIsDrawerOpen(true);
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingExpense({
      id: `e-${Date.now()}`,
      amount: 0,
      currency: 'JPY',
      category: '美食',
      payer: '我自己',
      paymentMethod: '現金',
      note: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsDrawerOpen(true);
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editingExpense) return;
    setItems(prev => {
      if (isNew) return [...prev, editingExpense];
      return prev.map(e => e.id === editingExpense.id ? editingExpense : e);
    });
    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    if (!editingExpense) return;
    if (window.confirm('確定要永久刪除這筆支出嗎？')) {
      setItems(prev => prev.filter(e => e.id !== editingExpense.id));
      setIsDrawerOpen(false);
      setEditingExpense(null);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-brown-deep rounded-3xl p-6 text-white soft-shadow relative overflow-hidden">
        <p className="text-[10px] font-black opacity-70 uppercase mb-1">總支出統計</p>
        <span className="text-3xl font-black">NT$ {Math.round(totalTwd).toLocaleString()}</span>
        <button onClick={handleAddNew} className="absolute bottom-6 right-6 bg-accent-orange text-white px-5 py-2 rounded-2xl text-xs font-black soft-shadow active:scale-90 transition-all">
          新增支出
        </button>
      </div>

      <div className="space-y-3">
        {items.sort((a,b) => b.date.localeCompare(a.date)).map(exp => (
          <div key={exp.id} onClick={() => handleEdit(exp)} className="bg-white rounded-2xl p-4 soft-shadow border border-beige-200 flex items-center justify-between active:scale-[0.98] cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                <i className={`fa-solid ${exp.category === '美食' ? 'fa-utensils' : 'fa-receipt'}`}></i>
              </div>
              <div>
                <p className="font-black text-brown-deep text-sm">{exp.note || exp.category}</p>
                <p className="text-[10px] text-brown-soft font-bold uppercase">{exp.date} • {exp.paymentMethod}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-brown-deep">{exp.currency === 'JPY' ? '¥' : '$'}{exp.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {isDrawerOpen && editingExpense && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 bg-brown-deep/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl soft-shadow p-6 space-y-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-brown-deep">支出細節</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 bg-beige-100 rounded-full flex items-center justify-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {(['JPY', 'TWD'] as const).map(c => (
                  <button key={c} onClick={() => setEditingExpense({...editingExpense, currency: c})} className={`py-3 rounded-2xl font-black border-2 ${editingExpense.currency === c ? 'border-clay-green bg-clay-green/10 text-clay-green' : 'border-beige-200 opacity-60'}`}>{c}</button>
                ))}
              </div>
              <input type="number" value={editingExpense.amount || ''} onChange={(e) => setEditingExpense({...editingExpense, amount: Number(e.target.value)})} className="w-full bg-beige-100 rounded-2xl p-4 text-2xl font-black" placeholder="0" />
              <div className="grid grid-cols-2 gap-2">
                {['現金', '信用卡', '行動支付', 'Suica'].map(m => (
                  <button key={m} onClick={() => setEditingExpense({...editingExpense, paymentMethod: m})} className={`py-2 rounded-xl text-xs font-black border-2 ${editingExpense.paymentMethod === m ? 'border-clay-green bg-clay-green/10 text-clay-green' : 'border-beige-200'}`}>{m}</button>
                ))}
              </div>
              <input type="text" value={editingExpense.note} onChange={(e) => setEditingExpense({...editingExpense, note: e.target.value})} className="w-full bg-beige-100 rounded-xl p-3 font-bold" placeholder="項目名稱" />
            </div>
            <button onClick={handleSave} className="w-full py-4 bg-clay-green text-white rounded-2xl font-black soft-shadow">儲存紀錄</button>
            {!isNew && <button onClick={handleDelete} className="w-full py-2 text-accent-orange font-black text-sm">刪除此筆記錄</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
