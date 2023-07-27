import React, { useEffect } from "react";
import tumLogo from "../../images/tum.png";
import mpiLogo from "../../images/mpi.png";

const About = () => {
  useEffect(() => {
    document.title = "luox: About this application";
  });

  return (
    <>
      <div id="main" className="about-us-section">
        <section className="about-imgs-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row d-flex flex-wrap align-items-center">
                  <div className="col-md-3 offset-md-3 col-sm-6 col-xs-12">
                    <div className="img-item">
                      <a href="https://www.sg.tum.de/en/chronobiology/home/">
                        <img
                          src={tumLogo}
                          width="100%"
                          className="align-middle"
                          alt="Technical University of Munich logo"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="img-item">
                      <a href="https://www.kyb.tuebingen.mpg.de/614159/translational-sensory-and-circadian-neuroscience">
                        <img
                          src={mpiLogo}
                          width="100%"
                          className="align-middle"
                          alt="Max Planck Institute for Biological Cybernetics logo"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="portfolio">
          <div className="container">
            <div className="section-title">
              <h2>About luox</h2>
              <p>
                A user-friendly, open-access platform for calculating quantities
                related to light and lighting
              </p>
            </div>
          </div>
        </section>
        <section className="why-us">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                <div className="accordion-list">
                  <ul>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        className="collapsed"
                        data-bs-target="#accordion-list-1"
                      >
                        <span>1</span> About
                      </a>
                      <div
                        id="accordion-list-1"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <div className="row">
                          <div className="col-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                            <div className="accordion-list-sub accordion-list-sub-1">
                              <ul>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-1-1"
                                  >
                                    <span>1-1</span> Purpose
                                  </a>
                                  <div
                                    id="accordion-list-1-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p className="about-us-detail">
                                      The purpose of the luox platform is to
                                      faciliate the calculation of quantities
                                      related to light and lighting in a
                                      user-friendly, open-access and free
                                      fashion. Users can upload spectra (which
                                      are only stored in the browser) and the
                                      platform will calculate relevant quantites
                                      (including (il)luminance, chromaticity,
                                      and α-opic (ir)radiance and α-opic
                                      daylight (il)luminances) from the spectra,
                                      generate a visualisation of the spectrum,
                                      and enable the export of calculations in
                                      tabular form. All default quantities
                                      reported here are supported by the{" "}
                                      <a href="https://cie.co.at/">
                                        International Commission on Illumination
                                        (CIE)
                                      </a>
                                      .
                                    </p>
                                    <p>
                                      The platform is primarily geared towards
                                      researchers and research users interested
                                      in the effects of light exposure on human
                                      physiology and behaviour, but it may be
                                      interesting to students, academics and
                                      professionals in other disciplines and
                                      areas.
                                    </p>
                                    <p className="about-us-detail">
                                      luox is deployed on{" "}
                                      <a href="https://www.netlify.com/">
                                        Netlify
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-2"
                                    className="collapsed"
                                  >
                                    <span>1-2</span> Team
                                  </a>
                                  <div
                                    id="accordion-list-1-2"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p className="about-us-detail">
                                      This platform was developed by{" "}
                                      <a href="https://groupleaders.mpdl.mpg.de/group-leader/manuel-spitschan/">
                                        Prof. Dr. Manuel Spitschan
                                      </a>{" "}
                                      (Technical University of Munich and Max
                                      Planck Institute for Biological
                                      Cybernetics) and{" "}
                                      <a href="https://gofreerange.com/">
                                        Go Free Range
                                      </a>
                                      . Code to calculate colour indices was
                                      developed by{" "}
                                      <a href="https://mutsamo.com/">
                                        Dr. Somang Nam
                                      </a>{" "}
                                      and{" "}
                                      <a href="https://nrc.canada.ca/en/corporate/contact-us/nrc-directory-science-professionals/jennifer-veitch">
                                        Dr. Jennifer A. Veitch
                                      </a>{" "}
                                      at the National Research Council of Canada
                                      – Construction Research Centre, in
                                      collaboration with Dr. Spitschan.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-3"
                                    className="collapsed"
                                  >
                                    <span>1-3</span> Citing
                                  </a>
                                  <div
                                    id="accordion-list-1-3"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p>
                                      If you use luox for calculations, please
                                      cite the following (APA format):
                                    </p>
                                    <p>Software:</p>
                                    <p className="about-us-detail">
                                      <strong>
                                        Spitschan, M., Nam, S., & Veitch, J. A.
                                        (2022). luox: Platform for calculating
                                        quantities related to light and lighting
                                        [Software]. Available from{" "}
                                        <a href="https://luox.app/">
                                          <strong>https://luox.app/</strong>
                                        </a>
                                        .
                                      </strong>
                                    </p>
                                    <p>Companion paper:</p>
                                    <p>
                                      <strong>
                                        Spitschan, M., Mead, J., Roos, C.,
                                        Lowis, C., Griffiths, B., Mucur, P.,
                                        Herf, M., Nam, S., & Veitch, J. A.
                                        (2022). luox: novel validated
                                        open-access and open-source web platform
                                        for calculating and sharing
                                        physiologically relevant quantities for
                                        light and lighting. Wellcome Open Res,
                                        6, 69.
                                        doi:10.12688/wellcomeopenres.16595.3
                                      </strong>
                                    </p>
                                    <p>For citing the source code:</p>
                                    <p className="about-us-detail">
                                      <strong>
                                        Spitschan, M., Nam, S., & Veitch, J. A.
                                        (2022). luox: Platform for calculating
                                        quantities related to light and lighting
                                        [Source code]. Available from{" "}
                                        <a href="https://github.com/luox-app/luox">
                                          <strong>
                                            https://github.com/luox-app/luox
                                          </strong>
                                        </a>
                                        .
                                      </strong>
                                    </p>
                                    <p>
                                      When reporting quantities related to CIE S
                                      026, we also recommend citing the
                                      standard:
                                    </p>
                                    <p className="about-us-detail">
                                      <strong>
                                        CIE (2018). CIE S 026/E:2018: CIE System
                                        for Metrology of Optical Radiation for
                                        ipRGC-Influenced Responses to Light.
                                        Vienna: CIE Central Bureau. DOI:{" "}
                                        <a href="https://doi.org/10.25039/S026.2018">
                                          <strong>10.25039/S026.2018</strong>
                                        </a>
                                        .
                                      </strong>
                                    </p>
                                    <p>
                                      When citing other outputs from this
                                      software, we recommend citing the
                                      appropriate documents, listed below.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-4"
                                    className="collapsed"
                                  >
                                    <span>1-4</span> Support
                                  </a>
                                  <div
                                    id="accordion-list-1-4"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p className="about-us-detail">
                                      For any support-related questions, please
                                      email{" "}
                                      <a href="mailto:luox-support@tuebingen.mpg.de">
                                        luox-support@tuebingen.mpg.de
                                      </a>
                                      . Please be as specific as possible in
                                      your request.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-5"
                                    className="collapsed"
                                  >
                                    <span>1-5</span> Bug reports and feature
                                    requests
                                  </a>
                                  <div
                                    id="accordion-list-1-5"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p className="about-us-detail">
                                      To report bugs and suggest new features,
                                      please raise an issue on the
                                      project&apos;s{" "}
                                      <a href="https://github.com/luox-app/luox/issues/new">
                                        GitHub page
                                      </a>
                                      . When reporting a bug or any other issue,
                                      you need to be as specific as possible:
                                      <ul>
                                        <li>
                                          Include concrete and specific steps to
                                          reproduce your problem, including any
                                          files that pose an issue
                                        </li>
                                        <li>
                                          If the problem only occurs
                                          occasionally but is reproducible,
                                          please include any additional
                                          contextual information
                                        </li>
                                        <li>
                                          If the problem is not reproducible, it
                                          may not be useful to submit a bug
                                          report
                                        </li>
                                      </ul>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-6"
                                    className="collapsed"
                                  >
                                    <span>1-6</span> Funding
                                  </a>
                                  <div
                                    id="accordion-list-1-6"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p>
                                      Funding to develop luox was provided by:
                                    </p>
                                    <p className="about-us-detail">
                                      <ul>
                                        <li>
                                          <a href="https://wellcome.org/">
                                            Wellcome Trust
                                          </a>{" "}
                                          (Research Enrichment – Open Research,
                                          204686/Z/16/C);
                                        </li>
                                        <li>
                                          <a href="https://www.cibse.org/society-of-light-and-lighting">
                                            Society of Light & Lighting
                                          </a>{" "}
                                          (2020 Jean Heap Bursary);
                                        </li>
                                        <li>
                                          <a href="https://governance.admin.ox.ac.uk/van-houten-fund">
                                            van Houten Fund
                                          </a>{" "}
                                          of the{" "}
                                          <a href="https://www.ox.ac.uk/">
                                            University of Oxford
                                          </a>{" "}
                                          (VH-148).
                                        </li>
                                      </ul>
                                    </p>
                                    <p className="about-us-detail">
                                      The development of the module for loading
                                      SPDX files was supported by the{" "}
                                      <a href="https://www.ies.org/">
                                        Illumating Engineering Society (IES)
                                      </a>
                                      .
                                    </p>
                                    <p className="about-us-detail">
                                      During development of the platform, Dr
                                      Manuel Spitschan was supported by a Sir
                                      Henry Wellcome Postdoctoral Fellowship (
                                      <a href="https://wellcome.org/">
                                        Wellcome Trust
                                      </a>
                                      , 204686/Z/16/Z) and{" "}
                                      <a href="https://www.linacre.ox.ac.uk/">
                                        Linacre College
                                      </a>
                                      , University of Oxford (Biomedical
                                      Sciences Junior Research Fellowship).
                                    </p>
                                    <p className="about-us-detail">
                                      The module for calculating CIE colour
                                      indices (Duv, Tcp, Ra, and Rf ), the power
                                      user mode, and the optional IES TM-30-20
                                      indices and graphics was developed at the{" "}
                                      <a href="https://nrc.canada.ca/en/">
                                        National Research Council of Canada,
                                        Construction Research Centre
                                      </a>
                                      , as a strategic research activity.
                                    </p>
                                    <p className="about-us-detail">
                                      Deployment on{" "}
                                      <a href="https://www.netlify.com/">
                                        Netlify
                                      </a>{" "}
                                      is supported by the{" "}
                                      <a href="https://www.netlify.com/legal/open-source-policy/">
                                        Netlify Open Source Plan
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-7"
                                    className="collapsed"
                                  >
                                    <span>1-7</span> Contributing code of
                                    conduct
                                  </a>
                                  <div
                                    id="accordion-list-1-7"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p className="about-us-detail">
                                      We welcome contributions. To contribute
                                      code, please{" "}
                                      <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork">
                                        create a fork and issue a pull request
                                        on GitHub
                                      </a>
                                      .
                                    </p>
                                    <div className="section-title mt-3 pb-0">
                                      <h4>
                                        Contributor Covenant Code of Conduct
                                      </h4>
                                    </div>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Our Pledge</h5>
                                    </div>
                                    <p>
                                      We as members, contributors, and leaders
                                      pledge to make participation in our
                                      community a harassment-free experience for
                                      everyone, regardless of age, body size,
                                      visible or invisible disability,
                                      ethnicity, sex characteristics, gender
                                      identity and expression, level of
                                      experience, education, socio-economic
                                      status, nationality, personal appearance,
                                      race, caste, color, religion, or sexual
                                      identity and orientation.
                                    </p>
                                    <p>
                                      We pledge to act and interact in ways that
                                      contribute to an open, welcoming, diverse,
                                      inclusive, and healthy community.
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Our Standards</h5>
                                    </div>
                                    <p className="about-us-detail">
                                      Examples of behavior that contributes to a
                                      positive environment for our community
                                      include:
                                      <ul>
                                        <li>
                                          Demonstrating empathy and kindness
                                          toward other people
                                        </li>
                                        <li>
                                          Being respectful of differing
                                          opinions, viewpoints, and experiences
                                        </li>
                                        <li>
                                          Giving and gracefully accepting
                                          constructive feedback
                                        </li>
                                        <li>
                                          Accepting responsibility and
                                          apologizing to those affected by our
                                          mistakes, and learning from the
                                          experience
                                        </li>
                                        <li>
                                          Focusing on what is best not just for
                                          us as individuals, but for the overall
                                          community
                                        </li>
                                      </ul>
                                    </p>
                                    <p className="about-us-detail">
                                      Examples of unacceptable behavior include:
                                      <ul>
                                        <li>
                                          The use of sexualized language or
                                          imagery, and sexual attention or
                                          advances of any kind
                                        </li>
                                        <li>
                                          Trolling, insulting or derogatory
                                          comments, and personal or political
                                          attacks
                                        </li>
                                        <li>Public or private harassment</li>
                                        <li>
                                          Publishing others&apos; private
                                          information, such as a physical or
                                          email address, without their explicit
                                          permission
                                        </li>
                                        <li>
                                          Other conduct which could reasonably
                                          be considered inappropriate in a
                                          professional setting
                                        </li>
                                      </ul>
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Enforcement Responsibilities</h5>
                                    </div>
                                    <p>
                                      Community leaders are responsible for
                                      clarifying and enforcing our standards of
                                      acceptable behavior and will take
                                      appropriate and fair corrective action in
                                      response to any behavior that they deem
                                      inappropriate, threatening, offensive, or
                                      harmful.
                                    </p>
                                    <p>
                                      Community leaders have the right and
                                      responsibility to remove, edit, or reject
                                      comments, commits, code, wiki edits,
                                      issues, and other contributions that are
                                      not aligned to this Code of Conduct, and
                                      will communicate reasons for moderation
                                      decisions when appropriate.
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Scope</h5>
                                    </div>
                                    <p>
                                      This Code of Conduct applies within all
                                      community spaces, and also applies when an
                                      individual is officially representing the
                                      community in public spaces. Examples of
                                      representing our community include using
                                      an official e-mail address, posting via an
                                      official social media account, or acting
                                      as an appointed representative at an
                                      online or offline event.
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Enforcement</h5>
                                    </div>
                                    <p className="about-us-detail">
                                      Instances of abusive, harassing, or
                                      otherwise unacceptable behavior may be
                                      reported to the community leaders
                                      responsible for enforcement via email at{" "}
                                      <a href="mailto:manuel.spitschan@tum.de">
                                        manuel.spitschan@tum.de
                                      </a>
                                      . All complaints will be reviewed and
                                      investigated promptly and fairly.
                                    </p>
                                    <p>
                                      All community leaders are obligated to
                                      respect the privacy and security of the
                                      reporter of any incident.
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Enforcement Guidelines</h5>
                                    </div>
                                    <p>
                                      Community leaders will follow these
                                      Community Impact Guidelines in determining
                                      the consequences for any action they deem
                                      in violation of this Code of Conduct:
                                    </p>
                                    <h6>1. Correction</h6>
                                    <p>
                                      <strong>Community Impact:</strong> Use of
                                      inappropriate language or other behavior
                                      deemed unprofessional or unwelcome in the
                                      community.
                                    </p>
                                    <p>
                                      <strong>Consequence:</strong> A private,
                                      written warning from community leaders,
                                      providing clarity around the nature of the
                                      violation and an explanation of why the
                                      behavior was inappropriate. A public
                                      apology may be requested.
                                    </p>
                                    <h6>2. Warning</h6>
                                    <p>
                                      <strong>Community Impact:</strong> A
                                      violation through a single incident or
                                      series of actions.
                                    </p>
                                    <p>
                                      <strong>Consequence:</strong> A warning
                                      with consequences for continued behavior.
                                      No interaction with the people involved,
                                      including unsolicited interaction with
                                      those enforcing the Code of Conduct, for a
                                      specified period of time. This includes
                                      avoiding interactions in community spaces
                                      as well as external channels like social
                                      media. Violating these terms may lead to a
                                      temporary or permanent ban.
                                    </p>
                                    <h6>3. Temporary Ban</h6>
                                    <p>
                                      <strong>Community Impact:</strong> A
                                      serious violation of community standards,
                                      including sustained inappropriate
                                      behavior.
                                    </p>
                                    <p>
                                      <strong>Consequence:</strong> A temporary
                                      ban from any sort of interaction or public
                                      communication with the community for a
                                      specified period of time. No public or
                                      private interaction with the people
                                      involved, including unsolicited
                                      interaction with those enforcing the Code
                                      of Conduct, is allowed during this period.
                                      Violating these terms may lead to a
                                      permanent ban.
                                    </p>
                                    <h6>4. Permanent Ban</h6>
                                    <p>
                                      <strong>Community Impact:</strong>{" "}
                                      Demonstrating a pattern of violation of
                                      community standards, including sustained
                                      inappropriate behavior, harassment of an
                                      individual, or aggression toward or
                                      disparagement of classes of individuals.
                                    </p>
                                    <p>
                                      <strong>Consequence:</strong> A permanent
                                      ban from any sort of public interaction
                                      withi the community.
                                    </p>
                                    <div className="section-title pb-0 mt-3">
                                      <h5>Attribution</h5>
                                    </div>
                                    <p className="about-us-detail">
                                      This Code of Conduct is adapted from the{" "}
                                      <a href="https://www.contributor-covenant.org/version/2/0/code_of_conduct/">
                                        Contributor Covenant version 2.0
                                      </a>
                                      .
                                    </p>
                                    <p className="about-us-detail">
                                      Community Impact Guidelines were inspired
                                      by{" "}
                                      <a href="https://github.com/mozilla/inclusion/blob/master/code-of-conduct-enforcement/consequence-ladder.md">
                                        Mozilla&apos;s code of conduct
                                        enforcement ladder
                                      </a>
                                      .
                                    </p>
                                    <p className="about-us-detail">
                                      For answers to common questions about this
                                      code of conduct, see{" "}
                                      <a href="https://www.contributor-covenant.org/faq/">
                                        {" "}
                                        the FAQ
                                      </a>
                                      .{" "}
                                      <a href="https://www.contributor-covenant.org/translations/">
                                        Translations are available
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-2"
                        className="collapsed"
                      >
                        <span>2</span> Usage
                      </a>
                      <div
                        id="accordion-list-2"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <div className="row">
                          <div className="col-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                            <div className="accordion-list-sub accordion-list-sub-2">
                              <ul>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-2-1"
                                  >
                                    <span>2-1</span> Quick start
                                  </a>
                                  <div
                                    id="accordion-list-2-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-2"
                                  >
                                    <p>
                                      We provide a documented wizard for
                                      uploading your files to the platform.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-2-2"
                                  >
                                    <span>2-2</span> Sharing spectra and
                                    calculations using sharing URL
                                  </a>
                                  <div
                                    id="accordion-list-2-2"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-2"
                                  >
                                    <p className="about-us-detail">
                                      Spectra and calculations within the luox
                                      platform can be shared using an URL that
                                      directly encodes the uploaded
                                      spectrum/spectra using Michael Herf&apos;s{" "}
                                      <a href="https://github.com/herf/spdurl">
                                        spdurl
                                      </a>{" "}
                                      package. The sharing URL will open a
                                      view-only version of the platform. To copy
                                      the sharing URL, scroll down to the bottom
                                      of the page. Before sharing the URL,
                                      please double-check that it opens
                                      spectrum/spectra as expected.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-2-3"
                                  >
                                    <span>2-3</span> Requesting DOI for sharing
                                    URL
                                  </a>
                                  <div
                                    id="accordion-list-2-3"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-2"
                                  >
                                    <p className="about-us-detail">
                                      We offer the option to request a digital
                                      object identifier (DOI) linked to the
                                      sharing URL. This DOI has to be requested
                                      manually and the request will be vetted
                                      manually. To request a DOI, please
                                      complete this{" "}
                                      <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=G96VzPWXk0-0uv5ouFLPkZQkeC9QuStHlpH3Nt-sDo1URExCVlBCNFdNWk02TDVVVFhYSkUyMUxETi4u">
                                        form
                                      </a>
                                      . The DOI will be generated by generating
                                      an entry for the sharing URL in the{" "}
                                      <a href="https://pure.mpg.de/">
                                        MPG.PuRE
                                      </a>{" "}
                                      and author information will be included in
                                      the record. All luox sharing URLs added to
                                      ORA will receive a unique luox number of
                                      the format (<code>YYYY-####</code>;{" "}
                                      <code>Y</code>=year). A running list of
                                      luox sharing URLs with associated DOIs is
                                      on this page, under{" "}
                                      <a
                                        href="#!"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#accordion-list-3"
                                        className="about-us-toggle-link"
                                      >
                                        Depositions
                                      </a>
                                      . Please note that deposition of the
                                      sharing URL into MPG.PuRE is permanent.
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-3"
                        className="collapsed"
                      >
                        <span>3</span> Deposition
                      </a>
                      <div
                        id="accordion-list-3"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <div className="row">
                          <div className="col-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                            <div className="accordion-list-sub accordion-list-sub-3">
                              <ul>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-3-1"
                                  >
                                    <span>3-1</span> List of depositions
                                  </a>
                                  <div
                                    id="accordion-list-3-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-3"
                                  >
                                    <p>
                                      The following is a list of depositions
                                      with assigned DOIs, up-to-date as of 1
                                      February 2022.
                                    </p>
                                    <div className="row mt-3 row-div table-row">
                                      <div className="col-md-12">
                                        <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                                          <thead>
                                            <tr>
                                              <th>Deposition ID</th>
                                              <th>Date</th>
                                              <th>DOI</th>
                                              <th>Depositor</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>luox-2021-0001</td>
                                              <td>23 January 2021</td>
                                              <td>TBD</td>
                                              <td>
                                                Manuel Spitschan, University of
                                                Oxford
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>luox-2021-0002</td>
                                              <td>18 February 2021</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.5287/bodleian:AeZAXN1km">
                                                  10.5287/bodleian:AeZAXN1km
                                                </a>
                                              </td>
                                              <td>
                                                Jan-Frieder Harmsen, Maastricht
                                                University
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>luox-2021-0003</td>
                                              <td>18 February 2021</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.5287/bodleian:dp7QEqYAm">
                                                  10.5287/bodleian:dp7QEqYAm
                                                </a>
                                              </td>
                                              <td>
                                                Jan-Frieder Harmsen, Maastricht
                                                University
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>luox-2021-0004</td>
                                              <td>18 February 2021</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.5287/bodleian:0ogQP5bb5">
                                                  10.5287/bodleian:0ogQP5bb5
                                                </a>
                                              </td>
                                              <td>
                                                Jamie Zeitzer, Renske Lok &
                                                Daniel Joyce, Stanford
                                                University
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>luox-2022-0001</td>
                                              <td>01 February 2022</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.17617/2.3364820">
                                                  10.17617/2.3364820
                                                </a>
                                              </td>
                                              <td>Boris Hanák, Spectrasol</td>
                                            </tr>
                                            <tr>
                                              <td>luox-2022-0002</td>
                                              <td>01 February 2022</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.17617/2.3364831">
                                                  10.17617/2.3364831
                                                </a>
                                              </td>
                                              <td>
                                                Jamie Zeitzer, Stanford
                                                University
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-4"
                        className="collapsed"
                      >
                        <span>4</span> Under the hood
                      </a>
                      <div
                        id="accordion-list-4"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <div className="row">
                          <div className="col-12 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                            <div className="accordion-list-sub accordion-list-sub-4">
                              <ul>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-1"
                                  >
                                    <span>4-1</span> Calculation definitions
                                  </a>
                                  <div
                                    id="accordion-list-4-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p className="about-us-detail">
                                      All default calculations performed here
                                      follow guidance from the{" "}
                                      <a href="https://cie.co.at/">
                                        International Commission on Illumination
                                        (CIE)
                                      </a>
                                      .
                                    </p>
                                    <p>
                                      Indices that are undefined for a given
                                      test spectrum return a value of N/A. For
                                      example, colour rendering and colour
                                      fidelity are defined only when |D
                                      <sub>uv</sub>| {"<"} 0.05.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-2"
                                  >
                                    <span>4-2</span> Precision and decimal
                                    points
                                  </a>
                                  <div
                                    id="accordion-list-4-2"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p>
                                      All calculations are computed with
                                      double-precision floating point numbers
                                      using JavaScript. In the browser, the
                                      results are displayed up to four decimals
                                      for all quantities (including those in
                                      Advanced mode). When downloading
                                      calculations, the precision will be higher
                                      than displayed in the browser. The
                                      possible ranges of numbers which can be
                                      represented under the double precision
                                      will then be limited to approximately 16
                                      decimal places of precision. The
                                      calculations in <em>_luox_</em> follow the
                                      published documents strictly, including
                                      any guidance concerning rounding at
                                      intermediate stages. This can introduce
                                      what appear to be rounding errors when
                                      compared to other calculation tools. In
                                      order to mitigate this issue and to
                                      maximise transparency, <em>_luox_</em>{" "}
                                      provides an option to display all
                                      intermediate values in the calculation, in
                                      which can be useful to track down errors.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-3"
                                  >
                                    <span>4-3</span> Effect functions and action
                                    spectra
                                  </a>
                                  <div
                                    id="accordion-list-4-3"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <div className="row mt-3 row-div table-row">
                                      <div className="col-md-12">
                                        <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                                          <thead>
                                            <tr>
                                              <th>Name</th>
                                              <th>Source document</th>
                                              <th>
                                                Wavelength spacing/range [nm]
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>CIE 1931 xy (2°)</td>
                                              <td className="about-us-detail">
                                                <a href="https://cie.co.at/publications/colorimetry-part-1-cie-standard-colorimetric-observers-0">
                                                  ISO/CIE 11664-1:2019
                                                </a>
                                                , Table 1 (p. 10-21)
                                              </td>
                                              <td>1 / 360-830</td>
                                            </tr>
                                            <tr>
                                              <td>CIE 1964 xy (10°)</td>
                                              <td className="about-us-detail">
                                                <a href="https://cie.co.at/publications/colorimetry-part-1-cie-standard-colorimetric-observers-0">
                                                  ISO/CIE 11664-1:2019
                                                </a>
                                                , Table 2 (p. 22-32)
                                              </td>
                                              <td>1 / 360-830</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                CIE S 026/E:2018 a-opic action
                                                spectra
                                              </td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/S026.2018">
                                                  CIE S 026/E:2018
                                                </a>
                                                , Table 2 (p. 12-21)
                                              </td>
                                              <td>1 / 380-780</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <p className="about-us-detail">
                                      Note: The CIE S 026/E:2018 a-opic action
                                      spectra are available in tabulated form
                                      from the{" "}
                                      <a href="http://files.cie.co.at/S026_Table2_Data.xlsx">
                                        CIE website
                                      </a>{" "}
                                      (
                                      <a href="http://web.archive.org/web/20210129094725/http://files.cie.co.at/S026_Table2_Data.xlsx">
                                        Internet Wayback Machine
                                      </a>
                                      ).
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-4"
                                  >
                                    <span>4-4</span> Illuminant data
                                  </a>
                                  <div
                                    id="accordion-list-4-4"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <div className="row mt-3 row-div table-row">
                                      <div className="col-md-12">
                                        <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                                          <thead>
                                            <tr>
                                              <th>Name</th>
                                              <th>Source document</th>
                                              <th>
                                                Wavelength spacing/range [nm]
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>Standard illuminant A</td>
                                              <td className="about-us-detail">
                                                <a href="http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0">
                                                  ISO 11664-2:2007/CIE S
                                                  014-2:2006
                                                </a>
                                                , Table 1 (p. 7-12)
                                              </td>
                                              <td>1 / 300-830</td>
                                            </tr>
                                            <tr>
                                              <td>Standard illuminant D65</td>
                                              <td className="about-us-detail">
                                                <a href="http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0">
                                                  ISO 11664-2:2007/CIE S
                                                  014-2:2006
                                                </a>
                                                , Table 1 (p. 7-12)
                                              </td>
                                              <td>1 / 300-830</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminant C</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 5 (p. 51-53)
                                              </td>
                                              <td>5 / 300-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminant D50</td>
                                              <td className="about-us-detail">
                                                <a href="http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0">
                                                  ISO/CIE 11664-2:2022(E)
                                                </a>
                                                , Table A.1 (p. 8-14)
                                              </td>
                                              <td>1 / 300-830</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminant D75</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 5 (p. 51-53)
                                              </td>
                                              <td>5 / 300-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminants F1-F12</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 10.1 (p. 59-60)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminants FL3.1-FL3.8</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 10.2 (p. 61-62)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminants FL3.9-FL3.15</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 10.3 (p. 63-64)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminants HP1-HP5</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 11 (p. 65-66)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                            <tr>
                                              <td>Illuminants LED-B1-LED-B5</td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 12.1 (p. 67-68)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                Illuminants LED-BH1, LED-RGB1,
                                                LED-V1, LED-V2
                                              </td>
                                              <td className="about-us-detail">
                                                <a href="https://doi.org/10.25039/TR.015.2018">
                                                  CIE 015:2018
                                                </a>
                                                , Table 12.2 (p. 69-70)
                                              </td>
                                              <td>5 / 380-780</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-5"
                                  >
                                    <span>4-5</span> References to official
                                    documents
                                  </a>
                                  <div
                                    id="accordion-list-4-5"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p className="about-us-detail">
                                      <ul>
                                        <li>
                                          <a href="http://cie.co.at/publications/cie-2017-colour-fidelity-index-accurate-scientific-use">
                                            CIE 224:2017: CIE 2017 Colour
                                            Fidelity Index for accurate
                                            scientific use
                                          </a>
                                        </li>
                                        <li>
                                          <a href="http://cie.co.at/publications/colorimetry-4th-edition">
                                            CIE 015:2018: Colorimetry, 4th
                                            Edition
                                          </a>
                                          , DOI:{" "}
                                          <a href="https://doi.org/10.25039/TR.015.2018">
                                            10.25039/TR.015.2018
                                          </a>
                                        </li>
                                        <li>
                                          <a href="http://cie.co.at/publications/colorimetry-part-2-cie-standard-illuminants-0">
                                            ISO 11664-2:2007/CIE S 014-2:2006:
                                            Colorimetry — Part 2: CIE Standard
                                            Illuminants
                                          </a>
                                        </li>
                                        <li>
                                          <a href="http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0">
                                            CIE S 026/E:2018: CIE System for
                                            Metrology of Optical Radiation for
                                            ipRGC-Influenced Responses to Light
                                          </a>
                                          , DOI:{" "}
                                          <a href="https://doi.org/10.25039/S026.2018">
                                            10.25039/S026.2018
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://cie.co.at/publications/method-measuring-and-specifying-colour-rendering-properties-light-sources">
                                            CIE 13.3-1995 : Method of measuring
                                            and specifying colour rendering
                                            properties of light sources
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://store.ies.org/product/tm-30-20-ies-method-for-evaluating-light-source-color-rendition/">
                                            IES TM-30-20: IES method for
                                            evaluating light source color
                                            rendition
                                          </a>
                                        </li>
                                      </ul>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-6"
                                  >
                                    <span>4-6</span> Implementation specifics
                                  </a>
                                  <div
                                    id="accordion-list-4-6"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p>
                                      While calculation procedures are
                                      structurally well-defined by the CIE,
                                      there are a few ambiguities that may arise
                                      when implementing it. This includes the
                                      choice of specific and exchangeable
                                      algorithms (e.g. for the calculation of
                                      CCT), and the decimal points of specific
                                      constants. The specific choices are
                                      described here:
                                    </p>
                                    <div className="row mt-3 row-div table-row">
                                      <div className="col-md-12">
                                        <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                                          <thead>
                                            <tr>
                                              <th>Aspect</th>
                                              <th>Quantity</th>
                                              <th>
                                                Method or quantity used in luox
                                              </th>
                                              <th>Description</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                Constant for absolute
                                                (il)luminance conversion
                                              </td>
                                              <td>
                                                Illuminance [lx] and Luminance
                                                [cd/m<sup>2</sup>]
                                              </td>
                                              <td>683.0015478 lm/W</td>
                                              <td className="about-us-detail">
                                                683 lm/W acceptable &quot;for
                                                all practical applications&quot;
                                                according to{" "}
                                                <a href="http://cie.co.at/publications/photometry-cie-system-physical-photometry">
                                                  ISO 23539:2005/CIE S 010:2004
                                                </a>
                                                , 683.0015478 lm/W exact value
                                                used in the{" "}
                                                <a href="https://doi.org/10.25039/S026.2018.TB">
                                                  CIE S 026 toolbox
                                                </a>
                                                ; usually rounded up to 683.002
                                                lm/W
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Rounding</td>
                                              <td>
                                                CIE colour rendering index R
                                                <sub>a</sub>
                                              </td>
                                              <td>
                                                Strict rounding after
                                                calculating subindices
                                              </td>
                                              <td className="about-us-detail">
                                                Following{" "}
                                                <a href="https://cie.co.at/publications/method-measuring-and-specifying-colour-rendering-properties-light-sources">
                                                  CIE 13.3-1995
                                                </a>
                                                , luox rounds to the nearest
                                                whole number after calculating
                                                the subindex for each of the
                                                special colour rendering
                                                indices, and then averages them
                                                to form the General Colour
                                                Rendering Index
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-7"
                                  >
                                    <span>4-7</span> Source code availability
                                    and license
                                  </a>
                                  <div
                                    id="accordion-list-4-7"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p className="about-us-detail">
                                      The source code is available on GitHub (
                                      <a href="https://github.com/luox-app/luox/">
                                        https://github.com/luox-app/luox/
                                      </a>
                                      ) under an MIT License.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-8"
                                  >
                                    <span>4-8</span> Validation
                                  </a>
                                  <div
                                    id="accordion-list-4-8"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p className="about-us-detail">
                                      The default output of luox (CIE quantities
                                      and indices) has been validated by the
                                      CIE. The validation report is available{" "}
                                      <a href="https://github.com/luox-app/luox/raw/master/docs/CIE_Software_Check_of_luox_app.pdf">
                                        here
                                      </a>
                                      .
                                    </p>
                                    <p>According to the CIE:</p>
                                    <p>
                                      This software incorporates methods,
                                      formulae, spectral function calculations
                                      and spectra from the International
                                      Commission on Illumination (CIE). The CIE
                                      endorses this software having made a
                                      black-box evaluation of the software as of
                                      Feb. 11, 2021, finding that the software
                                      performs satisfactorily to calculate
                                      quantities and indices derived from CIE
                                      publications. This software is not a
                                      replacement for the CIE publications and
                                      works from which it is derived. The user
                                      is advised to consult the original
                                      publications and works for proper
                                      understanding of and calculation of the
                                      result of this software.
                                    </p>
                                    <p>
                                      This software has been validated to load
                                      SPDX files according to TM-27-20.
                                    </p>
                                    <p>
                                      This software offers optional calculation
                                      of indices from IES TM-30-20. These
                                      optional calculations have not been
                                      validated.
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    className="collapsed"
                                    data-bs-target="#accordion-list-4-9"
                                  >
                                    <span>4-9</span> Alternatives
                                  </a>
                                  <div
                                    id="accordion-list-4-9"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p className="about-us-detail">
                                      The CIE has released a toolbox (DOI:{" "}
                                      <a href="https://doi.org/10.25039/S026.2018.TB">
                                        10.25039/S026.2018.TB
                                      </a>
                                      ) and user guide (DOI:{" "}
                                      <a href="https://doi.org/10.25039/S026.2018.UG">
                                        10.25039/S026.2018.UG
                                      </a>
                                      ) or calculations of quantities specified
                                      in{" "}
                                      <a href="http://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0">
                                        CIE S 026/E:2018: CIE System for
                                        Metrology of Optical Radiation for
                                        ipRGC-Influenced Responses to Light
                                      </a>{" "}
                                      (DOI:{" "}
                                      <a href="https://doi.org/10.25039/S026.2018">
                                        10.25039/S026.2018
                                      </a>
                                      ). The Excel spreadsheet-based toolbox is
                                      freely available and is supplementary to
                                      the luox platform.
                                    </p>
                                    <p className="about-us-detail">
                                      An Excel spreadsheet tool for calculating
                                      the CIE Colour Fidelity Index (Rf) is
                                      available as a companion to{" "}
                                      <a href="https://cie.co.at/publications/cie-2017-colour-fidelity-index-accurate-scientific-use">
                                        {" "}
                                        CIE 224:2017 CIE 2017 Colour Fidelity
                                        Index for accurate scientific use
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-5"
                        className="collapsed"
                      >
                        <span>5</span> Acknowledgements
                      </a>
                      <div
                        id="accordion-list-5"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>
                          The following individuals tested and provided feedback
                          on an early version of the platform: Paul
                          O&apos;Mahoney, Tos Berendschot, Isabel Schöllhorn,
                          Christine Blume, Katharina Wulff, Kinjiro Amano, Tony
                          Esposito, Minchen Tommy Wei, Suzanne Ftouni, Paula M.
                          Esquivias, Gayline Manalang Jr., Daniel Garside,
                          Joachim Stormly Hansen, and Hao Xie.
                        </p>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-6"
                        className="collapsed"
                      >
                        <span>6</span> Terms and conditions of website use
                      </a>
                      <div
                        id="accordion-list-6"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <div className="section-title pb-0 mt-3">
                          <h5>What&apos;s in these terms?</h5>
                        </div>
                        <p className="about-us-detail">
                          These terms tell you the rules for using our website{" "}
                          <a href="https://luox.app/">https://luox.app/</a> (our
                          site).
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>Who we are and how to contact us</h5>
                        </div>
                        <p className="about-us-detail">
                          Our site operated by the joint research group
                          Chronobiology & Health at the Technical University of
                          Munich and Translational Sensory and Circadian
                          Neuroscience at the Max Planck Institute for
                          Biological Cybernetics (Prof. Dr. Manuel Spitschan).
                          To contact us, please email{" "}
                          <a href="mailto:manuel.spitschan@tum.de">
                            manuel.spitschan@tum.de
                          </a>
                          .
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>By using our site you accept these terms</h5>
                        </div>
                        <p>
                          By using our site, you confirm that you accept these
                          terms of use and that you agree to comply with them.
                        </p>
                        <p>
                          If you do not agree to these terms, you must not use
                          our site.
                        </p>
                        <p>
                          We recommend that you print a copy of these terms for
                          future reference.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>We may make changes to these terms</h5>
                        </div>
                        <p>
                          We amend these terms from time to time. Every time you
                          wish to use our site, please check these terms to
                          ensure you understand the terms that apply at that
                          time.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>We may make changes to our site</h5>
                        </div>
                        <p>
                          We may update and change our site from time to time to
                          ensure it is up to date.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>We may suspend or withdraw our site</h5>
                        </div>
                        <p>Our site is made available free of charge.</p>
                        <p>
                          We do not guarantee that our site, or any content on
                          it, will always be available or be uninterrupted. We
                          may suspend or withdraw or restrict the availability
                          of all or any part of our site for business and
                          operational reasons. We will try to give you
                          reasonable notice of any suspension or withdrawal.
                        </p>
                        <p>
                          You are also responsible for ensuring that all persons
                          who access our site through your internet connection
                          are aware of these terms of use and other applicable
                          terms and conditions, and that they comply with them.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>How you may use material on our site</h5>
                        </div>
                        <p>
                          The contents of our site are owned by us or, where
                          content has been provided by third parties, by those
                          third parties. The copyright in the material contained
                          on our site belongs to us or our licensors. It is your
                          responsibility to seek appropriate consent to re-use
                          any contents of our site.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>Do not rely on information on this site</h5>
                        </div>
                        <p>
                          The content on our site is provided for general
                          information only and is not intended to amount to
                          advice on which you should rely. You must obtain
                          professional or specialist advice before taking, or
                          refraining from, any action on the basis of the
                          content on our site.
                        </p>
                        <p>
                          Although we make reasonable efforts to update the
                          information on our site, we make no representations,
                          warranties or guarantees, whether express or implied,
                          that the content on our site is accurate, complete or
                          up to date.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>
                            We are not responsible for websites we link to or
                            third party information
                          </h5>
                        </div>
                        <p>
                          Where our site contains links to other sites and
                          resources provided by third parties, these links and
                          resources are provided for your information only. Such
                          links should not be interpreted as approval by us of
                          those linked websites or information you may obtain
                          from them.
                        </p>
                        <p>
                          We have no control over the contents of those sites or
                          resources.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>User-generated content is not approved by us</h5>
                        </div>
                        <p>
                          This website may include information and materials
                          uploaded by other users of the site. This information
                          and these materials have not been verified or approved
                          by us. The views expressed by other users on our site
                          do not represent our views or values.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>
                            Our responsibility for loss or damage suffered by
                            you
                          </h5>
                        </div>
                        <p>
                          To the extent permitted in law, we accept no liability
                          for any loss or damage which may be suffered by you or
                          by other parties as a direct or indirect result of
                          using our site (including loss of profit, loss of
                          opportunity, loss of business, and consequential
                          loss).
                        </p>
                        <p>
                          We are not responsible for viruses and you must not
                          introduce them.
                        </p>
                        <p>
                          We do not guarantee that our site will be secure or
                          free from bugs or viruses.
                        </p>
                        <p>
                          You are responsible for configuring your information
                          technology, computer programmes and platform to access
                          our site. You should use your own virus protection
                          software.
                        </p>
                        <p>
                          You must not misuse our site by knowingly introducing
                          viruses, trojans, worms, logic bombs or other material
                          that is malicious or technologically harmful. You must
                          not attempt to gain unauthorised access to our site,
                          the server on which our site is stored or any server,
                          computer or database connected to our site. You must
                          not attack our site via a denial-of-service attack or
                          a distributed denial-of service attack. By breaching
                          this provision, you would commit a criminal offence
                          under the Computer Misuse Act 1990. We will report any
                          such breach to the relevant law enforcement
                          authorities and we will co-operate with those
                          authorities by disclosing your identity to them. In
                          the event of such a breach, your right to use our site
                          will cease immediately.
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>Rules about linking to our site</h5>
                        </div>
                        <p>
                          You may link to our home page, provided you do so in a
                          way that is fair and legal and does not damage our
                          reputation or take advantage of it.
                        </p>
                        <p>
                          You must not establish a link in such a way as to
                          suggest any form of association, approval or
                          endorsement on our part where none exists.
                        </p>
                        <p>
                          You must not establish a link to our site in any
                          website that is not owned by you.
                        </p>
                        <p>
                          Our site must not be framed on any other site, nor may
                          you create a link to any part of our site other than
                          the home page.
                        </p>
                        <p>
                          We reserve the right to withdraw linking permission
                          without notice.
                        </p>
                        <p className="about-us-detail">
                          If you wish to link to or make any use of content on
                          our site other than that set out above, please contact{" "}
                          <a href="mailto:manuel.spitschan@tum.de">
                            manuel.spitschan@tum.de
                          </a>
                          .
                        </p>
                        <div className="section-title pb-0 mt-3">
                          <h5>
                            Which country&apos;s laws apply to any disputes?
                          </h5>
                        </div>
                        <p>
                          These terms of use, their subject matter and their
                          formation (and any non-contractual disputes or claims)
                          are governed by German law.
                        </p>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-7"
                        className="collapsed"
                      >
                        <span>7</span> Version information
                      </a>
                      <div
                        id="accordion-list-7"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p className="about-us-detail">
                          <ul>
                            <li>Latest tag: wellcome-open-research</li>
                            <li>
                              Latest commit SHA:
                              fe38483db011a577d645853be9f8ae371f952297
                            </li>
                          </ul>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="row mt-3">
        <div className="col-12">
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-3">
              <a href="https://www.sg.tum.de/en/chronobiology/home/">
                <img
                  src={tumLogo}
                  width="100%"
                  className="align-middle"
                  alt="Technical University of Munich logo"
                />
              </a>
            </div>
            <div className="col-3">
              <a href="https://www.kyb.tuebingen.mpg.de/614159/translational-sensory-and-circadian-neuroscience">
                <img
                  src={mpiLogo}
                  width="125%"
                  className="align-middle"
                  alt="Max Planck Institute for Biological Cybernetics logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="row">
        <div className="col-12">
          <h1 className="my-5">About this application</h1>
          {ReactHtmlParser(html)}
          <h2 id="version-information">Version information</h2>
          <ul>
            <li>Latest tag: {version.latestTag}</li>
            <li>Latest commit SHA: {version.latestCommitSha}</li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default About;
