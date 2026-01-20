
import React, { useState } from 'react';
import { MOCK_DATES, CATEGORY_COLORS } from '../constants';
import { ScheduleItem } from '../types';

interface Props {
  data: Record<string, ScheduleItem[]>;
  setData: React.Dispatch<React.SetStateAction<Record<string, ScheduleItem[]>>>;
}

const Schedule: React.FC<Props> = ({ data, setData }) => {
  const [selectedDate, setSelectedDate] = useState(MOCK_DATES[0].date);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  const handleOpenDetail = (item: ScheduleItem) => {
    setEditingItem({ ...item });
    setIsDetailOpen(true);
    setIsNewEntry(false);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: `new-${Date.now()}`,
      time: '12:00',
      title: '',
      location: '',
      category: 'sightseeing',
      note: '',
      mapUrl: ''
    });
    setIsDetailOpen(true);
    setIsNewEntry(true);
  };

  const handleDelete = () => {
    if (!editingItem) return;
    if (window.confirm('確定要永久刪除這個行程嗎？此操作不可恢復。')) {
      setData(prev => {
        const newData = { ...prev };
        newData[selectedDate] = (newData[selectedDate] || []).filter(i => i.id !== editingItem.id);
        return newData;
      });
      setIsDetailOpen(false);
      setEditingItem(null);
    }
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title) {
      alert("請至少填寫標題！");
      return;
    }
    
    setData(prev => {
      const newData = { ...prev };
      const currentDayItems = newData[selectedDate] || [];
      if (isNewEntry) {
        newData[selectedDate] = [...currentDayItems, editingItem].sort((a, b) => a.time.localeCompare(b.time));
      } else {
        newData[selectedDate] = currentDayItems.map(i => i.id === editingItem.id ? editingItem : i).sort((a, b) => a.time.localeCompare(b.time));
      }
      return newData;
    });
    setIsDetailOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Date Picker */}
      <div className="flex space-x-3 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar scroll-smooth">
        {MOCK_DATES.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={`flex-shrink-0 w-24 py-5 rounded-[2rem] border-2 transition-all active:scale-90 flex flex-col items-center ${
              selectedDate === d.date
                ? 'bg-clay-green text-white border-clay-green soft-shadow scale-105 z-10'
                : 'bg-white text-brown-deep border-beige-200 opacity-60'
            }`}
          >
            <span className="text-[10px] font-black tracking-widest uppercase mb-1">{d.label}</span>
            <span className="text-2xl font-black">{new Date(d.date).getDate()}</span>
            <div className="mt-2 flex items-center justify-center">
               <i className={`fa-solid text-sm ${d.weather === 'sunny' ? 'fa-sun text-yellow-300' : d.weather === 'rainy' ? 'fa-cloud-showers-heavy' : 'fa-cloud'}`}></i>
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-black text-brown-deep flex items-center space-x-3 px-2">
          <i className="fa-solid fa-map-pin text-clay-green"></i>
          <span>今日計畫</span>
        </h3>
        
        {data[selectedDate]?.length ? (
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-6 top-4 bottom-4 w-1 bg-beige-200 rounded-full"></div>
            {data[selectedDate].map((item) => (
              <div 
                key={item.id} 
                className="relative pl-10" 
                onClick={() => handleOpenDetail(item)}
              >
                <div className={`absolute left-[-4px] top-2.5 w-5 h-5 rounded-full border-4 border-white soft-shadow flex items-center justify-center transition-all ${CATEGORY_COLORS[item.category].split(' ')[0]}`}>
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="bg-white rounded-[2rem] p-6 soft-shadow border border-beige-200 active:scale-[0.98] transition-all cursor-pointer hover:border-clay-green">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-brown-soft flex items-center">
                       <i className="fa-regular fa-clock mr-1.5 opacity-50"></i>
                       {item.time}
                    </span>
                    <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${CATEGORY_COLORS[item.category]}`}>
                      {item.category === 'sightseeing' ? '景點' : item.category === 'food' ? '美食' : item.category === 'transport' ? '交通' : '住宿'}
                    </span>
                  </div>
                  <h4 className="font-black text-brown-deep text-lg leading-tight mb-2">{item.title}</h4>
                  <div className="flex items-center text-xs text-brown-soft font-bold">
                    <i className="fa-solid fa-location-dot mr-1.5 opacity-40"></i>
                    <span className="truncate">{item.location}</span>
                  </div>
                  {item.note && (
                    <div className="mt-3 pt-3 border-t border-beige-100 flex items-start space-x-2">
                      <i className="fa-solid fa-quote-left text-[8px] text-brown-soft mt-1"></i>
                      <p className="text-[11px] text-brown-soft italic flex-grow">{item.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/40 border-4 border-dashed border-beige-200 rounded-[3rem] py-20 text-center">
            <i className="fa-solid fa-compass text-5xl text-beige-300 mb-4"></i>
            <p className="text-sm text-brown-soft font-black italic">這天沒有任何安排，來場隨興的小冒險吧！</p>
          </div>
        )}
      </div>

      <button 
        onClick={handleAddNew} 
        className="w-full py-5 bg-clay-green text-white rounded-[2rem] font-black soft-shadow active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-xl hover:bg-clay-dark"
      >
        <i className="fa-solid fa-plus text-lg"></i>
        <span>添加新的行程項目</span>
      </button>

      {/* Detail Drawer */}
      {isDetailOpen && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 bg-brown-deep/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[3rem] soft-shadow border border-beige-200 p-8 space-y-6 animate-in slide-in-from-bottom duration-500 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-brown-deep">{isNewEntry ? '新增冒險' : '修改探險細節'}</h3>
                <p className="text-[10px] text-brown-soft font-black uppercase tracking-widest mt-1">Activity Editor</p>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center active:scale-90 transition-all">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">抵達時間</label>
                  <input 
                    type="time" 
                    value={editingItem.time} 
                    onChange={(e) => setEditingItem({...editingItem, time: e.target.value})} 
                    className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold text-lg" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">活動類別</label>
                  <select 
                    value={editingItem.category} 
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value as any})} 
                    className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold appearance-none h-full"
                  >
                    <option value="sightseeing">景點</option>
                    <option value="food">美食</option>
                    <option value="transport">交通</option>
                    <option value="accommodation">住宿</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">行程名稱</label>
                <input 
                  type="text" 
                  placeholder="例：前往合掌村" 
                  value={editingItem.title} 
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} 
                  className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold text-lg" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">具體地點</label>
                <input 
                  type="text" 
                  placeholder="例：名古屋站" 
                  value={editingItem.location} 
                  onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} 
                  className="w-full bg-beige-50 rounded-2xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-brown-soft uppercase block mb-1 px-1">備註資訊</label>
                <textarea 
                  placeholder="有些什麼要注意的細節嗎？" 
                  value={editingItem.note || ''} 
                  onChange={(e) => setEditingItem({...editingItem, note: e.target.value})} 
                  rows={3} 
                  className="w-full bg-beige-50 rounded-3xl px-5 py-4 text-brown-deep border-none focus:ring-2 focus:ring-clay-green inner-soft-shadow font-bold text-sm" 
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <button 
                onClick={handleSave} 
                className="w-full py-5 bg-clay-green text-white rounded-[2rem] font-black soft-shadow active:scale-95 transition-all shadow-lg text-lg"
              >
                確認並保存行程
              </button>
              {!isNewEntry && (
                <button 
                  onClick={handleDelete} 
                  className="w-full py-4 text-accent-orange font-black text-sm active:scale-95 flex items-center justify-center transition-colors hover:text-red-500"
                >
                  <i className="fa-solid fa-trash-can mr-2"></i> 永久移除此行程
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
