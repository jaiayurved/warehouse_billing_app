const products = [

  { "name": "Ashwagandha Pak 100gm 162/-", "category": "पाक", "batches": [{ "batch": "AGP14M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Ashwagandha Pak 200gm 248/-", "category": "पाक", "batches": [{ "batch": "AP15L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "AP16M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Ashwagandha Pak 400gm 430/-", "category": "पाक", "batches": [{ "batch": "AP14L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "BP13L", "mfg": "11-2022", "exp": "10-2025" }] },
  { "name": "Badam Paak 200g 460.00", "category": "पाक", "batches": [{ "batch": "BP14N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "BP15N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Badam Pak 100gm 198/-", "category": "पाक", "batches": [{ "batch": "BP12K", "mfg": "", "exp": "" }] },
  { "name": "Haridrakhand 100gm 156/-", "category": "पाक", "batches": [{ "batch": "HK22L", "mfg": "", "exp": "" }, { "batch": "HK23P", "mfg": "", "exp": "" }] },
  { "name": "Haridrakhand 100gm 290.00", "category": "पाक", "batches": [{ "batch": "HK20M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "Haridrakhand 120gm 210/-", "category": "पाक", "batches": [{ "batch": "HK22L", "mfg": "01-2022", "exp": "12-2024" }] },
  { "name": "Haridrakhand 200gm 290/-", "category": "पाक", "batches": [{ "batch": "HK20M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "HK21P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Kaunch Paak 100gm 168/-", "category": "पाक", "batches": [{ "batch": "KP16M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Kaunch Pak 200gm 258/-", "category": "पाक", "batches": [{ "batch": "KPA18N", "mfg": "08-2024", "exp": "07-2027" }, { "batch": "KPA18P", "mfg": "02-2025", "exp": "01-2028" }] },
  { "name": "Kaunch Pak 400gm 468/-", "category": "पाक", "batches": [{ "batch": "KPA15L", "mfg": "", "exp": "" }] },
  { "name": "Musli Paak 100gm 199/-", "category": "पाक", "batches": [{ "batch": "MP14M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Musli Paak 100gm 220.00", "category": "पाक", "batches": [{ "batch": "MP15N", "mfg": "08-2024", "exp": "07-2027" }] },
  { "name": "Musli Pak 200gm 370/-", "category": "पाक", "batches": [{ "batch": "MP17N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "MP18P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Musli Pak 200gm 395/-", "category": "पाक", "batches": [{ "batch": "MP18P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Supari Paak 1kg 850/-", "category": "पाक", "batches": [{ "batch": "SPM23L", "mfg": "05-2022", "exp": "04-2025" }] },
  { "name": "Supari Paak 250gm 265/-", "category": "पाक", "batches": [] },
  { "name": "Supari Paak(J)100gm 120/-", "category": "पाक", "batches": [{ "batch": "SP23M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "SP23P", "mfg": "03-2025", "exp": "02-2028" }] },
  { "name": "Supari Paak (J) 200gm 198/-", "category": "पाक", "batches": [{ "batch": "SP22M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "SP23P", "mfg": "01-2025", "exp": "12-2027" }] },

















  { "name": "Agnisandeepan Churn (M) 100gm 95/-", "category": "Mansi", "batches": [{ "batch": "MNA13N", "mfg": "06-2024", "exp": "05-2026" }, { "batch": "MNA14N", "mfg": "08-2024", "exp": "07-2026" }] },
  { "name": "Amla Murabba (M) 1kg 200/-", "category": "Mansi", "batches": [{ "batch": "AMM16M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "AMM17M", "mfg": "02-2023", "exp": "01-2026" }] },
  { "name": "ARTHOCARE PLUS 40 TAB 240/-", "category": "Mansi", "batches": [{ "batch": "MAP11N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "ARTHOCARE PLUS 500GM", "category": "Mansi", "batches": [{ "batch": "MAP11N", "mfg": "", "exp": "" }, { "batch": "Ashwagandha Churn (M) 100gm 180/-", "mfg": "", "exp": "" }, { "batch": "MAC11M", "mfg": "07-2023", "exp": "06-2025" }, { "batch": "MAC12M", "mfg": "11-2023", "exp": "10-2025" }, { "batch": "Asthgone Amrit (M) 100gm 150/-", "mfg": "", "exp": "" }, { "batch": "MAG16L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "MAG17M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Asthgone Amrit (M) 250gm 270/-", "category": "Mansi", "batches": [{ "batch": "MAG38N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "MAG39N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "MAG40N", "mfg": "04-2024", "exp": "03-2027" }, { "batch": "MAG41N", "mfg": "06-2024", "exp": "05-2027" }, { "batch": "Asthgone Amrit (M) 500gm 510/-", "mfg": "", "exp": "" }, { "batch": "MAG11L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "MAG12M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "Avipatikar Churna (M) 80gm 140/-", "mfg": "", "exp": "" }, { "batch": "MAC11L", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Chyavanprash(M) 1kg 395/-", "category": "Mansi", "batches": [{ "batch": "MCP11L", "mfg": "11-2022", "exp": "10-2025" }] },
  { "name": "Chyavanprash(M) 500gm 240/-", "category": "Mansi", "batches": [{ "batch": "MCP11N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Chyavanprash(M) 900gm 395/-", "category": "Mansi", "batches": [{ "batch": "MCP12M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "MCP13N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Dhatuposhtik Chrn 100g(M) 230.00", "category": "Mansi", "batches": [{ "batch": "MDP19N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "MDP20N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "MDP21N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "MDP22P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Dhatuposhtik Chrn (M) 1kg 1990/-", "category": "Mansi", "batches": [{ "batch": "MDP17M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "MDP18M", "mfg": "08-2023", "exp": "07-2026" }] },
  { "name": "Drakshavleha (M) 200gm 250.00", "category": "Mansi", "batches": [{ "batch": "DKM11N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Drakshavleha (M) 400 Gm 430/-", "category": "Mansi", "batches": [{ "batch": "BKM11N", "mfg": "10-2024", "exp": "09-2027" }, { "batch": "DKM11N", "mfg": "10-2024", "exp": "09-2027" }, { "batch": "Free Lax Powder (M) 80gm 105/-", "mfg": "", "exp": "" }, { "batch": "MN37M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "MN38N", "mfg": "09-2024", "exp": "08-2027" }, { "batch": "Gokharu Churn(M) 80gm 170/-", "mfg": "", "exp": "" }, { "batch": "MGC14L", "mfg": "09-2022", "exp": "08-2025" }] },
  { "name": "Gulkand (M) 200gm 154/-", "category": "Mansi", "batches": [{ "batch": "GKM15N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "GKM17N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Gulkand (M) 200gm 160/-", "category": "Mansi", "batches": [] },
  { "name": "Gulkand(M) 400gm 270.00", "category": "Mansi", "batches": [{ "batch": "GKM17N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "GKM18N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Gulkand (M) 800gm 450/-", "category": "Mansi", "batches": [{ "batch": "GKM16N", "mfg": "", "exp": "" }] },
  { "name": "Gulkand (M) 800gm 470/-", "category": "Mansi", "batches": [{ "batch": "GKM17P", "mfg": "02-2025", "exp": "01-2028" }, { "batch": "Manjisthadi Chrn.(M) 80gm 80/-", "mfg": "", "exp": "" }, { "batch": "MN29L", "mfg": "06-2022", "exp": "05-2025" }, { "batch": "MN30M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Manjisthadi Chrn.(M) 80gm 88.00", "category": "Mansi", "batches": [{ "batch": "MJN31N", "mfg": "04-2024", "exp": "03-2027" }, { "batch": "MJN32N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Mansi Hair Oil 100ml 180/-", "category": "Mansi", "batches": [{ "batch": "MN20M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "MN21M", "mfg": "11-2023", "exp": "10-2026" }] },
  { "name": "Mansi Hair Oil 100ml 198/-", "category": "Mansi", "batches": [{ "batch": "MN22P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Nagkeshar Chrna 80gm (M) 190.00", "category": "Mansi", "batches": [{ "batch": "Mn19L", "mfg": "11-2022", "exp": "10-2025" }] },
  { "name": "Nari Prabha 200ml Mrp 240", "category": "Mansi", "batches": [{ "batch": "MNP11P", "mfg": "03-2025", "exp": "02-2028" }] },
  { "name": "Nari Prabha Free With Np Syrup", "category": "Mansi", "batches": [{ "batch": "MN11P", "mfg": "", "exp": "" }] },
  { "name": "Orthocare Super  40tab. 240.00", "category": "Mansi", "batches": [{ "batch": "Shatavari Churn (M) 100gm 150/-", "mfg": "", "exp": "" }, { "batch": "MSC11M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "MSC12M", "mfg": "11-2023", "exp": "10-2026" }] },
  { "name": "Supari Pak 100g(M) 120/-", "category": "Mansi", "batches": [{ "batch": "MNS26N", "mfg": "06-2024", "exp": "05-2027" }, { "batch": "MNS27N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Supari Pak 200g(M) 198.00", "category": "Mansi", "batches": [{ "batch": "SPM26M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "SPM27M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "SPM28N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Tarunikusumakar Churna (M) 80gm 98/-", "category": "Mansi", "batches": [{ "batch": "MTC11M", "mfg": "07-2023", "exp": "06-2026" }] },

















  { "name": "BrahmRasayan 200gm 165/-", "category": "अवलेह", "batches": [{ "batch": "BR24L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "BR24M", "mfg": "04-2023", "exp": "03-2026" }] },
  { "name": "BrahmRasayan 400g 320/-", "category": "अवलेह", "batches": [{ "batch": "BRA29L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "BRA30L", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRA31M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "BRA32N", "mfg": "12-2024", "exp": "11-2027" }] },
  { "name": "ChitrakHaritaki Avleh 200g 240/-", "category": "अवलेह", "batches": [{ "batch": "CHA18L", "mfg": "01-2022", "exp": "12-2024" }, { "batch": "CHA19L", "mfg": "08-2022", "exp": "07-2025" }, { "batch": "CHA20L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "CHA21M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "CHA22M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "ChitrakHaritaki Avleh 400gm 440/-", "category": "अवलेह", "batches": [{ "batch": "CHA17L", "mfg": "", "exp": "" }, { "batch": "CHA18L", "mfg": "", "exp": "" }, { "batch": "CHA19L", "mfg": "", "exp": "" }, { "batch": "CHA20M", "mfg": "", "exp": "" }, { "batch": "CHA21M", "mfg": "", "exp": "" }] },
  { "name": "Chyavanprash 1kg 390/-", "category": "अवलेह", "batches": [{ "batch": "CPA32K", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "CPA33L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "CPA34L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "CPA35M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "CPA36M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "CPA37N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "CPA38N", "mfg": "12-2024", "exp": "11-2027" }, { "batch": "WL", "mfg": "12-2024", "exp": "11-2027" }] },
  { "name": "Drakshavaleh 200gm 158/-", "category": "अवलेह", "batches": [] },
  { "name": "DKA63K", "category": "अवलेह", "batches": [] },
  { "name": "Drakshavaleh 200gm 164/-", "category": "अवलेह", "batches": [] },
  { "name": "DKA64K", "category": "अवलेह", "batches": [] },
  { "name": "DKA65L", "category": "अवलेह", "batches": [] },
  { "name": "Drakshavaleh 200gm 190/-", "category": "अवलेह", "batches": [{ "batch": "DKA66L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "DKA67L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "DKA68L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "DKA69M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "DKA70M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "DKA71M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "DKA72M", "mfg": "11-2023", "exp": "10-2026" }] },
  { "name": "Drakshavaleh 200gm 210/-", "category": "अवलेह", "batches": [{ "batch": "DKA73N", "mfg": "03-2024", "exp": "02-2027" }] },
  { "name": "Drakshavaleh 200gm 230/-", "category": "अवलेह", "batches": [{ "batch": "DKA73N", "mfg": "08-2024", "exp": "07-2027" }, { "batch": "DKA74N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Drakshavaleh 200gm 280/-", "category": "अवलेह", "batches": [] },
  { "name": "Drakshavaleh 400g 340/-", "category": "अवलेह", "batches": [{ "batch": "DKA67L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "DKA68L", "mfg": "08-2022", "exp": "07-2025" }, { "batch": "DKA69L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "DKA70L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "DKA71M", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "DKA72M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "DKA73M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "DKA74M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "DKA75N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "DKA76N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Drakshavaleh 800gm 560/-", "category": "अवलेह", "batches": [{ "batch": "DKA59L", "mfg": "", "exp": "" }] },
  { "name": "Drakshavaleh 800gm 620/-", "category": "अवलेह", "batches": [{ "batch": "DKA60M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "DKA61M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "DKA62M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "DKA63M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "DKA64N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "DKA65N", "mfg": "07-2024", "exp": "06-2027" }] },
  { "name": "Gulkand 200gm 140/-", "category": "अवलेह", "batches": [{ "batch": "GKA38N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "GKA39N", "mfg": "07-2024", "exp": "06-2027" }] },
  { "name": "Gulkand 200gm 160/-", "category": "अवलेह", "batches": [{ "batch": "GKA40P", "mfg": "", "exp": "" }] },
  { "name": "Gulkand 400gm 240/-", "category": "अवलेह", "batches": [{ "batch": "GKA39N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "GKA40N", "mfg": "05-2024", "exp": "04-2027" }] },
  { "name": "Gulkand 800gm 410/-", "category": "अवलेह", "batches": [{ "batch": "GKA39M", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "GKA40N", "mfg": "05-2024", "exp": "04-2027" }] },
  { "name": "Kantkaryavleh 100gm 175/-", "category": "अवलेह", "batches": [{ "batch": "KTA11L", "mfg": "09-2022", "exp": "08-2025" }] },
  { "name": "Supari Pak 1kg 600/-", "category": "अवलेह", "batches": [{ "batch": "SPM22K", "mfg": "", "exp": "" }] },
  { "name": "Vasavaleha 400gm 280/-", "category": "अवलेह", "batches": [{ "batch": "VSA21N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Vasavleh 150gm 120/-", "category": "अवलेह", "batches": [{ "batch": "VSA11M", "mfg": "10-2023", "exp": "09-2026" }] },
  { "name": "Vasavleh 200gm 140.00", "category": "अवलेह", "batches": [{ "batch": "VSA20K", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "VSA21K", "mfg": "09-2021", "exp": "08-2024" }, { "batch": "VSA22L", "mfg": "12-2022", "exp": "11-2025" }] },
  { "name": "Vasavleh 200gm 160/-", "category": "अवलेह", "batches": [{ "batch": "VSA23N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Vasavleh 400gm 265/-", "category": "अवलेह", "batches": [{ "batch": "VSA19K", "mfg": "", "exp": "" }, { "batch": "VSA20L", "mfg": "", "exp": "" }, { "batch": "VSA21N", "mfg": "", "exp": "" }] },


  { "name": "Amritkumbh(J) 600gm 600/-", "category": "Patent", "batches": [{ "batch": "AK123L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "AK124M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "AK125M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "AK126M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "AKP139P", "mfg": "01-2025", "exp": "12-2027" }, { "batch": "AKR120K", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "AKR122L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "AKR136N", "mfg": "09-2024", "exp": "08-2027" }, { "batch": "AKR137N", "mfg": "09-2024", "exp": "08-2027" }, { "batch": "AKR138P", "mfg": "01-2025", "exp": "12-2027" }, { "batch": "AKR139P", "mfg": "03-2025", "exp": "02-2028" }] },
  { "name": "Arthitin Oil 100ml 138/-", "category": "Patent", "batches": [{ "batch": "ART31L", "mfg": "05-2022", "exp": "04-2025" }] },
  { "name": "Arthitin Oil 100ml 145/-", "category": "Patent", "batches": [{ "batch": "ART32L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "ART33M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "ART34M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "ART35M", "mfg": "11-2023", "exp": "10-2026" }] },
  { "name": "Arthitin Oil 50ml 85/-", "category": "Patent", "batches": [{ "batch": "ART32K", "mfg": "09-2021", "exp": "08-2024" }, { "batch": "ART33L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "ART34L", "mfg": "05-2022", "exp": "04-2025" }] },
  { "name": "Arthitin Syrup 200ml 148/-", "category": "Patent", "batches": [{ "batch": "ATS24K", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Arthitin Syrup 200ml 160/-", "category": "Patent", "batches": [{ "batch": "ATM26M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "ATS25L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "ATS27N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Arthitin Tablets 1000 Tab. 7000/-", "category": "Patent", "batches": [{ "batch": "ART13N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Arthitin Tablets 60tab. 180/-", "category": "Patent", "batches": [{ "batch": "ATT13K", "mfg": "", "exp": "" }] },
  { "name": "B B Oil 50ml 270/-", "category": "Patent", "batches": [{ "batch": "JB15K", "mfg": "", "exp": "" }] },
  { "name": "Bhringraj Oil 450ml 590/-", "category": "Patent", "batches": [{ "batch": "BRO13L", "mfg": "02-2022", "exp": "01-2025" }, { "batch": "BRO14L", "mfg": "05-2022", "exp": "04-2025" }, { "batch": "BRO15L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "BRO16L", "mfg": "07-2022", "exp": "06-2025" }, { "batch": "BRO17L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "BRO18L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "BRO19L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "BRO20L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "BRO20L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "BRO21L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "BRO22L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "BRO23L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "BRO24L", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRO25M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRO26M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRO27M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRO28M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "BRO29M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "BRO30M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "BRO31M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "BRO32M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "BRO33M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "BRo34M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "BRO35M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "BRO36M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "BRO37M", "mfg": "07-2023", "exp": "06-2026" }] },
  { "name": "Face Clean 50gm 70/-", "category": "Patent", "batches": [{ "batch": "FC25M", "mfg": "10-2023", "exp": "09-2026" }] },
  { "name": "Heigh Sky Syrup 200ml 175/-", "category": "Patent", "batches": [{ "batch": "HS23L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "HS24L", "mfg": "08-2022", "exp": "07-2025" }, { "batch": "HS25M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "HS26N", "mfg": "02-2024", "exp": "01-2027" }] },
  { "name": "Heing Sky Syrup 200ml 165/-", "category": "Patent", "batches": [{ "batch": "HS22K", "mfg": "01-2022", "exp": "12-2024" }] },
  { "name": "Hitopain -24 Oil 60ml 265/- (B)", "category": "Patent", "batches": [] },
  { "name": "Hitopain -24 Oil 60ml 265/- (W)", "category": "Patent", "batches": [] },
  { "name": "Jailive Syrup 200ml 110/-", "category": "Patent", "batches": [{ "batch": "JLS27N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Jailive Syrup 200ml 96/-", "category": "Patent", "batches": [{ "batch": "JL27N", "mfg": "06-2024", "exp": "05-2027" }, { "batch": "JLS25K", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "JLS26L", "mfg": "08-2022", "exp": "07-2025" }] },
  { "name": "Jaivita Syrup 200ml 130/-", "category": "Patent", "batches": [{ "batch": "JV16J", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "JV17J", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "JVS18K", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Jaivita Syrup 200ml 145/-", "category": "Patent", "batches": [{ "batch": "JVS19M", "mfg": "02-2023", "exp": "01-2026" }] },
  { "name": "Jaivita Syrup 200ml 160.00", "category": "Patent", "batches": [{ "batch": "JVS20N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Jaizyme Syrup 200ml 110/-", "category": "Patent", "batches": [{ "batch": "JZ35M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Jaizyme Syrup 200ml 96/-", "category": "Patent", "batches": [{ "batch": "JZ34J", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Keyuramrit Hair Shampoo 200ml 245/-", "category": "Patent", "batches": [{ "batch": "KS33L", "mfg": "", "exp": "" }, { "batch": "KS34M", "mfg": "", "exp": "" }, { "batch": "KS35N", "mfg": "", "exp": "" }] },
  { "name": "Keyuramrit Hair Tonic 100ml 178/-", "category": "Patent", "batches": [{ "batch": "JK42L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "JK43M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "JK44M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "JK45N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Keyuramrit Hair Tonic 100ml 198/-", "category": "Patent", "batches": [{ "batch": "JK46N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Keyuramrit Shampu 100ml 90/-", "category": "Patent", "batches": [{ "batch": "KS32J", "mfg": "06-2020", "exp": "05-2023" }, { "batch": "KS33L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "KS34M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "KS35N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Keyuramrit Shampu Sample", "category": "Patent", "batches": [] },
  { "name": "Lavani Syrup 200ml 130/-", "category": "Patent", "batches": [{ "batch": "LN19M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "LN20N", "mfg": "11-2024", "exp": "10-2027" }] },
  { "name": "Lavani Syrup 200ml 90/-", "category": "Patent", "batches": [{ "batch": "LN18K", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Leucojone Syrup 200ml 94/-", "category": "Patent", "batches": [{ "batch": "LJ14M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Leucosafe 450ml 186/-", "category": "Patent", "batches": [{ "batch": "LS15L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "LS16M", "mfg": "02-2023", "exp": "01-2026" }] },
  { "name": "Leucosafe Syrup 200ml 98/-", "category": "Patent", "batches": [{ "batch": "LS16M", "mfg": "02-2023", "exp": "01-2026" }] },
  { "name": "Lite Sf 80gm 98/-", "category": "Patent", "batches": [{ "batch": "LSF44L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "LSF45L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "LSF46M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "LSF47M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "LSF48M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "LSF49M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LSF50N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "LSF51N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "LSF52N", "mfg": "04-2024", "exp": "03-2027" }, { "batch": "LSF53N", "mfg": "09-2024", "exp": "08-2027" }] },
  { "name": "Livion Ds Syrup 200ml  145/-", "category": "Patent", "batches": [{ "batch": "LV17I", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Liv Syrup 100ml Sample", "category": "Patent", "batches": [{ "batch": "LVS47M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "LVS52M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LVS67N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Liv Syrup 300ml 210/-", "category": "Patent", "batches": [{ "batch": "LVS28L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "LVS29L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "Lvs30L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "LVS31L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "LVS32L", "mfg": "12-2022", "exp": "11-2025" }, { "batch": "LVS33M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "LVS34M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "LVS35M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "LVS36M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "LVS37M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "LVS38M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "LVS39M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "Lvs40M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "LVS41M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "LVS42M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "LVS43M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "LVS44M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "LVS45M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "LVS49M", "mfg": "09-2023", "exp": "08-2026" }] },
  { "name": "Liv Syrup 300ml 220/-", "category": "Patent", "batches": [{ "batch": "LVS46M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "LVS47M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "LVS48M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "LVS50M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LVS51M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LVS52M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LVS53M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "LVS54M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "LVS56N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "LVS57N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "LVS58N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "LVS59N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "LVS60N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "LVS61N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "LVS62N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "LVS63N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "LVS64N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "LVS65N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "LVS66N", "mfg": "06-2024", "exp": "05-2027" }, { "batch": "LVS67N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Liv Syrup 300ml 250/-", "category": "Patent", "batches": [{ "batch": "LVS68N", "mfg": "07-2024", "exp": "06-2027" }, { "batch": "LVS69N", "mfg": "07-2024", "exp": "06-2027" }, { "batch": "LVS70N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "LVS71N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "LVS72N", "mfg": "12-2024", "exp": "11-2027" }, { "batch": "LVS73N", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Liv Syrup 50ML Sample", "category": "Patent", "batches": [{ "batch": "Lps171M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "LPS172M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "LPS173M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "LPS174M", "mfg": "06-2023", "exp": "05-2026" }] },
  { "name": "Livup Syrup 300ml 135/-", "category": "Patent", "batches": [{ "batch": "LPS175M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "LPS176M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "LPS177M", "mfg": "10-2023", "exp": "09-2026" }, { "batch": "LPS178M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "LPS179M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "LPS180N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "LPS181N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "LPS182N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "LPS183N", "mfg": "07-2024", "exp": "06-2027" }, { "batch": "LPS184N", "mfg": "08-2024", "exp": "07-2027" }, { "batch": "Lps185N", "mfg": "10-2024", "exp": "09-2027" }, { "batch": "Lps186N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "Lps187P", "mfg": "01-2025", "exp": "12-2027" }, { "batch": "LPS188P", "mfg": "03-2025", "exp": "02-2028" }] },
  { "name": "Rajyog Amrit 500gm 740/-", "category": "Patent", "batches": [{ "batch": "RJA11K", "mfg": "08-2022", "exp": "07-2025" }, { "batch": "RJA12L", "mfg": "08-2022", "exp": "07-2025" }, { "batch": "RJA13N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "RJA14P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Slim Turn Syrup 200ml 145/-", "category": "Patent", "batches": [{ "batch": "ST17L", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "ST18M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Vulpower17 Gold 30Tab 599/-", "category": "Patent", "batches": [] },







  { "name": "Bakuchi Tail 100ml 215/-", "category": "तैल", "batches": [{ "batch": "BT12M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Bakuchi Tail 110ml 190/-", "category": "तैल", "batches": [{ "batch": "BKT13L", "mfg": "", "exp": "" }] },
  { "name": "Bhringraj Oil 450ml 598/-", "category": "तैल", "batches": [{ "batch": "BRO38M", "mfg": "08-2023", "exp": "07-2026" }, { "batch": "BRO39M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "BRO40M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "BRO41M", "mfg": "12-2023", "exp": "11-2026" }, { "batch": "BRO42M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "Dashmool Tail 200ml 220/-", "category": "तैल", "batches": [{ "batch": "DS13K", "mfg": "12-2021", "exp": "11-2024" }] },
  { "name": "Jatyadi Tail 100ml 176/-", "category": "तैल", "batches": [{ "batch": "JT24L", "mfg": "03-2022", "exp": "02-2025" }, { "batch": "JT25M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "JT26M", "mfg": "05-2023", "exp": "04-2026" }] },
  { "name": "Jatyadi Tail 50ml 94/-", "category": "तैल", "batches": [{ "batch": "JT23L", "mfg": "03-2022", "exp": "02-2025" }, { "batch": "JT24M", "mfg": "05-2023", "exp": "04-2026" }] },
  { "name": "Ksheerbala Tail 100ml 145/-", "category": "तैल", "batches": [{ "batch": "KBT13L", "mfg": "05-2022", "exp": "04-2025" }] },
  { "name": "Ksheerbala Tail 100ml 160/-", "category": "तैल", "batches": [] },
  { "name": "KBT14M", "category": "तैल", "batches": [] },
  { "name": "Ksheerbala Tail 200ml 255/-", "category": "तैल", "batches": [] },
  { "name": "Ksheerbala Tail 5 Ltr. 7250/-", "category": "तैल", "batches": [{ "batch": "KBT11M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Mahamarichyadi Tail 100ml 155/-", "category": "तैल", "batches": [{ "batch": "JM17J", "mfg": "07-2021", "exp": "06-2024" }] },
  { "name": "Mahamarichyadi Tail 100ml 160/-", "category": "तैल", "batches": [{ "batch": "JM18M", "mfg": "06-2023", "exp": "05-2026" }, { "batch": "JM19N", "mfg": "04-2024", "exp": "03-2027" }] },
  { "name": "Mahamarichyadi Tail 50ml 85/-", "category": "तैल", "batches": [{ "batch": "JM17J", "mfg": "06-2020", "exp": "05-2023" }] },
  { "name": "Mahanarayan Tail 100ml 210/-", "category": "तैल", "batches": [{ "batch": "MNT31M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "MNT32M", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "MNT33N", "mfg": "02-2024", "exp": "01-2027" }, { "batch": "MNT34N", "mfg": "03-2024", "exp": "02-2027" }, { "batch": "MNT35N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "MNT36O", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Mahanarayan Tail 200ml 380/-", "category": "तैल", "batches": [{ "batch": "MNT25L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "MNT26M", "mfg": "10-2023", "exp": "09-2026" }] },
  { "name": "Mahanarayan Tail 400ml 680/-", "category": "तैल", "batches": [{ "batch": "MNT25L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "MNT26M", "mfg": "10-2023", "exp": "09-2026" }] },
  { "name": "Mahanarayan Tail 50ml 96/-", "category": "तैल", "batches": [{ "batch": "MN25K", "mfg": "03-2021", "exp": "02-2024" }, { "batch": "MNT26L", "mfg": "05-2022", "exp": "04-2025" }, { "batch": "MNT27L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "MNT28M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Mahanarayan Tail 5 Ltr. 8000/-", "category": "तैल", "batches": [{ "batch": "MNT11M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Mahavisgarbha Tail 110ml 234/-", "category": "तैल", "batches": [{ "batch": "MB25J", "mfg": "", "exp": "" }] },
  { "name": "Mahavishgarbh Oil 100ml 164/-", "category": "तैल", "batches": [{ "batch": "MB25J", "mfg": "06-2022", "exp": "05-2025" }] },
  { "name": "Mahavishgarbh Oil 100ml 180/-", "category": "तैल", "batches": [{ "batch": "MB26L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "MB27M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "MB28M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "MB29M", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "MB30M", "mfg": "02-2024", "exp": "01-2027" }] },
  { "name": "Mahavishgarbh Oil 100ml 196/-", "category": "तैल", "batches": [{ "batch": "MB31N", "mfg": "11-2024", "exp": "10-2027" }, { "batch": "MV33N", "mfg": "12-2024", "exp": "11-2027" }] },
  { "name": "Mahavishgarbh Oil 50ml 88/-", "category": "तैल", "batches": [{ "batch": "MV26M", "mfg": "02-2023", "exp": "01-2026" }, { "batch": "MV27N", "mfg": "02-2024", "exp": "01-2027" }] },
  { "name": "Neem Tail 100ml 118/-", "category": "तैल", "batches": [{ "batch": "NT17L", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Neem Tail 4 Ltr. 2000/-", "category": "तैल", "batches": [] },
  { "name": "Neem Tail 50ml 64/-", "category": "तैल", "batches": [{ "batch": "NT18L", "mfg": "05-2022", "exp": "04-2025" }] },




 { "name": "Agnisandeepan Churn 100gm 96/-", "category": "चूर्ण", "batches": [{ "batch": "AGC50L", "mfg": "04-2022", "exp": "03-2024" }, { "batch": "AGC51L", "mfg": "04-2022", "exp": "03-2024" }, { "batch": "AGC52L", "mfg": "08-2022", "exp": "07-2024" }, { "batch": "AGC53L", "mfg": "11-2022", "exp": "10-2024" }, { "batch": "AGC54M", "mfg": "01-2023", "exp": "12-2024" }, { "batch": "AGC55M", "mfg": "05-2023", "exp": "04-2025" }, { "batch": "AGC56M", "mfg": "06-2023", "exp": "05-2025" }, { "batch": "AGC57M", "mfg": "07-2023", "exp": "06-2025" }, { "batch": "AGC58M", "mfg": "08-2023", "exp": "07-2025" }, { "batch": "AGC59M", "mfg": "01-2024", "exp": "12-2025" }, { "batch": "AGC60N", "mfg": "02-2024", "exp": "01-2026" }, { "batch": "AGC61N", "mfg": "07-2024", "exp": "06-2026" }, { "batch": "AGC62N", "mfg": "08-2024", "exp": "07-2026" }, { "batch": "AGC63N", "mfg": "10-2024", "exp": "09-2026" }] },
  { "name": "Agnisandeepan Churn 50gm 56/-", "category": "चूर्ण", "batches": [{ "batch": "AGC47L", "mfg": "04-2022", "exp": "03-2024" }, { "batch": "AGC48L", "mfg": "10-2022", "exp": "09-2024" }, { "batch": "AGC49M", "mfg": "07-2023", "exp": "06-2025" }, { "batch": "AGC50M", "mfg": "08-2023", "exp": "07-2025" }, { "batch": "AGC51N", "mfg": "01-2024", "exp": "12-2025" }, { "batch": "AGC52N", "mfg": "02-2024", "exp": "01-2026" }, { "batch": "AGC53N", "mfg": "10-2024", "exp": "09-2026" }, { "batch": "AGC54N", "mfg": "12-2024", "exp": "11-2026" }, { "batch": "Wl", "mfg": "12-2024", "exp": "11-2026" }] },
  { "name": "Ajmodadi Churna 100gm 140/-", "category": "चूर्ण", "batches": [{ "batch": "ADC11L", "mfg": "06-2022", "exp": "05-2024" }, { "batch": "ADC12L", "mfg": "12-2022", "exp": "11-2024" }] },
  { "name": "Amalki  (Amla)Churna 100gm 80/-", "category": "चूर्ण", "batches": [{ "batch": "AMC15L", "mfg": "06-2022", "exp": "05-2024" }, { "batch": "AMC16M", "mfg": "05-2023", "exp": "04-2025" }, { "batch": "AMC17N", "mfg": "08-2024", "exp": "07-2026" }] },
  { "name": "Amalki(Amla)Churna 100gm 95.00", "category": "चूर्ण", "batches": [{ "batch": "AMC18N", "mfg": "11-2024", "exp": "10-2026" }] },
  { "name": "Ashwagandha Churn 100gm 178/-", "category": "चूर्ण", "batches": [{ "batch": "ASC38L", "mfg": "04-2022", "exp": "03-2024" }, { "batch": "ASC39L", "mfg": "08-2022", "exp": "07-2024" }, { "batch": "ASC40L", "mfg": "11-2022", "exp": "10-2024" }, { "batch": "ASC41M", "mfg": "05-2023", "exp": "04-2025" }, { "batch": "ASC42M", "mfg": "05-2023", "exp": "04-2025" }, { "batch": "ASC43M", "mfg": "07-2023", "exp": "06-2025" }, { "batch": "ASC44N", "mfg": "02-2024", "exp": "01-2026" }, { "batch": "ASC45N", "mfg": "08-2024", "exp": "07-2026" }] },
  { "name": "Ashwagandha Churn 50gm 94/-", "category": "चूर्ण", "batches": [{ "batch": "ASC37K", "mfg": "04-2022", "exp": "03-2024" }, { "batch": "ASC38M", "mfg": "07-2023", "exp": "06-2025" }] },
  { "name": "Avipattikar Churn 50gm 78/-", "category": "चूर्ण", "batches": [{ "batch": "AVC36K", "mfg": "01-2021", "exp": "12-2022" }, { "batch": "AVC37L", "mfg": "08-2022", "exp": "07-2024" }, { "batch": "AVC38M", "mfg": "09-2023", "exp": "08-2025" }, { "batch": "AVC39N", "mfg": "01-2021", "exp": "12-2022" }] },
  { "name": "Dhatupaustik Churn 100gm 230/-", "category": "चूर्ण", "batches": [{ "batch": "DPC24M", "mfg": "09-2023", "exp": "08-2025" }, { "batch": "DPC25N", "mfg": "01-2024", "exp": "12-2025" }, { "batch": "DPC26N", "mfg": "05-2024", "exp": "04-2026" }, { "batch": "DPC27P", "mfg": "01-2025", "exp": "12-2026" }] },
  { "name": "Gokharu Churn(J) 80gm 170/-", "category": "चूर्ण", "batches": [{ "batch": "GKC22L", "mfg": "06-2022", "exp": "05-2024" }, { "batch": "GKC23N", "mfg": "01-2024", "exp": "12-2025" }] },
  { "name": "Agnitundki Vati 5gm 84/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "ATV16K", "category": "वटी गुटिका", "batches": [] },
  { "name": "ATV17M", "category": "वटी गुटिका", "batches": [] },
  { "name": "ATV18N", "category": "वटी गुटिका", "batches": [] },
  { "name": "ATV19N", "category": "वटी गुटिका", "batches": [] },
  { "name": "Amarsundari Vati 10gm 80/-", "category": "वटी गुटिका", "batches": [{ "batch": "AS21L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "AS22M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "AS23M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "AS24N", "mfg": "04-2024", "exp": "03-2027" }] },
  { "name": "Amarsundari Vati 30gm 218/-", "category": "वटी गुटिका", "batches": [{ "batch": "ASV11L", "mfg": "09-2022", "exp": "08-2025" }] },
  { "name": "Ark Vati 10gm 68/-", "category": "वटी गुटिका", "batches": [{ "batch": "AK22K", "mfg": "06-2022", "exp": "05-2025" }, { "batch": "AK23L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "AK24N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Ark Vati 50gm 270/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "AK23L", "category": "वटी गुटिका", "batches": [] },
  { "name": "AKV23K", "category": "वटी गुटिका", "batches": [] },
  { "name": "AKV24M", "category": "वटी गुटिका", "batches": [] },
  { "name": "AKV25N", "category": "वटी गुटिका", "batches": [] },
  { "name": "Arogyavardhini Vati 10gm 140/-", "category": "वटी गुटिका", "batches": [{ "batch": "AVV51M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "AVV52M", "mfg": "05-2023", "exp": "04-2026" }, { "batch": "AVV53N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "AVV54N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Arogyavardhini Vati 30gm 360/-", "category": "वटी गुटिका", "batches": [{ "batch": "AVV50L", "mfg": "01-2022", "exp": "12-2024" }, { "batch": "AVV51M", "mfg": "01-2023", "exp": "12-2025" }, { "batch": "AVV52M", "mfg": "10-2023", "exp": "09-2026" }] },
  { "name": "Arogyavardhini Vati 500gm 3200/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "AV37M", "category": "वटी गुटिका", "batches": [] },
  { "name": "Arshoghni Vati 10g 130/-", "category": "वटी गुटिका", "batches": [{ "batch": "ASV12L", "mfg": "03-2022", "exp": "02-2025" }, { "batch": "ASV13M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "ASV14M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "Brahmi Vati 10gm 130/-", "category": "वटी गुटिका", "batches": [{ "batch": "JBV21M", "mfg": "03-2023", "exp": "02-2026" }, { "batch": "JBV22P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Chandraprabha Vati 10gm 86/-", "category": "वटी गुटिका", "batches": [{ "batch": "CPV29K", "mfg": "03-2021", "exp": "02-2024" }, { "batch": "CPV30K", "mfg": "11-2021", "exp": "10-2024" }, { "batch": "CPV31M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "CPV32N", "mfg": "03-2024", "exp": "02-2027" }] },
  { "name": "Chandraprabha Vati 1kg 4160/-", "category": "वटी गुटिका", "batches": [{ "batch": "CP25M", "mfg": "11-2023", "exp": "10-2026" }] },
  { "name": "Chandraprabha Vati 30gm 264/-", "category": "वटी गुटिका", "batches": [{ "batch": "CP30L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "CP32M", "mfg": "03-2023", "exp": "02-2026" }] },
  { "name": "Chandraprabha Vati 30gm 290/-", "category": "वटी गुटिका", "batches": [{ "batch": "CP33m", "mfg": "09-2023", "exp": "08-2026" }, { "batch": "CP34N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "CP35N", "mfg": "04-2024", "exp": "03-2027" }, { "batch": "CP36N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "CP37N", "mfg": "10-2024", "exp": "09-2027" }] },
  { "name": "Chitrakadi Vati 10gm 82/-", "category": "वटी गुटिका", "batches": [{ "batch": "CKV27K", "mfg": "11-2021", "exp": "10-2024" }, { "batch": "CKV28L", "mfg": "05-2022", "exp": "04-2025" }, { "batch": "CKV29L", "mfg": "11-2022", "exp": "10-2025" }, { "batch": "CKV30M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "CKV31N", "mfg": "01-2024", "exp": "12-2026" }, { "batch": "CKV32N", "mfg": "05-2024", "exp": "04-2027" }, { "batch": "Ckv32P", "mfg": "01-2025", "exp": "12-2027" }] },
  { "name": "Chitrakadi Vati 1 Kg 2950/-", "category": "वटी गुटिका", "batches": [{ "batch": "CH14M", "mfg": "05-2023", "exp": "04-2026" }] },
  { "name": "Chitrakadi Vati 30gm 220/-", "category": "वटी गुटिका", "batches": [{ "batch": "CKV11L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "CKV12M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "CKV13N", "mfg": "08-2024", "exp": "07-2027" }] },
  { "name": "Chitrakadi Vati 500gm 1495/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "CH14M", "category": "वटी गुटिका", "batches": [] },
  { "name": "Eladi Vati 10gm 54/-", "category": "वटी गुटिका", "batches": [{ "batch": "EV14L", "mfg": "11-2022", "exp": "10-2025" }] },
  { "name": "Gandhak Vati 10gm 46/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "GDV13K", "category": "वटी गुटिका", "batches": [] },
  { "name": "Giloy Ghanvati 50n 98/-", "category": "वटी गुटिका", "batches": [{ "batch": "MGY11J", "mfg": "09-2022", "exp": "08-2025" }] },
  { "name": "GOKSHURADI VATI 10G 140/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "GG21N", "category": "वटी गुटिका", "batches": [] },
  { "name": "Kankayan Vati 10gm 84/-", "category": "वटी गुटिका", "batches": [{ "batch": "KKV15K", "mfg": "03-2021", "exp": "02-2024" }, { "batch": "KKV16M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Kankayan Vati 10gm 94/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "KKV17P", "category": "वटी गुटिका", "batches": [] },
  { "name": "Lashunadi Vati 10gm 110/-", "category": "वटी गुटिका", "batches": [{ "batch": "LS14L", "mfg": "10-2022", "exp": "09-2025" }] },
  { "name": "Lavangadi Vati 10gm 90/-", "category": "वटी गुटिका", "batches": [{ "batch": "LV15L", "mfg": "06-2022", "exp": "05-2025" }] },
  { "name": "Lavangadi Vati 5gm 50/-", "category": "वटी गुटिका", "batches": [{ "batch": "LV15L", "mfg": "06-2022", "exp": "05-2025" }] },
  { "name": "Madhurantak Vati 10Tab 150/-", "category": "वटी गुटिका", "batches": [{ "batch": "MV24K", "mfg": "04-2022", "exp": "03-2025" }] },
  { "name": "Madhurantak Vati 10Tab. 180/-", "category": "वटी गुटिका", "batches": [{ "batch": "MV25L", "mfg": "01-2022", "exp": "12-2024" }, { "batch": "MV26L", "mfg": "01-2022", "exp": "12-2024" }, { "batch": "MV27M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Maha Sudarshanghan Vati 10gm 160/-", "category": "वटी गुटिका", "batches": [{ "batch": "MS12M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Makardhwaj Vati 10gm 260/-", "category": "वटी गुटिका", "batches": [{ "batch": "MDV11L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "MDV12N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Marichyadi Vati 10g 76/-", "category": "वटी गुटिका", "batches": [{ "batch": "MV16M", "mfg": "04-2023", "exp": "03-2026" }, { "batch": "MV17M", "mfg": "11-2023", "exp": "10-2026" }, { "batch": "MV18M", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Prabhakar Vati 10gm 92/-", "category": "वटी गुटिका", "batches": [{ "batch": "PBV14K", "mfg": "01-2021", "exp": "12-2023" }, { "batch": "PBV15N", "mfg": "01-2024", "exp": "12-2026" }] },
  { "name": "Sanjeevni Vati 10gm 90/-", "category": "वटी गुटिका", "batches": [{ "batch": "SV13L", "mfg": "09-2022", "exp": "08-2025" }, { "batch": "SV14L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "SV15M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "SV16N", "mfg": "06-2024", "exp": "05-2027" }] },
  { "name": "Shankh Vati 10g 120/-", "category": "वटी गुटिका", "batches": [{ "batch": "SV21L", "mfg": "10-2022", "exp": "09-2025" }, { "batch": "SV22M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "Shankh Vati 10g 68/-", "category": "वटी गुटिका", "batches": [{ "batch": "SV20K", "mfg": "06-2022", "exp": "05-2025" }] },
  { "name": "Shilajitwadi Vati 40 Tab. 160/-", "category": "वटी गुटिका", "batches": [{ "batch": "SJV11N", "mfg": "05-2024", "exp": "04-2027" }] },
  { "name": "Shulvajrani Vati 10gm 140/-", "category": "वटी गुटिका", "batches": [{ "batch": "SV14L", "mfg": "10-2022", "exp": "09-2025" }] },
  { "name": "Shulvajrani Vati 5gm 55/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "SLV14K", "category": "वटी गुटिका", "batches": [] },
  { "name": "SLV15L", "category": "वटी गुटिका", "batches": [] },
  { "name": "Shulvajrani Vati 5gm 88/-", "category": "वटी गुटिका", "batches": [{ "batch": "SLV16M", "mfg": "07-2023", "exp": "06-2026" }, { "batch": "SLV17M", "mfg": "12-2023", "exp": "11-2026" }] },
  { "name": "ViryaStambhan Vati 10tab. 180/-", "category": "वटी गुटिका", "batches": [{ "batch": "VSV33L", "mfg": "04-2022", "exp": "03-2025" }, { "batch": "VV33M", "mfg": "01-2023", "exp": "12-2025" }] },
  { "name": "Vishtundak Vati 10gm 60/-", "category": "वटी गुटिका", "batches": [] },
  { "name": "VSV16K", "category": "वटी गुटिका", "batches": [] },
  { "name": "VSV17L", "category": "वटी गुटिका", "batches": [] },
  { "name": "VSV18L", "category": "वटी गुटिका", "batches": [] },






  { "name": "Aabha Guggulu 10gm 128/-", "category": "Gugglu", "batches": [{ "batch": "ABG11L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "ABG12M", "mfg": "05-2023", "exp": "04-2028" }] },
  { "name": "Gokshuradi Guggulu 10gm 140/-", "category": "Gugglu", "batches": [{ "batch": "GG18M", "mfg": "07-2023", "exp": "06-2028" }, { "batch": "GG19M", "mfg": "08-2023", "exp": "07-2028" }, { "batch": "GG20M", "mfg": "12-2023", "exp": "11-2028" }, { "batch": "GG21N", "mfg": "04-2024", "exp": "03-2029" }] },
  { "name": "Gouxaradi Guggulu 10gm 84/-", "category": "Gugglu", "batches": [] },
  { "name": "GG16I", "category": "Gugglu", "batches": [] },
  { "name": "GG17J", "category": "Gugglu", "batches": [] },
  { "name": "Gouxaradi Guggulu 30gm 265/-", "category": "Gugglu", "batches": [] },
  { "name": "GG18L", "category": "Gugglu", "batches": [] },
  { "name": "GG19L", "category": "Gugglu", "batches": [] },
  { "name": "Gouxaradi Guggulu 30gm 360/-", "category": "Gugglu", "batches": [{ "batch": "GG20L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "GG21M", "mfg": "04-2023", "exp": "03-2028" }, { "batch": "GG22M", "mfg": "09-2023", "exp": "08-2028" }, { "batch": "GG23N", "mfg": "07-2024", "exp": "06-2029" }] },
  { "name": "Kaishor Guggulu 10gm 160/-", "category": "Gugglu", "batches": [{ "batch": "KG20L", "mfg": "09-2022", "exp": "08-2027" }, { "batch": "KG21L", "mfg": "12-2022", "exp": "11-2027" }] },
  { "name": "Kaishor Guggulu 30gm 278/-", "category": "Gugglu", "batches": [{ "batch": "KG11L", "mfg": "09-2022", "exp": "08-2027" }] },
  { "name": "Kaishor Guggulu 30gm 430/-", "category": "Gugglu", "batches": [{ "batch": "KG12M", "mfg": "03-2023", "exp": "02-2028" }] },
  { "name": "Kaishor Guggulu 5gm 56/-", "category": "Gugglu", "batches": [{ "batch": "KG19K", "mfg": "06-2022", "exp": "05-2027" }] },
  { "name": "Kanchnar Guggulu 10gm 150/-", "category": "Gugglu", "batches": [{ "batch": "KG17M", "mfg": "07-2023", "exp": "06-2028" }, { "batch": "KG18M", "mfg": "08-2023", "exp": "07-2028" }, { "batch": "KG19N", "mfg": "01-2024", "exp": "12-2028" }, { "batch": "KNG20N", "mfg": "06-2024", "exp": "05-2029" }] },
  { "name": "Kanchnar Guggulu 10gm 84/-", "category": "Gugglu", "batches": [{ "batch": "KG16L", "mfg": "04-2022", "exp": "03-2027" }] },
  { "name": "Kanchnar Guggulu 30gm 230/-", "category": "Gugglu", "batches": [] },
  { "name": "KNG17L", "category": "Gugglu", "batches": [] },
  { "name": "Kanchnar Guggulu 30gm 420/-", "category": "Gugglu", "batches": [{ "batch": "KNG18L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "KNG19M", "mfg": "01-2023", "exp": "12-2027" }, { "batch": "KNG20N", "mfg": "02-2024", "exp": "01-2029" }] },
  { "name": "Kanchnar Guggulu 500gm 3800/-", "category": "Gugglu", "batches": [] },
  { "name": "KNG15M", "category": "Gugglu", "batches": [] },
  { "name": "Lakshadi Guggulu 30gm 348/-", "category": "Gugglu", "batches": [{ "batch": "LDG11L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "LDG12M", "mfg": "12-2023", "exp": "11-2028" }, { "batch": "LDG13N", "mfg": "05-2024", "exp": "04-2029" }] },
  { "name": "MahaYograj Gu. 5g 85/-", "category": "Gugglu", "batches": [{ "batch": "Myg35L", "mfg": "05-2023", "exp": "04-2028" }] },
  { "name": "MahaYograj Guggulu 10g 168/-", "category": "Gugglu", "batches": [{ "batch": "MYG38K", "mfg": "03-2021", "exp": "02-2026" }, { "batch": "MYG39L", "mfg": "01-2022", "exp": "12-2026" }, { "batch": "MYG40L", "mfg": "06-2022", "exp": "05-2027" }, { "batch": "MYG41L", "mfg": "12-2022", "exp": "11-2027" }, { "batch": "MYG42M", "mfg": "12-2022", "exp": "11-2027" }] },
  { "name": "MahaYograj Guggulu 10g 176.00", "category": "Gugglu", "batches": [{ "batch": "MYG43M", "mfg": "04-2023", "exp": "03-2028" }, { "batch": "MYG44M", "mfg": "12-2023", "exp": "11-2028" }, { "batch": "MYG45M", "mfg": "02-2024", "exp": "01-2029" }, { "batch": "MYG45N", "mfg": "02-2024", "exp": "01-2029" }] },
  { "name": "MahaYograj Guggulu 15gm 285/-", "category": "Gugglu", "batches": [{ "batch": "MYG38K", "mfg": "10-2021", "exp": "09-2026" }] },
  { "name": "Mahayograj Guggulu 30gm 452/-", "category": "Gugglu", "batches": [{ "batch": "MG36L", "mfg": "06-2022", "exp": "05-2027" }, { "batch": "MG37M", "mfg": "02-2023", "exp": "01-2028" }] },
  { "name": "Medohar Guggulu 10g 130/-", "category": "Gugglu", "batches": [{ "batch": "MDG16L", "mfg": "11-2022", "exp": "10-2027" }, { "batch": "MDG17M", "mfg": "09-2023", "exp": "08-2028" }] },
  { "name": "Medohar Guggulu 10g 82/-", "category": "Gugglu", "batches": [{ "batch": "MDG15L", "mfg": "03-2022", "exp": "02-2027" }] },
  { "name": "Medohar Guggulu 30gm 206/-", "category": "Gugglu", "batches": [{ "batch": "MDG14L", "mfg": "09-2022", "exp": "08-2027" }] },
  { "name": "Panchtiktghrit Guggulu 10gm 118/-", "category": "Gugglu", "batches": [{ "batch": "PTG30K", "mfg": "06-2022", "exp": "05-2027" }, { "batch": "PTG31L", "mfg": "06-2022", "exp": "05-2027" }, { "batch": "PTG32N", "mfg": "06-2024", "exp": "05-2029" }] },
  { "name": "Panchtiktghrit Guggulu 10gm 80/-", "category": "Gugglu", "batches": [] },
  { "name": "PTG29K", "category": "Gugglu", "batches": [] },
  { "name": "Punarnavadi Guggulu 10gm 76/-", "category": "Gugglu", "batches": [{ "batch": "PNG13K", "mfg": "06-2022", "exp": "05-2027" }] },
  { "name": "Punarnavadi Guggulu 10gm 98/-", "category": "Gugglu", "batches": [{ "batch": "PNG14M", "mfg": "01-2023", "exp": "12-2027" }] },
  { "name": "Punarnavadi Guggulu 30gm 190/-", "category": "Gugglu", "batches": [{ "batch": "PNG14L", "mfg": "09-2022", "exp": "08-2027" }] },
  { "name": "Punarnavadi Guggulu 30gm 260/-", "category": "Gugglu", "batches": [{ "batch": "PNG15M", "mfg": "01-2023", "exp": "12-2027" }] },
  { "name": "Saptvishanti Guggulu 10gm 160/-", "category": "Gugglu", "batches": [{ "batch": "STG11M", "mfg": "07-2023", "exp": "06-2028" }] },
  { "name": "Shatavari Guggulu 10gm 108/-", "category": "Gugglu", "batches": [] },
  { "name": "SG10L", "category": "Gugglu", "batches": [] },
  { "name": "Singhnad Guggulu 10gm 80/-", "category": "Gugglu", "batches": [] },
  { "name": "SG14K", "category": "Gugglu", "batches": [] },
  { "name": "Singhnad Guggulu 10gm 98/-", "category": "Gugglu", "batches": [{ "batch": "SG15M", "mfg": "07-2023", "exp": "06-2028" }, { "batch": "SG16N", "mfg": "05-2024", "exp": "04-2029" }] },
  { "name": "Singhnad Guggulu 30gm 220/-", "category": "Gugglu", "batches": [{ "batch": "SG14L", "mfg": "06-2022", "exp": "05-2027" }] },
  { "name": "Trifala Guggulu 10gm 140/-", "category": "Gugglu", "batches": [{ "batch": "TFG08L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "TFG09N", "mfg": "08-2024", "exp": "07-2029" }] },
  { "name": "Trifala Guggulu 10gm 70/-", "category": "Gugglu", "batches": [{ "batch": "TG07", "mfg": "03-2022", "exp": "02-2027" }] },
  { "name": "Trifala Guggulu 30gm 370/-", "category": "Gugglu", "batches": [{ "batch": "TFG11L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "TFG12M", "mfg": "01-2023", "exp": "12-2027" }, { "batch": "TFG13N", "mfg": "05-2024", "exp": "04-2029" }] },
  { "name": "Triyodashang Gu. 10g 90/-", "category": "Gugglu", "batches": [] },
  { "name": "TDG18L", "category": "Gugglu", "batches": [] },
  { "name": "TDG19M", "category": "Gugglu", "batches": [] },
  { "name": "Triyodashang Gu. 30gm 230/-", "category": "Gugglu", "batches": [{ "batch": "TDG17L", "mfg": "09-2022", "exp": "08-2027" }, { "batch": "TDG18L", "mfg": "11-2022", "exp": "10-2027" }, { "batch": "TDG19M", "mfg": "02-2023", "exp": "01-2028" }, { "batch": "TDG20N", "mfg": "02-2024", "exp": "01-2029" }, { "batch": "TDG21N", "mfg": "06-2024", "exp": "05-2029" }, { "batch": "TDG22P", "mfg": "01-2025", "exp": "12-2029" }] },
  { "name": "Yograj Guggulu 10gm 130/-", "category": "Gugglu", "batches": [{ "batch": "YG12L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "YG13M", "mfg": "07-2023", "exp": "06-2028" }, { "batch": "YG14N", "mfg": "07-2024", "exp": "06-2029" }] },
  { "name": "Yograj Guggulu 30gm 250/-", "category": "Gugglu", "batches": [{ "batch": "YG15L", "mfg": "09-2022", "exp": "08-2027" }] },
  { "name": "Yograj Guggulu 30gm 350/-", "category": "Gugglu", "batches": [{ "batch": "YG16L", "mfg": "10-2022", "exp": "09-2027" }, { "batch": "YG17L", "mfg": "12-2022", "exp": "11-2027" }] },




 { "name": "Asthgone Amrit (M) 250GM 285/-", "category": "Mansi", "batches": [{ "batch": "MAG44N", "mfg": "10-2024", "exp": "09-2027" }] },








];
export default products;
