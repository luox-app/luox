require 'csv'
require 'json'

data = {}

File.open('vl1924.csv') do |file|
  file.each_line do |line|
    row = CSV.parse_line(line.strip).map(&:strip)
    data[row.first.to_i] = {
      'vl1924' => row.last.to_f
    }
  end
end

File.open('vl1924.json', 'w') do |file|
  file.puts(data.to_json)
end
