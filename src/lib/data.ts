// Kişi ve iletişim bilgileri yayından önce doğrulanmış bilgilerle güncellenmelidir.
// İçerikler genel bilgilendirme amaçlıdır; kişiye özel tıbbi beslenme önerisi değildir.
export const pro = {
  brand: "Filiz Beslenme",
  name: "Dyt. Ad Soyad",
  title: "Diyetisyen",
  city: "Şehir",
  address: "Örnek Mah. Örnek Sok. No:1, Şehir",
  phoneDisplay: "+90 (000) 000 00 00",
  phoneHref: "tel:+900000000000",
  email: "merhaba@filizbeslenme.com",
  hours: "Hafta içi 09:00 – 18:00 (randevu ile)",
};

export const plate = [
  { id: "sebze", label: "Sebze ve meyve", share: "Tabağın yaklaşık yarısı", color: "#7f9a6c", d: "Renk çeşitliliği; lif, vitamin ve mineral çeşitliliği anlamına gelir. Mevsiminde, farklı renklerden seçmek öğünleri hem doyurucu hem keyifli kılar." },
  { id: "tahil", label: "Tam tahıllar", share: "Yaklaşık dörtte biri", color: "#d8a77d", d: "Bulgur, yulaf, tam buğday ve karabuğday gibi tam tahıllar; rafine tahıllara göre daha fazla lif içerir ve tokluğa katkı sağlar." },
  { id: "protein", label: "Protein kaynakları", share: "Yaklaşık dörtte biri", color: "#b9825a", d: "Baklagiller, balık, yumurta, tavuk ve süt ürünleri. Bitkisel ve hayvansal kaynakları dönüşümlü kullanmak çeşitliliği artırır." },
  { id: "yag", label: "Sağlıklı yağlar", share: "Ölçülü miktarda", color: "#a9b89b", d: "Zeytinyağı, ceviz, fındık ve avokado gibi kaynaklar; miktar kişinin ihtiyacına göre belirlenir." },
  { id: "su", label: "Su", share: "Gün boyunca", color: "#8fb3b8", d: "Gün içinde düzenli su tüketimi alışkanlığı; şekerli içeceklerin yerine su tercih etmek iyi bir başlangıçtır." },
] as const;

export const macros = [
  { k: "Protein", v: 72, d: "Dokuların yapı taşıdır. Tokluk hissine katkı sağlar; ihtiyaç yaş, aktivite ve sağlık durumuna göre değişir." },
  { k: "Karbonhidrat", v: 88, d: "Vücudun temel enerji kaynağıdır. Tam tahıllar ve baklagiller gibi lifli kaynaklar öne çıkar." },
  { k: "Yağ", v: 54, d: "Bazı vitaminlerin emilimi ve hormon üretimi için gereklidir. Kaynak türü ve miktar önemlidir." },
  { k: "Lif", v: 64, d: "Sindirim sağlığını destekler ve tokluk süresini uzatır. Sebze, meyve, baklagil ve tam tahıllarda bulunur." },
];

export const services = [
  { t: "Bireysel beslenme danışmanlığı", d: "Yaşam tarzına, alışkanlıklara ve hedeflere göre birlikte oluşturulan, sürdürülebilir beslenme planı.", img: "/images/salad.jpg" },
  { t: "Sporcu beslenmesi", d: "Antrenman düzeni ve performans hedefleriyle uyumlu öğün zamanlaması ve beslenme planlaması.", img: "/images/flatlay.jpg" },
  { t: "Gebelik ve emzirme dönemi", d: "Bu özel dönemlerde değişen ihtiyaçlara yönelik, hekim takibiyle uyumlu beslenme rehberliği.", img: "/images/fruit.jpg" },
  { t: "Çocuk ve ergen beslenmesi", d: "Büyüme dönemine uygun, aile ile birlikte planlanan dengeli beslenme alışkanlıkları.", img: "/images/breakfast.jpg" },
  { t: "Çevrim içi danışmanlık", d: "Görüntülü görüşme ile, şehir fark etmeksizin düzenli takip imkânı.", img: "/images/holding-bowl.jpg" },
  { t: "Kurumsal beslenme", d: "İş yerleri için beslenme bilgilendirme seminerleri ve menü değerlendirmeleri.", img: "/images/egg-plate.jpg" },
];

