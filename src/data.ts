import { MenuData } from './types';

export const menuData: MenuData = {
  "categories": [
    {
      "id": "Coffee",
      "name": {
        "en": "COFFEE",
        "hu": "KÁVÉ",
        "de": "KAFFEE"
      },
      "items": [
        {
          "id": "Espresso",
          "name": {
            "en": "Espresso",
            "hu": "Espresso",
            "de": "Espresso"
          },
          "price": 799,
          "description": {
            "en": "Rich and bold single shot of premium Arabica espresso.",
            "hu": "Gazdag és merész egyedülálló adag prémium Arabica eszpresszóból.",
            "de": "Kräftiger und intensiver einfacher Espresso aus Premium-Arabica."
          }
        },
        {
          "id": "Double_Espresso",
          "name": {
            "en": "Double Espresso",
            "hu": "Dupla Eszpresszó",
            "de": "Doppelter Espresso"
          },
          "price": 1199,
          "description": {
            "en": "Two concentrated shots of espresso for double the intensity.",
            "hu": "Két koncentrált adag eszpresszó a kétszeres intenzitásért.",
            "de": "Zwei konzentrierte Espresso-Shots für doppelte Intensität."
          }
        },
        {
          "id": "Americano",
          "name": {
            "en": "Americano",
            "hu": "Americano",
            "de": "Americano"
          },
          "price": 899,
          "description": {
            "en": "Espresso shot diluted with hot water, yielding a smooth cup.",
            "hu": "Forró vízzel megnyújtott eszpresszó a lágyabb ízvilágért.",
            "de": "Espresso mit heißem Wasser verlängert für feinen Geschmack."
          }
        },
        {
          "id": "Cappuccino",
          "name": {
            "en": "Cappuccino",
            "hu": "Cappuccino",
            "de": "Cappuccino"
          },
          "price": 1099,
          "description": {
            "en": "Espresso topped with equal parts steamed milk and velvety foam.",
            "hu": "Eszpresszó gőzölt tejjel és sűrű tejhabbal a tetején.",
            "de": "Espresso mit gleich großen Teilen warmer Milch und Milchschaum."
          }
        },  
        {
          "id": "Flat White",
          "name": {
            "en": "Flat White",
            "hu": "Flat White",
            "de": "Flat White"
          },
          "price": 1299,
          "description": {
            "en": "Double espresso shot with delicately steamed microfoam milk.",
            "hu": "Dupla espresso lágy textúrájú mikrohabos gőzölt tejjel.",
            "de": "Doppelter Espresso mit feinporigem, samtigem Milchschaum."
          }
        },
        {
          "id": "Viennese Coffee",
          "name": {
            "en": "Viennese Coffee",
            "hu": "Bécsi Kávé",
            "de": "Wiener Kaffee"
          },
          "price": 1199,
          "description": {
            "en": "Traditional espresso paired with luxurious whipped cream.",
            "hu": "Hagyományos eszpresszó kényeztető tejszínhabbal.",
            "de": "Traditioneller Espresso serviert mit feiner Schlagsahne."
          }
        },
        {
          "id": "Cuban Espresso",
          "name": {
            "en": "Cuban Espresso",
            "hu": "Kubai Eszpresszó",
            "de": "Kubanischer Espresso"
          },
          "price": 899,
          "description": {
            "en": "Espresso brewed directly with natural brown demerara sugar.",
            "hu": "Barna cukorral egybefőzött, karamelles sűrű kávékülönlegesség.",
            "de": "Direkt mit braunem Rohrzucker aufgebrühter, süßer Espresso."
          }
        },
        {
          "id": "Chilli Espresso",
          "name": {
            "en": "Chilli Espresso",
            "hu": "Chilis Eszpresszó",
            "de": "Chili Espresso"
          },
          "price": 899,
          "tags": ["Hot", "Spicy"],
          "description": {
            "en": "For the adventurous: premium espresso with a kick of chilli flakes.",
            "hu": "Kalandvágyóknak: házias eszpresszó egy pici chilis fűszerezéssel.",
            "de": "Für Abenteurer: Espresso mit einem dezenten Hauch feiner Chili."
          }
        },
        {
          "id": "Roman Macchiato",
          "name": {
            "en": "Roman Macchiato",
            "hu": "Római Macchiato",
            "de": "Römischer Macchiato"
          },
          "price": 899,
          "description": {
            "en": "Classic espresso stained with just a dollop of warm milk foam.",
            "hu": "Klasszikus eszpresszó mindössze egy csepp meleg tejhabbal díszítve.",
            "de": "Klassischer Espresso markiert mit einer kleinen Haube Milchschaum."
          }
        },
        {
          "id": "Sicilian Espresso",
          "name": {
            "en": "Sicilian Espresso",
            "hu": "Szicíliai Eszpresszó",
            "de": "Sizilianischer Espresso"
          },
          "price": 899,
          "description": {
            "en": "Refreshing espresso infused with a touch of fresh lemon essence.",
            "hu": "Frissítő eszpresszó egy csipetnyi friss citromhéj aromájával.",
            "de": "Erfrischender Espresso mit einer dezenten Fruchtnote reifer Zitronen."
          }
        },
        {
          "id": "Hazelnut Coffee",
          "name": {
            "en": "Hazelnut Coffee",
            "hu": "Mogyorós kávé",
            "de": "Haselnusskaffee"
          },
          "price": 1899,
          "description": {
            "en": "Rich espresso combined with sweet, toasted hazelnut nectar.",
            "hu": "Gazdag eszpresszó édes, pörkölt mogyorós szirupos ízesítéssel.",
            "de": "Aromatischer Espresso mit feiner, nussig-süßer Haselnussnote."
          }
        },
        {
          "id": "Ice Cream Coffee (Cannes Style)",
          "name": {
            "en": "Ice Cream Coffee (Cannes Style)",
            "hu": "Fagylaltos kávé (Cannes stílus)",
            "de": "Eiskaffee (Cannes Stil)"
          },
          "price": 2199,
          "tags": ["Popular", "Cold"],
          "description": {
            "en": "Premium vanilla ice cream drowned in espresso, served Cannes style.",
            "hu": "Eszpresszóba mártott lágy vaníliafagylalt Cannes stílusban.",
            "de": "Vanilleeis übergossen mit frischem Espresso im Stil von Cannes."
          }
        },
        {
          "id": "Iced Cappuccino",
          "name": {
            "en": "Iced Cappuccino",
            "hu": "Jeges cappuccino",
            "de": "Eis-Cappuccino"
          },
          "price": 1399,
          "description": {
            "en": "Chilled espresso, milk, and ice, topped with cold milk foam.",
            "hu": "Frissítő jeges eszpresszó tejjel, bő jéggel és hűvös tejhabbal.",
            "de": "Gekühlter Espresso, Milch und Eiswürfel mit cremigem Kaltschaum."
          }
        },
        {
          "id": "Iced Caramel Coffee",
          "name": {
            "en": "Iced Caramel Coffee",
            "hu": "Jeges karamellás kávé",
            "de": "Eis Karamell Kaffee"
          },
          "price": 1499,
          "description": {
            "en": "Iced espresso blended with creamy milk and rich, sweet caramel.",
            "hu": "Jeges kávé selymes tejjel és gazdag, édes karamell öntettel.",
            "de": "Gekühlter Espresso mit samtiger Milch und feiner Karamellsauce."
          }
        },
        {
          "id": "Greek Freddo Cappuccino",
          "name": {
            "en": "Greek Freddo Cappuccino",
            "hu": "Görög Freddo cappuccino",
            "de": "Griechischer Freddo Cappuccino"
          },
          "price": 1799,
          "tags": ["Speciality"],
          "description": {
            "en": "Indulgent Greek style iced coffee with a thick layer of cold milk foam.",
            "hu": "Görgös hagyományos kávékülönlegesség vastag hideg tejhab réteggel.",
            "de": "Griechischer Eiskaffee mit einer herrlich dichten, kalten Schaumkrone."
          }
        },
        {
          "id": "Irish Coffee",
          "name": {
            "en": "Irish Coffee",
            "hu": "Ír kávé",
            "de": "Irischer Kaffee"
          },
          "price": 1299,
          "description": {
            "en": "Deep espresso combined with rich Irish flavors and cream topping.",
            "hu": "Intenzív feketekávé krémes ír aromákkal és gazdag habbal.",
            "de": "Kräftiger Espresso verfeinert mit feinem irischen Aroma und Sahne."
          }
        },
        {
          "id": "Pumpkin Latte",
          "name": {
            "en": "Pumpkin Latte",
            "hu": "Sütőtökös latte",
            "de": "Kürbis Latte"
          },
          "price": 1899,
          "description": {
            "en": "Seasonal specialty with real pumpkin spices, espresso, and warm milk.",
            "hu": "Szezonális különlegesség sütőtök fűszerekkel, kávéval és meleg tejjel.",
            "de": "Saisonale Spezialität mit Kürbisgewürzen, Espresso und warmer Milch."
          }
        },
        {
          "id": "Affogato",
          "name": {
            "en": "Affogato",
            "hu": "Affogato",
            "de": "Affogato"
          },
          "price": 1099,
          "description": {
            "en": "A scoop of vanilla bean gelato drowned in a hot shot of espresso.",
            "hu": "Egy gombóc vaníliafagylalt leöntve egy adag forró, sűrű eszpresszóval.",
            "de": "Eine Kugel feines Vanilleeis ertränkt in heißem Espresso."
          }
        },
        {
          "id": "Nutella Latte",
          "name": {
            "en": "Nutella Latte",
            "hu": "Nutellás Latte",
            "de": "Nutella Latte"
          },
          "price": 1799,
          "tags": ["Fave"],
          "description": {
            "en": "Warm, chocolatey hazelnut Nutella melted into rich espresso and milk.",
            "hu": "Krémes mogyorós Nutella elkeverve gazdag eszpresszóval és gőzölt tejjel.",
            "de": "In heißem Espresso und Milch geschmolzene, cremige Nutella."
          }
        },
        {
          "id": "Mocha",
          "name": {
            "en": "Mocha",
            "hu": "Mokka",
            "de": "Mokka"
          },
          "price": 1799,
          "description": {
            "en": "Espresso mixed with premium cocoa syrup and velvety steamed milk.",
            "hu": "Eszpresszó prémium kakaó sziruppal és bársonyos gőzölt tejjel.",
            "de": "Espresso vereint mit feinem Kakao und cremig gepochter Milch."
          }
        },
        {
          "id": "Vanilla Cinnamon Coffee",
          "name": {
            "en": "Vanilla Cinnamon Coffee",
            "hu": "Vaníliás-fahéjas kávé",
            "de": "Vanille-Zimt Kaffee"
          },
          "price": 1599,
          "description": {
            "en": "Aromatic pairing of pure vanilla and a dusting of sweet ground cinnamon.",
            "hu": "Tiszta lágy vanília és meleg őrölt fahéj fűszeres harmóniája kávénkban.",
            "de": "Aromatische Kombination aus feiner Vanille und einer Prise Zimt."
          }
        },
        {
          "id": "Ginger Coffee",
          "name": {
            "en": "Ginger Coffee",
            "hu": "Gyömbéres kávé",
            "de": "Ingwer Kaffee"
          },
          "price": 1599,
          "description": {
            "en": "Exotic coffee experience spiced with aromatic fresh-cut ginger.",
            "hu": "Egzotikus kávékülönlegesség friss, fűszeres gyömbér infúzióval.",
            "de": "Einzigartiger Kaffeegenuss, angenehm verfeinert mit frischem Ingwer."
          }
        },
        {
          "id": "Caramel Vanilla Coffee",
          "name": {
            "en": "Caramel Vanilla Coffee",
            "hu": "Karamellás-vaníliás kávé",
            "de": "Karamell-Vanille Kaffee"
          },
          "price": 1799,
          "description": {
            "en": "Buttery warm caramel notes married to sweet, high-grade vanilla beans.",
            "hu": "Kényeztető karamell és édes madagaszkári vanília tökéletes párosítása.",
            "de": "Süßes Karamellaroma harmonisch abgestimmt mit sanfter Vanille."
          }
        },
        {
          "id": "Caramel Macchiato",
          "name": {
            "en": "Caramel Macchiato",
            "hu": "Karamellás macchiato",
            "de": "Karamell Macchiato"
          },
          "price": 1499,
          "description": {
            "en": "Steamed milk stained with espresso, laced with buttery caramel drizzle.",
            "hu": "Gőzölt és habosított tej eszpresszóval és gazdag karamell-csíkokkal.",
            "de": "Aufgeschäumte Milch mit Espresso, garniert mit feiner Karamellsauce."
          }
        },
        {
          "id": "Pistachio Matcha White Chocolate Latte",
          "name": {
            "en": "Pistachio Matcha White Chocolate Latte",
            "hu": "Pisztáciás matcha fehércsokoládés latte",
            "de": "Pistazien Matcha Weißschokolade Latte"
          },
          "price": 2299,
          "tags": ["Premium", "Unique"],
          "description": {
            "en": "Gourmet creation with pure pistachio puree, matcha green tea, and white chocolate.",
            "hu": "Kézműves latte valódi pisztáciával, matcha zöldteával és selymes fehércsokoládéval.",
            "de": "Luxuriöse Kreation aus feinem Pistazienmark, edlem Matcha und weißer Schokolade."
          }
        },
        {
          "id": "Pistachio Latte",
          "name": {
            "en": "Pistachio Latte",
            "hu": "Pisztáciás latte",
            "de": "Pistazien Latte"
          },
          "price": 1899,
          "description": {
            "en": "Rich nutty pistachio syrup blended beautifully into hot steamed milk and espresso.",
            "hu": "Illatos, pörkölt pisztácia krém gőzölt tejjel és eszpresszóval vegyítve.",
            "de": "Aromatisches Pistazien-Aroma in warmer Milch und kräftigem Espresso."
          }
        },
        {
          "id": "Iced Orange Coffee",
          "name": {
            "en": "Iced Orange Coffee",
            "hu": "Jeges narancsos kávé",
            "de": "Eis Orangen Kaffee"
          },
          "price": 1499,
          "tags": ["Cold", "Refresh"],
          "description": {
            "en": "Layered drink with sweet orange juice and a floating double shot of espresso.",
            "hu": "Látványos rétegezett jeges ital édes narancslével és dupla eszpresszóval.",
            "de": "Erfrischender Mix aus kaltem Orangensaft und nussigem Espresso auf Eis."
          }
        },
        {
          "id": "Iced Latte",
          "name": {
            "en": "Iced Latte",
            "hu": "Jeges latte",
            "de": "Eis Latte"
          },
          "price": 1499,
          "description": {
            "en": "Cold fresh milk and ice cubes topped with a rich pour of espresso.",
            "hu": "Hideg tej és jégkockák gazdag fekete espresso-val leöntve.",
            "de": "Klassischer kalter Kaffeegenuss mit frischer Milch und Espresso auf Eis."
          }
        }
      ]
    },
    {
      "id": "ARABIC COFFEE",
      "name": {
        "en": "ARABIC COFFEE",
        "hu": "ARAB KÁVÉ",
        "de": "ARABISCHER KAFFEE"
      },
      "items": [
        {
          "id": "Arabic Coffee with Cardamom, Cinnamon & Nutmeg",
          "name": {
            "en": "Arabic Coffee with Cardamom, Cinnamon & Nutmeg",
            "hu": "Arab kávé kardamommal, fahéjjal és szerecsendióval",
            "de": "Arabischer Kaffee mit Kardamom, Zimt und Muskat"
          },
          "price": 1399,
          "tags": ["Authentic", "Must Try"],
          "description": {
            "en": "Traditional Arabic brew infused with warm, aromatic cardamom, sweet cinnamon, and a pinch of nutmeg.",
            "hu": "Hagyományos arab pörkölésű kávé kardamommal, fahéjjal és csipet szerecsendióval.",
            "de": "Traditionell orientalisches Gebräu, veredelt mit Kardamom, Zimt und gemahlenem Muskat."
          }
        },
        {
          "id": "Arabic Coffee with Orange",
          "name": {
            "en": "Arabic Coffee with Orange",
            "hu": "Arab kávé narancsos ízesítéssel",
            "de": "Arabischer Kaffee mit Orange"
          },
          "price": 1399,
          "description": {
            "en": "Spiced Arabic coffee roasted and infused with the citrus fragrance of sun-ripened oranges.",
            "hu": "Különleges fűszerezésű arab kávé frissítő, lédús narancsos jegyekkel.",
            "de": "Würziger arabischer Kaffee veredelt mit der feinen Fruchtnote reifer Orangen."
          }
        }  
      ]
    },
    {
      "id": "Chocolate",
      "name": {
        "en": "Chocolate",
        "hu": "Csokoládé",
        "de": "Schokolade"
      },
      "items" : [
        {
          "id": "Hot Chocolate",
          "name": {
            "en": "Hot Chocolate",
            "hu": "Forró csokoládé",
            "de": "Heiße Schokolade"
          },
          "price": 1699,
          "description": {
            "en": "Thick premium belgian hot chocolate made with cocoa and fresh milk.",
            "hu": "Sűrű belga csokoládé krémes tejjel finomra gőzölve.",
            "de": "Cremige, heiße belgische Schokolade zubereitet mit frischer Milch."
          }
        },
        {
          "id": "White Chocolate",
          "name": {
            "en": "White Chocolate",
            "hu": "Fehér csokoládé",
            "de": "Weiße Schokolade"
          },
          "price": 1699,
          "description": {
            "en": "Sweet, silky white chocolate melted and frothed with warm milk.",
            "hu": "Lágy, édes fehércsokoládé gőzölt selymes tejjel egybekeverve.",
            "de": "Süße, samtige weiße Schokolade heiß aufgeschäumt."
          }
        },
        {
          "id": "Hot Caramel",
          "name": {
            "en": "Hot Caramel",
            "hu": "Forró Karamell",
            "de": "Heiße Karamell"
          },
          "price": 1699,
          "description": {
            "en": "Warm, creamy drink bursting with luxurious, sweet caramel elixir.",
            "hu": "Kényeztetően meleg tejes ital intenzív karamellás ízvilággal.",
            "de": "Wohltuendes Heißgetränk verfeinert mit feinstem Karamellgeschmack."
          }
        }
      ]
    },
    {
      "id": "TEA",
      "name": {
        "en": "TEA",
        "hu": "TEA",
        "de": "TEE"
      },
      "items": [
        {
          "id": "Green Tea",
          "name": {
            "en": "Green Tea",
            "hu": "Zöld Tea",
            "de": "Grüner Tee"
          },
          "price": 899,
          "description": {
            "en": "Organic hand-picked green tea leaves brewed to dynamic perfection.",
            "hu": "Kézzel szedett organikus zöld tea levek kényeztető aromával.",
            "de": "Schonend aufgebrühter, biologischer grüner Tee aus ganzen Blättern."
          }
        },
        {
          "id": "Black Tea",
          "name": {
            "en": "Black Tea",
            "hu": "Fekete Tea",
            "de": "Schwarzer Tee"
          },
          "price":  899,
          "description": {
            "en": "Full-bodied aromatic classic black tea, perfect with lemon or milk.",
            "hu": "Gazdag, telt ízű fekete tea, kiváló citrommal vagy tejjel felszolgálva.",
            "de": "Vollmundiger, kräftiger schwarzer Tee – perfekt mit Zitrone oder Milch."
          }
        },
        {
          "id": "Mint Tea",
          "name": {
            "en": "Mint Tea",
            "hu": "Mentatea",
            "de": "Minztee"
          },
          "price":  899,
          "description": {
            "en": "Infusion of fresh organic peppermint leaves, naturally caffeine free.",
            "hu": "Frissítő fodormenta levelekből készült, természetesen koffeinmentes tea.",
            "de": "Aufguss aus frischen Minzblättern, von Natur aus koffeinfrei."
          }
        },
        {
          "id": "Fruit Tea",
          "name": {
            "en": "Fruit Tea",
            "hu": "Gyümölcstea",
            "de": "Früchtetee"
          },
          "price":  899,
          "description": {
            "en": "Vibrant and sweet red berry medley, warm and soothing.",
            "hu": "Lédús piros bogyós gyümölcsök zamatos, meleg főzete.",
            "de": "Ein fruchtiges Beeren-Erlebnis – süß, warm und aromatisch."
          }
        } 
      ]
    },
    {
      "id": "MATCHA",
      "name": {
        "en": "MATCHA",
        "hu": "MATCHA",
        "de": "MATCHA"
      },
      "items": [
        {
          "id": "Iced Matcha",
          "name": {
            "en": "Iced Matcha",
            "hu": "Jeges Matcha",
            "de": "Eis Matcha"
          },
          "price": 1699,
          "description": {
            "en": "High grade ceremonial Japanese matcha whisked with fresh milk over ice.",
            "hu": "Prémium minőségű japán matcha hideg tejjel és jéggel felrázva.",
            "de": "Hochwertiger japanischer Matcha auf Eis, aufgeschlagen mit Milch."
          }
        },
        {
          "id": "Mango Matcha",
          "name": {
            "en": "Mango Matcha",
            "hu": "Mangós Matcha",
            "de": "Mango Matcha"
          },
          "price": 1399,
          "description": {
            "en": "Rich earthy matcha paired with the exotic sweetness of fresh mango nectar.",
            "hu": "Földes zöld matcha és az édes, egzotikus mangópüré találkozása.",
            "de": "Erdiger Matcha-Geschmack kombiniert mit der fruchtigen Süße der Mango."
          }
        },
        {
          "id": "Strawberry Matcha",
          "name": {
            "en": "Strawberry Matcha",
            "hu": "Epres Matcha",
            "de": "Erdbeer Matcha"
          },
          "price": 1399,
          "tags": ["Fave"],
          "description": {
            "en": "Summery drink combining sweet strawberry compote, cool milk, and ceremonial matcha.",
            "hu": "Epres gyümölcspüré, hűvös tej és zöld matcha kényeztető harmóniája.",
            "de": "Herrlicher Kontrast aus süßen Erdbeeren, Milch und grünem Matcha."
          }
        },
        {
          "id": "Iced Mango Matcha",
          "name": {
            "en": "Iced Mango Matcha",
            "hu": "Jeges Mangós Matcha",
            "de": "Eis Mango Matcha"
          },
          "price": 1799,
          "description": {
            "en": "Refreshing iced version of our rich mango matcha latte served with ice cubes.",
            "hu": "Jeges, hűsítő változata az egzotikus mangós-matcha tejes italunknak.",
            "de": "Eiskalte Erfrischung unseres Mango-Matcha Lattes mit Eiswürfeln."
          }
        },
        {
          "id": "Iced Strawberry Matcha",
          "name": {
            "en": "Iced Strawberry Matcha",
            "hu": "Jeges Epres Matcha",
            "de": "Eis Erdbeer Matcha"
          },
          "price": 1799,
          "tags": ["Highly Rated"],
          "description": {
            "en": "The ultimate layered summer favorite: organic strawberry puree, ice, milk, and matcha.",
            "hu": "Az igazi nyári kedvenc rétegezve: eperszósz, jég, tej és zöld matcha.",
            "de": "Zweifarbiger Sommer-Klassiker aus Erdbeerpüree, Eis, Milch und Matcha."
          }
        }     
      ]
    },
    {
      "id": "LEMONADE",
      "name": {
        "en": "LEMONADE",
        "hu": "LIMONÁDÉ",
        "de": "LIMONADE"
      },
      "items": [
        {
          "id": "Strawberry Lemonade",
          "name": {
            "en": "Strawberry Lemonade",
            "hu": "Epres Limonádé",
            "de": "Erdbeer Limonade"
          },
          "price": 1599,
          "description": {
            "en": "Hand-squeezed refreshing lemonade infused with sweet ripe strawberries.",
            "hu": "Kézzel facsart friss citromos limonádé édes eperdarabkákkal fűszerezve.",
            "de": "Hausgemachte Limonade mit dem vollen Aroma reifer Erdbeeren."
          }
        },
        {
          "id": "Mango Lemonade",
          "name": {
            "en": "Mango Lemonade",
            "hu": "Mangós Limonádé",
            "de": "Mango Limonade"
          },
          "price": 1599,
          "description": {
            "en": "Thirst-quenching sweet lemonade mixed with rich tropical mango juice.",
            "hu": "Trópusi hangulatú jeges hűsítő friss mangópürével dúsítva.",
            "de": "Fruchtige Zitronenlimonade verfeinert mit exotischem Mangosaft."
          }
        },
        {
          "id": "Raspberry Lemonade",
          "name": {
            "en": "Raspberry Lemonade",
            "hu": "Málna Limonádé",
            "de": "Himbeer Limonade"
          },
          "price": 1599,
          "description": {
            "en": "Tangy and revitalizing craft lemonade with wild sweet raspberry juice.",
            "hu": "Kézműves citromos limonádé zamatos, gőzölgő málna sűrítménnyel.",
            "de": "Beerig-fruchtige Erfrischung mit herber Himbeernote."
          }
        }
      ]
    },
    {
      "id": "SHAKES",
      "name": {
        "en": "SHAKES",
        "hu": "SHAKE-EK",
        "de": "SHAKES"
      },
      "items": [
        {
          "id": "Nutella Strawberry Shake",
          "name": {
            "en": "Nutella Strawberry Shake",
            "hu": "Nutellás Epres Shake",
            "de": "Nutella Erdbeer Shake"
          },
          "price": 3599,
          "tags": ["Indulgent"],
          "description": {
            "en": "Decadent thick shake incorporating luscious Nutella cream and sweet strawberries.",
            "hu": "Krémes, sűrű turmix kényeztető mogyorókrémmel és érett eprekkel.",
            "de": "Sündhaft leckerer, dicker Shake aus Nutella-Creme und süßen Erdbeeren."
          }
        },
        {
          "id": "Nutella Banana Shake",
          "name": {
            "en": "Nutella Banana Shake",
            "hu": "Nutellás Banános Shake",
            "de": "Nutella Bananen Shake"
          },
          "price": 3599,
          "description": {
            "en": "Creamy sweet combination of fresh banana and legendary hazelnut Nutella shake.",
            "hu": "Friss banánok és a csodás Nutella mogyorókrém krémes turmix-keveréke.",
            "de": "Klassische Kombination aus frischen Bananen und Nutella cremig gemixt."
          }
        }
      ]
    },
    {
      "id": "Special Drinks",
      "name": {
        "en": "Special Drinks",
        "hu": "Különleges Italok",
        "de": "Spezialgetränke"
      },
      "items": [
        {
          "id": "Orange_Juice_300ml",
          "name": {
            "en": "Orange juice (300ml)",
            "hu": "Narancslé (300ml)",
            "de": "Orangensaft (300ml)"
          },
          "price": 2399,
          "description": {
            "en": "Freshly squeezed pure orange juice (300ml).",
            "hu": "Frissen facsart tiszta narancslé (300ml).",
            "de": "Frisch gepresster reiner Orangensaft (300ml)."
          }
        },
        {
          "id": "Banana_Milk",
          "name": {
            "en": "Banana Milk",
            "hu": "Banános tej",
            "de": "Bananenmilch"
          },
          "price": 2999,
          "description": {
            "en": "Rich banana milk blend.",
            "hu": "Krémes banános tejital.",
            "de": "Cremige Bananenmilch."
          }
        },
        {
          "id": "Carrot_Ice_Cream_Drink_Iranian",
          "name": {
            "en": "Carrot Ice Cream Drink (Iranian Style)",
            "hu": "Sárgarépás fagylaltos ital (iráni stílus)",
            "de": "Karotten-Eiscreme-Getränk (iranischer Stil)"
          },
          "price": 2699,
          "description": {
            "en": "Sweet vanilla ice cream float in fresh carrot juice, modern Iranian style.",
            "hu": "Hagyományos iráni sárgarépalé vaníliafagylalttal tálalva.",
            "de": "Traditionelles iranisches Karottensaft-Getränk mit Vanilleeis."
          }
        }
      ]
    },
    {
      "id": "EXTRAS",
      "name": {
        "en": "EXTRAS",
        "hu": "EXTRÁK",
        "de": "EXTRAS"
      },
      "items": [
        {
          "id": "Extra coffee shot",
          "name": {
            "en": "Extra coffee shot",
            "hu": "Extra kávé shot",
            "de": "Extra Kaffeeshot"
          },
          "price": 399
        },
        {
          "id": "Extra syrup",
          "name": {
            "en": "Extra syrup",
            "hu": "Extra szirup",
            "de": "Extra Sirup"
          },
          "price": 299
        },
        {
          "id": "Extra whipped cream",
          "name": {
            "en": "Extra whipped cream",
            "hu": "Extra tejszínhab",
            "de": "Extra Schlagsahne"
          },
          "price": 399
        },
        {
          "id": "Extra simple milk",
          "name": {
            "en": "Extra simple milk",
            "hu": "Extra egyszerű tej",
            "de": "Extra einfache Milch"
          },
          "price": 149
        },
        {
          "id": "Extra ice cream (vanilla)",
          "name": {
            "en": "Extra ice cream (vanilla)",
            "hu": "Extra fagylalt (vanília)",
            "de": "Extra Eiscreme (Vanille)"
          },
          "price": 399
        },
        {
          "id": "Take away cup",
          "name": {
            "en": "Take away cup",
            "hu": "Elviteles pohár",
            "de": "To-Go Becher"
          },
          "price": 110
        },
        {
          "id": "Honey",
          "name": {
            "en": "Honey",
            "hu": "Méz",
            "de": "Honig"
          },
          "price": 150
        }
      ]
    }
  ]
};
