require 'csv'

data = []

def randomise(samples)
  samples.map do |s|
    s.to_f * rand(0.9..1.1)
  end.take(2)
end

File.open('data/example-spectrum.csv') do |file|
  file.each_line do |line|
    wavelength, *samples = CSV.parse_line(line.scrub)
    if wavelength =~ /^\d+/
      data << [wavelength] + randomise(samples)
    end
  end
end

File.open('src/sample.csv', 'w') do |file|
  file.puts("wavelength,S1,S2")
  data.each do |d|
    file.puts(d.to_csv)
  end
end
