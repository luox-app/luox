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
  - [Contributing code of conduct](#contributing-code-of-conduct)
- [Usage](#usage)
  - [Quick start](#quick-start)
  - [Sharing spectra and calculations using sharing URL](#sharing-spectra-and-calculations-using-sharing-url)
  - [Requesting DOI for sharing URL](#requesting-doi-for-sharing-url)
- [Depositions](#depositions)
  - [List of depositions](#list-of-depositions)
- [Under the hood](#under-the-hood)
  - [Calculation definitions](#calculation-definitions)
  - [Precision and decimal points](#precision-and-decimal-points)
  - [Effect functions and action spectra](#effect-functions-and-action-spectra)
  - [Illuminant data](#illuminant-data)
  - [References to official documents](#references-to-official-documents)
  - [Implementation specifics](#implementation-specifics)
  - [Source code availability and license](#source-code-availability-and-license)
  - [Validation](#validation)
  - [Alternatives](#alternatives)
- [Acknowledgements](#acknowledgements)
- [Terms and conditions of website use](#terms-and-conditions-of-website-use)

## About

### Purpose

The purpose of the _luox_ platform is to faciliate the calculation of quantities related to light and lighting in a user-friendly, open-access and free fashion. Users can upload spectra (which are only stored in the browser) and the platform will calculate relevant quantites (including (il)luminance, chromaticity, and α-opic (ir)radiance and α-opic daylight (il)luminances) from the spectra, generate a visualisation of the spectrum, and enable the export of calculations in tabular form. All default quantities reported here are supported by the [International Commission on Illumination (CIE)](https://cie.co.at/).

The platform is primarily geared towards researchers and research users interested in the effects of light exposure on human physiology and behaviour, but it may be interesting to students, academics and professionals in other disciplines and areas.

_luox_ is deployed on [Netlify](https://www.netlify.com/).

### Team

This platform was developed by [Dr Manuel Spitschan](https://groupleaders.mpdl.mpg.de/group-leader/manuel-spitschan/) (Technical University of Munich and Max Planck Institute for Biological Cybernetics) and [Go Free Range](https://gofreerange.com/). Code to calculate colour indices was developed by [Dr. Somang Nam](https://y.at/grad-cap.pizza.picture.balloon.pine-tree) and [Dr. Jennifer A. Veitch](https://nrc.canada.ca/en/corporate/contact-us/nrc-directory-science-professionals/jennifer-veitch) at the National Research Council of Canada – Construction Research Centre, in collaboration with Dr. Spitschan.

### Citing

For now, if you use _luox_ for calculations, please cite the following (APA format):

Software:

> **Spitschan, M., Nam, S., & Veitch, J. A. (2022). luox: Platform for calculating quantities related to light and lighting [Software]. Available from https://luox.app/.**

Companion paper:

> **Spitschan, M., Mead, J., Roos, C., Lowis, C., Griffiths, B., Mucur, P., Herf, M., Nam, S., & Veitch, J. A. (2022). luox: novel validated open-access and open-source web platform for calculating and sharing physiologically relevant quantities for light and lighting. Wellcome Open Res, 6, 69. doi:10.12688/wellcomeopenres.16595.3**

For citing the source code:

> **Spitschan, M., Nam, S., & Veitch, J. A. (2022). luox: Platform for calculating quantities related to light and lighting [Source code]. Available from https://github.com/luox-app/luox.**

When reporting quantities related to CIE S 026, we also recommend citing the standard:

> **CIE (2018). CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light. Vienna: CIE Central Bureau. DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018).**

When citing other outputs from this software, we recommend citing the appropriate documents, listed below.

### Support

For any support-related questions, please email [luox-support@tuebingen.mpg.de](mailto:luox-support@tuebingen.mpg.de). Please be as specific as possible in your request.

### Bug reports and feature requests

To report bugs and suggest new features, please raise an issue on the project's [GitHub page](https://github.com/luox-app/luox/issues/new). When reporting a bug or any other issue, you need to be as specific as possible:

- Include concrete and specific steps to reproduce your problem, including any files that pose an issue
- If the problem only occurs occasionally but is reproducible, please include any additional contextual information
- If the problem is not reproducible, it may not be useful to submit a bug report

### Funding

Funding to develop _luox_ was provided by:

- [Wellcome Trust](https://wellcome.org/) (Research Enrichment – Open Research, 204686/Z/16/C);
- [Society of Light & Lighting](https://www.cibse.org/society-of-light-and-lighting) (2020 Jean Heap Bursary);
- [van Houten Fund](https://governance.admin.ox.ac.uk/van-houten-fund) of the [University of Oxford](https://www.ox.ac.uk/) (VH-148).

The development of the module for loading SPDX files was supported by the [Illumating Engineering Society (IES)](https://www.ies.org/).

During development of the platform, Dr Manuel Spitschan was supported by a Sir Henry Wellcome Postdoctoral Fellowship ([Wellcome Trust](https://wellcome.org/), 204686/Z/16/Z) and [Linacre College](https://www.linacre.ox.ac.uk/), University of Oxford (Biomedical Sciences Junior Research Fellowship).

The module for calculating CIE colour indices (D<sub>uv</sub>, T<sub>cp</sub>, R<sub>a</sub>, and R<sub>f</sub> ), the power user mode, and the optional IES TM-30-20 indices and graphics was developed at the [National Research Council of Canada, Construction Research Centre](https://nrc.canada.ca/), as a strategic research activity.

Deployment on [Netlify](https://www.netlify.com/) is supported by the [Netlify Open Source Plan](https://www.netlify.com/legal/open-source-policy/).

### Contributing code of conduct

We welcome contributions. To contribute code, [please create a fork and issue a pull request on GitHub](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

#### Contributor Covenant Code of Conduct

##### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

##### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

##### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

##### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

##### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement via email at [luox-support@psy.ox.ac.uk](mailto:luox-support@psy.ox.ac.uk). All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

##### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

###### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

###### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

###### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

###### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction withi
the community.

##### Attribution

This Code of Conduct is adapted from the [Contributor Covenant version 2.0](https://www.contributor-covenant.org/version/2/0/code_of_conduct.html).

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/inclusion/blob/master/code-of-conduct-enforcement/consequence-ladder.md).

For answers to common questions about this code of conduct, see [the FAQ](https://www.contributor-covenant.org/faq). [Translations are available](https://www.contributor-covenant.org/translations).

## Usage

### Quick start

We provide a documented wizard for uploading your files to the platform.

### Sharing spectra and calculations using sharing URL

Spectra and calculations within the luox platform can be shared using an URL that directly encodes the uploaded spectrum/spectra using Michael Herf's [spdurl](https://github.com/herf/spdurl) package. The sharing URL will open a view-only version of the platform. To copy the sharing URL, scroll down to the bottom of the page. Before sharing the URL, please double-check that it opens spectrum/spectra as expected.

### Requesting DOI for sharing URL

We offer the option to request a digital object identifier (DOI) linked to the sharing URL. This DOI has to be requested manually and the request will be vetted manually. To request a DOI, please complete this [form](https://forms.office.com/Pages/ResponsePage.aspx?id=G96VzPWXk0-0uv5ouFLPkZQkeC9QuStHlpH3Nt-sDo1URExCVlBCNFdNWk02TDVVVFhYSkUyMUxETi4u). The DOI will be generated by generating an entry for the sharing URL in the [MPG.PuRE](https://pure.mpg.de/) and author information will be included in the record. All luox sharing URLs added to ORA will receive a unique luox number of the format (`YYYY-####`; `Y`=year). A running list of luox sharing URLs with associated DOIs is on this page, under [Depositions](#depositions). Please note that deposition of the sharing URL into MPG.PuRE is permanent.

There is no guarantee that DOI requests will be accepted. To ensure that a DOI is generated in a timely fashion, please submit the request well before it is needed (e.g. in a publication submission).
Please note: Prior to January 2022, deposits were made into the Oxford Research Archive (ORA). These materials will remain in archival form in ORA.

## Depositions

### List of depositions

The following is a list of depositions with assigned DOIs, up-to-date as of 1 February 2022.

| Deposition ID  | Date             | DOI                                                                      | Depositor                                                     |
| -------------- | ---------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| luox-2021-0001 | 23 January 2021  | TBD                                                                      | Manuel Spitschan, University of Oxford                        |
| luox-2021-0002 | 18 February 2021 | [10.5287/bodleian:AeZAXN1km](https://doi.org/10.5287/bodleian:AeZAXN1km) | Jan-Frieder Harmsen, Maastricht University                    |
| luox-2021-0003 | 18 February 2021 | [10.5287/bodleian:dp7QEqYAm](https://doi.org/10.5287/bodleian:dp7QEqYAm) | Jan-Frieder Harmsen, Maastricht University                    |
| luox-2021-0004 | 18 February 2021 | [10.5287/bodleian:0ogQP5bb5](https://doi.org/10.5287/bodleian:0ogQP5bb5) | Jamie Zeitzer, Renske Lok & Daniel Joyce, Stanford University |
| luox-2022-0001 | 01 February 2022 | [10.17617/2.3364820](https://doi.org/10.17617/2.3364820)                 | Boris Hanák, Spectrasol                                       |
| luox-2022-0002 | 01 February 2022 | [10.17617/2.3364831](https://doi.org/10.17617/2.3364831)                 | Jamie Zeitzer, Stanford University                            |

## Under the hood

### Calculation definitions

All default calculations performed here follow guidance from the [International Commission on Illumination (CIE)](https://cie.co.at/).

Indices that are undefined for a given test spectrum return a value of N/A. For example, colour rendering and colour fidelity are defined only when |D<sub>uv</sub>| < 0.05.

### Precision and decimal points

All calculations are computed with double-precision floating point numbers using JavaScript. In the browser, the results are displayed up to four decimals for all quantities (including those in Advanced mode). When downloading calculations, the precision will be higher than displayed in the browser. The possible ranges of numbers which can be represented under the double precision will then be limited to approximately 16 decimal places of precision.
The calculations in _luox_ follow the published documents strictly, including any guidance concerning rounding at intermediate stages. This can introduce what appear to be rounding errors when compared to other calculation tools. In order to mitigate this issue and to maximise transparency, _luox_ provides an option to display all intermediate values in the calculation, in which can be useful to track down errors.

### Effect functions and action spectra

| Name                                   | Source document                                                                                                                    | Wavelength spacing/range [nm] |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| CIE 1931 xy (2°)                       | [ISO/CIE 11664-1:2019](http://cie.co.at/publications/colorimetry-part-1-cie-standard-colorimetric-observers-0), Table 1 (p. 10-21) | 1 / 360-830                   |
| CIE 1964 xy (10°)                      | [ISO/CIE 11664-1:2019](http://cie.co.at/publications/colorimetry-part-1-cie-standard-colorimetric-observers-0), Table 2 (p. 22-32) | 1 / 360-830                   |
| CIE S 026/E:2018 a-opic action spectra | [CIE S 026/E:2018](https://doi.org/10.25039/S026.2018), Table 2 (p. 12-21)                                                         | 1 / 380-780                   |

Note: The CIE S 026/E:2018 a-opic action spectra are available in tabulated form from the [CIE website](http://files.cie.co.at/S026_Table2_Data.xlsx) ([Internet Wayback Machine](http://web.archive.org/web/20210129094725/http://files.cie.co.at/S026_Table2_Data.xlsx)).

### Illuminant data

| Name                                          | Source document                                                                                                                     | Wavelength spacing/range [nm] |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Standard illuminant A                         | [ISO 11664-2:2007/CIE S 014-2:2006](http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0), Table 1 (p. 7-12) | 1 / 300-830                   |
| Standard illuminant D65                       | [ISO 11664-2:2007/CIE S 014-2:2006](http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0), Table 1 (p. 7-12) | 1 / 300-830                   |
| Illuminant C                                  | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                                            | 5 / 300-780                   |
| Illuminant D50                                | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                                            | 5 / 300-780                   |
| Illuminant D75                                | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 5 (p. 51-53)                                                            | 5 / 300-780                   |
| Illuminants F1-F12                            | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.1 (p. 59-60)                                                         | 5 / 380-780                   |
| Illuminants FL3.1-FL3.8                       | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.2 (p. 61-62)                                                         | 5 / 380-780                   |
| Illuminants FL3.9-FL3.15                      | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 10.3 (p. 63-64)                                                         | 5 / 380-780                   |
| Illuminants HP1-HP5                           | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 11 (p. 65-66)                                                           | 5 / 380-780                   |
| Illuminants LED-B1-LED-B5                     | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 12.1 (p. 67-68)                                                         | 5 / 380-780                   |
| Illuminants LED-BH1, LED-RGB1, LED-V1, LED-V2 | [CIE 015:2018](https://doi.org/10.25039/TR.015.2018), Table 12.2 (p. 69-70)                                                         | 5 / 380-780                   |

### References to official documents

- [CIE 224:2017: CIE 2017 Colour Fidelity Index for accurate scientific use](http://cie.co.at/publications/cie-2017-colour-fidelity-index-accurate-scientific-use)
- [CIE 015:2018: Colorimetry, 4th Edition](http://cie.co.at/publications/colorimetry-4th-edition), DOI: [10.25039/TR.015.2018](https://doi.org/10.25039/TR.015.2018)
- [ISO 11664-2:2007/CIE S 014-2:2006: Colorimetry — Part 2: CIE Standard Illuminants](http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0)
- [CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light](http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0), DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018)
- [CIE 13.3-1995 : Method of measuring and specifying colour rendering properties of light sources](https://cie.co.at/publications/method-measuring-and-specifying-colour-rendering-properties-light-sources)
- [IES TM-30-20: IES method for evaluating light source color rendition](https://store.ies.org/product/tm-30-20-ies-method-for-evaluating-light-source-color-rendition/)

### Implementation specifics

While calculation procedures are structurally well-defined by the CIE, there are a few ambiguities that may arise when implementing it. This includes the choice of specific and exchangeable algorithms (e.g. for the calculation of CCT), and the decimal points of specific constants. The specific choices are described here:

| Aspect                                         | Quantity                                          | Method or quantity used in luox              | Description                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constant for absolute (il)luminance conversion | Illuminance [lx] and Luminance [cd/m<sup>2</sup>] | 683.0015478 lm/W                             | 683 lm/W acceptable "for all practical applications" according to [ISO 23539:2005/CIE S 010:2004](http://cie.co.at/publications/photometry-cie-system-physical-photometry), 683.0015478 lm/W exact value used in the [CIE S 026 toolbox](https://doi.org/10.25039/S026.2018.TB); usually rounded up to 683.002 lm/W             |
| Rounding                                       | CIE colour rendering index R<sub>a</sub>)         | Strict rounding after calculating subindices | Following [CIE 13.3-1995](https://cie.co.at/publications/method-measuring-and-specifying-colour-rendering-properties-light-sources), luox rounds to the nearest whole number after calculating the subindex for each of the special colour rendering indices, and then averages them to form the General Colour Rendering Index |

### Source code availability and license

The source code is available on GitHub (https://github.com/luox-app/luox/) under an MIT License.

### Validation

The default output of luox (CIE quantities and indices) has been validated by the CIE. The validation report is available [here](https://github.com/luox-app/luox/raw/master/docs/CIE_Software_Check_of_luox_app.pdf).

According to the CIE:

> This software incorporates methods, formulae, spectral function calculations and spectra from the International Commission on Illumination (CIE). The CIE endorses this software having made a black-box evaluation of the software as of Feb. 11, 2021, finding that the software performs satisfactorily to calculate quantities and indices derived from CIE publications. This software is not a replacement for the CIE publications and works from which it is derived. The user is advised to consult the original publications and works for proper understanding of and calculation of the result of this software.

This software has been validated to load SPDX files according to TM-27-20.

This software offers optional calculation of indices from IES TM-30-20. These optional calculations have not been validated.

### Alternatives

The CIE has released a toolbox (DOI: [10.25039/S026.2018.TB](https://doi.org/10.25039/S026.2018.TB)) and user guide (DOI: [10.25039/S026.2018.UG](https://doi.org/10.25039/S026.2018.UG)) for calculations of quantities specified in [CIE S 026/E:2018: CIE System for Metrology of Optical Radiation for ipRGC-Influenced Responses to Light](http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0) (DOI: [10.25039/S026.2018](https://doi.org/10.25039/S026.2018)). The Excel spreadsheet-based toolbox is freely available and is supplementary to the luox platform.

An Excel spreadsheet tool for calculating the CIE Colour Fidelity Index (Rf) is available as a companion to [CIE 224:2017 CIE 2017 Colour Fidelity Index for accurate scientific use](https://cie.co.at/publications/cie-2017-colour-fidelity-index-accurate-scientific-use).

## Acknowledgements

The following individuals tested and provided feedback on an early version of the platform: Paul O'Mahoney, Tos Berendschot, Isabel Schöllhorn, Christine Blume, Katharina Wulff, Kinjiro Amano, Tony Esposito, Minchen Tommy Wei, Suzanne Ftouni, Paula M. Esquivias, Gayline Manalang Jr., Daniel Garside, Joachim Stormly Hansen, and Hao Xie.

## Terms and conditions of website use

#### What's in these terms?

These terms tell you the rules for using our website [https://luox.app/](https://luox.app/) (our site).

#### Who we are and how to contact us

Our site operated by the joint research group Chronobiology & Health at the Technical University of Munich and Translational Sensory and Circadian Neuroscience at the Max Planck Institute for Biological Cybernetics (Prof. Dr. Manuel Spitschan). To contact us, please email [luox-support@psy.ox.ac.uk](mailto:luox-support@psy.ox.ac.uk).

#### By using our site you accept these terms

By using our site, you confirm that you accept these terms of use and that you agree to comply with them.

If you do not agree to these terms, you must not use our site.

We recommend that you print a copy of these terms for future reference.

#### We may make changes to these terms

We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time.

#### We may make changes to our site

We may update and change our site from time to time to ensure it is up to date.

#### We may suspend or withdraw our site

Our site is made available free of charge.

We do not guarantee that our site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.

You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms of use and other applicable terms and conditions, and that they comply with them.

#### How you may use material on our site

The contents of our site are owned by us or, where content has been provided by third parties, by those third parties. The copyright in the material contained on our site belongs to us or our licensors. It is your responsibility to seek appropriate consent to re-use any contents of our site.

#### Do not rely on information on this site

The content on our site is provided for general information only and is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our site.

Although we make reasonable efforts to update the information on our site, we make no representations, warranties or guarantees, whether express or implied, that the content on our site is accurate, complete or up to date.

#### We are not responsible for websites we link to or third party information

Where our site contains links to other sites and resources provided by third parties, these links and resources are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.

We have no control over the contents of those sites or resources.

#### User-generated content is not approved by us

This website may include information and materials uploaded by other users of the site. This information and these materials have not been verified or approved by us. The views expressed by other users on our site do not represent our views or values.

#### Our responsibility for loss or damage suffered by you

To the extent permitted in law, we accept no liability for any loss or damage which may be suffered by you or by other parties as a direct or indirect result of using our site (including loss of profit, loss of opportunity, loss of business, and consequential loss).

We are not responsible for viruses and you must not introduce them.

We do not guarantee that our site will be secure or free from bugs or viruses.

You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software.

You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately.

#### Rules about linking to our site

You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.

You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.

You must not establish a link to our site in any website that is not owned by you.

Our site must not be framed on any other site, nor may you create a link to any part of our site other than the home page.

We reserve the right to withdraw linking permission without notice.

If you wish to link to or make any use of content on our site other than that set out above, please contact [luox-support@psy.ox.ac.uk](mailto:luox-support@psy.ox.ac.uk).

#### Which country's laws apply to any disputes?

These terms of use, their subject matter and their formation (and any non-contractual disputes or claims) are governed by German law.
