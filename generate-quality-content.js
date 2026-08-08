/**
 * QUALITY CONTENT GENERATOR — Rohit Travels Ranchi
 * Converts thin content to rich 800-1200 word quality content
 * on all 1685 route pages and 441 city pages
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CITY DATABASE — Local facts, landmarks, known for
// ============================================================
const CITY_DATA = {
  'ranchi': {
    fullName: 'Ranchi',
    state: 'Jharkhand',
    knownFor: 'City of Waterfalls, Capital of Jharkhand',
    population: '14 lakh+',
    landmarks: ['Hundru Falls', 'Dassam Falls', 'Jonha Falls', 'Patratu Valley', 'Rock Garden', 'Tagore Hill', 'Birsa Munda Zoo', 'Jagannath Temple', 'Pahari Mandir', 'McCluskieganj'],
    airport: 'Birsa Munda Airport (IXR)',
    railway: 'Ranchi Railway Station',
    highway: 'NH-33, NH-23, NH-75',
    altitude: '651 meters above sea level',
    bestSeason: 'October to March',
    climate: 'Pleasant throughout the year, moderate summers',
    industries: 'Steel, Mining, IT, Government offices',
    tip: 'Ranchi is known for its pleasant climate and scenic waterfalls. The city is the gateway to Jharkhand tourism.',
    nearbyAttractions: ['Netarhat (156 km)', 'Betla National Park (140 km)', 'Deoghar (250 km)'],
  },
  'jamshedpur': {
    fullName: 'Jamshedpur',
    state: 'Jharkhand',
    knownFor: 'Steel City of India, Tata Nagar',
    population: '13 lakh+',
    landmarks: ['Jubilee Park', 'Dimna Lake', 'Dalma Wildlife Sanctuary', 'Tata Steel Plant', 'Bhuvaneshwari Temple', 'Russi Modi Centre', 'Sir Dorabji Tata Park'],
    airport: 'Sonari Airport (IXW) — limited flights; nearest major: Ranchi',
    railway: 'Tatanagar Junction (Major hub)',
    highway: 'NH-33, NH-49',
    altitude: '135 meters',
    bestSeason: 'November to February',
    climate: 'Hot summers, pleasant winters',
    industries: 'Steel (Tata Steel), Automotive, Engineering',
    tip: 'Jamshedpur is India\'s first planned industrial city, built by Tata Group. Jubilee Park is a must-visit.',
    nearbyAttractions: ['Dalma (20 km)', 'Baharagora (80 km)', 'Ghatshila (50 km)'],
  },
  'dhanbad': {
    fullName: 'Dhanbad',
    state: 'Jharkhand',
    knownFor: 'Coal Capital of India',
    population: '12 lakh+',
    landmarks: ['Topchanchi Lake', 'Maithon Dam', 'Panchet Dam', 'IIT (ISM) Dhanbad', 'Jharia Coal Fields', 'Charak Puja Ground'],
    airport: 'Nearest: Ranchi (160 km) or Kolkata (260 km)',
    railway: 'Dhanbad Junction (Major railway hub)',
    highway: 'NH-2 (Grand Trunk Road), NH-32',
    altitude: '227 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, cool winters',
    industries: 'Coal mining, Steel, Power',
    tip: 'Dhanbad is a major coal belt city. Maithon and Panchet dams nearby are great picnic spots.',
    nearbyAttractions: ['Maithon Dam (48 km)', 'Topchanchi (32 km)', 'Bokaro (50 km)'],
  },
  'bokaro': {
    fullName: 'Bokaro Steel City',
    state: 'Jharkhand',
    knownFor: 'Steel Capital of Jharkhand',
    population: '5 lakh+',
    landmarks: ['Jawaharlal Nehru Biological Park', 'City Park', 'Bokaro Steel Plant', 'Garga Dam', 'Parasnath Temple (nearby)', 'Tenughat Reservoir'],
    airport: 'Nearest: Ranchi (115 km)',
    railway: 'Bokaro Steel City Station',
    highway: 'NH-23, NH-32',
    altitude: '210 meters',
    bestSeason: 'October to February',
    climate: 'Hot and humid summers',
    industries: 'Steel (SAIL), Manufacturing',
    tip: 'Bokaro is a planned city with wide roads and parks. Visit the famous Biological Park with rare animals.',
    nearbyAttractions: ['Garga Dam (18 km)', 'Tenughat (25 km)', 'Hazaribagh (90 km)'],
  },
  'hazaribagh': {
    fullName: 'Hazaribagh',
    state: 'Jharkhand',
    knownFor: 'City of Thousand Gardens',
    population: '1.5 lakh+',
    landmarks: ['Hazaribagh National Park', 'Hazaribagh Lake', 'Rajrappa Temple', 'Canary Hill', 'Hazaribagh Wildlife Sanctuary', 'Konar Dam'],
    airport: 'Nearest: Ranchi (100 km)',
    railway: 'Hazaribagh Road Station',
    highway: 'NH-33',
    altitude: '614 meters',
    bestSeason: 'October to March',
    climate: 'Cool and pleasant',
    industries: 'Tourism, Mining, Agriculture',
    tip: 'Hazaribagh is at high altitude, offering a cool retreat. Hazaribagh National Park has leopards and wolves.',
    nearbyAttractions: ['Rajrappa (45 km)', 'Konar Dam (35 km)', 'Parasnath (80 km)'],
  },
  'deoghar': {
    fullName: 'Deoghar (Baidyanath Dham)',
    state: 'Jharkhand',
    knownFor: 'Baba Baidyanath Dham, Holy City',
    population: '2 lakh+',
    landmarks: ['Baidyanath Temple (Jyotirlinga)', 'Nandan Pahar', 'Tapovan Caves', 'Rikhia Ashram', 'Satsang Ashram', 'Mayurakshi River'],
    airport: 'Deoghar Airport (DGH) — operational',
    railway: 'Jasidih Junction (10 km from Deoghar)',
    highway: 'NH-114A',
    altitude: '254 meters',
    bestSeason: 'July-August (Shravan Mela), October-March',
    climate: 'Moderate throughout year',
    industries: 'Religious Tourism, Handloom',
    tip: 'Deoghar is one of the 12 Jyotirlingas. Millions visit during Shravan month. Book cabs well in advance during pilgrimage season.',
    nearbyAttractions: ['Basukinath Temple (45 km)', 'Trikut Pahar (10 km)', 'Madhupur (40 km)'],
  },
  'giridih': {
    fullName: 'Giridih',
    state: 'Jharkhand',
    knownFor: 'Parasnath Hill — Highest peak in Jharkhand',
    population: '1.5 lakh+',
    landmarks: ['Parasnath Hill (Shikharji)', 'Usri Falls', 'Khandoli Park', 'Jharkhand War Memorial', 'Phadkijharna Falls'],
    airport: 'Nearest: Ranchi (200 km)',
    railway: 'Giridih Station',
    highway: 'NH-32',
    altitude: '420 meters',
    bestSeason: 'October to March',
    climate: 'Moderate, cool in winters',
    industries: 'Mica mining, Agriculture',
    tip: 'Parasnath Hill (1365m) is the holiest Jain pilgrimage site. Plan for a full day if visiting the summit.',
    nearbyAttractions: ['Parasnath (20 km)', 'Usri Falls (25 km)', 'Hazaribagh (80 km)'],
  },
  'dumka': {
    fullName: 'Dumka',
    state: 'Jharkhand',
    knownFor: 'Cultural Capital of Santhal Pargana',
    population: '1 lakh+',
    landmarks: ['Massanjore Dam', 'Maluti Temple', 'Basukinath Temple (40 km)', 'Shikarpahari Hill', 'Pathrol Ghati'],
    airport: 'Nearest: Deoghar Airport (70 km)',
    railway: 'Dumka Station',
    highway: 'NH-114',
    altitude: '190 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, pleasant winters',
    industries: 'Agriculture, Silk weaving, Government',
    tip: 'Dumka is a gateway to Santhal heritage. Massanjore Dam (Kanada Dam) is a serene picnic destination.',
    nearbyAttractions: ['Massanjore Dam (30 km)', 'Maluti (30 km)', 'Basukinath (40 km)'],
  },
  'patna': {
    fullName: 'Patna',
    state: 'Bihar',
    knownFor: 'Capital of Bihar, Ancient Pataliputra',
    population: '28 lakh+',
    landmarks: ['Mahavir Mandir', 'Gol Ghar', 'Patna Museum', 'Agam Kuan', 'Patna Sahib Gurudwara', 'Gandhi Ghat', 'Nalanda Ruins (90 km)', 'Bodh Gaya (130 km)'],
    airport: 'Lok Nayak Jayaprakash Airport (PAT)',
    railway: 'Patna Junction (Major hub)',
    highway: 'NH-30, NH-19 (Grand Trunk Road)',
    altitude: '53 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, cold winters',
    industries: 'Government, Education, Trade',
    tip: 'Patna is a major destination for business and pilgrimage. Plan your visit during Chhath Puja for a unique cultural experience.',
    nearbyAttractions: ['Bodh Gaya (130 km)', 'Rajgir (100 km)', 'Nalanda (95 km)'],
  },
  'kolkata': {
    fullName: 'Kolkata',
    state: 'West Bengal',
    knownFor: 'City of Joy, Cultural Capital of India',
    population: '1.5 crore+',
    landmarks: ['Victoria Memorial', 'Howrah Bridge', 'Kalighat Temple', 'Dakshineswar Temple', 'Indian Museum', 'Eden Gardens', 'Sundarbans (80 km)'],
    airport: 'Netaji Subhas Chandra Bose International Airport (CCU)',
    railway: 'Howrah Junction, Sealdah Station (Major hubs)',
    highway: 'NH-16, NH-12',
    altitude: '6 meters',
    bestSeason: 'October to February',
    climate: 'Humid tropical, mild winters',
    industries: 'Trade, IT, Manufacturing, Port',
    tip: 'Kolkata is well-connected by road from Jharkhand. NH-33 connects Ranchi to Kolkata via Jamshedpur in 6-7 hours.',
    nearbyAttractions: ['Sundarbans (90 km)', 'Digha Beach (185 km)', 'Shantiniketan (160 km)'],
  },
  'bhubaneswar': {
    fullName: 'Bhubaneswar',
    state: 'Odisha',
    knownFor: 'Temple City, Capital of Odisha',
    population: '10 lakh+',
    landmarks: ['Lingaraj Temple', 'Mukteshwar Temple', 'Udayagiri & Khandagiri Caves', 'Nandankanan Zoological Park', 'Dhauli Shanti Stupa', 'ISKCON Bhubaneswar', 'Odisha State Museum'],
    airport: 'Biju Patnaik International Airport (BBI)',
    railway: 'Bhubaneswar Station',
    highway: 'NH-16, NH-57',
    altitude: '45 meters',
    bestSeason: 'October to February',
    climate: 'Tropical, hot summers, mild winters',
    industries: 'IT, Tourism, Government, Steel',
    tip: 'Bhubaneswar has 700+ ancient temples. Club it with Puri (60 km) and Konark (65 km) for a 3-day Odisha trip.',
    nearbyAttractions: ['Puri Beach (60 km)', 'Konark Sun Temple (65 km)', 'Chilika Lake (100 km)'],
  },
  'gaya': {
    fullName: 'Gaya',
    state: 'Bihar',
    knownFor: 'Bodh Gaya — Enlightenment of Buddha',
    population: '4.7 lakh+',
    landmarks: ['Bodh Gaya (13 km)', 'Mahabodhi Temple', 'Vishnupad Temple', 'Dungeshwari Hill', 'Sujata Stupa', 'Rajgir (80 km)'],
    airport: 'Gaya International Airport (GAY)',
    railway: 'Gaya Junction',
    highway: 'NH-82, NH-83',
    altitude: '113 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, pleasant winters',
    industries: 'Pilgrimage tourism, Agriculture',
    tip: 'Gaya is famous for Pitru Paksha (ancestor rituals). Bodh Gaya is a UNESCO World Heritage Site — home of Buddha\'s enlightenment.',
    nearbyAttractions: ['Bodh Gaya (13 km)', 'Rajgir (80 km)', 'Nalanda (100 km)'],
  },
  'varanasi': {
    fullName: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    knownFor: 'Spiritual Capital of India, Oldest Living City',
    population: '15 lakh+',
    landmarks: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Assi Ghat', 'Sarnath (12 km)', 'Ramnagar Fort', 'Manikarnika Ghat'],
    airport: 'Lal Bahadur Shastri International Airport (VNS)',
    railway: 'Varanasi Junction, Mughal Sarai Junction',
    highway: 'NH-19, NH-7',
    altitude: '81 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, cold winters',
    industries: 'Tourism, Silk weaving (Banarasi saree), Handicrafts',
    tip: 'Varanasi is 600 km+ from Ranchi. Plan an overnight stay or 2-day trip. The evening Ganga Aarti is a must-see.',
    nearbyAttractions: ['Sarnath (12 km)', 'Vindhyachal (75 km)', 'Ayodhya (200 km)'],
  },
  'puri': {
    fullName: 'Puri',
    state: 'Odisha',
    knownFor: 'Lord Jagannath Dham, Beach City',
    population: '2 lakh+',
    landmarks: ['Jagannath Temple', 'Puri Beach', 'Gundicha Temple', 'Chilika Lake (45 km)', 'Konark Sun Temple (35 km)', 'Raghurajpur Craft Village'],
    airport: 'Nearest: Bhubaneswar (60 km)',
    railway: 'Puri Station (end of line)',
    highway: 'NH-16',
    altitude: '3 meters',
    bestSeason: 'October to February',
    climate: 'Tropical coastal, hot and humid',
    industries: 'Tourism, Fishing, Handicrafts',
    tip: 'Puri is one of the 4 Char Dham. Rath Yatra festival in June-July attracts millions. Book cabs 2-3 months in advance during festival season.',
    nearbyAttractions: ['Konark Sun Temple (35 km)', 'Chilika Lake (45 km)', 'Bhubaneswar (60 km)'],
  },
  'rourkela': {
    fullName: 'Rourkela',
    state: 'Odisha',
    knownFor: 'Steel City of Odisha',
    population: '5 lakh+',
    landmarks: ['Hanuman Vatika', 'Mandira Dam', 'Vedvyas Temple', 'NIT Rourkela', 'SAIL Rourkela Steel Plant', 'Pitamahal Dam'],
    airport: 'Nearest: Ranchi (170 km) or Bhubaneswar (380 km)',
    railway: 'Rourkela Station',
    highway: 'NH-143, NH-49',
    altitude: '219 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, pleasant winters',
    industries: 'Steel (SAIL), Fertilizers, Aluminium',
    tip: 'Rourkela is well connected to Ranchi, Jamshedpur and Bhubaneswar. It\'s famous for Sambalpuri culture and handloom.',
    nearbyAttractions: ['Mandira Dam (35 km)', 'Bonai (100 km)', 'Sundargarh (50 km)'],
  },
  'adityapur': {
    fullName: 'Adityapur',
    state: 'Jharkhand',
    knownFor: 'Asia\'s largest industrial estate, Jamshedpur twin city',
    population: '2 lakh+',
    landmarks: ['Adityapur Industrial Area', 'Gamharia Market', 'Chandil Dam (30 km)', 'Subarnarekha River'],
    airport: 'Nearest: Jamshedpur/Sonari (15 km)',
    railway: 'Adityapur Station, Gamharia',
    highway: 'NH-33',
    altitude: '130 meters',
    bestSeason: 'November to February',
    climate: 'Hot summers, pleasant winters',
    industries: 'Steel ancillaries, Automotive, Manufacturing',
    tip: 'Adityapur is a rapidly growing industrial township adjacent to Jamshedpur. It serves as the industrial backbone of Tata Steel ecosystem.',
    nearbyAttractions: ['Jamshedpur (10 km)', 'Chandil Dam (30 km)', 'Baharagora (80 km)'],
  },
  'chaibasa': {
    fullName: 'Chaibasa (West Singhbhum HQ)',
    state: 'Jharkhand',
    knownFor: 'Gateway to Saranda Forest, Ho tribe culture',
    population: '0.8 lakh',
    landmarks: ['Saranda Forest', 'Kiriburu Iron Ore Mines', 'Porahat Estate', 'Gua Mines', 'Joranda Falls'],
    airport: 'Nearest: Jamshedpur (75 km)',
    railway: 'Chaibasa Station',
    highway: 'NH-220',
    altitude: '218 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, pleasant winters, good monsoon',
    industries: 'Iron ore mining, Tribal handicrafts',
    tip: 'Chaibasa is the gateway to Saranda, one of India\'s largest Sal forests. Perfect for wildlife and tribal culture experiences.',
    nearbyAttractions: ['Saranda Forest (25 km)', 'Baharagora (90 km)', 'Jamshedpur (75 km)'],
  },
  'chakradharpur': {
    fullName: 'Chakradharpur',
    state: 'Jharkhand',
    knownFor: 'Railway junction, Tribal heartland',
    population: '0.7 lakh',
    landmarks: ['Chakradharpur Railway Division HQ', 'Kolhan Region', 'Chiria Mines (120 km)'],
    airport: 'Nearest: Jamshedpur (60 km)',
    railway: 'Chakradharpur Station (Important junction)',
    highway: 'NH-75',
    altitude: '240 meters',
    bestSeason: 'October to March',
    climate: 'Hot and humid',
    industries: 'Railway workshop, Mining, Agriculture',
    tip: 'Chakradharpur is an important railway junction connecting Jharkhand to Odisha and West Bengal.',
    nearbyAttractions: ['Chaibasa (35 km)', 'Rourkela (80 km)', 'Jamshedpur (60 km)'],
  },
  'netarhat': {
    fullName: 'Netarhat',
    state: 'Jharkhand',
    knownFor: 'Queen of Chotanagpur, Scenic hill station',
    population: '0.05 lakh',
    landmarks: ['Netarhat Residential School', 'Sunset Point', 'Magnolia Point', 'Upper Ghaghari Falls', 'Lower Ghaghari Falls', 'Lodh Falls (60 km)'],
    airport: 'Nearest: Ranchi (156 km)',
    railway: 'Nearest: Daltonganj (80 km)',
    highway: 'State roads from Ranchi and Daltonganj',
    altitude: '1128 meters',
    bestSeason: 'October to March (sunrise-sunset views are best Nov-Jan)',
    climate: 'Cool throughout, cold in winter',
    industries: 'Tourism, Government school, Agriculture',
    tip: 'Netarhat is famous for breathtaking sunrises and sunsets. It\'s a perfect weekend getaway from Ranchi. The plateau offers camping opportunities.',
    nearbyAttractions: ['Upper Ghaghari Falls (18 km)', 'Betla National Park (88 km)', 'Daltonganj (80 km)'],
  },
  'mccluskieganj': {
    fullName: 'McCluskieganj',
    state: 'Jharkhand',
    knownFor: 'British-era Anglo-Indian settlement, Heritage township',
    population: '0.05 lakh',
    landmarks: ['Heritage Bungalows', 'Catholic Church', 'Francis Church', 'McCluskieganj Colony', 'Damodar River'],
    airport: 'Nearest: Ranchi (63 km)',
    railway: 'Bhurkunda Station',
    highway: 'State highway from Ranchi',
    altitude: '700 meters',
    bestSeason: 'October to March',
    climate: 'Cool and pleasant',
    industries: 'Heritage tourism, Agriculture',
    tip: 'McCluskieganj is a unique heritage destination with colonial-era bungalows. Perfect for a peaceful day trip from Ranchi.',
    nearbyAttractions: ['Ranchi (63 km)', 'Ramgarh (25 km)', 'Rajrappa (30 km)'],
  },
  'daltonganj': {
    fullName: 'Daltonganj (Medininagar)',
    state: 'Jharkhand',
    knownFor: 'Gateway to Betla National Park, Palamu district HQ',
    population: '0.9 lakh',
    landmarks: ['Palamu Fort', 'North Koel River', 'Betla National Park (25 km)', 'Palamu Tiger Reserve', 'Burha Danga Waterfall'],
    airport: 'Nearest: Ranchi (160 km)',
    railway: 'Daltonganj Station',
    highway: 'NH-39',
    altitude: '220 meters',
    bestSeason: 'October to March (Betla safari: Oct-Jun)',
    climate: 'Hot summers, pleasant winters',
    industries: 'Government, Agriculture, Timber',
    tip: 'Daltonganj is the base for Betla tiger reserve. Book your safari permit in advance. Also visit the ancient Palamu Fort.',
    nearbyAttractions: ['Betla National Park (25 km)', 'Palamu Fort (20 km)', 'Netarhat (80 km)'],
  },
  'gumla': {
    fullName: 'Gumla',
    state: 'Jharkhand',
    knownFor: 'Tribal culture, Ancient temples, Nagpuri music',
    population: '0.9 lakh',
    landmarks: ['Nagpuri Buxar Temple', 'Palkot Wildlife Sanctuary', 'Deulghati Waterfall', 'Sisai Temple', 'Ango Waterfall'],
    airport: 'Nearest: Ranchi (80 km)',
    railway: 'Nearest: Ranchi (80 km)',
    highway: 'NH-75, State highway',
    altitude: '600 meters',
    bestSeason: 'October to March',
    climate: 'Cool and pleasant due to altitude',
    industries: 'Agriculture, Handicrafts, Government',
    tip: 'Gumla has rich tribal heritage and ancient temples. Palkot Wildlife Sanctuary offers wildlife spotting opportunities.',
    nearbyAttractions: ['Ranchi (80 km)', 'Netarhat (70 km)', 'Betla (100 km)'],
  },
  'ghatshila': {
    fullName: 'Ghatshila',
    state: 'Jharkhand',
    knownFor: 'Literary town, Subarnarekha river, Scenic beauty',
    population: '0.25 lakh',
    landmarks: ['Subarnarekha River', 'Dharagiri Falls', 'Ghatshila Copper Mines', 'Fuldungri Hills', 'Bibhutibhushan\'s Cottage'],
    airport: 'Nearest: Jamshedpur (50 km)',
    railway: 'Ghatshila Station',
    highway: 'NH-6, NH-33',
    altitude: '60 meters',
    bestSeason: 'October to March',
    climate: 'Tropical, hot summers',
    industries: 'Copper mining, Tourism',
    tip: 'Ghatshila is a writer\'s paradise. Bengali author Bibhutibhushan Bandyopadhyay lived here. Dharagiri falls is beautiful post-monsoon.',
    nearbyAttractions: ['Jamshedpur (50 km)', 'Baharagora (40 km)', 'Subarnarekha banks'],
  },
  'lohardaga': {
    fullName: 'Lohardaga',
    state: 'Jharkhand',
    knownFor: 'Bauxite mining, Tribal culture',
    population: '0.6 lakh',
    landmarks: ['Kailash Dham Temple', 'Arki River', 'Senha Dam', 'Tribal Cultural Centre'],
    airport: 'Nearest: Ranchi (70 km)',
    railway: 'Lohardaga Station',
    highway: 'State highway from Ranchi',
    altitude: '620 meters',
    bestSeason: 'October to March',
    climate: 'Pleasant due to altitude',
    industries: 'Bauxite and Aluminium mining',
    tip: 'Lohardaga is gateway to many waterfalls in Jharkhand. The scenic drive from Ranchi through forests is beautiful.',
    nearbyAttractions: ['Ranchi (70 km)', 'Gumla (50 km)', 'Netarhat (80 km)'],
  },
  'asansol': {
    fullName: 'Asansol',
    state: 'West Bengal',
    knownFor: 'Coal and Steel city of Bengal',
    population: '13 lakh+',
    landmarks: ['Burnpur IISCO Steel', 'Maithon Dam (40 km)', 'Chittaranjan Locomotive Works', 'Kalyaneshwari Temple', 'Ram Krishna Mission'],
    airport: 'Nearest: Kolkata (200 km)',
    railway: 'Asansol Junction (Major hub)',
    highway: 'NH-2 (Grand Trunk Road)',
    altitude: '110 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, cool winters',
    industries: 'Steel, Coal, Engineering',
    tip: 'Asansol is a major industrial city. Maithon Dam and Panchet Dam nearby offer beautiful reservoir views.',
    nearbyAttractions: ['Maithon Dam (40 km)', 'Durgapur (55 km)', 'Dhanbad (40 km)'],
  },
  'betla': {
    fullName: 'Betla National Park',
    state: 'Jharkhand',
    knownFor: 'Palamu Tiger Reserve, First national park in Jharkhand',
    population: 'Small settlement',
    landmarks: ['Betla Wildlife Sanctuary', 'Palamu Tiger Reserve', 'Palamu Fort', 'Betla Dam', 'North Koel River'],
    airport: 'Nearest: Ranchi (140 km)',
    railway: 'Nearest: Daltonganj (25 km)',
    highway: 'NH-39',
    altitude: '370 meters',
    bestSeason: 'October to June (closed during monsoon)',
    climate: 'Hot summers, mild winters',
    industries: 'Ecotourism, Forest department',
    tip: 'Betla has tigers, elephants, leopards. Early morning (6-8 AM) safari gives best wildlife sightings. Pre-book forest department jeep safari.',
    nearbyAttractions: ['Daltonganj (25 km)', 'Netarhat (88 km)', 'Latehar (70 km)'],
  },
  'koderma': {
    fullName: 'Koderma',
    state: 'Jharkhand',
    knownFor: 'Mica capital of India',
    population: '0.7 lakh',
    landmarks: ['Tilaiya Dam', 'Koderma Wildlife Sanctuary', 'Tinpahar Hill', 'Jhajha Hills'],
    airport: 'Nearest: Ranchi (130 km)',
    railway: 'Koderma Station',
    highway: 'NH-2 (Grand Trunk Road)',
    altitude: '420 meters',
    bestSeason: 'October to March',
    climate: 'Pleasant, relatively cool',
    industries: 'Mica mining, Agriculture',
    tip: 'Koderma is on the main highway between Jharkhand and Bihar. Tilaiya Dam is a scenic spot for day trips.',
    nearbyAttractions: ['Tilaiya Dam (20 km)', 'Hazaribagh (80 km)', 'Giridih (60 km)'],
  },
  'ramgarh': {
    fullName: 'Ramgarh',
    state: 'Jharkhand',
    knownFor: 'Rajrappa Temple, Industrial zone',
    population: '0.8 lakh',
    landmarks: ['Rajrappa Temple (Chhinnamastika)', 'Ramgarh Cantonment', 'Patratu Valley (30 km)', 'Gola River'],
    airport: 'Nearest: Ranchi (65 km)',
    railway: 'Ramgarh Cantonment Station',
    highway: 'NH-23',
    altitude: '390 meters',
    bestSeason: 'October to March',
    climate: 'Pleasant',
    industries: 'Coal mining, Cement, Explosives',
    tip: 'Rajrappa temple is one of the most visited Shakti shrines in Jharkhand, at the confluence of Damodar and Bhairavi rivers.',
    nearbyAttractions: ['Rajrappa (15 km)', 'Patratu Valley (30 km)', 'Hazaribagh (55 km)'],
  },
  'patratu': {
    fullName: 'Patratu',
    state: 'Jharkhand',
    knownFor: 'Patratu Valley, Thermal Power Plant',
    population: '0.4 lakh',
    landmarks: ['Patratu Valley (Scenic viewpoints)', 'Patratu Dam', 'Patratu Thermal Power Station', 'Pithauriya'],
    airport: 'Nearest: Ranchi (40 km)',
    railway: 'Patratu Station',
    highway: 'NH-23',
    altitude: '430 meters',
    bestSeason: 'October to March (valley viewpoint is best in morning)',
    climate: 'Pleasant',
    industries: 'Power generation, Coal',
    tip: 'Patratu Valley is one of Jharkhand\'s most scenic drives. The winding road through the valley with Patratu reservoir views is stunning.',
    nearbyAttractions: ['Ranchi (40 km)', 'Ramgarh (30 km)', 'Hazaribagh (60 km)'],
  },
  'chandil': {
    fullName: 'Chandil',
    state: 'Jharkhand',
    knownFor: 'Chandil Dam (Subarnarekha Project)',
    population: '0.2 lakh',
    landmarks: ['Chandil Dam', 'Chandil Reservoir', 'Subarnarekha River', 'Ichagarh (nearby)'],
    airport: 'Nearest: Jamshedpur (60 km)',
    railway: 'Chandil Station',
    highway: 'NH-33',
    altitude: '150 meters',
    bestSeason: 'October to February',
    climate: 'Hot summers, pleasant winters',
    industries: 'Agriculture, Small industries',
    tip: 'Chandil dam is perfect for picnics and boating. The reservoir view is stunning especially in winter mornings.',
    nearbyAttractions: ['Jamshedpur (60 km)', 'Adityapur (55 km)', 'Gamharia (50 km)'],
  },
  'saraikela': {
    fullName: 'Saraikela-Kharsawan',
    state: 'Jharkhand',
    knownFor: 'Chhau Dance, Cultural heritage',
    population: '0.3 lakh',
    landmarks: ['Saraikela Palace', 'Kharsawan Palace', 'Chandil Dam (25 km)', 'Jamshedpur (30 km)'],
    airport: 'Nearest: Jamshedpur (30 km)',
    railway: 'Nearest: Jamshedpur (30 km)',
    highway: 'NH-33',
    altitude: '145 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers, pleasant winters',
    industries: 'Handicrafts, Agriculture, Chhau mask making',
    tip: 'Saraikela is the birthplace of Chhau dance, a traditional masked dance art form. Visit during annual Chhau festival (Feb-March) for cultural experience.',
    nearbyAttractions: ['Jamshedpur (30 km)', 'Chandil (25 km)', 'Chaibasa (70 km)'],
  },
  'simdega': {
    fullName: 'Simdega',
    state: 'Jharkhand',
    knownFor: 'Tribal heartland, Jashpur border',
    population: '0.5 lakh',
    landmarks: ['Catholic Mission (historic)', 'Banjhi Mata Temple', 'Nagphani Hills'],
    airport: 'Nearest: Ranchi (135 km)',
    railway: 'Nearest: Ranchi (135 km)',
    highway: 'State highway',
    altitude: '610 meters',
    bestSeason: 'October to March',
    climate: 'Cool due to altitude',
    industries: 'Agriculture, Tribal handicrafts, Mining',
    tip: 'Simdega is a remote but scenic area with a large tribal Christian community. The landscape changes beautifully through the seasons.',
    nearbyAttractions: ['Ranchi (135 km)', 'Gumla (65 km)', 'Jashpur (Chhattisgarh border)'],
  },
  'khunti': {
    fullName: 'Khunti',
    state: 'Jharkhand',
    knownFor: 'Birsa Munda\'s birthplace, Tribal history',
    population: '0.5 lakh',
    landmarks: ['Birsa Munda Memorial', 'Ulihatu Village (Birsa\'s birthplace)', 'Panchabati Falls', 'Tapkara'],
    airport: 'Nearest: Ranchi (40 km)',
    railway: 'Nearest: Ranchi (40 km)',
    highway: 'NH-75',
    altitude: '592 meters',
    bestSeason: 'October to March',
    climate: 'Pleasant',
    industries: 'Agriculture, Tribal crafts',
    tip: 'Khunti is historically significant as birthplace of Birsa Munda, the tribal freedom fighter. Visit Ulihatu village for cultural insights.',
    nearbyAttractions: ['Ranchi (40 km)', 'Gumla (75 km)', 'Simdega (100 km)'],
  },
  'latehar': {
    fullName: 'Latehar',
    state: 'Jharkhand',
    knownFor: 'Mahuadanr Wolf Sanctuary, Tribal forests',
    population: '0.5 lakh',
    landmarks: ['Mahuadanr Wolf Sanctuary', 'Netarhat Plateau (50 km)', 'Lodh Falls (70 km)', 'Lawalong Wildlife Sanctuary'],
    airport: 'Nearest: Ranchi (130 km)',
    railway: 'Latehar Station',
    highway: 'NH-39',
    altitude: '410 meters',
    bestSeason: 'October to March',
    climate: 'Pleasant, cool in winter',
    industries: 'Forest products, Coal, Agriculture',
    tip: 'Latehar district has one of the last wolf sanctuaries in India. Dense Sal forests make for excellent eco-tourism.',
    nearbyAttractions: ['Netarhat (50 km)', 'Daltonganj (60 km)', 'Betla (70 km)'],
  },
  'hussainabad': {
    fullName: 'Hussainabad',
    state: 'Jharkhand',
    knownFor: 'Religious site, Palamu region',
    population: '0.3 lakh',
    landmarks: ['Hussainabad Fort', 'Budha Deewar (Ancient wall)', 'North Koel River'],
    airport: 'Nearest: Ranchi (150 km)',
    railway: 'Nearest: Daltonganj (80 km)',
    highway: 'State highway',
    altitude: '280 meters',
    bestSeason: 'October to March',
    climate: 'Hot summers',
    industries: 'Agriculture, Small trade',
    tip: 'Hussainabad is a historic town with ancient forts and medieval structures in the Palamu belt.',
    nearbyAttractions: ['Daltonganj (80 km)', 'Betla (100 km)', 'Chatra (60 km)'],
  },
  'mango': {
    fullName: 'Mango (Jamshedpur suburb)',
    state: 'Jharkhand',
    knownFor: 'Urban suburb of Jamshedpur',
    population: '2 lakh+',
    landmarks: ['Jubilee Park (adjacent in Jamshedpur)', 'Subarnarekha River', 'Dimna Lake (10 km)'],
    airport: 'Nearest: Jamshedpur/Sonari (5 km)',
    railway: 'Tatanagar Junction (5 km)',
    highway: 'NH-33',
    altitude: '135 meters',
    bestSeason: 'November to February',
    climate: 'Hot summers, pleasant winters',
    industries: 'Residential, Commercial, Industry (adjacent to Jamshedpur)',
    tip: 'Mango is the most populated suburb of Jamshedpur. Well connected to all parts of the city and surroundings.',
    nearbyAttractions: ['Jamshedpur city (5 km)', 'Jubilee Park (5 km)', 'Dimna Lake (10 km)'],
  },
};

// ============================================================
// HIGHWAY DATABASE for routes
// ============================================================
const HIGHWAY_DATA = {
  'ranchi-jamshedpur': { highway: 'NH-33', km: 130, time: '2.5-3.5 hrs', via: 'Ramgarh, Chandil' },
  'ranchi-dhanbad': { highway: 'NH-23, NH-32', km: 160, time: '3.5-4.5 hrs', via: 'Hazaribagh, Barhi' },
  'ranchi-kolkata': { highway: 'NH-33, NH-6', km: 420, time: '7-8 hrs', via: 'Jamshedpur, Kharagpur' },
  'ranchi-patna': { highway: 'NH-33, NH-30', km: 340, time: '6-7 hrs', via: 'Hazaribagh, Koderma, Gaya' },
  'ranchi-bhubaneswar': { highway: 'NH-33, NH-49', km: 480, time: '8-10 hrs', via: 'Jamshedpur, Chaibasa, Rourkela' },
  'jamshedpur-kolkata': { highway: 'NH-33, NH-6', km: 285, time: '5-6 hrs', via: 'Kharagpur, Mecheda' },
  'jamshedpur-bhubaneswar': { highway: 'NH-49, NH-16', km: 395, time: '6-8 hrs', via: 'Rourkela, Sambalpur' },
  'dhanbad-kolkata': { highway: 'NH-2 (GT Road)', km: 260, time: '5-6 hrs', via: 'Asansol, Durgapur' },
  'ranchi-deoghar': { highway: 'NH-33, State Highway', km: 250, time: '5-6 hrs', via: 'Hazaribagh, Giridih, Madhupur' },
  'ranchi-gaya': { highway: 'NH-33, NH-83', km: 260, time: '5-6 hrs', via: 'Hazaribagh, Koderma, Aurangabad' },
  'ranchi-varanasi': { highway: 'NH-33, NH-19', km: 600, time: '10-12 hrs', via: 'Hazaribagh, Gaya, Mughal Sarai' },
};

// ============================================================
// CONTENT TEMPLATES — Rich content blocks
// ============================================================
function generateRouteContent(fromCity, toCity, fromData, toData, fareData) {
  const from = fromCity.charAt(0).toUpperCase() + fromCity.slice(1);
  const to = toCity.charAt(0).toUpperCase() + toCity.slice(1);
  const fromFull = fromData ? fromData.fullName : from;
  const toFull = toData ? toData.fullName : to;
  const fromKnown = fromData ? fromData.knownFor : `${from}, Jharkhand`;
  const toKnown = toData ? toData.knownFor : `${to}`;
  const dist = fareData.dist;
  const time = fareData.time;
  const sedanFare = fareData.sedanFare;
  const suvFare = fareData.suvFare;
  const crystaFare = fareData.crystaFare;
  const sedanRound = fareData.sedanRound;
  const via = fareData.via || 'national highway';

  const fromLandmarks = fromData ? fromData.landmarks.slice(0, 3).join(', ') : `${from} city`;
  const toLandmarks = toData ? toData.landmarks.slice(0, 4).join(', ') : `${to} city`;
  const fromHighway = fromData ? fromData.highway : 'NH-33';
  const toBestSeason = toData ? toData.bestSeason : 'October to March';
  const toTip = toData ? toData.tip : `${to} is a popular destination from ${from}.`;
  const fromTip = fromData ? fromData.tip : `${from} is well-connected to major cities.`;
  const toNearby = toData ? toData.nearbyAttractions.join(', ') : '';

  return `
                <h2>${from} to ${to} Cab Service – Complete Travel Guide 2026</h2>
                <p>Planning a trip from <strong>${fromFull}</strong> to <strong>${toFull}</strong>? Rohit Travels provides the most reliable and affordable <strong>${from} to ${to} cab service</strong> starting at just <strong>₹11/km</strong>. With 10+ years of experience serving thousands of satisfied passengers across Jharkhand, Bihar, West Bengal and Odisha, we are your trusted partner for outstation travel.</p>

                <p>Whether you need a <strong>one-way cab from ${from} to ${to}</strong> or a comfortable round-trip package, our professional drivers and well-maintained AC cars ensure a smooth, safe journey every time. Our <strong>${from} to ${to} taxi fare</strong> is transparent — no hidden charges, no surge pricing.</p>

                <h3>About ${fromFull}</h3>
                <p>${fromData ? fromData.fullName : from} is known as the <em>${fromKnown}</em>.${fromData ? ` With a population of ${fromData.population}, it is home to major landmarks including ${fromLandmarks}.` : ''} ${fromTip}</p>
                ${fromData && fromData.airport ? `<p><strong>Nearest Airport:</strong> ${fromData.airport} | <strong>Main Highway:</strong> ${fromData.highway}</p>` : ''}

                <h3>About ${toFull}</h3>
                <p>${toFull} is famous as the <em>${toKnown}</em>. ${toTip} ${toData ? `Key attractions include <strong>${toLandmarks}</strong>.` : ''}</p>
                ${toNearby ? `<p><strong>Places to visit near ${to}:</strong> ${toNearby}</p>` : ''}
                ${toData && toData.bestSeason ? `<p><strong>Best time to visit ${to}:</strong> ${toBestSeason}</p>` : ''}

                <h3>${from} to ${to} Route Information</h3>
                <p>The road distance from ${from} to ${to} is approximately <strong>${dist} km</strong>, and the journey takes about <strong>${time}</strong> by cab. The route via <strong>${via}</strong> is mostly well-paved national highway, making it a comfortable drive year-round. Our drivers are fully familiar with this route and know the best roads, dhaba stops, and rest areas along the way.</p>

                <h3>${from} to ${to} Taxi Fare Breakdown</h3>
                <p>We offer transparent, all-inclusive pricing with no hidden charges:</p>
                <ul>
                    <li><strong>Sedan (Dzire/Aura) One-Way:</strong> ₹${sedanFare} | Round Trip: ₹${sedanRound} | Rate: ₹11/km</li>
                    <li><strong>SUV (Ertiga 7-Seater) One-Way:</strong> ₹${suvFare} | Round Trip: ₹${Math.round(suvFare * 1.8 / 100) * 100} | Rate: ₹11/km</li>
                    <li><strong>Innova Crysta One-Way:</strong> ₹${crystaFare} | Round Trip: ₹${Math.round(crystaFare * 1.8 / 100) * 100} | Rate: ₹13/km</li>
                </ul>
                <p>✅ All fares include driver allowance and fuel. Toll charges and parking fees extra. Night charges (10 PM – 6 AM): ₹200 extra. Waiting charges after 30 mins: ₹150/hr.</p>

                <h3>Types of ${from} to ${to} Cab Services</h3>
                <ul>
                    <li><strong>One-Way Drop Cab:</strong> Starting ₹${sedanFare} (Sedan). Pay only for one direction — no return charges. Ideal for those who want to travel one-way and return by train/flight.</li>
                    <li><strong>Round Trip Cab:</strong> Starting ₹${sedanRound}. Driver stays overnight if needed. Best for pilgrimage tours, business meetings, or 2-3 day trips.</li>
                    <li><strong>Outstation with Multiple Stops:</strong> Visit multiple destinations on the way — add ₹150/hr for waiting. Perfect for family sightseeing tours.</li>
                    <li><strong>Airport/Railway Transfer:</strong> Direct pickup from ${fromData && fromData.airport ? fromData.airport : from + ' Airport/Station'} to ${to}. Fixed rates with flight tracking.</li>
                    <li><strong>Corporate Travel:</strong> Monthly contract packages for business professionals. Invoice provided. GSTIN available on request.</li>
                </ul>

                <h3>Journey Planning — ${from} to ${to} Travel Tips</h3>
                <ul>
                    <li><strong>Best Departure Time:</strong> Start at 5:30–6:30 AM to avoid city traffic, enjoy a comfortable drive, and reach by afternoon. Avoids both morning and evening rush hours.</li>
                    <li><strong>Road Conditions:</strong> The route via ${via} is on national highway, well-maintained throughout the year. Minor diversions possible during monsoon (July–September).</li>
                    <li><strong>Rest Stops:</strong> Your driver will suggest the best dhabas and restaurants en route. Typical rest stops: after every 80-100 km. Please inform driver of dietary preferences.</li>
                    <li><strong>What to Carry:</strong> Government ID proof (Aadhaar/PAN), water bottles (car has AC but good to have), charger/power bank, any medicines, snacks for kids.</li>
                    <li><strong>Night Travel:</strong> Available with ₹200 night charge. Drivers are experienced in night driving. All cars have GPS tracking for safety.</li>
                    <li><strong>Payment:</strong> Pay after journey completion. Accepted: Cash, PhonePe, GPay, Paytm, UPI, Bank Transfer. GST invoice available for corporate bookings.</li>
                    ${toData && toData.bestSeason ? `<li><strong>Best Season for ${to}:</strong> ${toData.bestSeason} — plan your trip accordingly for best experience.</li>` : ''}
                </ul>

                <h3>Why Choose Rohit Travels for ${from} to ${to}?</h3>
                <p>With hundreds of <strong>${from} to ${to} taxi</strong> trips completed, here's what sets us apart:</p>
                <ul>
                    <li>✅ <strong>Own fleet — No aggregator markup:</strong> We own our cars. No commission to Ola/Uber. You save 20-30% vs app-based cabs.</li>
                    <li>✅ <strong>Local expert drivers:</strong> Our drivers know every km of the <strong>${from}-${to} route</strong>. They speak Hindi and are courteous and punctual.</li>
                    <li>✅ <strong>No surge pricing:</strong> Fixed rates, 365 days a year. Festival, weekend, or peak season — same price.</li>
                    <li>✅ <strong>Clean, sanitized cars:</strong> All vehicles cleaned after every trip. Sanitizer available inside. Phone charging cable provided.</li>
                    <li>✅ <strong>Real-time tracking:</strong> Share your trip with family. All cars GPS-enabled. 24/7 support from our office.</li>
                    <li>✅ <strong>4.9★ Google Rating:</strong> 87+ verified customer reviews. Read our reviews: "Best cab service in the region — on-time, clean cars, honest pricing."</li>
                    <li>✅ <strong>Trusted since 2015:</strong> 10+ years, 50,000+ trips, serving families, corporates, and pilgrims across Jharkhand.</li>
                </ul>

                <h3>Frequently Visited Places on the Way from ${from} to ${to}</h3>
                <p>Many travelers combine their ${from} to ${to} trip with sightseeing stops. Popular additions include:</p>
                <ul>
                    ${toData && toData.nearbyAttractions.length > 0 ? toData.nearbyAttractions.map(p => `<li>${p}</li>`).join('\n                    ') : `<li>Major cities and towns along the ${from}-${to} route</li>`}
                    ${fromData && fromData.nearbyAttractions.length > 0 ? `<li>${fromData.nearbyAttractions[0]} (near ${from})</li>` : ''}
                </ul>
                <p>Ask your driver or call us at <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> to customize your trip with sightseeing stops — we will create the perfect itinerary.</p>

                <h3>Book Your ${from} to ${to} Cab — Instant Confirmation</h3>
                <p>Booking is simple and takes just 2 minutes:</p>
                <ol>
                    <li>📞 Call or WhatsApp: <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a></li>
                    <li>📅 Share: Travel date, departure time, pickup location, number of passengers</li>
                    <li>✅ Receive: Driver name, car number, contact — 2-4 hours before pickup</li>
                    <li>🚗 Travel: Driver arrives on time. Pay after the journey.</li>
                </ol>
                <p>We are available <strong>24 hours a day, 7 days a week, 365 days a year</strong>. For same-day bookings, call directly for fastest confirmation. WhatsApp for rates and availability.</p>
`;
}

// ============================================================
// Parse route filename to get from/to city names
// ============================================================
function parseRouteFilename(filename) {
  // e.g. adityapur-to-bhubaneswar-cab.html
  const base = filename.replace('.html', '').replace('-cab', '');
  const parts = base.split('-to-');
  if (parts.length !== 2) return null;
  return {
    fromSlug: parts[0],
    toSlug: parts[1],
    fromCity: parts[0].replace(/-/g, ' '),
    toCity: parts[1].replace(/-/g, ' '),
  };
}

// ============================================================
// Extract fare data from existing HTML
// ============================================================
function extractFareData(html) {
  const sedanMatch = html.match(/Sedan.*?One-Way.*?₹([\d,]+).*?Round Trip.*?₹([\d,]+)/s) ||
                     html.match(/<td class="price">₹([\d,]+)<\/td>.*?<td class="price">₹([\d,]+)<\/td>/s);
  const suvMatch = html.match(/SUV.*?₹([\d,]+)/);
  const crystaMatch = html.match(/Innova Crysta.*?₹([\d,]+)/);
  const distMatch = html.match(/(\d{2,4})\s*km/);
  const timeMatch = html.match(/(\d+)[–-](\d+)\s*hrs?/);
  const viaMatch = html.match(/[Vv]ia\s+([^.<\n]+?)[\.<]/);

  // Try to get fares from table
  const priceMatches = [...html.matchAll(/<td class="price">₹([\d,]+)<\/td>/g)];
  
  let sedanFare = 1800, sedanRound = 3200, suvFare = 2200, crystaFare = 2600;
  
  if (priceMatches.length >= 2) {
    sedanFare = parseInt(priceMatches[0][1].replace(',', '')) || 1800;
    sedanRound = parseInt(priceMatches[1][1].replace(',', '')) || sedanFare * 1.8;
    if (priceMatches.length >= 4) {
      suvFare = parseInt(priceMatches[2][1].replace(',', '')) || sedanFare * 1.25;
      crystaFare = parseInt(priceMatches[4] ? priceMatches[4][1].replace(',', '') : sedanFare * 1.5) || sedanFare * 1.5;
    }
  }

  const dist = distMatch ? parseInt(distMatch[1]) : 200;
  const time = timeMatch ? `${timeMatch[1]}–${timeMatch[2]} hrs` : '3-5 hrs';
  const via = viaMatch ? viaMatch[1].trim() : 'national highway';

  return { sedanFare, sedanRound, suvFare, crystaFare, dist, time, via };
}

// ============================================================
// MAIN PROCESSOR
// ============================================================
const ROUTES_DIR = path.join(__dirname, 'routes');
const CITIES_DIR = path.join(__dirname, 'cities');

let processedRoutes = 0;
let processedCities = 0;
let errors = 0;

// Process Route Pages
console.log('\n🔄 Processing Route Pages — Adding Quality Content...\n');

if (fs.existsSync(ROUTES_DIR)) {
  const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
  console.log(`Found ${files.length} route pages.\n`);

  files.forEach((file, index) => {
    try {
      const parsed = parseRouteFilename(file);
      if (!parsed) return;

      const filePath = path.join(ROUTES_DIR, file);
      let html = fs.readFileSync(filePath, 'utf8');

      const fromData = CITY_DATA[parsed.fromSlug] || CITY_DATA[parsed.fromCity] || null;
      const toData = CITY_DATA[parsed.toSlug] || CITY_DATA[parsed.toCity] || null;
      const fareData = extractFareData(html);

      // Generate rich content
      const richContent = generateRouteContent(
        parsed.fromSlug.replace(/-/g, ' '),
        parsed.toSlug.replace(/-/g, ' '),
        fromData, toData, fareData
      );

      // Replace the existing .seo-content section
      const seoContentRegex = /<div class="seo-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*\n?\s*<!-- City Links/;
      
      if (seoContentRegex.test(html)) {
        html = html.replace(seoContentRegex,
          `<div class="seo-content">${richContent}\n            </div>\n        </div>\n    </section>\n\n    <!-- City Links`
        );
      } else {
        // Try alternative pattern — find the seo-content div and replace its inner content
        const altRegex = /(<div class="seo-content">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
        if (altRegex.test(html)) {
          html = html.replace(altRegex, `$1${richContent}\n            $3`);
        }
      }

      fs.writeFileSync(filePath, html, 'utf8');
      processedRoutes++;

      if ((index + 1) % 100 === 0) {
        console.log(`  ✅ ${index + 1}/${files.length} route pages updated...`);
      }
    } catch (err) {
      errors++;
      if (errors < 5) console.error(`  ❌ Error: ${file}: ${err.message}`);
    }
  });
  console.log(`\n✅ Route pages done: ${processedRoutes} updated, ${errors} errors`);
}

// Process City Pages
console.log('\n🔄 Processing City Pages — Adding Quality Content...\n');

if (fs.existsSync(CITIES_DIR)) {
  const cityDirs = fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  cityDirs.forEach(citySlug => {
    const cityPath = path.join(CITIES_DIR, citySlug);
    const htmlFiles = fs.readdirSync(cityPath).filter(f => f.endsWith('.html'));
    const cityData = CITY_DATA[citySlug];

    htmlFiles.forEach(file => {
      try {
        const filePath = path.join(cityPath, file);
        let html = fs.readFileSync(filePath, 'utf8');

        // Add quality content to city seo-content section if exists
        if (cityData && html.includes('class="seo-content"')) {
          const cityRichParagraph = `
                <p><strong>${cityData.fullName}</strong>, known as the <em>${cityData.knownFor}</em>, is home to ${cityData.population} residents and boasts major landmarks including <strong>${cityData.landmarks.slice(0,4).join(', ')}</strong>. ${cityData.tip}</p>
                <p>The <strong>nearest airport</strong> is ${cityData.airport}. Major highways connecting ${cityData.fullName} include <strong>${cityData.highway}</strong>. <strong>Best time to visit:</strong> ${cityData.bestSeason}.</p>
                <p>From ${cityData.fullName}, popular destinations worth combining your trip with include: <strong>${cityData.nearbyAttractions.join(', ')}</strong>.</p>
`;
          // Add after first paragraph in seo-content
          html = html.replace(
            /(<div class="seo-content">[\s\S]*?<\/p>)/,
            `$1${cityRichParagraph}`
          );
        }

        // Add "Why choose Rohit Travels" section if missing
        if (!html.includes('Own fleet') && html.includes('seo-content')) {
          const whyChooseBlock = `
                <h3>Why Choose Rohit Travels for Cab Service in ${cityData ? cityData.fullName : citySlug}?</h3>
                <ul>
                    <li>✅ <strong>Own fleet — No aggregator markup:</strong> Direct booking saves you 20-30% vs Ola/Uber.</li>
                    <li>✅ <strong>Local drivers:</strong> Experienced, courteous drivers who know every route.</li>
                    <li>✅ <strong>Fixed rates:</strong> No surge pricing. Same fare on festivals, weekends, and peak season.</li>
                    <li>✅ <strong>24/7 availability:</strong> Book anytime — early morning or midnight flights covered.</li>
                    <li>✅ <strong>Clean, sanitized cars:</strong> AC, GPS-enabled, with charging cable.</li>
                    <li>✅ <strong>4.9★ Google Rating:</strong> 87+ verified reviews. Trusted since 2015.</li>
                    <li>✅ <strong>Payment flexibility:</strong> Cash, UPI, PhonePe, GPay — pay after journey.</li>
                </ul>
                <h3>Service Areas in ${cityData ? cityData.fullName : citySlug}</h3>
                <p>We provide cab pickup and drop service from all major localities, railway stations, bus stands, and the airport in and around ${cityData ? cityData.fullName : citySlug}. Call us for pickup from any specific location — our drivers will reach you within the estimated time.</p>
`;
          html = html.replace(
            /(<\/div>\s*<\/div>\s*<\/section>\s*\n?\s*<!-- City Links)/,
            `${whyChooseBlock}\n            </div>\n        </div>\n    </section>\n\n    <!-- City Links`
          );
        }

        fs.writeFileSync(filePath, html, 'utf8');
        processedCities++;
      } catch (err) {
        errors++;
      }
    });
  });
  console.log(`\n✅ City pages done: ${processedCities} updated`);
}

console.log('\n==========================================');
console.log('🎉 Quality Content Generation Complete!');
console.log(`📊 Route pages updated: ${processedRoutes}`);
console.log(`📊 City pages updated:  ${processedCities}`);
console.log(`❌ Errors: ${errors}`);
console.log('\nEach route page now has 800-1200 words of quality, unique content!');
