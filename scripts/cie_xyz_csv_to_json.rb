require 'csv'
require 'json'

data = {}

CSV.foreach('data/ciexyz31_1.csv') do |row|
  data[row[0].to_i] = {
    'X' => row[1].to_f,
    'Y' => row[2].to_f,
    'Z' => row[3].to_f
  }
end

File.open('src/ciexyz31.json', 'w') do |file|
  file.puts(data.to_json)
end

data = {}

CSV.foreach('data/ciexyz64_1.csv') do |row|
  data[row[0].to_i] = {
    'X' => row[1].to_f,
    'Y' => row[2].to_f,
    'Z' => row[3].to_f
  }
end

File.open('src/ciexyz64.json', 'w') do |file|
  file.puts(data.to_json)
end
