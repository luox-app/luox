require 'csv'
require 'json'

data = {}

input = CSV.read('data/cri_test_colours.csv').map { |wavelength, *colours| [Integer(wavelength)] + colours.map(&:to_f).take(8) }

input.each_cons(2) do |row1, row2|
  x1, *y1 = row1
  x2, *y2 = row2
  delta_x = x2 - x1
  delta_y = y1.zip(y2).map { |a, b| b - a }
  m = delta_y.map { |a| a / delta_x }

  delta_x.times do |j|
    new_y = m.zip(y1).map { |mi, yi| j * mi + yi }
    data[x1 + j] = new_y
  end
end

data[input.last[0]] = input.last[1..]

puts data.to_json
