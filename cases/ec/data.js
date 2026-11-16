/* 商品データ（架空のブランド ASAGI）。価格は税込。 */
const SHOP = {
  name: 'ASAGI', tagline: '毎日着る、ふつうの服。',
  freeShip: 11000, ship: 660, codFee: 330, giftFee: 330,
  coupons: { WELCOME10: { type: 'rate', value: 10, label: '初回10%OFF' }, SHIP0: { type: 'ship', value: 0, label: '送料無料' } },
};
const CATS = [
  { id: 'tops', name: 'トップス' }, { id: 'bottoms', name: 'ボトムス' }, { id: 'outer', name: 'アウター' },
  { id: 'onepiece', name: 'ワンピース' }, { id: 'acc', name: '小物' }, { id: 'shoes', name: 'シューズ' },
];
const COLOR_HEX = { 'ホワイト':'#f4f4f2','ブラック':'#1d1d1d','サックス':'#a9c4de','ベージュ':'#d8c7a8','グレー':'#9a9a98','オリーブ':'#8a9a6b','ブルー':'#5d7fa8','イエロー':'#e8c33a','パープル':'#8a5fb0','レッド':'#c8322b','インディゴ':'#2f3f5e','ピンク':'#d9a2a0','キャメル':'#c89a5e','ブラウン':'#7a5c43','チャコール':'#3d3f42','ライトグレー':'#c4c6c3','アイボリー':'#ece7da','ナチュラル':'#e3dccb','グリーン':'#4f6f5f','アソート':'linear-gradient(90deg,#bbb,#8a5fb0,#e8c33a)','ボーダー':'linear-gradient(90deg,#c8322b 0 25%,#e8c33a 0 50%,#5d7fa8 0 75%,#4f6f5f 0)','ネイビー':'#223355' };
const SIZES_APP = ['S','M','L','XL'], SIZES_3 = ['S','M','L'], SIZES_F = ['F'], SIZES_W = ['28','30','32','34'], SIZES_SH = ['23','24','25','26','27','28'];
/* v: 色ごとの写真（最初が代表）。 */
const PRODUCTS = [
  { id:'tee-crew', cat:'tops', name:'オーガニックコットン クルーネックTシャツ', price:3300, sizes:SIZES_APP, new:true, rank:1, mat:'綿100%（オーガニックコットン）', made:'日本製', desc:'8.5オンスの度詰め天竺。洗っても首まわりが伸びにくいよう、リブは二重にしています。一枚で着ても透けない厚み。', care:'洗濯機可（ネット使用）／タンブラー乾燥不可', v:[ {c:'ブラック',img:['om-tee-black','om-tee-black-d','om-tee-black-e']} ], meas:{S:[64,46,52,19],M:[67,49,55,20],L:[70,52,58,21],XL:[73,55,61,22]}, reviews:[[5,'生地がしっかりしていて、洗濯を繰り返しても形が崩れません。黒を3枚買い足しました。','T.K.','M'],[4,'少し大きめ。普段Mですが、Sでちょうどよかったです。','mina','S'],[5,'首のリブが伸びないのがいい。','よし','L']] },
  { id:'knit-crew', cat:'tops', name:'ラムウール クルーネックニット', price:14300, sizes:SIZES_3, rank:3, mat:'毛100%（ラムウール）', made:'日本製', desc:'ラムウールの7ゲージ。チクチクしにくい糸を選び、首まわりは浅め。インナーにシャツを合わせても襟が出ます。', care:'手洗い／平干し', v:[ {c:'ホワイト',img:['om-knit-white','om-knit-white-d','om-knit-white-e']} ], meas:{S:[60,52,46,56],M:[63,55,48,57],L:[66,58,50,58]}, reviews:[[5,'白でも透けず、チクチクしません。','asa','M'],[4,'袖が少し長め。','k','S']] },
  { id:'knit-turtle', cat:'tops', name:'リブ タートルネックニット', price:12100, sizes:SIZES_3, new:true, rank:6, mat:'毛50% アクリル50%', made:'日本製', desc:'リブ編みの細身のタートルネック。首は折り返して着られる長さ。スカートにもパンツにも合わせやすい丈です。', care:'手洗い／平干し', v:[ {c:'ボルドー',img:['om-turtle-bordeaux','om-turtle-bordeaux-d','om-turtle-bordeaux-e']} ], meas:{S:[56,40,36,58],M:[58,42,37,59],L:[60,44,38,60]}, reviews:[[5,'色がきれい。細身なのでジャケットの下にも。','haru','S']] },
  { id:'knit-cable', cat:'tops', name:'ケーブル ボタンニット', price:15400, sale:13200, sizes:SIZES_F, rank:7, mat:'毛100%', made:'日本製', desc:'ざっくりしたケーブル編みのニット。首から肩に金ボタンを付けています。フリーサイズです。', care:'手洗い／平干し', v:[ {c:'レッド',img:['om-cable-red','om-cable-red-d','om-cable-red-e']} ], meas:{F:[58,56,'-',54]}, reviews:[[5,'ボタンがかわいい。厚みがあって暖かいです。','mm','F']] },
  { id:'shirt-sheer', cat:'tops', name:'シアー ロングシャツ', price:9900, sizes:SIZES_F, new:true, rank:9, mat:'ポリエステル100%', made:'日本製', desc:'透け感のあるロングシャツ。前を開けて羽織りにも、ベルトで留めても。袖はたっぷりめです。', care:'洗濯機可（ネット使用）', v:[ {c:'ピンク',img:['om-sheer-pink','om-sheer-pink-d','om-sheer-pink-e']} ], meas:{F:[92,62,'-',56]}, reviews:[[4,'春先の羽織りに。','yuu','F']] },
  { id:'jeans-st', cat:'bottoms', name:'ストレッチデニム スキニー', price:12100, sizes:SIZES_W, rank:2, mat:'綿98% ポリウレタン2%', made:'日本製（岡山）', desc:'ストレッチの効いたスキニーデニム。ライトブルーの色落ち加工。ニットやロング丈のトップスに合わせやすい細さです。', care:'洗濯機可（裏返して）／色移りに注意', v:[ {c:'ライトブルー',img:['om-jeans-blue','om-jeans-blue-d','om-jeans-blue-e']} ], meas:{'28':[70,35,26,'-'],'30':[71,37,27,'-'],'32':[72,39,28,'-'],'34':[73,41,29,'-']}, reviews:[[5,'よく伸びて楽です。','saki','28'],[4,'丈は少し長め。','no','30']] },
  { id:'skirt-pleat', cat:'bottoms', name:'プリーツ ミニスカート', price:9900, sizes:SIZES_3, new:true, rank:10, mat:'ポリエステル100%', made:'日本製', desc:'ハイウエストのプリーツスカート。腰にベルトとポケットが付いています。', care:'洗濯機可（ネット使用）', v:[ {c:'ブラック',img:['om-skirt-black','om-skirt-black-d','om-skirt-black-e']} ], meas:{S:['-',32,'-','-'],M:['-',34,'-','-'],L:['-',36,'-','-']}, reviews:[[4,'プリーツが取れにくい。','rin','S']] },
  { id:'skirt-tiered', cat:'bottoms', name:'ティアード ロングスカート', price:11000, sizes:SIZES_F, rank:11, mat:'綿100%', made:'日本製', desc:'段になった切り替えのロングスカート。足首が見える丈で、ウエストはゴムです。', care:'洗濯機可（弱）', v:[ {c:'ホワイト',img:['om-tiered-white','om-tiered-white-d','om-tiered-white-e']} ], meas:{F:['-','33〜','-','-']}, reviews:[[5,'透けにくい生地です。','emi','F']] },
  { id:'wide', cat:'bottoms', name:'コットン イージーパンツ', price:9900, sizes:SIZES_APP, rank:5, mat:'綿100%', made:'日本製', desc:'ウエストがゴムと紐のイージーパンツ。太すぎない太さで、裾に向かって少し細くなります。', care:'洗濯機可', v:[ {c:'ブラック',img:['om-wide-black','om-wide-black-d','om-wide-black-e']} ], meas:{S:[70,36,31,'-'],M:[72,38,32,'-'],L:[74,40,33,'-'],XL:[76,42,34,'-']}, reviews:[[5,'仕事にも休みの日にも。','taka','L']] },
  { id:'down', cat:'outer', name:'ショート ダウンジャケット', price:29700, sizes:SIZES_3, new:true, rank:4, mat:'表地 ナイロン100%／中わた ダウン90% フェザー10%', made:'日本製', desc:'フード付きのショート丈ダウン。身幅は大きめで、ニットの上からでも着られます。', care:'ドライクリーニング', v:[ {c:'ブラック',img:['om-down-black','om-down-black-d','om-down-black-e']} ], meas:{S:[62,66,56,58],M:[64,68,58,59],L:[66,70,60,60]}, reviews:[[5,'軽くて暖かい。','nao','M']] },
  { id:'fur', cat:'outer', name:'エコファー ジャケット', price:19800, sizes:SIZES_F, rank:8, mat:'ポリエステル100%', made:'日本製', desc:'毛足の長いエコファーのショートジャケット。前はフックで留めます。', care:'ドライクリーニング', v:[ {c:'ピンク',img:['om-fur-pink','om-fur-pink-d','om-fur-pink-e']} ], meas:{F:[50,52,'-',56]}, reviews:[[4,'色がやさしいピンク。','momo','F']] },
  { id:'dress', cat:'onepiece', name:'シャツワンピース', price:16500, sizes:SIZES_F, new:true, rank:12, mat:'綿100%', made:'日本製', desc:'襟付きのシャツワンピース。袖はたっぷり、着丈はふくらはぎの中ほど。', care:'洗濯機可（弱）／陰干し', v:[ {c:'ホワイト',img:['om-dress-white','om-dress-white-d','om-dress-white-e']} ], meas:{F:[118,60,'-',58]}, reviews:[[5,'一枚でさまになります。','aya','F']] },
  { id:'scarf', cat:'acc', name:'ウール リブマフラー', price:6600, sizes:SIZES_F, rank:14, mat:'毛100%', made:'日本製', desc:'太めの糸で編んだリブのマフラー。30cm×180cm。', care:'手洗い', v:[ {c:'グレー',img:['pk-scarf-grey','pk-scarf-grey-d','pk-scarf-grey-e']}, {c:'チャコール',img:['pk-scarf-charcoal','pk-scarf-charcoal-d','pk-scarf-charcoal-e']}, {c:'ライトグレー',img:['pk-scarf-light','pk-scarf-light-d','pk-scarf-light-e']}, {c:'アイボリー',img:['pk-scarf-ivory','pk-scarf-ivory-d','pk-scarf-ivory-e']}, {c:'パープル',img:['pk-scarf-purple','pk-scarf-purple-d','pk-scarf-purple-e']}, {c:'イエロー',img:['pk-scarf-yellow','pk-scarf-yellow-d','pk-scarf-yellow-e']}, {c:'ブラウン',img:['pk-scarf-brown','pk-scarf-brown-d','pk-scarf-brown-e']}, {c:'ブルー',img:['pk-scarf-blue','pk-scarf-blue-d','pk-scarf-blue-e']} ], meas:{F:[180,30,'-','-']}, reviews:[[5,'色が多くて選ぶのが楽しい。','N','F'],[5,'首に巻いても重くない。','ai','F']] },
  { id:'tote', cat:'acc', name:'キャンバストートバッグ L', price:5500, sizes:SIZES_F, rank:15, mat:'綿100%（帆布 10号）', made:'日本製', desc:'10号帆布のトート。A4の書類とノートパソコンが横に入ります。持ち手は肩にかけられる長さ。', care:'手洗い', v:[ {c:'ナチュラル',img:['pk-tote-natural','pk-tote-natural-d','pk-tote-natural-e']}, {c:'ブラック',img:['pk-tote-black','pk-tote-black-d','pk-tote-black-e']}, {c:'グリーン',img:['pk-tote-green','pk-tote-green-d','pk-tote-green-e']}, {c:'グレー',img:['pk-tote-grey','pk-tote-grey-d','pk-tote-grey-e']}, {c:'ホワイト',img:['pk-tote-white','pk-tote-white-d','pk-tote-white-e']} ], meas:{F:[38,42,14,'-']}, reviews:[[4,'丈夫。少し硬い。','tom','F']] },
  { id:'cap', cat:'acc', name:'コットンツイル キャップ', price:4950, sizes:SIZES_F, rank:18, mat:'綿100%', made:'日本製', desc:'つばの短いコットンキャップ。後ろのベルトでサイズを調整できます。', care:'手洗い', v:[ {c:'イエロー',img:['pk-cap-yellow','pk-cap-yellow-d','pk-cap-yellow-e']}, {c:'ホワイト',img:['pk-cap-white','pk-cap-white-d','pk-cap-white-e']}, {c:'ブラウン',img:['pk-cap-brown','pk-cap-brown-d','pk-cap-brown-e']} ], meas:{F:['56-60','-','-','-']}, reviews:[[5,'深さがちょうどいい。','k2','F']] },
  { id:'socks-rib', cat:'acc', name:'リブソックス 3足セット', price:1980, sizes:SIZES_F, rank:16, mat:'綿80% ナイロン18% ポリウレタン2%', made:'日本製（奈良）', desc:'奈良の工場で編んだリブソックス。グレー・パープル・イエローの3足セット。', care:'洗濯機可', v:[ {c:'アソート',img:['pk-socks-rib','pk-socks-rib-d','pk-socks-rib-e']} ], meas:{F:['23-25','-','-','-']}, reviews:[[5,'かかとが丈夫。','yy','F']] },
  { id:'socks-stripe', cat:'acc', name:'マルチボーダー ソックス', price:1320, sizes:SIZES_F, rank:20, mat:'綿80% ナイロン18% ポリウレタン2%', made:'日本製（奈良）', desc:'足元にひとつ色を。', care:'洗濯機可', v:[ {c:'ボーダー',img:['pk-socks-stripe','pk-socks-stripe-d','pk-socks-stripe-e']} ], meas:{F:['23-25','-','-','-']}, reviews:[] },
  { id:'socks-dot', cat:'acc', name:'ドット ソックス', price:1320, sizes:SIZES_F, rank:19, mat:'綿80% ナイロン18% ポリウレタン2%', made:'日本製（奈良）', desc:'小さなドット柄。ネイビー。', care:'洗濯機可', v:[ {c:'ネイビー',img:['pk-socks-dot-navy','pk-socks-dot-navy-d','pk-socks-dot-navy-e']} ], meas:{F:['25-27','-','-','-']}, reviews:[] },
  { id:'sneaker', cat:'shoes', name:'レザースニーカー', price:17600, sizes:SIZES_SH, rank:17, mat:'アッパー 牛革／ソール ラバー', made:'日本製', desc:'ステアレザーのローカット。ソールはやや厚め。最初は硬く、2週間ほどで足になじみます。', care:'乾いた布で拭く', v:[ {c:'ネイビー',img:['pk-sneaker-navy','pk-sneaker-navy-d','pk-sneaker-navy-e']}, {c:'ブラック',img:['pk-sneaker-black','pk-sneaker-black-d','pk-sneaker-black-e']}, {c:'オリーブ',img:['pk-sneaker-olive','pk-sneaker-olive-d','pk-sneaker-olive-e']} ], meas:{}, reviews:[[5,'革が柔らかくなってから最高。','shu','26'],[3,'最初が痛い。','mk','24']] },
  { id:'slipon', cat:'shoes', name:'キャンバス スリッポン', price:11000, sale:8800, sizes:SIZES_SH, rank:21, mat:'アッパー 綿／ソール ラバー', made:'中国製', desc:'キャンバスのスリッポン。かかとを踏んでも履ける作り。', care:'手洗い', v:[ {c:'グレー',img:['pk-slipon-grey','pk-slipon-grey-d','pk-slipon-grey-e']}, {c:'レッド',img:['pk-slipon-red','pk-slipon-red-d','pk-slipon-red-e']} ], meas:{}, reviews:[[4,'軽い。','ko','27']] },
];
const MEAS_LABEL = { tops:['着丈','身幅','肩幅','袖丈'], outer:['着丈','身幅','肩幅','袖丈'], onepiece:['着丈','身幅','肩幅','袖丈'], bottoms:['股下','ウエスト(平置き)','わたり','-'], acc:['長さ／高さ','幅','マチ','-'], shoes:[] };
/* ルックブック：写真と着ている商品 */
const LOOKS = [
  { img:'look-2', title:'白ニットとデニム', items:['knit-crew','jeans-st'] },
  { img:'look-25', title:'ダウンを羽織って', items:['down','knit-crew','jeans-st'] },
  { img:'look-8', title:'ニットとスカート', items:['knit-turtle','skirt-pleat'] },
  { img:'look-24', title:'シアーシャツとロングスカート', items:['shirt-sheer','skirt-tiered'] },
  { img:'look-15', title:'黒Tシャツとイージーパンツ', items:['tee-crew','wide'] },
  { img:'look-10', title:'赤いケーブルニット', items:['knit-cable'] },
  { img:'look-23', title:'ファーのジャケット', items:['fur'] },
  { img:'look-26', title:'白のシャツワンピース', items:['dress'] },
];
const NEWS = [
  ['2026.11.10','冬物のダウンジャケットが入荷しました。サイズはS〜L。'],
  ['2026.11.01','11,000円以上のお買い上げで送料無料になりました。'],
  ['2026.10.20','会員登録で初回10%OFFクーポン「WELCOME10」をお使いいただけます。'],
];
const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
