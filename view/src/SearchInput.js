import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

export function SearchInput({ inputType }) {
	const [optionLabels, setOptionLabels] = useState(inputType);

	// function handleOptionLabels() {
	// 	setOptionLabels((currOption) => currOption + "s")
	// }

	return (
		<div className={`search ${inputType}`}>
			<Autocomplete
				disablePortal
				id={`search-${inputType}`}
				options={majors}
				sx={{ width: 500 }}
				renderInput={(params) => <TextField {...params} label={inputType} />}
			/>
		</div>
	);
}

export function QuarterTags() {
	return (
		<div className={`search quarter`}>
			<Autocomplete
				multiple
				limitTags={2}
				id="search-quarter"
				options={quarters}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
					<TextField {...params} label="Quarter" placeholder="Quarter" />
				)}
				sx={{ width: "500px" }}
			/>
		</div>
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const quarters = [
	{ label: "Autumn 2015" },
	{ label: "Autumn 2016" },
	{ label: "Autumn 2017" },
	{ label: "Autumn 2018" },
	{ label: "Autumn 2019" },
	{ label: "Autumn 2020" },
	{ label: "Autumn 2021" },
	{ label: "Autumn 2022" },
	{ label: "Autumn 2023" },
	{ label: "Autumn 2024" },
	{ label: "Winter 2015" },
	{ label: "Winter 2016" },
	{ label: "Winter 2017" },
	{ label: "Winter 2018" },
	{ label: "Winter 2019" },
	{ label: "Winter 2020" },
	{ label: "Winter 2021" },
	{ label: "Winter 2022" },
	{ label: "Winter 2023" },
	{ label: "Winter 2024" },
	{ label: "Spring 2015" },
	{ label: "Spring 2016" },
	{ label: "Spring 2017" },
	{ label: "Spring 2018" },
	{ label: "Spring 2019" },
	{ label: "Spring 2020" },
	{ label: "Spring 2021" },
	{ label: "Spring 2022" },
	{ label: "Spring 2023" },
	{ label: "Spring 2024" },
	{ label: "Summer 2015" },
	{ label: "Summer 2016" },
	{ label: "Summer 2017" },
	{ label: "Summer 2018" },
	{ label: "Summer 2019" },
	{ label: "Summer 2020" },
	{ label: "Summer 2021" },
	{ label: "Summer 2022" },
	{ label: "Summer 2023" },
	{ label: "Summer 2024" },
];

