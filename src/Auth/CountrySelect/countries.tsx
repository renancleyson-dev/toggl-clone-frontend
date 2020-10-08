import React from 'react';

const countries = [
  <option key="AF" value="Afghanistan">
    Afghanistan
  </option>,
  <option key="AX" value="Åland Islands">
    Åland Islands
  </option>,
  <option key="AL" value="Albania">
    Albania
  </option>,
  <option key="DZ" value="Algeria">
    Algeria
  </option>,
  <option key="AS" value="American Samoa">
    American Samoa
  </option>,
  <option key="AD" value="Andorra">
    Andorra
  </option>,
  <option key="AO" value="Angola">
    Angola
  </option>,
  <option key="AI" value="Anguilla">
    Anguilla
  </option>,
  <option key="AQ" value="Antarctica">
    Antarctica
  </option>,
  <option key="AG" value="Antigua and Barbuda">
    Antigua and Barbuda
  </option>,
  <option key="AR" value="Argentina">
    Argentina
  </option>,
  <option key="AM" value="Armenia">
    Armenia
  </option>,
  <option key="AW" value="Aruba">
    Aruba
  </option>,
  <option key="AU" value="Australia">
    Australia
  </option>,
  <option key="AT" value="Austria">
    Austria
  </option>,
  <option key="AZ" value="Azerbaijan">
    Azerbaijan
  </option>,
  <option key="BS" value="Bahamas (the)">
    Bahamas (the)
  </option>,
  <option key="BH" value="Bahrain">
    Bahrain
  </option>,
  <option key="BD" value="Bangladesh">
    Bangladesh
  </option>,
  <option key="BB" value="Barbados">
    Barbados
  </option>,
  <option key="BY" value="Belarus">
    Belarus
  </option>,
  <option key="BE" value="Belgium">
    Belgium
  </option>,
  <option key="BZ" value="Belize">
    Belize
  </option>,
  <option key="BJ" value="Benin">
    Benin
  </option>,
  <option key="BM" value="Bermuda">
    Bermuda
  </option>,
  <option key="BT" value="Bhutan">
    Bhutan
  </option>,
  <option key="BO" value="Bolivia (Plurinational State of)">
    Bolivia (Plurinational State of)
  </option>,
  <option key="BQ" value="Bonaire, Sint Eustatius and Saba">
    Bonaire, Sint Eustatius and Saba
  </option>,
  <option key="BA" value="Bosnia and Herzegovina">
    Bosnia and Herzegovina
  </option>,
  <option key="BW" value="Botswana">
    Botswana
  </option>,
  <option key="BV" value="Bouvet Island">
    Bouvet Island
  </option>,
  <option key="BR" value="Brazil">
    Brazil
  </option>,
  <option key="IO" value="British Indian Ocean Territory (the)">
    British Indian Ocean Territory (the)
  </option>,
  <option key="BN" value="Brunei Darussalam">
    Brunei Darussalam
  </option>,
  <option key="BG" value="Bulgaria">
    Bulgaria
  </option>,
  <option key="BF" value="Burkina Faso">
    Burkina Faso
  </option>,
  <option key="BI" value="Burundi">
    Burundi
  </option>,
  <option key="CV" value="Cabo Verde">
    Cabo Verde
  </option>,
  <option key="KH" value="Cambodia">
    Cambodia
  </option>,
  <option key="CM" value="Cameroon">
    Cameroon
  </option>,
  <option key="CA" value="Canada">
    Canada
  </option>,
  <option key="KY" value="Cayman Islands (the)">
    Cayman Islands (the)
  </option>,
  <option key="CF" value="Central African Republic (the)">
    Central African Republic (the)
  </option>,
  <option key="TD" value="Chad">
    Chad
  </option>,
  <option key="CL" value="Chile">
    Chile
  </option>,
  <option key="CN" value="China">
    China
  </option>,
  <option key="CX" value="Christmas Island">
    Christmas Island
  </option>,
  <option key="CC" value="Cocos (Keeling) Islands (the)">
    Cocos (Keeling) Islands (the)
  </option>,
  <option key="CO" value="Colombia">
    Colombia
  </option>,
  <option key="KM" value="Comoros (the)">
    Comoros (the)
  </option>,
  <option key="CD" value="Congo (the Democratic Republic of the)">
    Congo (the Democratic Republic of the)
  </option>,
  <option key="CG" value="Congo (the)">
    Congo (the)
  </option>,
  <option key="CK" value="Cook Islands (the)">
    Cook Islands (the)
  </option>,
  <option key="CR" value="Costa Rica">
    Costa Rica
  </option>,
  <option key="HR" value="Croatia">
    Croatia
  </option>,
  <option key="CU" value="Cuba">
    Cuba
  </option>,
  <option key="CW" value="Curaçao">
    Curaçao
  </option>,
  <option key="CY" value="Cyprus">
    Cyprus
  </option>,
  <option key="CZ" value="Czechia">
    Czechia
  </option>,
  <option key="CI" value="Côte d'Ivoire">
    Côte d'Ivoire
  </option>,
  <option key="DK" value="Denmark">
    Denmark
  </option>,
  <option key="DJ" value="Djibouti">
    Djibouti
  </option>,
  <option key="DM" value="Dominica">
    Dominica
  </option>,
  <option key="DO" value="Dominican Republic (the)">
    Dominican Republic (the)
  </option>,
  <option key="EC" value="Ecuador">
    Ecuador
  </option>,
  <option key="EG" value="Egypt">
    Egypt
  </option>,
  <option key="SV" value="El Salvador">
    El Salvador
  </option>,
  <option key="GQ" value="Equatorial Guinea">
    Equatorial Guinea
  </option>,
  <option key="ER" value="Eritrea">
    Eritrea
  </option>,
  <option key="EE" value="Estonia">
    Estonia
  </option>,
  <option key="SZ" value="Eswatini">
    Eswatini
  </option>,
  <option key="ET" value="Ethiopia">
    Ethiopia
  </option>,
  <option key="FK" value="Falkland Islands (the) [Malvinas]">
    Falkland Islands (the) [Malvinas]
  </option>,
  <option key="FO" value="Faroe Islands (the)">
    Faroe Islands (the)
  </option>,
  <option key="FJ" value="Fiji">
    Fiji
  </option>,
  <option key="FI" value="Finland">
    Finland
  </option>,
  <option key="FR" value="France">
    France
  </option>,
  <option key="GF" value="French Guiana">
    French Guiana
  </option>,
  <option key="PF" value="French Polynesia">
    French Polynesia
  </option>,
  <option key="TF" value="French Southern Territories (the)">
    French Southern Territories (the)
  </option>,
  <option key="GA" value="Gabon">
    Gabon
  </option>,
  <option key="GM" value="Gambia (the)">
    Gambia (the)
  </option>,
  <option key="GE" value="Georgia">
    Georgia
  </option>,
  <option key="DE" value="Germany">
    Germany
  </option>,
  <option key="GH" value="Ghana">
    Ghana
  </option>,
  <option key="GI" value="Gibraltar">
    Gibraltar
  </option>,
  <option key="GR" value="Greece">
    Greece
  </option>,
  <option key="GL" value="Greenland">
    Greenland
  </option>,
  <option key="GD" value="Grenada">
    Grenada
  </option>,
  <option key="GP" value="Guadeloupe">
    Guadeloupe
  </option>,
  <option key="GU" value="Guam">
    Guam
  </option>,
  <option key="GT" value="Guatemala">
    Guatemala
  </option>,
  <option key="GG" value="Guernsey">
    Guernsey
  </option>,
  <option key="GN" value="Guinea">
    Guinea
  </option>,
  <option key="GW" value="Guinea-Bissau">
    Guinea-Bissau
  </option>,
  <option key="GY" value="Guyana">
    Guyana
  </option>,
  <option key="HT" value="Haiti">
    Haiti
  </option>,
  <option key="HM" value="Heard Island and McDonald Islands">
    Heard Island and McDonald Islands
  </option>,
  <option key="VA" value="Holy See (the)">
    Holy See (the)
  </option>,
  <option key="HN" value="Honduras">
    Honduras
  </option>,
  <option key="HK" value="Hong Kong">
    Hong Kong
  </option>,
  <option key="HU" value="Hungary">
    Hungary
  </option>,
  <option key="IS" value="Iceland">
    Iceland
  </option>,
  <option key="IN" value="India">
    India
  </option>,
  <option key="ID" value="Indonesia">
    Indonesia
  </option>,
  <option key="IR" value="Iran (Islamic Republic of)">
    Iran (Islamic Republic of)
  </option>,
  <option key="IQ" value="Iraq">
    Iraq
  </option>,
  <option key="IE" value="Ireland">
    Ireland
  </option>,
  <option key="IM" value="Isle of Man">
    Isle of Man
  </option>,
  <option key="IL" value="Israel">
    Israel
  </option>,
  <option key="IT" value="Italy">
    Italy
  </option>,
  <option key="JM" value="Jamaica">
    Jamaica
  </option>,
  <option key="JP" value="Japan">
    Japan
  </option>,
  <option key="JE" value="Jersey">
    Jersey
  </option>,
  <option key="JO" value="Jordan">
    Jordan
  </option>,
  <option key="KZ" value="Kazakhstan">
    Kazakhstan
  </option>,
  <option key="KE" value="Kenya">
    Kenya
  </option>,
  <option key="KI" value="Kiribati">
    Kiribati
  </option>,
  <option key="KP" value="Korea (the Democratic People's Republic of)">
    Korea (the Democratic People's Republic of)
  </option>,
  <option key="KR" value="Korea (the Republic of)">
    Korea (the Republic of)
  </option>,
  <option key="KW" value="Kuwait">
    Kuwait
  </option>,
  <option key="KG" value="Kyrgyzstan">
    Kyrgyzstan
  </option>,
  <option key="LA" value="Lao People's Democratic Republic (the)">
    Lao People's Democratic Republic (the)
  </option>,
  <option key="LV" value="Latvia">
    Latvia
  </option>,
  <option key="LB" value="Lebanon">
    Lebanon
  </option>,
  <option key="LS" value="Lesotho">
    Lesotho
  </option>,
  <option key="LR" value="Liberia">
    Liberia
  </option>,
  <option key="LY" value="Libya">
    Libya
  </option>,
  <option key="LI" value="Liechtenstein">
    Liechtenstein
  </option>,
  <option key="LT" value="Lithuania">
    Lithuania
  </option>,
  <option key="LU" value="Luxembourg">
    Luxembourg
  </option>,
  <option key="MO" value="Macao">
    Macao
  </option>,
  <option key="MG" value="Madagascar">
    Madagascar
  </option>,
  <option key="MW" value="Malawi">
    Malawi
  </option>,
  <option key="MY" value="Malaysia">
    Malaysia
  </option>,
  <option key="MV" value="Maldives">
    Maldives
  </option>,
  <option key="ML" value="Mali">
    Mali
  </option>,
  <option key="MT" value="Malta">
    Malta
  </option>,
  <option key="MH" value="Marshall Islands (the)">
    Marshall Islands (the)
  </option>,
  <option key="MQ" value="Martinique">
    Martinique
  </option>,
  <option key="MR" value="Mauritania">
    Mauritania
  </option>,
  <option key="MU" value="Mauritius">
    Mauritius
  </option>,
  <option key="YT" value="Mayotte">
    Mayotte
  </option>,
  <option key="MX" value="Mexico">
    Mexico
  </option>,
  <option key="FM" value="Micronesia (Federated States of)">
    Micronesia (Federated States of)
  </option>,
  <option key="MD" value="Moldova (the Republic of)">
    Moldova (the Republic of)
  </option>,
  <option key="MC" value="Monaco">
    Monaco
  </option>,
  <option key="MN" value="Mongolia">
    Mongolia
  </option>,
  <option key="ME" value="Montenegro">
    Montenegro
  </option>,
  <option key="MS" value="Montserrat">
    Montserrat
  </option>,
  <option key="MA" value="Morocco">
    Morocco
  </option>,
  <option key="MZ" value="Mozambique">
    Mozambique
  </option>,
  <option key="MM" value="Myanmar">
    Myanmar
  </option>,
  <option key="NA" value="Namibia">
    Namibia
  </option>,
  <option key="NR" value="Nauru">
    Nauru
  </option>,
  <option key="NP" value="Nepal">
    Nepal
  </option>,
  <option key="NL" value="Netherlands (the)">
    Netherlands (the)
  </option>,
  <option key="NC" value="New Caledonia">
    New Caledonia
  </option>,
  <option key="NZ" value="New Zealand">
    New Zealand
  </option>,
  <option key="NI" value="Nicaragua">
    Nicaragua
  </option>,
  <option key="NE" value="Niger (the)">
    Niger (the)
  </option>,
  <option key="NG" value="Nigeria">
    Nigeria
  </option>,
  <option key="NU" value="Niue">
    Niue
  </option>,
  <option key="NF" value="Norfolk Island">
    Norfolk Island
  </option>,
  <option key="MP" value="Northern Mariana Islands (the)">
    Northern Mariana Islands (the)
  </option>,
  <option key="NO" value="Norway">
    Norway
  </option>,
  <option key="OM" value="Oman">
    Oman
  </option>,
  <option key="PK" value="Pakistan">
    Pakistan
  </option>,
  <option key="PW" value="Palau">
    Palau
  </option>,
  <option key="PS" value="Palestine, State of">
    Palestine, State of
  </option>,
  <option key="PA" value="Panama">
    Panama
  </option>,
  <option key="PG" value="Papua New Guinea">
    Papua New Guinea
  </option>,
  <option key="PY" value="Paraguay">
    Paraguay
  </option>,
  <option key="PE" value="Peru">
    Peru
  </option>,
  <option key="PH" value="Philippines (the)">
    Philippines (the)
  </option>,
  <option key="PN" value="Pitcairn">
    Pitcairn
  </option>,
  <option key="PL" value="Poland">
    Poland
  </option>,
  <option key="PT" value="Portugal">
    Portugal
  </option>,
  <option key="PR" value="Puerto Rico">
    Puerto Rico
  </option>,
  <option key="QA" value="Qatar">
    Qatar
  </option>,
  <option key="MK" value="Republic of North Macedonia">
    Republic of North Macedonia
  </option>,
  <option key="RO" value="Romania">
    Romania
  </option>,
  <option key="RU" value="Russian Federation (the)">
    Russian Federation (the)
  </option>,
  <option key="RW" value="Rwanda">
    Rwanda
  </option>,
  <option key="RE" value="Réunion">
    Réunion
  </option>,
  <option key="BL" value="Saint Barthélemy">
    Saint Barthélemy
  </option>,
  <option key="SH" value="Saint Helena, Ascension and Tristan da Cunha">
    Saint Helena, Ascension and Tristan da Cunha
  </option>,
  <option key="KN" value="Saint Kitts and Nevis">
    Saint Kitts and Nevis
  </option>,
  <option key="LC" value="Saint Lucia">
    Saint Lucia
  </option>,
  <option key="MF" value="Saint Martin (French part)">
    Saint Martin (French part)
  </option>,
  <option key="PM" value="Saint Pierre and Miquelon">
    Saint Pierre and Miquelon
  </option>,
  <option key="VC" value="Saint Vincent and the Grenadines">
    Saint Vincent and the Grenadines
  </option>,
  <option key="WS" value="Samoa">
    Samoa
  </option>,
  <option key="SM" value="San Marino">
    San Marino
  </option>,
  <option key="ST" value="Sao Tome and Principe">
    Sao Tome and Principe
  </option>,
  <option key="SA" value="Saudi Arabia">
    Saudi Arabia
  </option>,
  <option key="SN" value="Senegal">
    Senegal
  </option>,
  <option key="RS" value="Serbia">
    Serbia
  </option>,
  <option key="SC" value="Seychelles">
    Seychelles
  </option>,
  <option key="SL" value="Sierra Leone">
    Sierra Leone
  </option>,
  <option key="SG" value="Singapore">
    Singapore
  </option>,
  <option key="SX" value="Sint Maarten (Dutch part)">
    Sint Maarten (Dutch part)
  </option>,
  <option key="SK" value="Slovakia">
    Slovakia
  </option>,
  <option key="SI" value="Slovenia">
    Slovenia
  </option>,
  <option key="SB" value="Solomon Islands">
    Solomon Islands
  </option>,
  <option key="SO" value="Somalia">
    Somalia
  </option>,
  <option key="ZA" value="South Africa">
    South Africa
  </option>,
  <option key="GS" value="South Georgia and the South Sandwich Islands">
    South Georgia and the South Sandwich Islands
  </option>,
  <option key="SS" value="South Sudan">
    South Sudan
  </option>,
  <option key="ES" value="Spain">
    Spain
  </option>,
  <option key="LK" value="Sri Lanka">
    Sri Lanka
  </option>,
  <option key="SD" value="Sudan (the)">
    Sudan (the)
  </option>,
  <option key="SR" value="Suriname">
    Suriname
  </option>,
  <option key="SJ" value="Svalbard and Jan Mayen">
    Svalbard and Jan Mayen
  </option>,
  <option key="SE" value="Sweden">
    Sweden
  </option>,
  <option key="CH" value="Switzerland">
    Switzerland
  </option>,
  <option key="SY" value="Syrian Arab Republic">
    Syrian Arab Republic
  </option>,
  <option key="TW" value="Taiwan (Province of China)">
    Taiwan (Province of China)
  </option>,
  <option key="TJ" value="Tajikistan">
    Tajikistan
  </option>,
  <option key="TZ" value="Tanzania, United Republic of">
    Tanzania, United Republic of
  </option>,
  <option key="TH" value="Thailand">
    Thailand
  </option>,
  <option key="TL" value="Timor-Leste">
    Timor-Leste
  </option>,
  <option key="TG" value="Togo">
    Togo
  </option>,
  <option key="TK" value="Tokelau">
    Tokelau
  </option>,
  <option key="TO" value="Tonga">
    Tonga
  </option>,
  <option key="TT" value="Trinidad and Tobago">
    Trinidad and Tobago
  </option>,
  <option key="TN" value="Tunisia">
    Tunisia
  </option>,
  <option key="TR" value="Turkey">
    Turkey
  </option>,
  <option key="TM" value="Turkmenistan">
    Turkmenistan
  </option>,
  <option key="TC" value="Turks and Caicos Islands (the)">
    Turks and Caicos Islands (the)
  </option>,
  <option key="TV" value="Tuvalu">
    Tuvalu
  </option>,
  <option key="UG" value="Uganda">
    Uganda
  </option>,
  <option key="UA" value="Ukraine">
    Ukraine
  </option>,
  <option key="AE" value="United Arab Emirates (the)">
    United Arab Emirates (the)
  </option>,
  <option key="GB" value="United Kingdom of Great Britain and Northern Ireland (the)">
    United Kingdom of Great Britain and Northern Ireland (the)
  </option>,
  <option key="UM" value="United States Minor Outlying Islands (the)">
    United States Minor Outlying Islands (the)
  </option>,
  <option key="US" value="United States of America (the)">
    United States of America (the)
  </option>,
  <option key="UY" value="Uruguay">
    Uruguay
  </option>,
  <option key="UZ" value="Uzbekistan">
    Uzbekistan
  </option>,
  <option key="VU" value="Vanuatu">
    Vanuatu
  </option>,
  <option key="VE" value="Venezuela (Bolivarian Republic of)">
    Venezuela (Bolivarian Republic of)
  </option>,
  <option key="VN" value="Viet Nam">
    Viet Nam
  </option>,
  <option key="VG" value="Virgin Islands (British)">
    Virgin Islands (British)
  </option>,
  <option key="VI" value="Virgin Islands (U.S.)">
    Virgin Islands (U.S.)
  </option>,
  <option key="WF" value="Wallis and Futuna">
    Wallis and Futuna
  </option>,
  <option key="EH" value="Western Sahara">
    Western Sahara
  </option>,
  <option key="YE" value="Yemen">
    Yemen
  </option>,
  <option key="ZM" value="Zambia">
    Zambia
  </option>,
  <option key="ZW" value="Zimbabwe">
    Zimbabwe
  </option>,
];

export default countries;
