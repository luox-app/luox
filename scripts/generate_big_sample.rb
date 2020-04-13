require 'csv'

data = []

NUM_SAMPLES = 300

def randomise(samples)
  [rand(0.0001..0.0002)] * NUM_SAMPLES
end

File.open('data/example-spectrum.csv') do |file|
  file.each_line do |line|
    wavelength, *samples = CSV.parse_line(line.scrub)
    if wavelength =~ /^\d+/
      data << [wavelength] + randomise(samples)
    end
  end
end

File.open('src/examples/big-sample.csv', 'w') do |file|
  sampleHeaders = (1..NUM_SAMPLES).map { |s| "S#{s}" }
  file.puts((["wavelength"] + sampleHeaders).to_csv)
  data.each do |d|
    file.puts(d.to_csv)
  end
end
