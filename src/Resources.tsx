import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Footer from "./components/Footer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    // textAlign: "center",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
  },
  subheader: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  faqs_list: {
    marginTop: 20,
  },
  faqs_sc: {
    textAlign: "left",
  },
  accord: {
    backgroundColor: grey[100],
  },
  listAcord: {
    width: "100%",
  },
}));

export default function Resources(): JSX.Element {
  const styles = useStyles();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  return (
    <>
      <ResponsiveNavBar value={2} />

      <Container maxWidth="lg">
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} /> */}
        {/* Content */}
        <div className={styles.content}>
          <Typography
            variant={!isMobilePortrait ? "h2" : "h3"}
            className={styles.title}
          >
            {"Tips"}
          </Typography>
          <Typography variant="h6" className={styles.subheader}>
            {
              "Have questions or want additional information or resources on the COVID-19 vaccine? Read below for more."
            }
          </Typography>
          {/* TODO: vertical tabs */}

          <div></div>

          <Accordion className={styles.accord} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="vaccine-locations-content"
              id="vaccine-locations-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                Where You Can Get Vaccinated in Santa Clara County
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li color="primary.main">
                  Santa Clara County Official Vaccination Sites
                </li>
                <ul>
                  <li>
                    Website:{" "}
                    <Link href="https://vax.sccgov.org" target="_blank">
                      https://vax.sccgov.org
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>Phone Number: (408)970-2000</li>
                  <ul>
                    <li>
                      {`NOTE: Only call if you NEED to! Wait times might be long, and we don't want to overwhelm the already-overwhelmed call system!`}
                    </li>
                  </ul>
                </ul>
                <ul>
                  <li>Locations:</li>
                  <ul>
                    <li>Berger Auditorium</li>
                    <li>Levi’s Stadium</li>
                    <li>Fairgrounds Expo Hall</li>
                    <li>Mountain View Community Center</li>
                    <li>Gilroy High School</li>
                    <li>Valley Health Center East Valley</li>
                    <li>Valley Health Center Tully</li>
                    <li>Valley Speciality Center</li>
                    <li>Emmanuel Baptist Church</li>
                    <li>
                      <strong>
                        Note: If you are 16 or 17 years old, you can only get
                        vaccinated at{" "}
                      </strong>
                    </li>
                  </ul>
                </ul>

                <li>Local Pharmacies:</li>
                <ul>
                  <li>
                    <Link
                      href="https://www.cvs.com/immunizations/covid-19-vaccine"
                      target="_blank"
                    >
                      CVS
                    </Link>
                    ,
                    <Link
                      href="https://www.riteaid.com/covid-vaccine-apt"
                      target="_blank"
                    >
                      {" "}
                      Rite Aid
                    </Link>
                    ,
                    <Link
                      href="https://www.walgreens.com/findcare/vaccination/covid-19/location-screening"
                      target="_blank"
                    >
                      {" "}
                      Walgreens
                    </Link>{" "}
                    (need account),
                    <Link
                      href="https://www.walmart.com/cp/1228302"
                      target="_blank"
                    >
                      {" "}
                      Walmart
                    </Link>{" "}
                    (need account), etc.
                  </li>
                  <li>
                    TIP: For CVS, appointments are generally added from 12am to
                    1am
                  </li>
                </ul>

                <li>
                  Local Hospitals (call if you’re not a patient, may need to
                  make an account):
                </li>
                <ul>
                  <li>Kaiser</li>
                  <li>Stanford</li>
                  <li>Sutter Health</li>
                  <li>
                    Other hospitals have vaccines, but availability may be low
                  </li>
                </ul>

                <li>Locations for Specific Groups:</li>
                <ul>
                  <li>VA Hospital: Specifically for veterans</li>
                  <li>
                    Stanford Children’s Hospital: Specifically for those 16-17
                  </li>
                  <li>
                    Community clinics: Specifically for local residents.{" "}
                    <strong>
                      Please do not go if you are not from that specific
                      community.
                    </strong>
                  </li>
                </ul>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accord}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="vaccine-faq-content"
              id="vaccine-faq-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                {"FAQs on the COVID-19 Vaccine"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={styles.faqs_list}>
                <Link
                  href="https://covid19.sccgov.org/covid-19-vaccine-information#3925188384-982666580"
                  target="_blank"
                >
                  Santa Clara County COVID-19 Vaccine FAQs
                </Link>
                <AccordionDetails>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddIcon />}
                      aria-controls="la-faq-content"
                      id="la-faq-header"
                    >
                      {`1. Vaccine Safety`}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "How was it determined that the COVID-19 vaccines are safe?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "All authorized COVID-19 vaccines were tested in large clinical trials with tens of thousands of volunteers of different ages, races, and ethnicities to ensure their safety and effectiveness. The FDA, CDC, and ACIP have all evaluated the trial information and determined the vaccines to be safe, effective, and of high quality. These groups are continuing to monitor the safety of COVID-19 vaccines to make sure even very rare side effects are identified and appropriate precautions are taken.​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "Did developing the vaccines so quickly compromise safety?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "No. None of the normal steps in the vaccine vetting process were skipped in order to quickly develop these vaccines. Rapid development was possible because: "
                        }
                        {
                          " manufacturing started while the clinical trials were still underway (normally manufacturing doesn’t begin until after completion of the trials);"
                        }
                        {
                          " mRNA vaccines are faster to produce than other kinds of vaccines,"
                        }
                        {
                          " FDA and CDC was and is prioritizing the review process for COVID-19 vaccines; and"
                        }
                        {
                          " researchers used existing clinical trial networks to quickly begin conducting the COVID vaccine trials.​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "If I have a medical condition, can I still receive the vaccine? What if I am immunocompromised?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Patients with underlying medical conditions can receive the vaccine. In fact, it is important that this group be vaccinated because they are at increased risk of having severe COVID-19 illness. Immunocompromised individuals (for example, persons living with HIV, transplant recipients, and those taking immunosuppressive medications) may receive the COVID-19 vaccines. However, because sufficient data is not yet available to establish vaccine efficacy in this population, immunocompromised individuals should be counseled by their healthcare provider on the potential for reduced immune response to the vaccine and the need to continue to follow all current guidance to protect themselves against COVID-19 even after getting vaccinated.​​​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "If I am pregnant or trying to get pregnant, can I still receive the vaccine?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Yes. COVID-19 vaccines are safe for you and your baby."
                        }
                      </Typography>
                      <ul>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            The vaccines protect expectant mothers. Individuals
                            who get COVID-19 while pregnant are at increased
                            risk of severe illness. The vaccine will keep you
                            safer.
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            If you are trying to get pregnant, the vaccine is
                            also recommended for you. There is no evidence it
                            affects fertility.
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            COVID-19 vaccine is safe for the developing baby.
                            Research suggests that getting vaccinated both
                            protects mothers and also passes on antibodies to
                            babies that better protect them.
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            Vaccination helps avoid pregnancy complications.
                            People who get COVID-19 are at increased risk of
                            pre-term birth.
                          </Typography>
                        </li>
                      </ul>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Talk to your doctor for more information about vaccines and pregnancy."
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"Who should NOT receive a COVID-19 vaccine?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Almost everyone should get vaccinated against COVID-19."
                        }
                        <br />
                        <br />
                        {
                          "Individuals with a history of allergic reactions that are not related to vaccines or injectable therapies may receive a COVID-19 vaccine. For example, people who are allergic to food, pets, venom, pollen, latex, or oral medications should get vaccinated against COVID-19."
                        }
                        <br />
                        <br />
                        {
                          "If you had a severe reaction to a different vaccine (not COVID-19) or injectable medication in the past, also talk to your doctor before getting vaccinated against COVID-19."
                        }
                        <br />
                        <br />
                        {
                          "Individuals who are currently sick with COVID-19 disease should not receive the vaccine until the person has recovered from acute illness and criteria have been met to discontinue isolation."
                        }
                        <br />
                        <br />
                        {
                          "Individuals who received passive antibody (monoclonal antibodies or convalescent serum) as treatment for COVID-19 should defer vaccination for at least 90 days after antibody therapy."
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "Should I be concerned if I or a loved one received the Johnson & Johnson COVID-19 vaccine?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {"No. Any risk to you is extremely low."}
                        <br />
                        <br />
                        {
                          "On April 13, 2021, the County of Santa Clara and other healthcare providers paused the use of the Johnson & Johnson COVID-19 vaccine, also known as Janssen, as recommended out of an abundance of caution by federal and state authorities. The federal government and the vaccine manufacturer are investigating rare health incidents in 6 people living in other places in the country out of the nearly 7 million doses of Johnson & Johnson vaccine administered nationwide to see if they might be connected to the Johnson & Johnson vaccine. This is a part of the federal government system set up to keep medications safe."
                        }
                        <br />
                        <br />
                        {
                          "If you were vaccinated with Johnson & Johnson vaccine more than a month ago, any risk to you is very low. If you got the vaccine within the last few weeks, any risk is also extremely low. The 6 people who experienced the rare health incident in other places had symptoms 6-13 days after vaccination. These symptoms included severe headache, severe abdominal pain, severe leg pain, and shortness of breath. If you have questions or are worried that you might have these symptoms, please contact your healthcare provider. It is important to remember that the vaccines were studied with tens of thousands of volunteers of different ages, races, and backgrounds and have been safely administered to millions of people nationwide. Studies have found that serious side effects are very rare, and the vaccines are very safe."
                        }
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
                <AccordionDetails>
                  <Accordion className={styles.listAcord}>
                    <AccordionSummary
                      expandIcon={<AddIcon />}
                      aria-controls="la-faq-content"
                      id="la-faq-header"
                    >
                      {`2. Vaccine Science`}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"How effective are the COVID-19 vaccines?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Very effective. Clinical trials involving tens of thousands of individuals have demonstrated that the Pfizer-BioNTech, Moderna, and Janssen (also known as Johnson & Johnson) vaccines are highly effective at preventing symptomatic COVID-19."
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"When do the vaccines take full effect?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "​Starting from two weeks after receiving the second dose for Pfizer-BioNTech and Moderna or the single dose Janssen/Johnson & Johnson​​.​​​​​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>{"Can children be vaccinated?"}</strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "No. The Pfizer-BioNTech COVID-19 vaccine is only authorized for administration in patients aged 16 years and older. The Moderna and Janssen/J&J vaccines are only authorized in patients aged 18 years and older. Clinical trials are underway for children, but at this point there is no vaccine approved for children.​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"What are the side effects of the COVID-19 vaccine?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Vaccine recipients commonly experience mild to moderate side effects that occur within the first three days of vaccination and resolve within 1-3 days of onset. These are normal signs that your body is building protection. Common side effects include mild to moderate pain, swelling, or redness at the injection site and/or mild to moderate flu-like symptoms (for example, fever, fatigue, headache, chills, muscle aches). Serious side effects are very rare."
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"Can I contract COVID-19 after I’m vaccinated?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "We have strong evidence that being vaccinated will prevent you from getting severely ill and dying from COVID-19. There may be a small chance that you can still get an asymptomatic infection or mild illness, but growing evidence suggests that being vaccinated makes this possibility much less likely than if you were never vaccinated."
                        }
                        <br />
                        <br />
                        {
                          "It’s important to keep in mind that it typically takes a few weeks for the body to build immunity after vaccination. That means it is possible a person could contract COVID-19 shortly after vaccination and get sick because the vaccine has not had enough time to provide protection.​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "If I’ve had COVID-19 in the past and recovered, do I still need to get vaccinated?"
                          }{" "}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Yes. Due to the severe health risks associated with COVID-19 and the fact that reinfection with COVID-19 is possible, you should be vaccinated regardless of whether you already had a COVID-19 infection. If you were treated for COVID-19 with intravenous monoclonal antibodies or convalescent plasma, you should wait 90 days before getting a COVID vaccine. Otherwise, you can receive a vaccine dose after you have recovered from acute illness and have completed your isolation period. Talk to your doctor if you are unsure what treatment you received or if you have more questions about getting a vaccine. Experts do not yet know how long someone is protected from getting sick again after recovering from COVID-19. Note: Some healthcare organizations may prioritize for vaccination those who have not had a previous infection in the prior 90 days.​​​​​​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "If I have been exposed to COVID-19 in the past, do I still need to get vaccinated?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Yes. The CDC recommends that all persons who have been exposed to COVID-19 in the past be vaccinated. Individuals should complete their quarantine period prior to visiting a vaccination site.​​​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "Do I still need to follow the public health orders and directives after I have been fully vaccinated?"
                          }{" "}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Yes. At this time, unless a public health order or directive says otherwise, a person’s vaccination status does not exempt them from State and County public health orders and directives. The County will evaluate new data and evidence regarding the effects of vaccination as they come in, and may adjust this policy in the future.​"
                        }
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "Do I still need to quarantine after being exposed to someone with COVID-19 if I’ve been fully vaccinated?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {"No, if you meet all of the following criteria:"}
                      </Typography>
                      <ul>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            Your exposure occurred after 14 days and less than
                            90 days after the completion of your vaccine series
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            You do not have any COVID-19 symptoms
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            variant="body2"
                            className={styles.faqs_sc}
                          >
                            You are not an inpatient or resident in a healthcare
                            setting or facility
                          </Typography>
                        </li>
                      </ul>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {
                            "Should I still get tested, wear a mask, and avoid indoor gatherings and breakrooms if I’ve been fully vaccinated?"
                          }
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "Yes. At this time, the Public Health Department’s recommendations for testing and other recommendations apply even if you’ve been fully vaccinated. Regular testing for frontline workers and others with exposure to the public continues to be particularly important. Public Health will adjust its recommendations in the future based on new data and evidence as they come in.​"
                        }
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
                <AccordionDetails>
                  <Accordion className={styles.listAcord}>
                    <AccordionSummary
                      expandIcon={<AddIcon />}
                      aria-controls="la-faq-content"
                      id="la-faq-header"
                    >
                      {`3. Vaccine Eligibility`}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle1"
                        className={styles.faqs_sc}
                      >
                        <strong>
                          {"Who is currently eligible to be vaccinated?"}
                        </strong>
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography variant="body2" className={styles.faqs_sc}>
                        {
                          "All individuals age 16 and older who live, work, or attend school in Santa Clara County are eligible to be vaccinated."
                        }
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
                <ListItem>
                  <Link
                    href="https://www.sfchronicle.com/local/article/find-schedule-california-COVID-vaccine-appointment-16062302.php"
                    target="_blank"
                  >
                    Scheduling a COVID Vaccine Appointment in the Bay Area
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://www.sfchronicle.com/local/article/Your-COVID-vaccine-card-What-to-do-if-you-lose-16070378.php"
                    target="_blank"
                  >
                    On Your COVID Vaccine Card{" "}
                  </Link>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accord}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="useful-links-content"
              id="useful-links-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                Other Useful Links
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={styles.faqs_list}>
                <ListItem>
                  <Link
                    href="https://www.sccgov.org/sites/covid19/Pages/COVID19-vaccine-information-for-public.aspx"
                    target="_blank"
                  >
                    {`Santa Clara Official Vaccine Site `}
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="https://vaccinefairy.org/" target="_blank">
                    {`Vaccine Fairy: `}
                  </Link>
                  <ListItemText primary="Sign up to have someone book your appointment" />
                </ListItem>

                <ListItem>
                  <Link
                    href="https://www.vta.org/blog/vta-offers-free-rides-covid-vaccination-sites"
                    target="_blank"
                  >
                    {`VTA Info on Transportation to Vaccination Sites:`}
                  </Link>
                  <ListItemText primary="Free transportation options to vaccination sites and bus route information" />
                </ListItem>

                <ListItem>
                  <Link href="https://shotoclock.io/" target="_blank">
                    {`Shot O' Clock: `}
                  </Link>
                  <ListItemText primary="Get notifications about pharmacy appointments on your email or phone" />
                </ListItem>

                <ListItem>
                  <Link href="https://itsmyshot.weebly.com" target="_blank">
                    {`It's My Shot: `}
                  </Link>
                  <ListItemText primary="More Bay Area-specific information" />
                </ListItem>

                <ListItem>
                  <Link href="https://www.getmyvaccine.org" target="_blank">
                    {`Get My Vaccine: `}
                  </Link>
                  <ListItemText primary="More vaccine info on pharmacies" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
      <Footer />
    </>
  );
}
