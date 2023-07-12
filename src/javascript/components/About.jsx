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
                          width="125%"
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
                                {/* <li>
                                  <a
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-4"
                                    className="collapsed"
                                  >
                                    <span>1-4</span> Announcements
                                  </a>
                                  <div
                                    id="accordion-list-1-4"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-1"
                                  >
                                    <p>
                                      Eleifend mi in nulla posuere sollicitudin
                                      aliquam ultrices sagittis orci. Faucibus
                                      pulvinar elementum integer enim. Sem nulla
                                      pharetra diam sit amet nisl suscipit.
                                      Rutrum tellus pellentesque eu tincidunt.
                                      Lectus urna duis convallis convallis
                                      tellus. Urna molestie at elementum eu
                                      facilisis sed odio morbi quis
                                    </p>
                                  </div>
                                </li> */}
                                <li>
                                  <a
                                    href="#!"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-list-1-5"
                                    className="collapsed"
                                  >
                                    <span>1-5</span> Support
                                  </a>
                                  <div
                                    id="accordion-list-1-5"
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
                                    data-bs-target="#accordion-list-1-6"
                                    className="collapsed"
                                  >
                                    <span>1-6</span> Bug reports and feature
                                    requests
                                  </a>
                                  <div
                                    id="accordion-list-1-6"
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
                                    data-bs-target="#accordion-list-1-7"
                                    className="collapsed"
                                  >
                                    <span>1-7</span> Funding
                                  </a>
                                  <div
                                    id="accordion-list-1-7"
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
                                    data-bs-target="#accordion-list-1-8"
                                    className="collapsed"
                                  >
                                    <span>1-8</span> Contributing code of
                                    conduct
                                  </a>
                                  <div
                                    id="accordion-list-1-8"
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
                        <span>02</span> Usage
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
                                    <span>01</span> About urna duis?
                                  </a>
                                  <div
                                    id="accordion-list-2-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-2"
                                  >
                                    <p>
                                      Feugiat pretium nibh ipsum consequat.
                                      Tempus iaculis urna id volutpat lacus
                                      laoreet non curabitur gravida. Venenatis
                                      lectus magna fringilla urna porttitor
                                      rhoncus dolor purus non.
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
                        <span>03</span> Deposition
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
                                    <span>01</span> About urna duis?
                                  </a>
                                  <div
                                    id="accordion-list-3-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-3"
                                  >
                                    <p>
                                      Feugiat pretium nibh ipsum consequat.
                                      Tempus iaculis urna id volutpat lacus
                                      laoreet non curabitur gravida. Venenatis
                                      lectus magna fringilla urna porttitor
                                      rhoncus dolor purus non.
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
                        data-bs-target="#accordion-list-4"
                        className="collapsed"
                      >
                        <span>04</span> Under the hood
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
                                    <span>01</span> About urna duis?
                                  </a>
                                  <div
                                    id="accordion-list-4-1"
                                    className="collapse"
                                    data-bs-parent=".accordion-list-sub-4"
                                  >
                                    <p>
                                      Feugiat pretium nibh ipsum consequat.
                                      Tempus iaculis urna id volutpat lacus
                                      laoreet non curabitur gravida. Venenatis
                                      lectus magna fringilla urna porttitor
                                      rhoncus dolor purus non.
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
                        <span>05</span> Acknowledgements
                      </a>
                      <div
                        id="accordion-list-5"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>Test</p>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-6"
                        className="collapsed"
                      >
                        <span>06</span> Terms and conditions of website use
                      </a>
                      <div
                        id="accordion-list-6"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>Test</p>
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
