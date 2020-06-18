require 'csv'
require 'json'

data = {}

File.open('data/d_illuminant.csv') do |file|
  file.each_line.with_index do |line, index|
    next if index == 0

    row = CSV.parse_line(line.strip).map(&:strip)
    data[row.first.to_i] = {
      'S0' => row[1].to_f,
      'S1' => row[2].to_f,
      'S2' => row[3].to_f
    }
  end
end

File.open('dist/d_illuminant.json', 'w') do |file|
  file.puts(data.to_json)
end