export const recipes = [
  {
    t: "Akdeniz kinoa kasesi",
    time: "25 dk",
    serves: "2 kişilik",
    img: "/images/salad.jpg",
    tags: ["Bitkisel protein", "Lifli"],
    ing: ["1 su bardağı kinoa", "1 su bardağı haşlanmış nohut", "1 salatalık, 1 domates", "Bir avuç maydanoz ve nane", "2 yemek kaşığı zeytinyağı", "Yarım limonun suyu"],
    steps: ["Kinoayı iyice yıkayıp iki katı suyla 15 dakika pişirin ve soğutun.", "Sebzeleri küp doğrayın, yeşillikleri ince kıyın.", "Tüm malzemeleri geniş bir kapta birleştirin.", "Zeytinyağı ve limonla tatlandırıp servis edin."],
  },
  {
    t: "Meyveli yulaf kasesi",
    time: "10 dk",
    serves: "1 kişilik",
    img: "/images/breakfast.jpg",
    tags: ["Kahvaltı", "Tam tahıl"],
    ing: ["4 yemek kaşığı yulaf", "1 su bardağı süt veya yoğurt", "Bir avuç mevsim meyvesi", "1 tatlı kaşığı chia tohumu", "Birkaç adet ceviz"],
    steps: ["Yulafı süt veya yoğurtla karıştırın.", "Chia tohumunu ekleyip 5 dakika bekletin.", "Üzerine doğranmış meyveleri ve cevizi ekleyin."],
  },
  {
    t: "Somonlu renkli kase",
    time: "30 dk",
    serves: "2 kişilik",
    img: "/images/bowl.jpg",
    tags: ["Omega-3", "Dengeli tabak"],
    ing: ["2 dilim somon", "1 su bardağı esmer pirinç veya bulgur", "Avokado, havuç, mor lahana", "1 yemek kaşığı susam", "Limon ve zeytinyağı"],
    steps: ["Pirinci veya bulguru haşlayın.", "Somonu fırında 180°C'de yaklaşık 15 dakika pişirin.", "Sebzeleri ince dilimleyin.", "Kaseye tahılı, sebzeleri ve somonu yerleştirip susam serpin."],
  },
];

export const faqs = [
  { q: "İlk görüşmede neler yapılıyor?", a: "Beslenme alışkanlıkları, yaşam tarzı, hedefler ve varsa hekim tarafından paylaşılan bilgiler konuşulur. Ölçümler ve ihtiyaçlar değerlendirilerek plan birlikte oluşturulur." },
  { q: "Çevrim içi danışmanlık nasıl ilerliyor?", a: "Görüşmeler görüntülü olarak yapılır; planlar ve takip notları dijital olarak paylaşılır. Süreç yüz yüze görüşmelerle aynı titizlikle yürütülür." },
  { q: "Yasaklı besin listesi veriliyor mu?", a: "Yaklaşım kısıtlamaya değil, sürdürülebilir alışkanlıklara dayanır. Tıbbi bir gereklilik olmadıkça besin grupları dışlanmaz." },
  { q: "Takip görüşmeleri ne sıklıkla?", a: "Sıklık kişinin ihtiyacına ve hedefine göre birlikte belirlenir." },
  { q: "Bir hastalığım var, danışmanlık alabilir miyim?", a: "Tıbbi beslenme tedavisi gerektiren durumlarda süreç, hekiminizin tanı ve önerileri doğrultusunda planlanır." },
];
