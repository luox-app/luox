require 'csv'
require 'json'

data = {}
idx = 0

File.open('data/robertson.csv') do |file|
  file.each_line do |line|
    row = CSV.parse_line(line.strip).map(&:strip)
    data[idx] = {
      'r' => row[0].to_f,
      'u' => row[1].to_f,
      'v' => row[2].to_f,
      't' => row[3].to_f,
    }
    idx += 1
  end
end

File.open('dist/robertson.json', 'w') do |file|
  file.puts(data.to_json)
end
