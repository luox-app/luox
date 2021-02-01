# _luox_

_A user-friendly, open-access platform for calculating quantities related to light and lighting_

- [About](#about)
  - [Purpose](#purpose)
  - [Team](#team)
  - [Citing](#citing)
  - [Announcements](#announcements)
  - [Support](#support)
  - [Bug reports and feature requests](#bug-reports-and-feature-requests)
  - [Funding](#funding)
- [Usage](#usage)
  - [Quick start](#quick-start)
  - [Sharing spectra and calculations using sharing URL](#sharing-spectra-and-calculations-using-sharing-url)
  - [Requesting DOI for sharing URL](#requesting-doi-for-sharing-url)
- [Under the hood](#under-the-hood)
  - [Calculation definitions](#calculation-definitions)
  - [Precision and decimal points](#precision-and-decimal-points)
  - [Sources of effect functions](#sources-of-effect-functions)
  - [Sources of illuminant data](#sources-of-illuminant-data)
  - [References to official documents](#references-to-official-documents)
  - [Implementation specifics](#implementation-specifics)
  - [Source code availability and license](#source-code-availability-and-license)
  - [Alternatives](#alternatives)
- [Acknowledgements](#acknowledgements)
- [Version information](#version-information)

## About

### Purpose

The purpose of the _luox_ platform is to faciliate the calculation of quantities related to light and lighting in a user-friendly, open-access and free fashion. Users can upload spectra (which are only stored in the browser) and the platform will calculate relevant quantites (including (il)luminance, chromaticity, and α-opic (ir)radiance and α-opic daylight (il)luminances) from the spectra, generate a visualisation of the spectrum, and enable the export of calculations in tabular form. All quantities reported here are supported by the [International Commission on Illumination (CIE)](https://cie.co.at/).

The platform is primarily geared towards researchers and research users interested in the effects of light exposure on human physiology and behaviour, but it may be interesting to students, academics and professionals in other disciplines and areas.

### Team

This platform was developed by [Dr Manuel Spitschan](https://www.psy.ox.ac.uk/team/manuel-spitschan) (Department of Experimental Psychology, Unversity of Oxford) and [Go Free Range](https://gofreerange.com/).

### Citing

For now, if you use _luox_ for calculations, please cite the following (APA format):

> **Spitschan, M. (2021). luox: Platform for calculating quantities related to light and lighting [Software]. Available from https://luox.app/.**

> **Spitschan, M., Stefani, O., Blattner, P., Gronfier, C., Lockley, S. W., & Lucas, R. J. (2019) How to report Light exposure in human chronobiology and sleep research experiments. _Clocks & Sleep_. 2019; 1(3):280-289. DOI: [10.3390/clockssleep1030024](https://doi.org/10.3390/clockssleep1030024).**

For citing the source code:

> **Spitschan, M. (2021). luox: Platform for calculating quantities related to light and lighting [Source code]. Available from https://github.com/luox-app/luox.**

We are currently (January 2021) in the process of writing a report presenting _luox_ and will update this information here.

When reporting quantites related to CIE S 026, we also recommend citing the standard:

> **CIE (2018). CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light. Vienna: CIE Central Bureau. DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018).**

### Announcements

To stay up-to-date with any announcements on _luox_, please subscribe to the announcements listserv here. Send an email to [luox-users-subscribe@maillist.ox.ac.uk](mailto:luox-users-subscribe@maillist.ox.ac.uk). Subject and message content do not matter.

### Support

For any support-related questions, please email [luox-support@psy.ox.ac.uk](mailto:luox-support@psy.ox.ac.uk). Please be as specific as possible in your request.

### Bug reports and feature requests

To report bugs and suggest new features, please raise an issue on the project's [GitHub page](luox-support@psy.ox.ac.uk). When reporting a bug or any other issue, you need to be as specific as possible:

- Include concrete and specific steps to reproduce your problem, including any files that pose an issue
- If the problem only occurs occasionally but is reproducible, please include any additional contextual information
- If the problem is not reproducible, it may not be useful to submit a bug report

### Funding

Funding to develop _luox_ was provided by:

- [Wellcome Trust](https://wellcome.org/) (Research Enrichment – Open Research, 204686/Z/16/C);
- [Society of Light & Lighting](https://www.cibse.org/society-of-light-and-lighting) (2020 Jean Heap Bursary);
- [van Houten Fund](https://governance.admin.ox.ac.uk/van-houten-fund) of the [University of Oxford](https://www.ox.ac.uk/) (VH-148).

During development of the platform, Dr Manuel Spitschan was supported by a Sir Henry Wellcome Postdoctoral Fellowship ([Wellcome Trust](https://wellcome.org/), 204686/Z/16/Z) and [Linacre College](https://www.linacre.ox.ac.uk/), University of Oxford (Biomedical Sciences Junior Research Fellowship).

## Usage

### Quick start

We provide a documented wizard for uploading your files to the platform.

### Sharing spectra and calculations using sharing URL

Spectra and calculations within the luox platform can be shared using an URL that directly encodes the uploaded spectrum/spectra using Michael Herf's [spdurl](https://github.com/herf/spdurl) package. The sharing URL will open a view-only version of the platform. To copy the sharing URL, scroll down to the bottom of the page. Before sharing the URL, please double-check that it opens spectrum/spectra as expected.

### Requesting DOI for sharing URL

We offer the option to request a digital object identifier (DOI) linked to the sharing URL. This DOI has to be requested manually and the request will be vetted manually. To request a DOI, please complete this [form](https://forms.office.com/Pages/ResponsePage.aspx?id=G96VzPWXk0-0uv5ouFLPkZQkeC9QuStHlpH3Nt-sDo1URExCVlBCNFdNWk02TDVVVFhYSkUyMUxETi4u). The DOI will be generated by generating an entry for the sharing URL in the [Oxford University Research Archive (ORA)](https://ora.ox.ac.uk/) and author information will be included in the record. All luox sharing URLs added to ORA will receive a unique luox number of the format (`YYYY-####`; `Y`=year). A running list of luox sharing URLs with associated DOIs is on this page, under [List of sharing URLs](#list-of-sharing-urls). Please note that deposition of the sharing URL into ORA is permanent.

There is no guarantee that DOI requests will be accepted. To ensure that a DOI is generated in a timely fashion, please submit the request well before it is needed (e.g. in a publication submission). We are currently investigating the possibility of generating DOIs directly without using ORA.

## Under the hood

### Calculation definitions

All calculations performed here following guidance from the [International Commission on Illumination (CIE)](https://cie.co.at/).

### Precision and decimal points

All calculations are computed with floating point precision using JavaScript. In the browser, the results are displayed up to four decimals for all quantities (including those in _Advanced_ mode). When downloading calculations, the precision will be higher than displayed in the browser.

### Official source documents: Effect functions and action spectra

| Name                                   | Source document                                                                        | Wavelength spacing/range [nm] |
| -------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| CIE 1931 xy (2°)                       | [EN ISO/CIE 11664-1:2019](https://www.iso.org/standard/74164.html), Table 1 (p. 10-21) | 1 / 360-830                   |
| CIE 1964 xy (10°)                      | [EN ISO/CIE 11664-1:2019](https://www.iso.org/standard/74164.html), Table 2 (p. 22-32) | 1 / 360-830                   |
| CIE S 026/E:2018 a-opic action spectra | [CIE S 026/E:2018](https://doi.org/10.25039/S026.2018), Table 2 (p. 12-21)             | 1 / 380-780                   |

Note: The CIE S 026/E:2018 a-opic action spectra are available in tabulated form from the [CIE website](http://files.cie.co.at/S026_Table2_Data.xlsx) ([Internet Wayback Machine](http://web.archive.org/web/20210129094725/http://files.cie.co.at/S026_Table2_Data.xlsx)).

### Official source documents: Illuminant data

| Name                                          | Source document                                                                                              | Wavelength spacing/range [nm] |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| Standard illuminant A                         | [EN ISO/CIE 11664 2:2011](https://shop.bsigroup.com/ProductDetail?pid=000000000030231895), Table 1 (p. 7-12) | 1 / 300-830                   |
| Standard illuminant D65                       | [EN ISO/CIE 11664 2:2011](https://shop.bsigroup.com/ProductDetail?pid=000000000030231895), Table 1 (p. 7-12) | 1 / 300-830                   |
| Illuminant C                                  | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                     | 5 / 300-780                   |
| Illuminant D50                                | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                     | 5 / 300-780                   |
| Illuminant D75                                | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                     | 5 / 300-780                   |
| Illuminants F1-F12                            | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.1 (p. 59-60)                                  | 5 / 380-780                   |
| Illuminants FL3.1-FL3.8                       | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.2 (p. 61-62)                                  | 5 / 380-780                   |
| Illuminants FL3.9-FL3.15                      | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.3 (p. 63-64)                                  | 5 / 380-780                   |
| Illuminants HP1-HP5                           | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 11 (p. 65-66)                                    | 5 / 380-780                   |
| Illuminants LED-B1-LED-B5                     | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 12.1 (p. 67-68)                                  | 5 / 380-780                   |
| Illuminants LED-BH1, LED-RGB1, LED-V1, LED-V2 | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 12.2 (p. 69-70)                                  | 5 / 380-780                   |

### References to official documents

- [CIE 013.3-1995: Method of measuring and specifying colour rendering properties of light sources](http://cie.co.at/publications/method-measuring-and-specifying-colour-rendering-properties-light-sources)
- [CIE 224:2017: CIE 2017 Colour Fidelity Index for accurate scientific use](http://cie.co.at/publications/cie-2017-colour-fidelity-index-accurate-scientific-use)
- [CIE 015:2018: Colorimetry, 4th Edition](http://cie.co.at/publications/colorimetry-4th-edition), DOI: [10.25039/TR.015.2018](https://doi.org/10.25039/TR.015.2018)
- [EN ISO/CIE 11664 2:2011](https://shop.bsigroup.com/ProductDetail?pid=000000000030231895)
- [CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light](http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0), DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018)

### Implementation specifics

While calculation procedures are structurally well-defined by the CIE, there are a few ambiguities that may arise when implementing it. This includes the choice of specific and exchangeable algorithms (e.g. for the calculation of CCT), and the decimal points of specific constants. The specific choices are described here:

| Aspect                                            | Quantity                                | Method or quantity used in luox                                                       | Description                                                                                                                                                                                                                                                                                |
| ------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Calculation of Correlated Color Temperature [CCT} | Colour rendering index (CIE Ra)         | [Robertson (1968)](https://doi.org/10.1364/JOSA.58.001528) parametrisation and method | Alternatives listed in CIE 015, section 9.4 (p. 39)                                                                                                                                                                                                                                        |
| Constant for absolute (il)luminance conversion    | Illuminance [lux] and Luminance [cd/m2] | 683.0015478 lm/W                                                                      | 683 lm/W acceptable "for all practical applications" according to [BS ISO 23539:2005](https://shop.bsigroup.com/ProductDetail?pid=000000000030133892), 683.0015478 lm/W exact value used in (CIE S 026 toolbox)[https://doi.org/10.25039/S026.2018.TB]; usually rounded up to 683.002 lm/W |

### Source code availability and license

The source code is available on GitHub (https://github.com/luox-app/luox/) under an MIT License.

### Alternatives

The CIE has released a toolbox (DOI: [10.25039/S026.2018.TB](https://doi.org/10.25039/S026.2018.TB)) and user guide [10.25039/S026.2018.UG](https://doi.org/10.25039/S026.2018.UG)) for calculations of quantities specified in [CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light](http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0), DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018). The Excel spreadsheet-based toolbox is freely available and is supplementary to the luox platform.

## Acknowledgements

The following individuals tested and provided feedback on an early version of the platform: Paul O'Mahoney, Tos Berendschot, Isabel Schöllhorn, Christine Blume, Katharina Wulff, Kinjiro Amano, Tony Esposito, Minchen Tommy Wei, Suzanne Ftouni, Paula M. Esquivias, Gayline Manalang Jr., Daniel Garside, Joachim Stormly Hansen, and Hao Xie.
