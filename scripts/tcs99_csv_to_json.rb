require 'csv'
require 'json'

data = {}

File.open('../data/TCS99_1nm.csv') do |file|
  file.each_line.with_index do |line, index|
    row = CSV.parse_line(line.strip).map(&:strip)

    data[row.first.to_i] = {
    'Source' => row[1].to_f,
    'TCS1' => row[2].to_f, 'TCS2' => row[3].to_f, 'TCS3' => row[4].to_f,
    'TCS4' => row[5].to_f, 'TCS5' => row[6].to_f, 'TCS6' => row[7].to_f,
    'TCS7' => row[8].to_f, 'TCS8' => row[9].to_f, 'TCS9' => row[10].to_f,
    'TCS10' => row[11].to_f, 'TCS11' => row[12].to_f, 'TCS12' => row[13].to_f,
    'TCS13' => row[14].to_f, 'TCS14' => row[15].to_f, 'TCS15' => row[16].to_f,
    'TCS16' => row[17].to_f, 'TCS17' => row[18].to_f, 'TCS18' => row[19].to_f,
    'TCS19' => row[20].to_f, 'TCS20' => row[21].to_f, 'TCS21' => row[22].to_f,
    'TCS22' => row[23].to_f, 'TCS23' => row[24].to_f, 'TCS24' => row[25].to_f,
    'TCS25' => row[26].to_f, 'TCS26' => row[27].to_f, 'TCS27' => row[28].to_f,
    'TCS28' => row[29].to_f, 'TCS29' => row[30].to_f, 'TCS30' => row[31].to_f,
    'TCS31' => row[32].to_f, 'TCS32' => row[33].to_f, 'TCS33' => row[34].to_f,
    'TCS34' => row[35].to_f, 'TCS35' => row[36].to_f, 'TCS36' => row[37].to_f,
    'TCS37' => row[38].to_f, 'TCS38' => row[39].to_f, 'TCS39' => row[40].to_f,
    'TCS40' => row[41].to_f, 'TCS41' => row[42].to_f, 'TCS42' => row[43].to_f,
    'TCS43' => row[44].to_f, 'TCS44' => row[45].to_f, 'TCS45' => row[46].to_f,
    'TCS46' => row[47].to_f, 'TCS47' => row[48].to_f, 'TCS48' => row[49].to_f,
    'TCS49' => row[50].to_f, 'TCS50' => row[51].to_f, 'TCS51' => row[52].to_f,
    'TCS52' => row[53].to_f, 'TCS53' => row[54].to_f, 'TCS54' => row[55].to_f,
    'TCS55' => row[56].to_f, 'TCS56' => row[57].to_f, 'TCS57' => row[58].to_f,
    'TCS58' => row[59].to_f, 'TCS59' => row[60].to_f, 'TCS60' => row[61].to_f,
    'TCS61' => row[62].to_f, 'TCS62' => row[63].to_f, 'TCS63' => row[64].to_f,
    'TCS64' => row[65].to_f, 'TCS65' => row[66].to_f, 'TCS66' => row[67].to_f,
    'TCS67' => row[68].to_f, 'TCS68' => row[69].to_f, 'TCS69' => row[70].to_f,
    'TCS70' => row[71].to_f, 'TCS71' => row[72].to_f, 'TCS72' => row[73].to_f,
    'TCS73' => row[74].to_f, 'TCS74' => row[75].to_f, 'TCS75' => row[76].to_f,
    'TCS76' => row[77].to_f, 'TCS77' => row[78].to_f, 'TCS78' => row[79].to_f,
    'TCS79' => row[80].to_f, 'TCS80' => row[81].to_f, 'TCS81' => row[82].to_f,
    'TCS82' => row[83].to_f, 'TCS83' => row[84].to_f, 'TCS84' => row[85].to_f,
    'TCS85' => row[86].to_f, 'TCS86' => row[87].to_f, 'TCS87' => row[88].to_f,
    'TCS88' => row[89].to_f, 'TCS89' => row[90].to_f, 'TCS90' => row[91].to_f,
    'TCS91' => row[92].to_f, 'TCS92' => row[93].to_f, 'TCS93' => row[94].to_f,
    'TCS94' => row[95].to_f, 'TCS95' => row[96].to_f, 'TCS96' => row[97].to_f,
    'TCS97' => row[98].to_f, 'TCS98' => row[99].to_f, 'TCS99' => row[100].to_f
    }
  end
end

File.open('../src/data/TCS99_1nm.json', 'w') do |file|
  file.puts(data.to_json)
end
