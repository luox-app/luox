require 'csv'
require 'json'

input_files = [
  'data/reference_spectra/CIEStandardIlluminant_A_D65_Illuminant_E.csv',
  'data/reference_spectra/Illuminant_C_D50_D55_D75.csv',
  'data/reference_spectra/Illuminants_F_L_H.csv'
]

data = {}

input_files.each do |file| 
  CSV.foreach(file, headers: true) do |row|
    row.each_pair do |key, value|
      next if key == 'Wavelength [nm]'

      wavelength = row['Wavelength [nm]']

      if data.has_key?(key)
        data[key][wavelength] = value 
      else
        data[key] = {}
        data[key][wavelength] = value 
      end 
    end
  end
end

File.open('dist/reference_spectra.json', 'w') do |file|
  file.puts(data.to_json)
end
