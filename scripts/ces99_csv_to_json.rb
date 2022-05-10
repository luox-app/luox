require 'csv'
require 'json'

data = {}

File.open('../data/CES99_1nm.csv') do |file|
  file.each_line.with_index do |line, index|
    row = CSV.parse_line(line.strip).map(&:strip)

    data[row.first.to_i] = {
    'Source' => row[1].to_f,
    'CES1' => row[2].to_f, 'CES2' => row[3].to_f, 'CES3' => row[4].to_f,
    'CES4' => row[5].to_f, 'CES5' => row[6].to_f, 'CES6' => row[7].to_f,
    'CES7' => row[8].to_f, 'CES8' => row[9].to_f, 'CES9' => row[10].to_f,
    'CES10' => row[11].to_f, 'CES11' => row[12].to_f, 'CES12' => row[13].to_f,
    'CES13' => row[14].to_f, 'CES14' => row[15].to_f, 'CES15' => row[16].to_f,
    'CES16' => row[17].to_f, 'CES17' => row[18].to_f, 'CES18' => row[19].to_f,
    'CES19' => row[20].to_f, 'CES20' => row[21].to_f, 'CES21' => row[22].to_f,
    'CES22' => row[23].to_f, 'CES23' => row[24].to_f, 'CES24' => row[25].to_f,
    'CES25' => row[26].to_f, 'CES26' => row[27].to_f, 'CES27' => row[28].to_f,
    'CES28' => row[29].to_f, 'CES29' => row[30].to_f, 'CES30' => row[31].to_f,
    'CES31' => row[32].to_f, 'CES32' => row[33].to_f, 'CES33' => row[34].to_f,
    'CES34' => row[35].to_f, 'CES35' => row[36].to_f, 'CES36' => row[37].to_f,
    'CES37' => row[38].to_f, 'CES38' => row[39].to_f, 'CES39' => row[40].to_f,
    'CES40' => row[41].to_f, 'CES41' => row[42].to_f, 'CES42' => row[43].to_f,
    'CES43' => row[44].to_f, 'CES44' => row[45].to_f, 'CES45' => row[46].to_f,
    'CES46' => row[47].to_f, 'CES47' => row[48].to_f, 'CES48' => row[49].to_f,
    'CES49' => row[50].to_f, 'CES50' => row[51].to_f, 'CES51' => row[52].to_f,
    'CES52' => row[53].to_f, 'CES53' => row[54].to_f, 'CES54' => row[55].to_f,
    'CES55' => row[56].to_f, 'CES56' => row[57].to_f, 'CES57' => row[58].to_f,
    'CES58' => row[59].to_f, 'CES59' => row[60].to_f, 'CES60' => row[61].to_f,
    'CES61' => row[62].to_f, 'CES62' => row[63].to_f, 'CES63' => row[64].to_f,
    'CES64' => row[65].to_f, 'CES65' => row[66].to_f, 'CES66' => row[67].to_f,
    'CES67' => row[68].to_f, 'CES68' => row[69].to_f, 'CES69' => row[70].to_f,
    'CES70' => row[71].to_f, 'CES71' => row[72].to_f, 'CES72' => row[73].to_f,
    'CES73' => row[74].to_f, 'CES74' => row[75].to_f, 'CES75' => row[76].to_f,
    'CES76' => row[77].to_f, 'CES77' => row[78].to_f, 'CES78' => row[79].to_f,
    'CES79' => row[80].to_f, 'CES80' => row[81].to_f, 'CES81' => row[82].to_f,
    'CES82' => row[83].to_f, 'CES83' => row[84].to_f, 'CES84' => row[85].to_f,
    'CES85' => row[86].to_f, 'CES86' => row[87].to_f, 'CES87' => row[88].to_f,
    'CES88' => row[89].to_f, 'CES89' => row[90].to_f, 'CES90' => row[91].to_f,
    'CES91' => row[92].to_f, 'CES92' => row[93].to_f, 'CES93' => row[94].to_f,
    'CES94' => row[95].to_f, 'CES95' => row[96].to_f, 'CES96' => row[97].to_f,
    'CES97' => row[98].to_f, 'CES98' => row[99].to_f, 'CES99' => row[100].to_f
    }
  end
end

File.open('../src/data/CES99_1nm.json', 'w') do |file|
  file.puts(data.to_json)
end