const majors = [
	{ label: "All - Subjects" },
	{ label: "AANL - Ancient Anatolian Languages" },
	{ label: "AASR - Anthro/Sociology of Religion" },
	{ label: "ADSP - Applied Data Science" },
	{ label: "AKKD - Akkadian" },
	{ label: "AMER - American Culture" },
	{ label: "ANCM - Ancient Mediterranean World" },
	{
		label: "ANTH - Anthropology",
	},
	{
		label: "ARAB - Arabic",
	},
	{
		label: "ARAM - Aramaic",
	},
	{
		label: "ARCH - Architectural Studies",
	},
	{
		label: "ARME - Armenian",
	},
	{
		label: "ARTH - Art History",
	},
	{
		label: "ARTV - Visual Arts",
	},
	{
		label: "ASLG - American Sign Language",
	},
	{
		label: "ASTR - Astronomy/Astrophysics",
	},
	{
		label: "BANG - Bangla",
	},
	{
		label: "BASQ - Basque",
	},
	{
		label: "BBIO - Business of Biotechnology",
	},
	{
		label: "BCMB - Biochemistry/Molecular Biology",
	},
	{
		label: "BCSN - Bosnian/Croatian/Serbian",
	},
	{
		label: "BIBL - Biblical Studies",
	},
	{
		label: "BIOS - Biological Sciences (College)",
	},
	{
		label: "BMSC - Biomedical Sciences",
	},
	{
		label: "BPHS - Biophysical Sciences",
	},
	{
		label: "BPRO - Big Problems",
	},
	{
		label: "BSDG - Biological Sciences (Graduate)",
	},
	{
		label: "BSSR - BSCD Summer Research",
	},
	{
		label: "BULG - Bulgarian",
	},
	{
		label: "BUSF - Business - Full-Time MBA/PhD",
	},
	{
		label: "BUSN - Business",
	},
	{
		label: "BUSV - Business - Summer Scholars",
	},
	{
		label: "CAAM - Computational and Applied Math",
	},
	{
		label: "CABI - Cancer Biology",
	},
	{
		label: "CAPP - Comp Analysis/Public Pol",
	},
	{
		label: "CATA - Catalan",
	},
	{
		label: "CCCT - Center for Contemporary Theory",
	},
	{
		label: "CCTS - Clinical/Translational Science",
	},
	{
		label: "CDIN - Disciplinary Innovation",
	},
	{
		label: "CEGU - Environment/Geog/Urbanization",
	},
	{
		label: "CHDV - Comparative Human Development",
	},
	{
		label: "CHEM - Chemistry",
	},
	{
		label: "CHIN - Chinese",
	},
	{
		label: "CHSS - Conceptual/Hist Studies of Sci",
	},
	{
		label: "CHST - Chicago Studies",
	},
	{
		label: "CLAS - Classics",
	},
	{
		label: "CLCV - Classical Civilization",
	},
	{
		label: "CMES - Middle Eastern Studies",
	},
	{
		label: "CMLT - Comparative Literature",
	},
	{
		label: "CMSC - Computer Science",
	},
	{
		label: "CMST - Cinema/Media Studies",
	},
	{
		label: "COGS - Cognitive Science",
	},
	{
		label: "CPNS - Computational Neuroscience",
	},
	{
		label: "CPPE - Pathway Program in Economics",
	},
	{
		label: "CRES - Comp Race/Ethnic Studies",
	},
	{
		label: "CRSH - CIC CourseShare",
	},
	{
		label: "CRWR - Creative Writing",
	},
	{
		label: "CTMI - Clinical Trials Management",
	},
	{
		label: "CZEC - Czech",
	},
	{
		label: "DATA - Data Science",
	},
	{
		label: "DEMS - Democracy Studies",
	},
	{
		label: "DIGS - Digital Humanities",
	},
	{
		label: "DVBI - Developmental Biology",
	},
	{
		label: "DVPR - Philosophy of Religions",
	},
	{
		label: "DVSR - Psych/Sociology of Religion",
	},
	{
		label: "EALC - East Asian Languages/Civ",
	},
	{
		label: "ECEV - Ecology/Evolution",
	},
	{
		label: "ECMA - Economics (ECMA)",
	},
	{
		label: "ECON - Economics",
	},
	{
		label: "EDSO - Education and Society",
	},
	{
		label: "EEUR - East European",
	},
	{
		label: "EGPT - Egyptian",
	},
	{
		label: "ELIN - English Language Institute",
	},
	{
		label: "ENGL - English Language/Literature",
	},
	{
		label: "ENSC - Environmental Sciences",
	},
	{
		label: "ENST - Environmental/Urban Studies",
	},
	{
		label: "ESLG - English Language Institute",
	},
	{
		label: "EVOL - Evolutionary Biology",
	},
	{
		label: "FINM - Financial Mathematics",
	},
	{
		label: "FNDL - Fundamentals: Issues/Texts",
	},
	{
		label: "FREN - French",
	},
	{
		label: "GEEZ - Ge'ez",
	},
	{
		label: "GENE - Genetics",
	},
	{
		label: "GEOG - Geographical Sciences",
	},
	{
		label: "GEOR - Georgian",
	},
	{
		label: "GEOS - Geophysical Sciences",
	},
	{
		label: "GISC - Geographic Information Science",
	},
	{
		label: "GLST - Global Studies",
	},
	{
		label: "GNSE - Gender/Sexuality Studies",
	},
	{
		label: "GREK - Greek",
	},
	{
		label: "GRMN - German",
	},
	{
		label: "HCHR - History of Christianity",
	},
	{
		label: "HCUL - History of Culture",
	},
	{
		label: "HEBR - Hebrew",
	},
	{
		label: "HGEN - Human Genetics",
	},
	{
		label: "HIJD - History of Judaism",
	},
	{
		label: "HIND - Hindi",
	},
	{
		label: "HIPS - HIPS",
	},
	{
		label: "HIST - History",
	},
	{
		label: "HLTH - Health and Society",
	},
	{
		label: "HMRT - Human Rights",
	},
	{
		label: "HNUT - Hum Nutrition/Nutritional Bio",
	},
	{
		label: "HREL - History of Religions",
	},
	{
		label: "HSTD - Health Studies",
	},
	{
		label: "HUMA - Humanities",
	},
	{
		label: "IMMU - Immunology",
	},
	{
		label: "INRE - International Relations",
	},
	{
		label: "INST - International Studies",
	},
	{
		label: "IRHU - Inquiry/Research in Humanities",
	},
	{
		label: "ISHU - Humanities Interdisc Studies",
	},
	{
		label: "ISLM - Islamic Studies",
	},
	{
		label: "ITAL - Italian",
	},
	{
		label: "JAPN - Japanese",
	},
	{
		label: "JWSC - Jewish Studies",
	},
	{
		label: "JWSG - Committee on Jewish Studies",
	},
	{
		label: "KAZK - Kazak",
	},
	{
		label: "KNOW - KNOW",
	},
	{
		label: "KORE - Korean",
	},
	{
		label: "KREY - Haitian Kreyol",
	},
	{
		label: "LACS - Latin Amer/Caribbean Studies",
	},
	{
		label: "LATN - Latin",
	},
	{
		label: "LAWS - Laws",
	},
	{
		label: "LGLN - Languages in Linguistics",
	},
	{
		label: "LING - Linguistics",
	},
	{
		label: "LLSO - Law/Letters/Society",
	},
	{
		label: "MAAD - Media Arts and Design",
	},
	{
		label: "MACS - Computational Social Science",
	},
	{
		label: "MAPH - MAPH (MA in Humanities)",
	},
	{
		label: "MAPS - MAPSS (MA in Social Sciences)",
	},
	{
		label: "MARA - Marathi",
	},
	{
		label: "MATH - Mathematics",
	},
	{
		label: "MDVL - Medieval Studies",
	},
	{
		label: "MEDC - Medicine",
	},
	{
		label: "MENG - Molecular Engineering",
	},
	{
		label: "MGCB - Molecular Genetics/Cell Bio",
	},
	{
		label: "MICR - Microbiology",
	},
	{
		label: "MLAP - Master of Liberal Arts",
	},
	{
		label: "MOGK - Modern Greek",
	},
	{
		label: "MOLM - Molecular Medicine",
	},
	{
		label: "MOMN - Molecular Metabolism/Nutrition",
	},
	{
		label: "MPCS - Computer Science Masters",
	},
	{
		label: "MPHY - Medical Physics",
	},
	{
		label: "MPMM - Molecular Pathogenesis/Med",
	},
	{
		label: "MSBI - M.S. in Biomedical Informatics",
	},
	{
		label: "MSCA - M.S. in Analytics",
	},
	{
		label: "MSPH - Precision Health",
	},
	{
		label: "MSTR - M.S. in Threat/Response Mgmt",
	},
	{
		label: "MUSI - Music",
	},
	{
		label: "NCDV - New Collegiate Division",
	},
	{
		label: "NEAA - Near Eastern Art/Archeology",
	},
	{
		label: "NEHC - Near Eastern History/Civ",
	},
	{
		label: "NELC - Near Eastern Languages/Civ",
	},
	{
		label: "NELG - Near Eastern Languages",
	},
	{
		label: "NORW - Norwegian",
	},
	{
		label: "NPHP - Neuro/Pharma/Physio",
	},
	{
		label: "NSCI - Neuroscience",
	},
	{
		label: "NSFP - NSF - Physics",
	},
	{
		label: "NTEC - New Testament/ECL",
	},
	{
		label: "NTSC - Natural Science",
	},
	{
		label: "NURB - Neurobiology",
	},
	{
		label: "ORGB - Organismal Biology/Anatomy",
	},
	{
		label: "PALI - Pali",
	},
	{
		label: "PARR - Parrhesia Public Discourse",
	},
	{
		label: "PATH - Pathology",
	},
	{
		label: "PBHS - Public Health Sciences",
	},
	{
		label: "PBPL - Public Policy Studies (PBPL)",
	},
	{
		label: "PECO - Political Economy",
	},
	{
		label: "PERS - Persian",
	},
	{
		label: "PHIL - Philosophy",
	},
	{
		label: "PHSC - Physical Science",
	},
	{
		label: "PHYS - Physics",
	},
	{
		label: "PLSC - Political Science",
	},
	{
		label: "POLI - Polish",
	},
	{
		label: "PORT - Portuguese",
	},
	{
		label: "PPHA - Public Policy Studies (PPHA)",
	},
	{
		label: "PSMS - Physical Sciences Masters",
	},
	{
		label: "PSYC - Psychology",
	},
	{
		label: "PWAY - Pathway Program",
	},
	{
		label: "RAME - Religions in America",
	},
	{
		label: "RDIN - Race, Diaspora,and Indigeneity",
	},
	{
		label: "REES - Russian/East European Studies",
	},
	{
		label: "RELP - Religious Leadership/Practice",
	},
	{
		label: "REMS - Ren/Early Modern Studies",
	},
	{
		label: "RETH - Religious Ethics",
	},
	{
		label: "RLIT - Religion/Literature",
	},
	{
		label: "RLLT - Romance Languages/Literature",
	},
	{
		label: "RLST - Religious Studies",
	},
	{
		label: "RLVC - Religion/Lit/Visual Culture",
	},
	{
		label: "RUSS - Russian",
	},
	{
		label: "SABR - Study Abroad",
	},
	{
		label: "SALC - South Asian Languages/Civ",
	},
	{
		label: "SANS - Sanskrit",
	},
	{
		label: "SCPD - Science Comm/Public Discourse",
	},
	{
		label: "SCTH - Social Thought",
	},
	{
		label: "SIGN - Signature Courses",
	},
	{
		label: "SLAV - General Slavic",
	},
	{
		label: "SMSP - Summer Special Programs",
	},
	{
		label: "SOCI - Sociology",
	},
	{
		label: "SOSC - Social Sciences",
	},
	{
		label: "SOSL - South Slavic",
	},
	{
		label: "SPAN - Spanish",
	},
	{
		label: "SSAD - Social Service Administration",
	},
	{
		label: "STAT - Statistics",
	},
	{
		label: "SUAS - Summer Arts & Sciences",
	},
	{
		label: "SUMR - Sumerian",
	},
	{
		label: "SWAH - Swahili",
	},
	{
		label: "TAML - Tamil",
	},
	{
		label: "TAPS - Theater/Performance Studies",
	},
	{
		label: "TBTN - Tibetan",
	},
	{
		label: "THEO - Theology",
	},
	{
		label: "TLGU - Telegu",
	},
	{
		label: "TTIC - Toyota Tech Inst at Chicago",
	},
	{
		label: "TURK - Turkish",
	},
	{
		label: "UGAR - Ugaritic",
	},
	{
		label: "URDU - Urdu",
	},
	{
		label: "UTEP - Urban Teacher Education",
	},
	{
		label: "UZBK - Uzbek",
	},
	{
		label: "WOLO - Wolof",
	},
	{
		label: "YDDH - Yiddish",
	},
];
