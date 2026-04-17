/* ═══════════════════════════════════════════════
   SAWCE COMPANY — Catálogo de Produtos
   Para adicionar produtos: copie um objeto do
   array, altere os campos e salve o arquivo.
   ═══════════════════════════════════════════════

   Estrutura de cada produto:
   {
     id:    número único,
     cat:   'tenis' | 'camisas' | 'anime' | 'tech' | 'esporte',
     name:  'Nome do Produto',
     desc:  'Descrição curta',
     price: '000,00',          ← apenas o valor, sem "R$"
     imgs:  ['url1', 'url2']   ← primeira imagem é a principal
   }
*/

const PRODUCTS = [

  /* ════════════════════════════════════════════
     TÊNIS
  ════════════════════════════════════════════ */
  {
    id: 1, cat: 'tenis',
    name: 'Nike Air Jordan OG',
    desc: 'Disponível em diversas cores. O clássico que nunca sai de moda.',
    price: '699,99',
    imgs: ['https://imgnike-a.akamaihd.net/1300x1300/028389IDA9.jpg',
      'https://imgnike-a.akamaihd.net/1300x1300/02549551A8.jpg',
      'https://artwalk.vtexassets.com/arquivos/ids/571810/FD481-0-010-1-AW-800x1000.jpg?v=638723703076100000',
    ],
  },
  {
    id: 2, cat: 'tenis',
    name: 'Adidas Yeezy Boost 350',
    desc: 'Feio, mas gostoso — igual você indo pra academia.',
    price: '499,99',
    imgs: ['https://sneakersinfinland.com/cdn/shop/files/2E6D1C9B-B6B8-48F9-AB84-77F9C0BF9347.jpg?v=1748690825',
      'https://i.ebayimg.com/images/g/EPgAAOSw2CNjobKT/s-l960.jpg',
      'https://graalspotter.com/cdn/shop/products/adidas-yeezy-boost-350-v2-static-non-reflective-graal-spotter-1_grande.png?v=1677082842',
    ],
  },
  {
    id: 3, cat: 'tenis',
    name: 'Nike Air Force 1 Low',
    desc: 'O tênis mais icônico da história. Branco imaculado, zero erro.',
    price: '599,99',
    imgs: ['https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNbfxdfeNY63warazelh6PfgG4-6uOZ0LAL3D_q0pwtKHVllTwhqdnp14YOsa4yQoEu5-FOSmrWNWR7e5UNp07ld4TbkRQlF1glL1hjA-0IrL2rylVjpy7Qj2NCHxDho4R0KZciQ&usqp=CAc', 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRxfOOFXNBW5Bg2UPqah83uU3hxyprs4QESqFzXYI3azAuJIHAHSvPzy05hWVWsA1KnJ7Gejum8o6KrmC_GBFvyNJrAtY4di4YpUh3b_MUJA4Z4UnXuCkZn07NiYRCrJx1-5028tQ&usqp=CAc'],
  },
  {
    id: 4, cat: 'tenis',
    name: 'Nike Air Max 90',
    desc: 'Amortecimento Air visível, silhueta clássica dos anos 90.',
    price: '599,99',
    imgs: ['https://imgnike-a.akamaihd.net/768x768/00931851A2.jpg', 
      'https://imgnike-a.akamaihd.net/768x768/0093187TA2.jpg',
      'https://imgnike-a.akamaihd.net/768x768/009318IDA2.jpg'],
  },
  {
    id: 5, cat: 'tenis',
    name: 'Nike Dunk Low Retro',
    desc: 'De quadra pra rua — o Dunk não mente. Colorways variados.',
    price: '399,99',
    imgs: ['https://imgnike-a.akamaihd.net/768x768/05847553A2.jpg',
      'https://imgnike-a.akamaihd.net/768x768/058475IGA2.jpg',
      'https://imgnike-a.akamaihd.net/768x768/0584750MA1.jpg',
    ],
  },
  {
    id: 6, cat: 'tenis',
    name: 'Air Jordan 4 Retro',
    desc: 'Encaixe de tornozelo alto, amortecimento premium. Lenda viva.',
    price: '749,99',
    imgs: ['https://imgnike-a.akamaihd.net/768x768/10946752A12.jpg',
      'https://artwalk.vtexassets.com/arquivos/ids/581695-1200-auto?v=638893911468000000&width=1200&height=auto&aspect=true',
      'https://imgnike-a.akamaihd.net/768x768/10946752A12.jpg'],
  },
  {
    id: 7, cat: 'tenis',
    name: 'Tênis Nike Court Vision Low',
    desc: 'O Nike que cabe no dia a dia.',
    price: '249,99',
    imgs: ['https://imgnike-a.akamaihd.net/768x768/058760IDA2.jpg', 
      'https://imgnike-a.akamaihd.net/768x768/058760BPA1.jpg',
      'https://imgnike-a.akamaihd.net/768x768/013702IDA8.jpg'],
  },
  {
    id: 8, cat: 'tenis',
    name: 'New Balance 550',
    desc: 'Clean, simples e absurdamente estiloso. Tendência absoluta.',
    price: '449,99',
    imgs: [
      'https://newbrasil.vtexassets.com/arquivos/ids/192972/BB550_BB550PBL.jpg?v=638979727904500000', 
      'https://newbrasil.vtexassets.com/arquivos/ids/190495/BB550_BB550UTG.jpg?v=638978850347300000',
      'https://newbrasil.vtexassets.com/arquivos/ids/190495/BB550_BB550UTG.jpg?v=638978850347300000'],
  },
  {
    id: 9, cat: 'tenis',
    name: 'New Balance 990v6',
    desc: 'O pai de todos os dad shoes. Conforto incomparável.',
    price: '599,99',
    imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkM6fKoqvbNoNFtjElzaopDXA28yZ9vqlGtQ&s', 'https://cdn-images.farfetch-contents.com/20/26/08/62/20260862_50208898_600.jpg', 'https://newbrasil.vtexassets.com/arquivos/ids/193525/U990_U990SG6.jpg?v=638977946412370000'],
  },
  {
    id: 10, cat: 'tenis',
    name: 'Tênis Air Force 1 Low Purple Skeleton',
    desc: 'O clássico Air Force 1 ganha uma versão ousada e exclusiva com o ‘Purple Skeleton’, trazendo estilo único e detalhes que brilham no escuro.',
    price: '799,99',
    imgs: [
      'https://imgnike-a.akamaihd.net/768x768/016875NDA10.jpg',
      'https://imgnike-a.akamaihd.net/768x768/016875NDA1.jpg',
      'https://diamondsneakers.com.br/cdn/shop/products/5-e939b42ff2d56cb1aa16970463237529-1024-1024.png?v=1708935261&width=823'],
  },
  {
    id: 11, cat: 'tenis',
    name: 'Chuteira Society Nike Mercurial Superfly 10 Academy',
    desc: 'Quer aumentar a velocidade como nunca? Uma unidade Air Zoom aprimorada no calcanhar foi incorporada a essa chuteira Academy.',
    price: '299,99',
    imgs: [
      'https://imgnike-a.akamaihd.net/768x768/02951316A2.jpg',
      'https://imgnike-a.akamaihd.net/768x768/02951316A5.jpg',
      'https://imgnike-a.akamaihd.net/768x768/02951316A9.jpg'],
  },
  {
    id: 12, cat: 'tenis',
    name: 'Adidas Superstar',
    desc: 'Shell toe lendário — de quadra pra capa do Run DMC.',
    price: '349,99',
    imgs: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/cffc1e722da944b3bfb4573066534e51_9366/Tenis_Superstar_Branco_JK4968_01_00_standard.jpg', 
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/cff28cdf90224c97acb768c1d7a130a8_9366/SUPERSTAR_II_Preto_HP7199_01_00_standard.jpg',
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/392d01e78cef442981c293e319ef5c22_9366/Tenis_ADIDAS_ORIGINALS_SUPERSTAR_II_Branco_KJ4566_01_00_standard.jpg'],
  },
  {
    id: 13, cat: 'tenis',
    name: 'Adidas Forum Low',
    desc: 'Basquete dos anos 80 reinterpretado. Aba dobrada, máximo estilo.',
    price: '379,99',
    imgs: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Tenis_Forum_Low_Branco_FY7756_01_00_standard.jpg',
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9be82e614302496e9da4af9d003dcb4f_9366/Tenis_Forum_Low_Branco_GB7034_01_standard.jpg',
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/289e810f17ce49cc8deaaf9d003a13a5_9366/Tenis_Forum_Low_Branco_GB7034_05_standard.jpg'],
  },
  {
    id: 14, cat: 'tenis',
    name: 'Adidas Stan Smith',
    desc: 'O minimalista que nunca some. Três listras e pronto.',
    price: '329,99',
    imgs: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0eb3ef48dd944296940d97b25d134c47_9366/Tenis_Stan_Smith_Decon_Preto_IE9117_01_standard.jpg',
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ab16d8fe3ba14e959c15de6fc250bcb9_9366/Tenis_Stan_Smith_Decon_Preto_IE9117_04_standard.jpg',
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/57de00f42d704328a4952b1d0ffb87cc_9366/Tenis_Stan_Smith_Decon_Preto_IE9117_09_standard.jpg'],
  },
  {
    id: 15, cat: 'tenis',
    name: 'Puma Suede Classic',
    desc: 'Ante-camurça, cores vibrantes. O grito do streetwear dos anos 70.',
    price: '289,99',
    imgs: ['https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/399781/01/sv01/fnd/BRA/fmt/png', 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/399781/01/fnd/BRA/fmt/png', 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/399781/33/sv04/fnd/BRA/fmt/png'],
  },
  {
    id: 16, cat: 'tenis',
    name: 'Puma RS-X Chunky',
    desc: 'Solado turbinado, estética running retrô dos anos 90.',
    price: '399,99',
    imgs: ['https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/394302/60/sv01/fnd/BRA/fmt/png', 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/394302/03/fnd/BRA/fmt/png', 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/394302/57/fnd/BRA/fmt/png'],
  },
  {
    id: 17, cat: 'tenis',
    name: 'Reebok Classic Leather',
    desc: 'Couro premium, silhueta limpa. O clássico de academia virou ícone.',
    price: '319,99',
    imgs: ['https://static.dafiti.com.br/p/reebok-tenis-reebok-classic-masculino-chalk-vecblue-vecre-7483-43698051-1-zoom.jpg?ims=fit-in/430x623', 'https://static.dafiti.com.br/p/Reebok-Tenis-Reebok-Classic-Masculino-Chalk-Vecblue-Vecre-7489-43698051-3-zoom.jpg','https://static.dafiti.com.br/p/Reebok-Tenis-Reebok-Classic-Masculino-Chalk-Vecblue-Vecre-7491-43698051-4-zoom.jpg'],
  },
  {
    id: 18, cat: 'tenis',
    name: 'Fila Disruptor II',
    desc: 'Chunky máximo — você vai ou odeia. Mas todos olham.',
    price: '359,99',
    imgs: ['https://fila.vteximg.com.br/arquivos/ids/913824-1600-1600/5FM00002_125.jpg?v=639020363473230000', 'https://fila.vteximg.com.br/arquivos/ids/913826-1600-1600/5FM00002_125.jpg?v=639020363473230000'],
  },
  {
    id: 19, cat: 'tenis',
    name: 'Nike Pegasus 40',
    desc: 'O tênis de corrida mais vendido da Nike. Por um bom motivo.',
    price: '529,99',
    imgs: ['https://imgnike-a.akamaihd.net/768x768/028659IDA2.jpg', 'https://imgnike-a.akamaihd.net/768x768/028659IKA1.jpg'],
  },
  {
    id: 20, cat: 'tenis',
    name: 'Under Armour HOVR Phantom',
    desc: 'Tecnologia HOVR — zero impacto, máxima energia de retorno.',
    price: '469,99',
    imgs: ['https://placehold.co/600x400/0a0a0a/13d203?text=UA+HOVR+Phantom'],
  },
  {
    id: 21, cat: 'tenis',
    name: 'Asics Gel-Nimbus 25',
    desc: '25 anos de evolução. A bíblia do conforto em corrida.',
    price: '499,99',
    imgs: ['https://placehold.co/600x400/f5f5f5/e31837?text=Asics+Gel-Nimbus'],
  },
  {
    id: 22, cat: 'tenis',
    name: 'Mizuno Wave Rider 27',
    desc: 'Tecnologia Wave patenteada. Estabilidade e amortecimento sem igual.',
    price: '479,99',
    imgs: ['https://placehold.co/600x400/0a0a1a/ffffff?text=Mizuno+Wave+Rider'],
  },

  /* ════════════════════════════════════════════
     CAMISAS
  ════════════════════════════════════════════ */
  {
    id: 23, cat: 'camisas',
    name: 'Camisa Grêmio 2025 Torcedor',
    desc: 'O Imortal diretamente no seu peito!',
    price: '119,99',
    imgs: [
      'https://acdn-us.mitiendanube.com/stores/001/775/982/products/whatsapp-image-2025-04-17-at-17-03-27-be021423f27b9251e917449205413616-1024-1024.jpeg',
      'https://acdn-us.mitiendanube.com/stores/001/775/982/products/233313-1600-1600-e5005ccb82ce19082717449205405937-1024-1024.webp',
      'https://acdn-us.mitiendanube.com/stores/001/775/982/products/whatsapp-image-2025-04-17-at-16-01-51-224919ff6e35a2992017449166540498-1024-1024.jpeg',
    ],
  },
  {
    id: 24, cat: 'camisas',
    name: 'Camisa Internacional 2025',
    desc: 'Papaizinho do Grêmio — veste o Colorado!',
    price: '119,99',
    imgs: [
      'https://acdn-us.mitiendanube.com/stores/001/775/982/products/camisa_camiseta_internacional_2025_26_torcedor_masculina_vermelha__patrocinio_patrocinador_alfa_-cdf4be68b38c363c1717449129494325-1024-1024.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-I2T3vtE1ESxc952wM5gGs99lIztgU4aPhND4BTs7CDaluJnENuO4eDmt12hK82v3yJc&usqp=CAU',
    ],
  },
  {
    id: 25, cat: 'camisas',
    name: 'Camisa Seleção Brasileira 2025',
    desc: 'Faltavam apenas 4 minutos... mas a camisa ficou bonita.',
    price: '119,99',
    imgs: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaaTkmwfYjsWIWrqp272VqkqAAcg3SR6iDGQ&s',
      'https://dcdn-us.mitiendanube.com/stores/002/054/994/products/camisa-selecao-brasileira-ii-2022-torcedor-nike-masculina-azul-11-b3bb0773f9b500d9d616599885361586-1024-1024-99c718bbdbc527f8e116783242425285-640-0.jpg',
      'https://acdn-us.mitiendanube.com/stores/002/183/167/products/camisa-selecao-brasil-2022-23-jogador-especial-preta-nike1-b143444f18a3e7b21916644711310185-640-0.png',
    ],
  },
  {
    id: 26, cat: 'camisas',
    name: 'Camisa Real Madrid 2024/25',
    desc: 'Los Blancos no seu guarda-roupa. Casa e visitante disponíveis.',
    price: '129,99',
    imgs: [
      'https://images.footballfanatics.com/real-madrid/real-madrid-home-shirt-2024-25-kids_ss5_p-13776278+u-k5b6p4slrq1dj5cqbmv4+v-8b3a3c5d56ae4e60a01568c965c1e00e.jpg',
      'https://images.footballfanatics.com/real-madrid/real-madrid-away-shirt-2024-25_ss5_p-13937219+u-k5b6p4slrq1dj5cqbmv4+v-37ae11f70a594e77b0e92a9bc27d08c5.jpg',
    ],
  },
  { id: 27, cat: 'camisas', name: 'Camisa PSG 2024/25 Home',           desc: 'Paris Saint-Germain na melhor versão. Azul profundo.',        price: '129,99', imgs: ['https://placehold.co/600x400/001a4e/ffffff?text=PSG+2024/25',         'https://placehold.co/600x400/f5e6c8/001a4e?text=PSG+Away'] },
  { id: 28, cat: 'camisas', name: 'Camisa Barcelona 2024/25',          desc: 'Blaugrana eterno. Listras que valem um título.',              price: '129,99', imgs: ['https://placehold.co/600x400/800020/6CABDD?text=Barcelona+Casa',    'https://placehold.co/600x400/0a0a0a/800020?text=Barça+Away'] },
  { id: 29, cat: 'camisas', name: 'Camisa Manchester City 2024/25',    desc: 'Azul Etihad — City até ganhar tudo de novo.',                 price: '129,99', imgs: ['https://placehold.co/600x400/6CABDD/ffffff?text=Man+City',         'https://placehold.co/600x400/f5f5f5/6CABDD?text=City+Away'] },
  { id: 30, cat: 'camisas', name: 'Camisa Liverpool 2024/25',          desc: 'You will never walk alone. Vermelho que faz barulho.',        price: '119,99', imgs: ['https://placehold.co/600x400/C8102E/ffffff?text=Liverpool',        'https://placehold.co/600x400/00B2A9/C8102E?text=Liverpool+Away'] },
  { id: 31, cat: 'camisas', name: 'Camisa Flamengo 2025',              desc: 'Nação rubro-negra! A mais vendida do Brasil.',                price: '119,99', imgs: ['https://placehold.co/600x400/CC0000/000000?text=Flamengo+Casa',   'https://placehold.co/600x400/000000/CC0000?text=Fla+Away'] },
  { id: 32, cat: 'camisas', name: 'Camisa Palmeiras 2025',             desc: 'Porco no peito, orgulho na alma. Verdão sempre.',             price: '119,99', imgs: ['https://placehold.co/600x400/006437/ffffff?text=Palmeiras',       'https://placehold.co/600x400/f5f5f5/006437?text=Palmeiras+Away'] },
  { id: 33, cat: 'camisas', name: 'Camisa Corinthians 2025',           desc: 'Fiel até o fim. Alvinegro com muito amor.',                   price: '119,99', imgs: ['https://placehold.co/600x400/f5f5f5/111111?text=Corinthians',     'https://placehold.co/600x400/111111/ffffff?text=Timão+Away'] },
  { id: 34, cat: 'camisas', name: 'Camisa Santos 2025',                desc: 'Peixe nas 4 linhas. Branco e preto clássico.',                price: '109,99', imgs: ['https://placehold.co/600x400/f5f5f5/111111?text=Santos',          'https://placehold.co/600x400/111111/ffffff?text=Santos+Preta'] },
  { id: 35, cat: 'camisas', name: 'Camisa Bayern Munich 2024/25',      desc: 'Mia san mia. Vermelho alemão de alta performance.',           price: '129,99', imgs: ['https://placehold.co/600x400/DC052D/ffffff?text=Bayern',         'https://placehold.co/600x400/f5f5f5/DC052D?text=Bayern+Away'] },
  { id: 36, cat: 'camisas', name: 'Camisa Manchester United 2024/25',  desc: 'Old Trafford em cada fio. Red Devils chegando.',              price: '129,99', imgs: ['https://placehold.co/600x400/DA291C/ffffff?text=Man+United',     'https://placehold.co/600x400/0a0a2a/DA291C?text=United+Away'] },
  { id: 37, cat: 'camisas', name: 'Camisa Juventus 2024/25',           desc: 'Zebra de Turim. Elegância italiana em campo.',                price: '129,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Juventus',       'https://placehold.co/600x400/f5f5f5/111111?text=Juve+Away'] },
  { id: 38, cat: 'camisas', name: 'Camisa Argentina 2024',             desc: 'Campeã do mundo — e não deixa esquecer.',                    price: '119,99', imgs: ['https://placehold.co/600x400/74ACDF/ffffff?text=Argentina',      'https://placehold.co/600x400/6B0F8E/74ACDF?text=Argentina+Away'] },
  { id: 39, cat: 'camisas', name: 'Camisa Inter Miami 2025',           desc: 'Barbie pink dos grandes — rosé que manda muito.',             price: '129,99', imgs: ['https://placehold.co/600x400/FF69B4/000000?text=Inter+Miami',   'https://placehold.co/600x400/111111/FF69B4?text=Miami+Away'] },
  { id: 40, cat: 'camisas', name: 'Camisa Al-Nassr 2024/25',           desc: 'CR7 na Arábia. Amarelo que brilha no deserto.',               price: '129,99', imgs: ['https://placehold.co/600x400/FFD700/1B3A6B?text=Al-Nassr',      'https://placehold.co/600x400/1B3A6B/FFD700?text=Al-Nassr+Away'] },
  { id: 41, cat: 'camisas', name: 'Camisa Chelsea 2024/25',            desc: 'Blues de Stamford Bridge. Azul real no peito.',               price: '129,99', imgs: ['https://placehold.co/600x400/034694/ffffff?text=Chelsea',        'https://placehold.co/600x400/888888/034694?text=Chelsea+Away'] },
  { id: 42, cat: 'camisas', name: 'Camisa Atlético Mineiro 2025',      desc: 'Galo Doido na tela. Preto e branco com raiva.',               price: '119,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Atletico+MG',   'https://placehold.co/600x400/f5f5f5/111111?text=Galo+Away'] },
  { id: 43, cat: 'camisas', name: 'Camisa Arsenal 2024/25',            desc: 'Gunners em campo — canhão no peito.',                         price: '129,99', imgs: ['https://placehold.co/600x400/EF0107/ffffff?text=Arsenal',        'https://placehold.co/600x400/f5e642/EF0107?text=Arsenal+Away'] },
  { id: 44, cat: 'camisas', name: 'Camisa Borussia Dortmund 2024/25',  desc: 'BVB amarelo-preto — Signal Iduna Park em você.',             price: '129,99', imgs: ['https://placehold.co/600x400/FDE100/000000?text=Borussia',      'https://placehold.co/600x400/000000/FDE100?text=BVB+Away'] },

  /* ════════════════════════════════════════════
     ANIME & CULTURA
  ════════════════════════════════════════════ */
  {
    id: 45, cat: 'anime',
    name: 'Camisa Kimetsu no Yaiba Oversized',
    desc: 'As novinha adoram. Nezuko aprovaria o estilo.',
    price: '79,99',
    imgs: [
      'https://img.ltwebstatic.com/v4/p/spmp/2025/04/03/5a/17436864201715d32c09d5515b1f2a78972e52363d_thumbnail_405x.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTlc8aS7QpQUMmmz9_v_yxid_MXMDXHOtrg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-lKj2ceVoVQebiOOkKLeTfaV4hlf4s5W3A&s',
    ],
  },
  {
    id: 46, cat: 'anime',
    name: 'Figure Dragon Ball — Coleção',
    desc: 'Goku, Vegeta, Broly e mais. Perfeito para colecionar.',
    price: '199,99',
    imgs: [
      'https://astratec.com.br/cdn/shop/files/S605d6d4f8ef1473a828ed0a4df3f27d_800x.jpg?v=1724336854',
      'https://rihappy.vtexassets.com/arquivos/ids/2936705-800-auto?v=637842115950500000&width=800&height=auto&aspect=true',
      'https://http2.mlstatic.com/D_NQ_NP_974014-MLU78443595000_082024-O.webp',
    ],
  },
  {
    id: 47, cat: 'anime',
    name: 'Figure Naruto Uzumaki',
    desc: 'Acredite no seu caminho ninja. Dattebayo!',
    price: '179,99',
    imgs: ['https://http2.mlstatic.com/D_NQ_NP_851699-MLB75661936083_042024-O.webp'],
  },
  {
    id: 48, cat: 'anime',
    name: 'Camisa Naruto Oversized',
    desc: 'Veste o espírito do ninja mais raiz do Konoha.',
    price: '79,99',
    imgs: [
      'https://img.ltwebstatic.com/v4/p/spmp/2024/08/14/52/172366416266b74c86f756a23a3edc2e5bcc36a3e3_thumbnail_405x.webp',
      'https://img.ltwebstatic.com/v4/p/spmp/2024/08/14/52/1723664162e3012b88c8eeb8117a39de61a93c8282_thumbnail_405x.webp',
    ],
  },
  { id: 49, cat: 'anime', name: 'Figure Monkey D. Luffy',          desc: 'Rei dos piratas em resina. Pose de batalha, Gear 5 disponível.',    price: '199,99', imgs: ['https://placehold.co/600x400/0a0a1a/FF6B35?text=Figure+Luffy',        'https://placehold.co/600x400/0a0a0a/ffffff?text=Luffy+Gear+5'] },
  { id: 50, cat: 'anime', name: 'Figure Levi Ackerman',             desc: 'O capitão da Survey Corps em escala 1:8. Detalhes impressionantes.',  price: '229,99', imgs: ['https://placehold.co/600x400/1a1a1a/c0c0c0?text=Figure+Levi',          'https://placehold.co/600x400/111111/ffffff?text=Levi+Combat'] },
  { id: 51, cat: 'anime', name: 'Camisa One Piece Oversized',       desc: 'Piratas do chapéu de palha no peito. Nakama de verdade.',             price: '79,99',  imgs: ['https://placehold.co/600x400/0a0a2a/FF6B35?text=Camisa+One+Piece',     'https://placehold.co/600x400/111111/FF6B35?text=One+Piece+Preta'] },
  { id: 52, cat: 'anime', name: 'Camisa Attack on Titan',           desc: 'Survey Corps uniform inspired. Cores da 104th Cadet Corps.',          price: '79,99',  imgs: ['https://placehold.co/600x400/1a1a0a/5f6b4e?text=Attack+on+Titan',      'https://placehold.co/600x400/2a3a2a/c0c0c0?text=AoT+Survey+Corps'] },
  { id: 53, cat: 'anime', name: 'Camisa Jujutsu Kaisen',            desc: 'Maldições e muito estilo. Gojo Satoru aprova.',                       price: '79,99',  imgs: ['https://placehold.co/600x400/0a0a1a/9B59B6?text=Jujutsu+Kaisen',       'https://placehold.co/600x400/f5f5f5/111111?text=JJK+Branca'] },
  { id: 54, cat: 'anime', name: 'Figure Goku Super Saiyan Blue',    desc: 'Cabelo azul, poder além dos limites. Dragon Ball Super.',              price: '219,99', imgs: ['https://placehold.co/600x400/0a1a3a/4fc3f7?text=Goku+SSB',             'https://placehold.co/600x400/0a0a0a/c0c0c0?text=Goku+UI'] },
  { id: 55, cat: 'anime', name: 'Figure Vegeta SSJ',                desc: 'Príncipe dos Saiyajins em postura de combate. Lenda.',                 price: '219,99', imgs: ['https://placehold.co/600x400/1a0a1a/B100c7?text=Figure+Vegeta',        'https://placehold.co/600x400/0a0a0a/ffffff?text=Vegeta+UI'] },
  { id: 56, cat: 'anime', name: 'Camisa Tokyo Revengers',           desc: 'Toman Gang na tela. Mikey e Draken de verdade.',                       price: '79,99',  imgs: ['https://placehold.co/600x400/111111/FFD700?text=Tokyo+Revengers',       'https://placehold.co/600x400/1a0a0a/ff4444?text=Toman+Preta'] },
  { id: 57, cat: 'anime', name: 'Figure Izuku Midoriya',            desc: 'Deku do My Hero Academia. One For All liberado!',                      price: '189,99', imgs: ['https://placehold.co/600x400/0a0a2a/13d203?text=Figure+Deku',           'https://placehold.co/600x400/0a0a1a/4fc3f7?text=Deku+Full+Cowling'] },
  { id: 58, cat: 'anime', name: 'Camisa Bleach — Ichigo',           desc: 'Shinigami Substituto no peito. Zanpakuto na alma.',                    price: '79,99',  imgs: ['https://placehold.co/600x400/111111/ff4444?text=Bleach+Ichigo',         'https://placehold.co/600x400/f5f5f5/111111?text=Bleach+Branca'] },
  { id: 59, cat: 'anime', name: 'Figure Pikachu — Colecionável',    desc: 'O mais famoso dos Pokémon em vinil. Eletrizante.',                      price: '149,99', imgs: ['https://placehold.co/600x400/FFD700/111111?text=Figure+Pikachu',        'https://placehold.co/600x400/FFD700/cc0000?text=Pikachu+Deitado'] },
  { id: 60, cat: 'anime', name: 'Figure Evangelion Unit-01',        desc: 'Unidade 01 em escala detalhada. Neon Genesis collector.',               price: '249,99', imgs: ['https://placehold.co/600x400/3d0066/13d203?text=Eva+Unit-01',           'https://placehold.co/600x400/1a0000/ff4444?text=Eva+Berserk'] },
  { id: 61, cat: 'anime', name: 'Camisa Hunter x Hunter',           desc: 'Gon, Killua, Hisoka. HxH em qualquer estampa.',                        price: '79,99',  imgs: ['https://placehold.co/600x400/0a1a0a/13d203?text=Hunter+x+Hunter',       'https://placehold.co/600x400/111111/FFD700?text=HxH+Preta'] },
  { id: 62, cat: 'anime', name: 'Figure Spy x Family — Anya',       desc: 'Heh! Anya é fofa demais. Figure em vinil.',                             price: '189,99', imgs: ['https://placehold.co/600x400/ffd6e0/111111?text=Anya+Spy+Family',       'https://placehold.co/600x400/ff9ec8/111111?text=Anya+Sorrindo'] },
  { id: 63, cat: 'anime', name: 'Camisa Chainsaw Man',              desc: 'Denji e o Pochita no peito. Violento e estiloso.',                      price: '79,99',  imgs: ['https://placehold.co/600x400/1a0000/ff4444?text=Chainsaw+Man',          'https://placehold.co/600x400/ff6b6b/ffffff?text=CSM+Pochita'] },
  { id: 64, cat: 'anime', name: 'Camisa Solo Leveling',             desc: 'Sung Jinwoo ascendendo. Shadow Monarch no street.',                     price: '79,99',  imgs: ['https://placehold.co/600x400/0a0a1a/9B59B6?text=Solo+Leveling',         'https://placehold.co/600x400/111111/B100c7?text=Shadow+Monarch'] },
  { id: 65, cat: 'anime', name: 'Figure Sasuke Uchiha',             desc: 'Rinnegan ativado, Chidori carregado. Sasuke collector.',                price: '189,99', imgs: ['https://placehold.co/600x400/0a0a1a/9B59B6?text=Figure+Sasuke',         'https://placehold.co/600x400/111111/ffffff?text=Sasuke+Adulto'] },
  { id: 66, cat: 'anime', name: 'Funko Pop Anime — Coleção',        desc: 'Ichigo, Luffy, Naruto, Goku. Vários personagens disponíveis.',          price: '129,99', imgs: ['https://placehold.co/600x400/111111/FFD700?text=Funko+Pop+Anime',        'https://placehold.co/600x400/1a0a1a/13d203?text=Funko+Colorido'] },

  /* ════════════════════════════════════════════
     TECH & ACESSÓRIOS
  ════════════════════════════════════════════ */
  {
    id: 67, cat: 'tech',
    name: 'Teclado AULA WIN60 HE Magnético',
    desc: 'Hall Effect magnético — para quem leva gaming a sério.',
    price: '199,99',
    imgs: [
      'https://ae-pic-a1.aliexpress-media.com/kf/S4460f8a91104463680c3ba5c9017e884z.jpg_220x220q75.jpg_.avif',
      'https://ae-pic-a1.aliexpress-media.com/kf/Se98e59f8b3fb431dba2f077a1bf7be38Z.jpg_220x220q75.jpg_.avif',
    ],
  },
  {
    id: 68, cat: 'tech',
    name: 'Smartwatch HW Ultra 9 Pro',
    desc: 'GPS, NFC, monitor cardíaco. Parece de R$2k, custa bem menos.',
    price: '249,99',
    imgs: ['https://ae-pic-a1.aliexpress-media.com/kf/S3a1a5d6aa0d74e16ab455ac88d0e16a6G.jpg_220x220q75.jpg_.avif'],
  },
  {
    id: 69, cat: 'tech',
    name: 'Fone Bluetooth ANC Pro',
    desc: 'Cancelamento de ruído ativo — ignora o chefe e o vizinho.',
    price: '189,99',
    imgs: ['https://ae-pic-a1.aliexpress-media.com/kf/S73c05e4de5ea4ce5ac1e03e0148fa1e9O.jpg_220x220q75.jpg_.avif'],
  },
  { id: 70, cat: 'tech', name: 'Mouse Gamer Sem Fio 26000 DPI',     desc: 'Sensor óptico de alta precisão, botão lateral programável.',            price: '229,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Mouse+Gamer',           'https://placehold.co/600x400/0a0a0a/B100c7?text=Mouse+RGB'] },
  { id: 71, cat: 'tech', name: 'Mousepad Gamer XL RGB',              desc: '900x400mm, iluminação RGB nas bordas, superfície de tecido.',           price: '119,99', imgs: ['https://placehold.co/600x400/0a0a0a/13d203?text=Mousepad+XL+RGB'] },
  { id: 72, cat: 'tech', name: 'Webcam Full HD 1080p 60fps',         desc: 'Ideal para streaming e reuniões. Plug and play, sem driver.',           price: '149,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Webcam+HD'] },
  { id: 73, cat: 'tech', name: 'Mini Projetor Portátil 4K',          desc: '300 polegadas de imagem no bolso. Bateria interna de 4h.',              price: '389,99', imgs: ['https://placehold.co/600x400/0a0a0a/FFD700?text=Mini+Projetor+4K'] },
  { id: 74, cat: 'tech', name: 'Carregador Sem Fio 15W MagSafe',     desc: 'Carregamento rápido por indução. Compatível iPhone e Android.',         price: '89,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Carregador+Wireless'] },
  { id: 75, cat: 'tech', name: 'Power Bank 20000mAh 65W',            desc: 'Carrega notebook, celular e tablet. Display LCD de status.',            price: '149,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Power+Bank+20000mAh'] },
  { id: 76, cat: 'tech', name: 'Luminária LED RGB Desk',              desc: '16 milhões de cores, controle por app. Ilumina todo seu setup.',        price: '129,99', imgs: ['https://placehold.co/600x400/0a0a1a/B100c7?text=Luminária+LED+RGB',   'https://placehold.co/600x400/0a1a0a/13d203?text=LED+Verde'] },
  { id: 77, cat: 'tech', name: 'Caixa de Som Bluetooth JBL Style',   desc: 'Grave potente, resistente a água IPX7, 12h de bateria.',                price: '249,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Caixa+Bluetooth',     'https://placehold.co/600x400/0a0a0a/ffffff?text=Speaker+Preto'] },
  { id: 78, cat: 'tech', name: 'Ring Light 26cm Profissional',        desc: 'Temperatura ajustável, suporte de celular incluso.',                    price: '159,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Ring+Light+26cm'] },
  { id: 79, cat: 'tech', name: 'Hub USB-C 7 em 1',                    desc: 'HDMI 4K, USB 3.0 ×3, SD card, carregamento 100W.',                      price: '139,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Hub+USB-C+7em1'] },
  { id: 80, cat: 'tech', name: 'SSD Externo Portátil 1TB',            desc: '2.000 MB/s de leitura. Cabo USB-C ultra rápido.',                       price: '329,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=SSD+Externo+1TB',     'https://placehold.co/600x400/0a0a2a/4fc3f7?text=SSD+Azul'] },
  { id: 81, cat: 'tech', name: 'Pen Drive 256GB USB 3.2',             desc: 'Velocidade de transferência até 400 MB/s. Pequenininho.',               price: '79,99',  imgs: ['https://placehold.co/600x400/111111/FFD700?text=Pen+Drive+256GB'] },
  { id: 82, cat: 'tech', name: 'Controle Gamer Sem Fio',              desc: 'Compatível PC, Android, iOS e Switch. Vibração HD.',                   price: '189,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Controle+Gamer',      'https://placehold.co/600x400/f5f5f5/111111?text=Controle+Branco'] },
  { id: 83, cat: 'tech', name: 'Headset Gamer 7.1 Surround',          desc: 'Som posicional preciso, microfone removível com cancelamento.',          price: '219,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Headset+Gamer',       'https://placehold.co/600x400/f5f5f5/111111?text=Headset+Branco'] },
  { id: 84, cat: 'tech', name: 'Placa de Captura HDMI 4K',            desc: 'Transmita e grave gameplay em 4K 60fps. Plug and play.',                price: '179,99', imgs: ['https://placehold.co/600x400/111111/ff4444?text=Placa+Captura+HDMI'] },
  { id: 85, cat: 'tech', name: 'Mesa Digitalizadora A5',               desc: '8192 níveis de pressão, 8 teclas programáveis. Pro.',                  price: '199,99', imgs: ['https://placehold.co/600x400/0a0a1a/13d203?text=Mesa+Digitalizadora'] },
  { id: 86, cat: 'tech', name: 'Câmera IP WiFi 360°',                  desc: 'Full HD, visão noturna, detecção de movimento.',                        price: '169,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Camera+IP+WiFi'] },
  { id: 87, cat: 'tech', name: 'Suporte Notebook Ajustável',           desc: 'Alumínio, 6 ângulos, compatível 10–17 polegadas.',                     price: '99,99',  imgs: ['https://placehold.co/600x400/888888/111111?text=Suporte+Notebook'] },
  { id: 88, cat: 'tech', name: 'Microfone Condensador USB',            desc: 'Padrão cardióide, ideal para podcast e streaming.',                     price: '239,99', imgs: ['https://placehold.co/600x400/111111/c0c0c0?text=Microfone+Condensador'] },

  /* ════════════════════════════════════════════
     ESPORTE
  ════════════════════════════════════════════ */
  {
    id: 89, cat: 'esporte',
    name: 'Conjunto Treino Nike 2023/24',
    desc: 'Se for sofrer na academia, pelo menos sofra bonito.',
    price: '249,90',
    imgs: [
      'https://acdn-us.mitiendanube.com/stores/002/183/167/products/conjunto-treino-camisa-manga-longa-calca-preta-2023-2024-pant-coat-long-sleeve-black-kit-training-suit-nike-6dcb3146d996680d3217144875263410-640-0.webp',
      'https://acdn-us.mitiendanube.com/stores/002/183/167/products/conjunto-treino-camisa-manga-longa-calca-preta-2023-2024-pant-coat-long-sleeve-black-kit-training-suit-nike-2-ec6672f9724201f2f517144875282612-640-0.webp',
    ],
  },
  {
    id: 90, cat: 'esporte',
    name: 'Luva Goleiro N1 Zeus Pro',
    desc: 'Para quem ama pegar bola... ou deixar entrar. Sem julgamentos.',
    price: '199,99',
    imgs: [
      'https://www.n1glovesbrasil.com.br/cdn/shop/files/Luva-de-Goleiro-Profissional-N1-Zeus_ecaf4f22.webp?v=1743615406&width=680',
      'https://www.n1glovesbrasil.com.br/cdn/shop/files/Luva-de-Goleiro-Profissional-N1-Zeus-2_0_fd978303.webp?v=1755800499',
    ],
  },
  {
    id: 91, cat: 'esporte',
    name: 'Boné New Era NY Snapback',
    desc: 'O clássico que combina com tudo. Preto, branco ou colorido.',
    price: '149,99',
    imgs: ['https://img.ltwebstatic.com/v4/p/spmp/2024/06/18/5f/17188116161e9eea55d073aaeb85f16d6a2f48f4fd_thumbnail_405x.webp'],
  },
  {
    id: 92, cat: 'esporte',
    name: 'Mochila Nike Heritage 25L',
    desc: 'Compartimentos amplos, alça ajustável, o Swoosh garantindo.',
    price: '189,99',
    imgs: ['https://img.ltwebstatic.com/v4/p/spmp/2024/11/11/e5/1731302040bf22ad83adc2d47024be6e2faafeb7f0_thumbnail_405x.webp'],
  },
  { id: 93,  cat: 'esporte', name: 'Short Treino Under Armour',         desc: 'Tecido HeatGear que seca 4× mais rápido que algodão.',            price: '99,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Short+Under+Armour',    'https://placehold.co/600x400/0a0a2a/ffffff?text=Short+UA+Azul'] },
  { id: 94,  cat: 'esporte', name: 'Legging Compressão Nike Pro',       desc: 'Suporte muscular, tecido Dri-FIT que mantém você no foco.',        price: '119,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Legging+Nike+Pro',      'https://placehold.co/600x400/1a0a1a/B100c7?text=Legging+Roxa'] },
  { id: 95,  cat: 'esporte', name: 'Bola Nike Flight Premier League',   desc: 'Câmara de ar butílica, 12 painéis costurados à mão.',             price: '189,99', imgs: ['https://placehold.co/600x400/f5f5f5/111111?text=Bola+Nike+PL',         'https://placehold.co/600x400/f5f5f5/cc0000?text=Bola+Nike+Branca'] },
  { id: 96,  cat: 'esporte', name: 'Raquete Beach Tennis Carbono',      desc: 'Fibra de carbono 12k, 340g, overgrip e capa inclusa.',            price: '259,99', imgs: ['https://placehold.co/600x400/111111/13d203?text=Raquete+Beach+Tennis',  'https://placehold.co/600x400/0a1a0a/ffffff?text=Raquete+Verde'] },
  { id: 97,  cat: 'esporte', name: 'Luva de Boxe 14oz Premium',         desc: 'Couro sintético reforçado, espuma tripla camada.',                price: '149,99', imgs: ['https://placehold.co/600x400/1a0000/ff4444?text=Luva+Boxe+14oz',       'https://placehold.co/600x400/111111/ffffff?text=Luva+Boxe+Preta'] },
  { id: 98,  cat: 'esporte', name: 'Corda de Pular Speed Pro',          desc: 'Cabo de aço revestido, rolamento duplo. Até 5 m/s.',              price: '79,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Corda+Pular+Speed'] },
  { id: 99,  cat: 'esporte', name: 'Meias Nike Elite Cano Alto',        desc: 'Almofada Dri-FIT, acabamento sem costura. Pack com 3 pares.',      price: '69,99',  imgs: ['https://placehold.co/600x400/f5f5f5/111111?text=Meias+Nike+Elite',     'https://placehold.co/600x400/111111/ffffff?text=Meias+Nike+Preta'] },
  { id: 100, cat: 'esporte', name: 'Colete de Treino Respirável',       desc: 'Malha respirável, refletivo, bolso de celular traseiro.',          price: '99,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Colete+Treino',         'https://placehold.co/600x400/1a0800/ff6600?text=Colete+Laranja'] },
  { id: 101, cat: 'esporte', name: 'Shaker Elétrico 600ml',             desc: 'Mistura proteína em 2 segundos. Motor silencioso, USB-C.',         price: '89,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Shaker+Elétrico',       'https://placehold.co/600x400/888888/111111?text=Shaker+Prata'] },
  { id: 102, cat: 'esporte', name: 'Óculos de Natação Speedo Style',    desc: 'Lente anti-neblina, vedação de silicone, UV 400.',                 price: '79,99',  imgs: ['https://placehold.co/600x400/0a0a2a/4fc3f7?text=Óculos+Natação',       'https://placehold.co/600x400/111111/ffffff?text=Óculos+Preto'] },
  { id: 103, cat: 'esporte', name: 'Bermuda Surf Billabong',            desc: 'Tecido quick-dry, cintura ajustável. Para ondas ou cidade.',        price: '119,99', imgs: ['https://placehold.co/600x400/0a1a2a/ffffff?text=Bermuda+Surf',          'https://placehold.co/600x400/0a1a0a/FFD700?text=Bermuda+Floral'] },
  { id: 104, cat: 'esporte', name: 'Polo Lacoste Classic Fit',          desc: 'Piqué de algodão premium. O jacaré que fala por você.',            price: '179,99', imgs: ['https://placehold.co/600x400/f5f5f5/006437?text=Polo+Lacoste+Branca',  'https://placehold.co/600x400/0a0a2a/ffffff?text=Polo+Navy'] },
  { id: 105, cat: 'esporte', name: 'Bolsa de Ginástica Nike Club',      desc: '45L, compartimento de sapatos, alça de ombro e de mão.',           price: '139,99', imgs: ['https://placehold.co/600x400/111111/ffffff?text=Bolsa+Ginástica+Nike'] },
  { id: 106, cat: 'esporte', name: 'Tapete de Yoga Antiderrapante 6mm', desc: 'TPE ecológico, alinhamento de postura impresso.',                  price: '89,99',  imgs: ['https://placehold.co/600x400/1a1a0a/13d203?text=Tapete+Yoga',           'https://placehold.co/600x400/1a0a1a/B100c7?text=Tapete+Roxo'] },
  { id: 107, cat: 'esporte', name: 'Tênis de Corrida Brooks Ghost 16',  desc: 'DNA LOFT v3 amortecimento, perfeito para corridas longas.',         price: '449,99', imgs: ['https://placehold.co/600x400/111111/4fc3f7?text=Brooks+Ghost+16',       'https://placehold.co/600x400/f5f5f5/111111?text=Ghost+Branco'] },
  { id: 108, cat: 'esporte', name: 'Joelheira Compressão Pro',          desc: 'Estabilização patelar, neoprene respirável.',                      price: '79,99',  imgs: ['https://placehold.co/600x400/111111/13d203?text=Joelheira+Compressão'] },
  { id: 109, cat: 'esporte', name: 'Cinto de Força 10cm Couro',         desc: 'Couro legítimo 10mm espessura, fivela dupla robusta.',             price: '99,99',  imgs: ['https://placehold.co/600x400/5c3317/ffffff?text=Cinto+Musculação'] },
  { id: 110, cat: 'esporte', name: 'Camisa de Ciclismo UV 50+',         desc: 'Proteção solar embutida, bolso traseiro triplo, zíper full.',      price: '129,99', imgs: ['https://placehold.co/600x400/0a0a1a/13d203?text=Camisa+Ciclismo',       'https://placehold.co/600x400/1a0000/ffffff?text=Camisa+Bike+Vermelha'] },
];
