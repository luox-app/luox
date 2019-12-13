require 'csv'
require 'json'

data = {}

File.open('cies026.csv') do |file|
  file.each_line.with_index do |line, index|
    next if index == 0

    row = CSV.parse_line(line.strip).map(&:strip)
    data[row.first.to_i] = {
      'sCone' => row[1].to_f,
      'mCone' => row[2].to_f,
      'lCone' => row[3].to_f,
      'rod' => row[4].to_f,
      'mel' => row[5].to_f
    }
  end
end

File.open('cies026.json', 'w') do |file|
  file.puts(data.to_json)
end
