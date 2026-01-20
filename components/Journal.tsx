
import React from 'react';

const Journal: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-bold text-brown-deep">旅行日誌</h2>
        <button className="bg-clay-green text-white px-4 py-2 rounded-full font-bold text-sm soft-shadow active:scale-95 transition-all flex items-center space-x-2">
          <i className="fa-solid fa-camera"></i>
          <span>記錄回憶</span>
        </button>
      </div>

      <div className="space-y-8">
        {[1, 2].map(i => (
          <article key={i} className="bg-white rounded-3xl overflow-hidden soft-shadow border border-beige-200">
            <div className="p-4 flex items-center space-x-3">
              <img 
                src={`https://picsum.photos/id/${i + 70}/100/100`} 
                className="w-10 h-10 rounded-full border border-beige-100 object-cover"
                alt="author"
              />
              <div>
                <p className="font-bold text-sm text-brown-deep">Momo 的冒險日誌</p>
                <p className="text-[10px] text-brown-soft">2025年2月15日 • 合掌村</p>
              </div>
            </div>
            
            <div className="relative group">
              <img 
                src={`https://picsum.photos/id/${i + 20}/800/800`} 
                className="w-full aspect-square object-cover"
                alt="post"
              />
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 text-white text-[10px] font-bold">
                1/3
              </div>
            </div>

            <div className="p-4">
              <div className="flex space-x-4 mb-3">
                <i className="fa-regular fa-heart text-xl text-brown-deep"></i>
                <i className="fa-regular fa-comment text-xl text-brown-deep"></i>
                <i className="fa-regular fa-paper-plane text-xl text-brown-deep"></i>
              </div>
              <p className="text-sm text-brown-deep leading-relaxed">
                <span className="font-bold mr-2">Momo</span>
                白川鄉的雪景真的太美了！❄️ 雖然天氣冷，但心裡暖暖的。午餐的一茶咖哩飯非常好吃，推薦大家來一定要試試。
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-[10px] font-bold text-clay-green bg-clay-green/10 px-2 py-0.5 rounded-full">#日本旅行</span>
                <span className="text-[10px] font-bold text-clay-green bg-clay-green/10 px-2 py-0.5 rounded-full">#合掌村</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Journal;
