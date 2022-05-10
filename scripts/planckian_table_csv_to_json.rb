=begin 
  luox-NRC-CIERf is a module to calculate parameters for light source colour appearance and colour rendering in the luox platform.
  Copyright (C) 2022 Her Majesty the Queen in Right of Canada. National Research Council of Canada. Ottawa, Canada.
  This program is free software: you can redistribute it and/or modify it under the terms of the
  GNU General Public License v 3.0 as published by the Free Software Foundation.
  Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU General Public License for more details.
  You should have received a copy of the GNU General Public License along with this program.
  If not, see <https://www.gnu.org/licenses/>. 
=end
 
require 'csv'
require 'json'

data = {}

counter = 0
CSV.foreach('../data/planckian_table_cie.csv') do |row|
  data[counter] = {
    'Ti' => row[0].to_f,
    'ui' => row[1].to_f,
    'vi' => row[2].to_f
  }
  counter += 1
end

File.open('../src/data/planckian_table_cie.json', 'w') do |file|
  file.puts(data.to_json)
end

data = {}

counter = 0
CSV.foreach('../data/planckian_table_ies.csv') do |row|
  data[counter] = {
    'Ti' => row[0].to_f,
    'ui' => row[1].to_f,
    'vi' => row[2].to_f
  }
  counter += 1
end

File.open('../src/data/planckian_table_ies.json', 'w') do |file|
  file.puts(data.to_json)
end