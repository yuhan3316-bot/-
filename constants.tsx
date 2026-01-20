
import { ScheduleItem, Member, TravelDate, Booking, PlanningTask, Expense } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: 'm1', name: 'Momo', avatar: 'https://picsum.photos/id/64/100/100', role: '總召' },
  { id: 'm2', name: 'Tanuki', avatar: 'https://picsum.photos/id/102/100/100', role: '攝影大師' },
  { id: 'm3', name: 'Kiki', avatar: 'https://picsum.photos/id/129/100/100', role: '財務管家' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', amount: 4500, currency: 'JPY', category: '美食', payer: 'Momo', paymentMethod: '現金', splitWith: ['m1', 'm2', 'm3'], note: '一茶咖哩飯', date: '2025-02-15' },
  { id: 'e2', amount: 15800, currency: 'TWD', category: '機票', payer: 'Kiki', paymentMethod: '信用卡', splitWith: ['m1', 'm2', 'm3'], note: '機票錢', date: '2025-01-20' },
];

export const MOCK_DATES: TravelDate[] = [
  { date: '2025-02-15', label: 'Day 1', weather: 'sunny', temp: 8 },
  { date: '2025-02-16', label: 'Day 2', weather: 'cloudy', temp: 7 },
  { date: '2025-02-17', label: 'Day 3', weather: 'sunny', temp: 10 },
  { date: '2025-02-18', label: 'Day 4', weather: 'cloudy', temp: 9 },
  { date: '2025-02-19', label: 'Day 5', weather: 'sunny', temp: 11 },
  { date: '2025-02-20', label: 'Day 6', weather: 'rainy', temp: 6 },
  { date: '2025-02-21', label: 'Day 7', weather: 'sunny', temp: 12 },
  { date: '2025-02-22', label: 'Day 8', weather: 'sunny', temp: 13 },
];

export const MOCK_SCHEDULE: Record<string, ScheduleItem[]> = {
  '2025-02-15': [
    { id: 'd1-1', time: '09:20', title: '搭巴士前往合掌村', location: '名古屋站', category: 'transport', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nagoya+Station' },
    { id: 'd1-2', time: '12:00', title: '午餐：一茶咖哩飯', location: '合掌村', category: 'food', note: '必吃咖哩飯', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shirakawa-go+Issa' },
    { id: 'd1-3', time: '14:00', title: '參觀和田家/神田家', location: '合掌村', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wada+House+Shirakawago' },
    { id: 'd1-4', time: '16:35', title: '濃飛巴士前往高山', location: '合掌村巴士站', category: 'transport', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shirakawago+Bus+Terminal' },
    { id: 'd1-5', time: '19:00', title: '晚餐：Suzuya 壽壽屋', location: '高山', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Suzuya+Restaurant+Takayama' },
  ],
  '2025-02-16': [
    { id: 'd2-1', time: '08:30', title: '宮川朝市 & 高山老街', location: '高山', category: 'sightseeing', note: '飛驒牛壽司必吃：こって牛', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Miyagawa+Morning+Market' },
    { id: 'd2-2', time: '12:00', title: '午餐：Center4 飛驒牛漢堡', location: '高山', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Center4+Hamburgers' },
    { id: 'd2-3', time: '15:34', title: 'JR 飛駝列車回名古屋', location: '高山站', category: 'transport', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Takayama+Station' },
    { id: 'd2-4', time: '19:00', title: '晚餐：鳥開總本家', location: '名古屋站', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Torikai+Sohonke+Nagoya' },
  ],
  '2025-02-17': [
    { id: 'd3-1', time: '09:00', title: '熱田神宮', location: '名古屋', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Atsuta+Jingu' },
    { id: 'd3-2', time: '11:30', title: '午餐：蓬萊軒鰻魚飯', location: '熱田神宮旁', category: 'food', note: '記得先去抽號碼牌', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Atsuta+Houraiken' },
    { id: 'd3-3', time: '14:30', title: '名古屋城', location: '名古屋', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nagoya+Castle' },
    { id: 'd3-4', time: '18:00', title: '晚餐：Fumiya Nishiki 炸雞翅', location: '榮商圈', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Fumiya+Nishiki+Nagoya' },
    { id: 'd3-5', time: '20:00', title: '綠洲 21 & 電視塔', location: '榮', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Oasis+21' },
  ],
  '2025-02-18': [
    { id: 'd4-1', time: '09:00', title: '早餐：Konparu 炸蝦三明治', location: '大須', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Konparu+Osu' },
    { id: 'd4-2', time: '10:30', title: '三輪神社 & 大須觀音', location: '大須', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Osu+Kannon' },
    { id: 'd4-3', time: '14:00', title: '大須商店街購物', location: '大須', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Osu+Shopping+District' },
    { id: 'd4-4', time: '19:00', title: '晚餐：一蘭拉麵', location: '名古屋', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ichiran+Nagoya' },
  ],
  '2025-02-19': [
    { id: 'd5-1', time: '10:00', title: '吉卜力公園：動動力森林', location: '愛·地球博紀念公園', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ghibli+Park' },
    { id: 'd5-2', time: '13:00', title: '魔女之谷 & 青春之丘', location: '吉卜力公園', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Valley+of+Witches+Ghibli+Park' },
    { id: 'd5-3', time: '18:00', title: '晚餐：矢場豬排', location: '名古屋站', category: 'food', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Yabaton+Nagoya+Station' },
  ],
  '2025-02-20': [
    { id: 'd6-1', time: '10:00', title: '吉卜力大倉庫', location: '吉卜力公園', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ghibli+Grand+Warehouse' },
    { id: 'd6-2', time: '14:00', title: '幽靈之里 (Mononoke)', location: '吉卜力公園', category: 'sightseeing', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mononoke+Village+Ghibli+Park' },
  ]
};

export const MOCK_BOOKINGS: Booking[] = [
  { 
    id: 'b1', 
    type: 'flight', 
    title: '長榮航空 BR198', 
    price: 15800, 
    currency: 'TWD',
    details: { flightNo: 'BR198', gate: 'B6', seat: '22A', from: 'TPE', to: 'NGO', time: '08:50' }
  },
  {
    id: 'b2',
    type: 'hotel',
    title: '高山站前住宿飯店',
    price: 3200,
    currency: 'TWD',
    details: { checkIn: '15:00', checkOut: '11:00', address: '高山站前' }
  }
];

export const MOCK_TASKS: PlanningTask[] = [
  { id: 't1', title: '購買 ICOCA 並儲值', type: 'todo', completed: false, assignedTo: 'all' },
  { id: 't2', title: '牙刷牙膏', type: 'packing', completed: true, assignedTo: 'all' },
  { id: 't3', title: '預約 Piyorin 蛋糕', type: 'todo', completed: false, assignedTo: 'm1' },
  { id: 't4', title: '保暖衣物/暖暖包', type: 'packing', completed: false, assignedTo: 'all' },
];

export const CATEGORY_COLORS = {
  sightseeing: 'bg-clay-green text-white',
  food: 'bg-accent-orange text-white',
  transport: 'bg-accent-blue text-white',
  accommodation: 'bg-brown-deep text-white'
};
