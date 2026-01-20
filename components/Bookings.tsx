
import React, { useState } from 'react';
import { Booking } from '../types';

interface Props {
  items: Booking[];
  setItems: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const Bookings: React.FC<Props> = ({ items, setItems }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Booking> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenEdit = (item: Booking) => {
    setEditingItem({ ...item, details: { ...item.details } });
    setIsNew(false);
    setIsDrawerOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem({
      type: 'flight',
      title: '',
      price: 0,
      currency: 'TWD',
      details: {}
    });
    setIsNew(true);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要永久刪除這張憑證嗎？')) {
      setItems(prev => prev.filter(b => b.id !== id));
      setIsDrawerOpen(false);
    }
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title) return;
    
    setItems(prev => {
      if (isNew) {
        const newItem: Booking = {
          ...(editingItem as Omit<Booking, 'id'>),
          id: `b-${Date.now()}`,
        } as Booking;
        return [...prev, newItem];
      }
      return prev.map(b => b.id === (editingItem as Booking).id ? (editingItem as Booking) : b);
    });
    
    setIsDrawerOpen(false);
    setEditingItem(null);
  };

  const updateDetail = (key: string, value: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      details: {
        ...(editingItem.details || {}),
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-xl font-black text-brown-deep">我的憑證庫</h2>
          <p className="text-[10px] text-brown-soft font-bold uppercase tracking-widest">VOUCHERS & TICKETS</p>
        </div>
        <button 
          onClick={handleOpenAdd} 
          className="w-12 h-12 bg-clay-green text-white rounded-2xl flex items-center justify-center soft-shadow active:scale-90 transition-all"
        >
          <i className="fa-solid fa-plus text-lg"></i>
        </button>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? items.map(booking => (
          <div 
            key={booking.id} 
            onClick={() => handleOpenEdit(booking)}
            className="relative group cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="rounded-3xl overflow-hidden soft-shadow border border-beige-200 bg-white">
              <div className={`px-4 py-2 flex justify-between items-center ${
                booking.type === 'flight' ? 'bg-accent-blue' : 
                booking.type === 'hotel' ? 'bg-clay-green' : 'bg-accent-orange'
              }`}>
                <div className="flex items-center space-x-2">
                  <i className={`fa-solid text-white text-xs ${
                    booking.type === 'flight' ? 'fa-plane' : 
                    booking.type === 'hotel' ? 'fa-bed' : 'fa-ticket'
                  }`}></i>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">
                    {booking.type === 'flight' ? '機票憑證' : booking.type === 'hotel' ? '住宿憑證' : '票券憑證'}
                  </span>
                </div>
                <i className="fa-solid fa-chevron-right text-white/50 text-[10px]"></i>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-brown-deep text-lg leading-tight flex-grow">{booking.title}</h4>
                  <div className="text-right ml-4">
                    <p className="text-[10px] text-brown-soft font-black uppercase leading-none">分攤金額</p>
                    <p className="text-sm font-black text-brown-deep whitespace-nowrap">
                      {booking.currency} {booking.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 mt-4 pt-4 border-t border-beige-100">
                  {booking.details.from && (
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className="text-[10px] font-black text-brown-soft w-12">航段</div>
                      <div className="text-xs font-bold text-brown-deep">{booking.details.from} <i className="fa-solid fa-arrow-right mx-1 opacity-30"></i> {booking.details.to}</div>
                    </div>
                  )}
                  {booking.details.address && (
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className="text-[10px] font-black text-brown-soft w-12">地址</div>
                      <div className="text-xs font-bold text-brown-deep truncate flex-grow">{booking.details.address}</div>
                    </div>
                  )}
                  {booking.details.time && (
                    <div className="flex items-center space-x-2">
                      <div className="text-[10px] font-black text-brown-soft w-12">時間</div>
                      <div className="text-xs font-bold text-brown-deep">{booking.details.time}</div>
                    </div>
                  )}
                  {booking.details.gate && (
                    <div className="flex items-center space-x-2">
                      <div className="text-[10px] font-black text-brown-soft w-12">登機門</div>
                      <div className="text-xs font-bold text-brown-deep">{booking.details.gate}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center opacity-20 flex flex-col items-center">
            <i className="fa-solid fa-folder-open text-5xl mb-4"></i>
            <p className="font-black">目前還沒有儲存任何憑證</p>
          </div>
        )}
      </div>

      {isDrawerOpen && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 bg-brown-deep/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] soft-shadow p-8 space-y-6 animate-in slide-in-from-bottom duration-500 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-brown-deep">{isNew ? '新增憑證' : '編輯憑證內容'}</h3>
                <p className="text-[10px] text-brown-soft font-black uppercase tracking-widest">Detail Editor</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 bg-beige-100 rounded-full flex items-center justify-center active:scale-90 transition-all">
                <i className="fa-solid fa-xmark text-brown-deep"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-2">
                {(['flight', 'hotel', 'ticket'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setEditingItem({...editingItem, type: t})}
                    className={`py-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${
                      editingItem.type === t ? 'border-clay-green bg-clay-green text-white shadow-lg scale-105' : 'border-beige-200 text-brown-soft opacity-60'
                    }`}
                  >
                    {t === 'flight' ? '航班' : t === 'hotel' ? '飯店' : '票券'}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">名稱 / 標題</label>
                <input 
                  type="text" 
                  placeholder="例：長榮航空 BR198" 
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">分攤金額</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
                    className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">幣別</label>
                  <select 
                    value={editingItem.currency} 
                    onChange={(e) => setEditingItem({...editingItem, currency: e.target.value as any})}
                    className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold h-full appearance-none"
                  >
                    <option value="TWD">台幣 TWD</option>
                    <option value="JPY">日幣 JPY</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-beige-100">
                <p className="text-[10px] font-black text-brown-soft uppercase tracking-widest">補充詳細資訊</p>
                {editingItem.type === 'flight' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="起飛 (例：TPE)" value={editingItem.details?.from || ''} onChange={(e) => updateDetail('from', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                    <input type="text" placeholder="抵達 (例：NGO)" value={editingItem.details?.to || ''} onChange={(e) => updateDetail('to', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                    <input type="text" placeholder="起飛時間" value={editingItem.details?.time || ''} onChange={(e) => updateDetail('time', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                    <input type="text" placeholder="登機門" value={editingItem.details?.gate || ''} onChange={(e) => updateDetail('gate', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input type="text" placeholder="地址" value={editingItem.details?.address || ''} onChange={(e) => updateDetail('address', e.target.value)} className="w-full bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Check-in 時間" value={editingItem.details?.checkIn || ''} onChange={(e) => updateDetail('checkIn', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                      <input type="text" placeholder="Check-out 時間" value={editingItem.details?.checkOut || ''} onChange={(e) => updateDetail('checkOut', e.target.value)} className="bg-beige-50 rounded-xl p-3 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow" />
                    </div>
                  </div>
                )}
                <textarea 
                  placeholder="額外備註..." 
                  value={editingItem.details?.note || ''} 
                  onChange={(e) => updateDetail('note', e.target.value)} 
                  rows={2}
                  className="w-full bg-beige-50 rounded-2xl p-4 text-xs font-bold border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <button 
                onClick={handleSave} 
                className="w-full py-5 bg-clay-green text-white rounded-[2rem] font-black soft-shadow active:scale-95 transition-all shadow-lg hover:bg-clay-dark"
              >
                儲存所有更改
              </button>
              {!isNew && (
                <button 
                  onClick={() => editingItem.id && handleDelete(editingItem.id)} 
                  className="w-full py-4 text-accent-orange font-black text-sm active:scale-95 flex items-center justify-center"
                >
                  <i className="fa-solid fa-trash-can mr-2"></i> 刪除此憑證
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
