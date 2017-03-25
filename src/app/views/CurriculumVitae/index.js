import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

import config from 'app/config';
import { smoothScrollTo } from 'app/lib/scroll';
import { makeAbsoluteUrl, makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import profileImg from 'app/assets/images/profile.jpg';
import profileImg2x from 'app/assets/images/profile-2x.jpg';
import profileImg3x from 'app/assets/images/profile-3x.jpg';

import styles from './styles.styl';


const TITLE = 'Curriculum Vitæ';
const DESCRIPTION = [
  'The Résumé of Sydney-based student and developer, Nathan Hardy.',
  'I have previously worked on a variety of web applications and services used by millions of Australians.',
].join(' ');

export default class CurriculumVitae extends Component {
  scroll = (e) => {
    e.preventDefault();
    smoothScrollTo(Math.min(
      this._resume.offsetTop - document.querySelector('#siteHeader').offsetHeight,
      document.body.scrollHeight - window.innerHeight
    ));
  };

  render() {
    return (
      <DefaultLayout className={styles.root}>
        <Helmet>
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:title" content={makeTitle(TITLE)} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={makeAbsoluteUrl(profileImg3x)} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={config.twitter.handle} />
          <meta name="twitter:title" content={makeTitle(TITLE)} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content={makeAbsoluteUrl(profileImg3x)} />
        </Helmet>
        <h1 className={styles.heading}>Curriculum Vitæ</h1>
        <section className={styles.main}>
          <div className={styles.imageWrapper}>
            <img className={styles.profile} src={profileImg} srcSet={`${profileImg2x} 2x, ${profileImg3x} 3x`} alt="Profile" />
          </div>
          <div className={styles.overview}>
            <span className={styles.greeting}>Hello,&nbsp;</span>
            <span className={styles.meta}>this is my Curriculum Vitæ</span>
            <nav className={styles.nav}>
              <ul className={styles.links}>
                <li className={styles.link}><a href="#resume" onClick={this.scroll}>Résumé</a></li>
                <li className={styles.link}><Link to="/projects">Projects</Link></li>
                <li className={styles.link}><Link to="/contact">Contact Me</Link></li>
              </ul>
            </nav>
            <p>
              I&apos;m a
              {' '}
              <a
                href="https://www.uts.edu.au/future-students/information-technology/about-information-technology/bit-co-operative-scholarship"
                target="_blank"
                rel="noopener noreferrer">
                Bachelor of Information Technology
              </a>
              {' '}
              student at the
              {' '}
              <a href="https://www.uts.edu.au/" target="_blank" rel="noopener noreferrer">University of Technology, Sydney</a>
              {' '}
              with a passion for IT and computer science.
              I&apos;m currently interning at
              {' '}
              <a href="https://www.appliancesonline.com.au/" target="_blank" rel="noopener noreferrer">Appliances Online</a>
              {' '}
              and have previously interned and worked at
              {' '}
              <a href="http://www.nineentertainmentco.com.au/" target="_blank" rel="noopener noreferrer">Nine Digital</a>,
              {' '}
              working on the
              {' '}
              <a href="https://www.9now.com.au/">9Now</a>
              {' '}
              <abbr title="Video On Demand">VOD</abbr>
              {' '}
              website.
            </p>
            <p>
              A printer-friendly document with additional information is available upon request through the <Link to="/contact">contact form</Link>.
            </p>
          </div>
        </section>
        <article className={styles.resume}>
          <h2 id="resume" className={styles.subheading} ref={ref => (this._resume = ref)}>Résumé</h2>
          <section>
            <h3 className={styles.category}>Work History</h3>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Intern at Appliances Online</h4>
              <h5 className={styles.dates}>January 2017 ‐ July 2017</h5>
              <p className={styles.duties}>
                As part of my university degree, my third year placement is at Appliances Online.
                {' '}
                At Appliances Online, I am working on the website which makes use of .NET Storefront and Angular.
              </p>
            </div>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Developer at Mi9/Nine Digital</h4>
              <h5 className={styles.dates}>December 2015 ‐ December 2016</h5>
              <p className={styles.duties}>
                Upon completion of my internship, I was offered to continue with Mi9 (now Nine Digital)
                {' '}
                on the 9Now project -Channel 9&apos;s AVOD catch up and streaming platform.
                I worked with a variety of services that power 9Now.
                I gathered API requirements for 9Now's API, working with internal teams.
                I developed portions of the APIs that power 9Now Website and Apps and worked on the 9Now website,
                {' '}
                developing features through the agile process.
              </p>
            </div>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Intern at Mi9</h4>
              <h5 className={styles.dates}>July 2015 ‐ December 2015</h5>
              <p className={styles.duties}>
                As part of my university degree, I am required to complete two 6 month industry placements.
                {' '}
                Work at Mi9 consisted of both front and back end work for 9Jumpin and 9Now.
                {' '}
                Work on 9Jumpin consisted of business-as-usual tasks,
                {' '}
                as well as show experience builds for high-profile shows such as Channel 9&apos;s The Block.
                {' '}
                For a majority of my time working on 9Jumpin, I was the sole developer.
              </p>
            </div>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Recovery Presentation Associate at Big W Macquarie Centre</h4>
              <h5 className={styles.dates}>April 2015 ‐ September 2015</h5>
              <p className={styles.duties}>
                My role in the Macquarie Centre store consisted of store recovery and presentation duties.
              </p>
            </div>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Recovery Presentation Associate at Big W Ballina</h4>
              <h5 className={styles.dates}>December 2012 ‐ December 2014</h5>
              <p className={styles.duties}>
                My position involved a variety of tasks including nightfill, service duties, customer service,
                {' '}
                checkouts, customer championing, home entertainment and photolab work.
                {' '}
                In January of 2015 I relocated to Sydney for tertiary education,
                {' '}
                and applied for a transfer to the Macqaurie Centre store which was finalised in April 2015.
              </p>
            </div>
            <div className={styles.workplace}>
              <h4 className={styles.position}>Big W Retail Traineeship</h4>
              <h5 className={styles.dates}>September 2012 ‐ December 2012</h5>
              <p className={styles.duties}>
                I participated in a work experience program with Big W whilst at school which entailed one day per week (9 to 5) for six weeks.
                {' '}
                At the conclusion of this program I was offered paid employment, which I accepted.
              </p>
            </div>
          </section>
          <section>
            <h3 className={styles.category}>Education</h3>
            <div className={styles.institution}>
              <h4 className={styles.course}>Study Abroad at University of Otago, Dunedin, New Zealand</h4>
              <h5 className={styles.dates}>July 2017 - November 2017</h5>
              <p className={styles.outline}>
                For my final semester, I have applied to study abroad at the University of Otago.
                Here, I will study Computer Science electives and hopefully enjoy the freezing weather.
              </p>
            </div>
            <div className={styles.institution}>
              <h4 className={styles.course}>
                Bachelor of Information Technology (BIT) Co-operative Scholarship program
                {' '}
                at University of Technology, Sydney
              </h4>
              <h5 className={styles.dates}>2015 - 2017</h5>
              <p className={styles.outline}>
                I am currently studying a Bachelor of Information Technology with the
                {' '}
                <abbr title="University of Technology, Sydney">UTS</abbr>,
                {' '}
                expecting completion in November 2017 at the conclusion of my study abroad period.
                {' '}
                The Bachelor of Information Technology Co-operative Scholarship program involved two 6-month industry placements.
                {' '}

              </p>
            </div>
            <div className={styles.institution}>
              <h4 className={styles.course}>Higher School Certificate</h4>
              <h5 className={styles.dates}>2014</h5>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>English Standard</td><td>78</td></tr>
                  <tr><td>Mathematics</td><td><abbr title="Exempt">*</abbr></td></tr>
                  <tr><td>Mathematics Extension 1</td><td>84</td></tr>
                  <tr><td>Mathematics Extension 2</td><td>78</td></tr>
                  <tr><td>Physics</td><td>89</td></tr>
                  <tr><td>Chemistry</td><td>86</td></tr>
                  <tr><td>Software Design and Development</td><td>89</td></tr>
                </tbody>
                <tfoot>
                  <tr><th>ATAR</th><th>92.90</th></tr>
                </tfoot>
              </table>
            </div>
          </section>
          <section>
            <h3 className={styles.category}>Other</h3>
            <div className={styles.achievement}>
              <h4 className={styles.challenge}>NCSS Summer School</h4>
              <h5 className={styles.dates}>2014 - 2015</h5>
              <p className={styles.outline}>
                In January of 2014, I participated in the NCSS Summer School in the Python/web stream.
                {' '}
                We were tasked with building a social networking website and for this I worked as part of a team on
                {' '}
                <a href="https://github.com/nhardy/word-by-word" target="_blank" rel="noopener noreferrer">Word By Word</a>.
              </p>
              <p className={styles.outline}>
                In January of 2015, I participated in the embedded systems stream of the NCSS Summer School.
                {' '}
                This involved working with electronic components in circuits and manipulating these with C/C++ code on Arduino robots.
              </p>
            </div>
            <div className={styles.achievement}>
              <h4 className={styles.challenge}>NCSS Python Challenge</h4>
              <h5 className={styles.dates}>2012 - 2014</h5>
              <p className={styles.outline}>
                I participated in the National Computer Science School Python Challenge during high school.
                {' '}
                In 2013 and 2014, I took part in the advanced stream which involved working with binary data,
                {' '}
                steganography, breadth-first and depth-first searches, grammar parsing and a variety of other concepts.
              </p>
            </div>
          </section>
        </article>
      </DefaultLayout>
    );
  }
}
