from bs4 import BeautifulSoup
import json

html = '''<ul class="chosen-results"><li class="active-result" data-option-array-index="1" style="">All - Subjects</li><li class="active-result" data-option-array-index="2" style="">AANL - Ancient Anatolian Languages</li><li class="active-result" data-option-array-index="3" style="">AASR - Anthro/Sociology of Religion</li><li class="active-result" data-option-array-index="4" style="">ADSP - Applied Data Science</li><li class="active-result" data-option-array-index="5" style="">AKKD - Akkadian</li><li class="active-result" data-option-array-index="6" style="">AMER - American Culture</li><li class="active-result" data-option-array-index="7" style="">ANCM - Ancient Mediterranean World</li><li class="active-result" data-option-array-index="8" style="">ANTH - Anthropology</li><li class="active-result" data-option-array-index="9" style="">ARAB - Arabic</li><li class="active-result" data-option-array-index="10" style="">ARAM - Aramaic</li><li class="active-result" data-option-array-index="11" style="">ARCH - Architectural Studies</li><li class="active-result" data-option-array-index="12" style="">ARME - Armenian</li><li class="active-result" data-option-array-index="13" style="">ARTH - Art History</li><li class="active-result" data-option-array-index="14" style="">ARTV - Visual Arts</li><li class="active-result" data-option-array-index="15" style="">ASLG - American Sign Language</li><li class="active-result" data-option-array-index="16" style="">ASTR - Astronomy/Astrophysics</li><li class="active-result" data-option-array-index="17" style="">BANG - Bangla</li><li class="active-result" data-option-array-index="18" style="">BASQ - Basque</li><li class="active-result" data-option-array-index="19" style="">BBIO - Business of Biotechnology</li><li class="active-result" data-option-array-index="20" style="">BCMB - Biochemistry/Molecular Biology</li><li class="active-result" data-option-array-index="21" style="">BCSN - Bosnian/Croatian/Serbian</li><li class="active-result" data-option-array-index="22" style="">BIBL - Biblical Studies</li><li class="active-result" data-option-array-index="23" style="">BIOS - Biological Sciences (College)</li><li class="active-result" data-option-array-index="24" style="">BMSC - Biomedical Sciences</li><li class="active-result" data-option-array-index="25" style="">BPHS - Biophysical Sciences</li><li class="active-result" data-option-array-index="26" style="">BPRO - Big Problems</li><li class="active-result" data-option-array-index="27" style="">BSDG - Biological Sciences (Graduate)</li><li class="active-result" data-option-array-index="28" style="">BSSR - BSCD Summer Research</li><li class="active-result" data-option-array-index="29" style="">BULG - Bulgarian</li><li class="active-result" data-option-array-index="30" style="">BUSF - Business - Full-Time MBA/PhD</li><li class="active-result" data-option-array-index="31" style="">BUSN - Business</li><li class="active-result" data-option-array-index="32" style="">BUSV - Business - Summer Scholars</li><li class="active-result" data-option-array-index="33" style="">CAAM - Computational and Applied Math</li><li class="active-result" data-option-array-index="34" style="">CABI - Cancer Biology</li><li class="active-result" data-option-array-index="35" style="">CAPP - Comp Analysis/Public Pol</li><li class="active-result" data-option-array-index="36" style="">CATA - Catalan</li><li class="active-result" data-option-array-index="37" style="">CCCT - Center for Contemporary Theory</li><li class="active-result" data-option-array-index="38" style="">CCTS - Clinical/Translational Science</li><li class="active-result" data-option-array-index="39" style="">CDIN - Disciplinary Innovation</li><li class="active-result" data-option-array-index="40" style="">CEGU - Environment/Geog/Urbanization</li><li class="active-result" data-option-array-index="41" style="">CHDV - Comparative Human Development</li><li class="active-result" data-option-array-index="42" style="">CHEM - Chemistry</li><li class="active-result" data-option-array-index="43" style="">CHIN - Chinese</li><li class="active-result" data-option-array-index="44" style="">CHSS - Conceptual/Hist Studies of Sci</li><li class="active-result" data-option-array-index="45" style="">CHST - Chicago Studies</li><li class="active-result" data-option-array-index="46" style="">CLAS - Classics</li><li class="active-result" data-option-array-index="47" style="">CLCV - Classical Civilization</li><li class="active-result" data-option-array-index="48" style="">CMES - Middle Eastern Studies</li><li class="active-result" data-option-array-index="49" style="">CMLT - Comparative Literature</li><li class="active-result result-selected" data-option-array-index="50" style="">CMSC - Computer Science</li><li class="active-result" data-option-array-index="51" style="">CMST - Cinema/Media Studies</li><li class="active-result" data-option-array-index="52" style="">COGS - Cognitive Science</li><li class="active-result" data-option-array-index="53" style="">CPNS - Computational Neuroscience</li><li class="active-result" data-option-array-index="54" style="">CPPE - Pathway Program in Economics</li><li class="active-result" data-option-array-index="55" style="">CRES - Comp Race/Ethnic Studies</li><li class="active-result" data-option-array-index="56" style="">CRSH - CIC CourseShare</li><li class="active-result" data-option-array-index="57" style="">CRWR - Creative Writing</li><li class="active-result" data-option-array-index="58" style="">CTMI - Clinical Trials Management</li><li class="active-result" data-option-array-index="59" style="">CZEC - Czech</li><li class="active-result" data-option-array-index="60" style="">DATA - Data Science</li><li class="active-result" data-option-array-index="61" style="">DEMS - Democracy Studies</li><li class="active-result" data-option-array-index="62" style="">DIGS - Digital Humanities</li><li class="active-result" data-option-array-index="63" style="">DVBI - Developmental Biology</li><li class="active-result" data-option-array-index="64" style="">DVPR - Philosophy of Religions</li><li class="active-result" data-option-array-index="65" style="">DVSR - Psych/Sociology of Religion</li><li class="active-result" data-option-array-index="66" style="">EALC - East Asian Languages/Civ</li><li class="active-result" data-option-array-index="67" style="">ECEV - Ecology/Evolution</li><li class="active-result" data-option-array-index="68" style="">ECMA - Economics (ECMA)</li><li class="active-result" data-option-array-index="69" style="">ECON - Economics</li><li class="active-result" data-option-array-index="70" style="">EDSO - Education and Society</li><li class="active-result" data-option-array-index="71" style="">EEUR - East European</li><li class="active-result" data-option-array-index="72" style="">EGPT - Egyptian</li><li class="active-result" data-option-array-index="73" style="">ELIN - English Language Institute</li><li class="active-result" data-option-array-index="74" style="">ENGL - English Language/Literature</li><li class="active-result" data-option-array-index="75" style="">ENSC - Environmental Sciences</li><li class="active-result" data-option-array-index="76" style="">ENST - Environmental/Urban Studies</li><li class="active-result" data-option-array-index="77" style="">ESLG - English Language Institute</li><li class="active-result" data-option-array-index="78" style="">EVOL - Evolutionary Biology</li><li class="active-result" data-option-array-index="79" style="">FINM - Financial Mathematics</li><li class="active-result" data-option-array-index="80" style="">FNDL - Fundamentals: Issues/Texts</li><li class="active-result" data-option-array-index="81" style="">FREN - French</li><li class="active-result" data-option-array-index="82" style="">GEEZ - Ge'ez</li><li class="active-result" data-option-array-index="83" style="">GENE - Genetics</li><li class="active-result" data-option-array-index="84" style="">GEOG - Geographical Sciences</li><li class="active-result" data-option-array-index="85" style="">GEOR - Georgian</li><li class="active-result" data-option-array-index="86" style="">GEOS - Geophysical Sciences</li><li class="active-result" data-option-array-index="87" style="">GISC - Geographic Information Science</li><li class="active-result" data-option-array-index="88" style="">GLST - Global Studies</li><li class="active-result" data-option-array-index="89" style="">GNSE - Gender/Sexuality Studies</li><li class="active-result" data-option-array-index="90" style="">GREK - Greek</li><li class="active-result" data-option-array-index="91" style="">GRMN - German</li><li class="active-result" data-option-array-index="92" style="">HCHR - History of Christianity</li><li class="active-result" data-option-array-index="93" style="">HCUL - History of Culture</li><li class="active-result" data-option-array-index="94" style="">HEBR - Hebrew</li><li class="active-result" data-option-array-index="95" style="">HGEN - Human Genetics</li><li class="active-result" data-option-array-index="96" style="">HIJD - History of Judaism</li><li class="active-result" data-option-array-index="97" style="">HIND - Hindi</li><li class="active-result" data-option-array-index="98" style="">HIPS - HIPS</li><li class="active-result" data-option-array-index="99" style="">HIST - History</li><li class="active-result" data-option-array-index="100" style="">HLTH - Health and Society</li><li class="active-result" data-option-array-index="101" style="">HMRT - Human Rights</li><li class="active-result" data-option-array-index="102" style="">HNUT - Hum Nutrition/Nutritional Bio</li><li class="active-result" data-option-array-index="103" style="">HREL - History of Religions</li><li class="active-result" data-option-array-index="104" style="">HSTD - Health Studies</li><li class="active-result" data-option-array-index="105" style="">HUMA - Humanities</li><li class="active-result" data-option-array-index="106" style="">IMMU - Immunology</li><li class="active-result" data-option-array-index="107" style="">INRE - International Relations</li><li class="active-result" data-option-array-index="108" style="">INST - International Studies</li><li class="active-result" data-option-array-index="109" style="">IRHU - Inquiry/Research in Humanities</li><li class="active-result" data-option-array-index="110" style="">ISHU - Humanities Interdisc Studies</li><li class="active-result" data-option-array-index="111" style="">ISLM - Islamic Studies</li><li class="active-result" data-option-array-index="112" style="">ITAL - Italian</li><li class="active-result" data-option-array-index="113" style="">JAPN - Japanese</li><li class="active-result" data-option-array-index="114" style="">JWSC - Jewish Studies</li><li class="active-result" data-option-array-index="115" style="">JWSG - Committee on Jewish Studies</li><li class="active-result" data-option-array-index="116" style="">KAZK - Kazak</li><li class="active-result" data-option-array-index="117" style="">KNOW - KNOW</li><li class="active-result" data-option-array-index="118" style="">KORE - Korean</li><li class="active-result" data-option-array-index="119" style="">KREY - Haitian Kreyol</li><li class="active-result" data-option-array-index="120" style="">LACS - Latin Amer/Caribbean Studies</li><li class="active-result" data-option-array-index="121" style="">LATN - Latin</li><li class="active-result" data-option-array-index="122" style="">LAWS - Laws</li><li class="active-result" data-option-array-index="123" style="">LGLN - Languages in Linguistics</li><li class="active-result" data-option-array-index="124" style="">LING - Linguistics</li><li class="active-result" data-option-array-index="125" style="">LLSO - Law/Letters/Society</li><li class="active-result" data-option-array-index="126" style="">MAAD - Media Arts and Design</li><li class="active-result" data-option-array-index="127" style="">MACS - Computational Social Science</li><li class="active-result" data-option-array-index="128" style="">MAPH - MAPH (MA in Humanities)</li><li class="active-result" data-option-array-index="129" style="">MAPS - MAPSS (MA in Social Sciences)</li><li class="active-result" data-option-array-index="130" style="">MARA - Marathi</li><li class="active-result" data-option-array-index="131" style="">MATH - Mathematics</li><li class="active-result" data-option-array-index="132" style="">MDVL - Medieval Studies</li><li class="active-result" data-option-array-index="133" style="">MEDC - Medicine</li><li class="active-result" data-option-array-index="134" style="">MENG - Molecular Engineering</li><li class="active-result" data-option-array-index="135" style="">MGCB - Molecular Genetics/Cell Bio</li><li class="active-result" data-option-array-index="136" style="">MICR - Microbiology</li><li class="active-result" data-option-array-index="137" style="">MLAP - Master of Liberal Arts</li><li class="active-result" data-option-array-index="138" style="">MOGK - Modern Greek</li><li class="active-result" data-option-array-index="139" style="">MOLM - Molecular Medicine</li><li class="active-result" data-option-array-index="140" style="">MOMN - Molecular Metabolism/Nutrition</li><li class="active-result" data-option-array-index="141" style="">MPCS - Computer Science Masters</li><li class="active-result" data-option-array-index="142" style="">MPHY - Medical Physics</li><li class="active-result" data-option-array-index="143" style="">MPMM - Molecular Pathogenesis/Med</li><li class="active-result" data-option-array-index="144" style="">MSBI - M.S. in Biomedical Informatics</li><li class="active-result" data-option-array-index="145" style="">MSCA - M.S. in Analytics</li><li class="active-result" data-option-array-index="146" style="">MSPH - Precision Health</li><li class="active-result" data-option-array-index="147" style="">MSTR - M.S. in Threat/Response Mgmt</li><li class="active-result" data-option-array-index="148" style="">MUSI - Music</li><li class="active-result" data-option-array-index="149" style="">NCDV - New Collegiate Division</li><li class="active-result" data-option-array-index="150" style="">NEAA - Near Eastern Art/Archeology</li><li class="active-result" data-option-array-index="151" style="">NEHC - Near Eastern History/Civ</li><li class="active-result" data-option-array-index="152" style="">NELC - Near Eastern Languages/Civ</li><li class="active-result" data-option-array-index="153" style="">NELG - Near Eastern Languages</li><li class="active-result" data-option-array-index="154" style="">NORW - Norwegian</li><li class="active-result" data-option-array-index="155" style="">NPHP - Neuro/Pharma/Physio</li><li class="active-result" data-option-array-index="156" style="">NSCI - Neuroscience</li><li class="active-result" data-option-array-index="157" style="">NSFP - NSF - Physics</li><li class="active-result" data-option-array-index="158" style="">NTEC - New Testament/ECL</li><li class="active-result" data-option-array-index="159" style="">NTSC - Natural Science</li><li class="active-result" data-option-array-index="160" style="">NURB - Neurobiology</li><li class="active-result" data-option-array-index="161" style="">ORGB - Organismal Biology/Anatomy</li><li class="active-result" data-option-array-index="162" style="">PALI - Pali</li><li class="active-result" data-option-array-index="163" style="">PARR - Parrhesia Public Discourse</li><li class="active-result" data-option-array-index="164" style="">PATH - Pathology</li><li class="active-result" data-option-array-index="165" style="">PBHS - Public Health Sciences</li><li class="active-result" data-option-array-index="166" style="">PBPL - Public Policy Studies (PBPL)</li><li class="active-result" data-option-array-index="167" style="">PECO - Political Economy</li><li class="active-result" data-option-array-index="168" style="">PERS - Persian</li><li class="active-result" data-option-array-index="169" style="">PHIL - Philosophy</li><li class="active-result" data-option-array-index="170" style="">PHSC - Physical Science</li><li class="active-result" data-option-array-index="171" style="">PHYS - Physics</li><li class="active-result" data-option-array-index="172" style="">PLSC - Political Science</li><li class="active-result" data-option-array-index="173" style="">POLI - Polish</li><li class="active-result" data-option-array-index="174" style="">PORT - Portuguese</li><li class="active-result" data-option-array-index="175" style="">PPHA - Public Policy Studies (PPHA)</li><li class="active-result" data-option-array-index="176" style="">PSMS - Physical Sciences Masters</li><li class="active-result" data-option-array-index="177" style="">PSYC - Psychology</li><li class="active-result" data-option-array-index="178" style="">PWAY - Pathway Program</li><li class="active-result" data-option-array-index="179" style="">RAME - Religions in America</li><li class="active-result" data-option-array-index="180" style="">RDIN - Race, Diaspora,and Indigeneity</li><li class="active-result" data-option-array-index="181" style="">REES - Russian/East European Studies</li><li class="active-result" data-option-array-index="182" style="">RELP - Religious Leadership/Practice</li><li class="active-result" data-option-array-index="183" style="">REMS - Ren/Early Modern Studies</li><li class="active-result" data-option-array-index="184" style="">RETH - Religious Ethics</li><li class="active-result" data-option-array-index="185" style="">RLIT - Religion/Literature</li><li class="active-result" data-option-array-index="186" style="">RLLT - Romance Languages/Literature</li><li class="active-result" data-option-array-index="187" style="">RLST - Religious Studies</li><li class="active-result" data-option-array-index="188" style="">RLVC - Religion/Lit/Visual Culture</li><li class="active-result" data-option-array-index="189" style="">RUSS - Russian</li><li class="active-result" data-option-array-index="190" style="">SABR - Study Abroad</li><li class="active-result" data-option-array-index="191" style="">SALC - South Asian Languages/Civ</li><li class="active-result" data-option-array-index="192" style="">SANS - Sanskrit</li><li class="active-result" data-option-array-index="193" style="">SCPD - Science Comm/Public Discourse</li><li class="active-result" data-option-array-index="194" style="">SCTH - Social Thought</li><li class="active-result" data-option-array-index="195" style="">SIGN - Signature Courses</li><li class="active-result" data-option-array-index="196" style="">SLAV - General Slavic</li><li class="active-result" data-option-array-index="197" style="">SMSP - Summer Special Programs</li><li class="active-result" data-option-array-index="198" style="">SOCI - Sociology</li><li class="active-result" data-option-array-index="199" style="">SOSC - Social Sciences</li><li class="active-result" data-option-array-index="200" style="">SOSL - South Slavic</li><li class="active-result" data-option-array-index="201" style="">SPAN - Spanish</li><li class="active-result" data-option-array-index="202" style="">SSAD - Social Service Administration</li><li class="active-result" data-option-array-index="203" style="">STAT - Statistics</li><li class="active-result" data-option-array-index="204" style="">SUAS - Summer Arts &amp; Sciences</li><li class="active-result" data-option-array-index="205" style="">SUMR - Sumerian</li><li class="active-result" data-option-array-index="206" style="">SWAH - Swahili</li><li class="active-result" data-option-array-index="207" style="">TAML - Tamil</li><li class="active-result" data-option-array-index="208" style="">TAPS - Theater/Performance Studies</li><li class="active-result" data-option-array-index="209" style="">TBTN - Tibetan</li><li class="active-result" data-option-array-index="210" style="">THEO - Theology</li><li class="active-result" data-option-array-index="211" style="">TLGU - Telegu</li><li class="active-result" data-option-array-index="212" style="">TTIC - Toyota Tech Inst at Chicago</li><li class="active-result" data-option-array-index="213" style="">TURK - Turkish</li><li class="active-result" data-option-array-index="214" style="">UGAR - Ugaritic</li><li class="active-result" data-option-array-index="215" style="">URDU - Urdu</li><li class="active-result" data-option-array-index="216" style="">UTEP - Urban Teacher Education</li><li class="active-result" data-option-array-index="217" style="">UZBK - Uzbek</li><li class="active-result" data-option-array-index="218" style="">WOLO - Wolof</li><li class="active-result" data-option-array-index="219" style="">YDDH - Yiddish</li></ul>'''

soup = BeautifulSoup(html, 'html.parser')
major_lst = []
majors = soup.find_all(class_="active-result")

for major in majors:
    curr_major = {}
    curr_major["label"] = major.get_text()
    major_lst.append(curr_major)

with open('majors.json', 'w', encoding='utf-8') as f:
    json.dump(major_lst, f, ensure_ascii=False, indent=4)