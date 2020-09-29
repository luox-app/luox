require 'csv'
require 'json'

data = {}

File.open('data/cri_test_colours.csv') do |file|
  file.each_line do |line|
    row = CSV.parse_line(line.strip).map(&:strip)
    data[row.first.to_i] = row[1..8].map(&:to_f)
  end
end

File.open('dist/cri_test_colours.json', 'w') do |file|
  file.puts(data.to_json)
end
