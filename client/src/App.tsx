import "components/Stripe/CardSection.css";
import "./App.css";
import "./i18n";
import React, { useEffect, useState } from "react";
import PublicContext, { MetaInterface } from "contexts/PublicContext";
import { useTranslation } from "react-i18next";
import { Agent } from "services/api";
import Footer from "components/Footer";
import styled, { css, ThemeProvider } from "styled-components";
import Theme from "./theme";
import NetworkError from "./pages/errors/NetworkError";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { createPopup, redirectToAuthServer } from "encryptly-client";
import { IAuthSettings } from "models/IAuthSettings";
import cogoToast from "cogo-toast";
import VisitorService from "services/VisitorService";
import Navigation from "components/Navigation/Navigation";
import { IAppSettings } from "models/IAppSettings";
import ScrollToTopButton from "components/UI/ScrollToTopButton";
import { IUser } from "models/IUser";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import queryString from "query-string";
import MyHobbies from "./pages/about/hobbies";
import Gallery from "./pages/about/gallery";
import MyCertificates from "./pages/about/certificates";
import Learning from "./pages/learning";
import LearningPricing from "./pages/learning/pricing";
import LearningOrder from "./pages/learning/order";
import YoutubeCourses from "./pages/learning/youtube";
import FitnessProgram from "./pages/fitness/program";
import Login from "./pages/login";
import FitnessTDEE from "./pages/fitness/tdee";
import FitnessBMI from "./pages/fitness/bmi";
import FitnessBodyFat from "./pages/fitness/body-fat";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Games from "./pages/gaming/games";
import Launcher from "./pages/gaming/launcher";
import Timeline from "./pages/about/Timeline";
import BrowseCourses from "./pages/courses/BrowseCourses";
import { ViewComponent } from "jodit/types/core/component";
import ViewCourse from "./pages/courses/ViewCourse";
import BrowseProjects from "./pages/projects/BrowseProjects";

const Wrapper = styled.div<any>`
  min-height: 100vh;
  width: 100%;
  position: relative;

  ${(props) =>
    props.isSidebarOpen
      ? css`
          overflow-y: hidden;
          min-height: initial;
          height: 100%;
          position: fixed;
        `
      : ""};
`;

const Container = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

function MyApp() {
  const location = useLocation();
  const history = useHistory();
  const { token, githubToken } = queryString.parse(location.search);
  const { i18n } = useTranslation();
  const [meta, setMeta] = useState<MetaInterface>(undefined);
  const [initialized, setInitialized] = useState(false);
  const [appSettings, setAppSettings] = useState<IAppSettings>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [authSettings, setAuthSettings] = useState<IAuthSettings | null>(null);
  const [visitedPage, setVisitedPage] = useState<any>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [socket, setSocket] = useState(null);

  let timeOnPage = 0;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = window.matchMedia("(max-width: 600px)");
    media.addListener(runMobileMedia);
    runMobileMedia(media);
  }, []);

  useEffect(() => {
    if (token) {
      login(token);
    }
  }, [token, githubToken]);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const user = await initialize();
    if (user) {
      cogoToast.success("You are now logged in");
    }
  };

  useEffect(() => {
    initialize();
    setInitialized(true);
  }, []);

  useEffect(() => {
    try {
      VisitorService.registerPageVisit(location.pathname).then((page) => {
        setVisitedPage(page);
      });
    } catch (e) {}
  }, [location.pathname]);

  useEffect(() => {
    if (visitedPage) {
      let intervalId = setInterval(() => {
        timeOnPage += 5;
        VisitorService.updateVisitedPage({
          id: visitedPage._id,
          url: location.pathname,
          timeOnPage,
        });
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeOnPage, location.pathname, visitedPage]);

  useEffect(() => {
    if (visitedPage) {
      let scrolledToBottom = false;
      let startedAtTop = false;

      const handlerBottom = async () => {
        const triggerValueTop = 100;

        if (window.scrollY <= triggerValueTop) {
          startedAtTop = true;
          if (scrolledToBottom) {
            scrolledToBottom = false;
          }
        }

        const triggerValueBottom = document.body.offsetHeight - 50;
        if (
          window.scrollY + window.innerHeight >= triggerValueBottom &&
          !scrolledToBottom &&
          startedAtTop
        ) {
          scrolledToBottom = true;
          await VisitorService.updateVisitedPage({
            id: visitedPage._id,
            scrolledToBottom: true,
            url: location.pathname,
          });
        }
      };

      window.addEventListener("scroll", handlerBottom);

      return () => {
        timeOnPage = 0;

        window.removeEventListener("scroll", handlerBottom);
      };
    }
  }, [location.pathname, visitedPage]);

  const initialize = async () => {
    let loggedInUser: any = null;

    try {
      const { settings, authSettings, installed, user } = await Agent.Auth.init(
        githubToken
      );

      /*         if (!installed) {
                         setNetworkError(true);
                         setInitialized(true);
                         return;
                     }*/

      if (user) {
        loggedInUser = user;

        if (githubToken) {
          history.push(location.pathname);
        }
      }

      setUser(user);
      setAppSettings(settings);
      setAuthSettings(authSettings);
    } catch (e) {
      console.log("error");
      setNetworkError(true);
    }

    setInitialized(true);

    if (token) {
      history.push(location.pathname);
    }

    return loggedInUser;
  };

  const runMobileMedia = (x) => {
    if (x.matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setSidebarOpen(false);
    }
  };

  const redirect = async (path, external = false) => {
    if (!external) {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }

      await history.push(path);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    } else {
      window.open(path, "_blank");
    }
  };

  const oauthResponse = async (token) => {
    const { data } = await axios.get("/api/auth/oauth/login?token=" + token);
    if (data.token) {
      login(data.token);
    }
  };

  const redirectToExternalAuth = (type) => {
    // type can be "login" or "register"

    const serverUrl = authSettings!.authServerUrl;
    const clientId = authSettings!.clientId;

    if (isMobile) {
      const redirectUrl = location.pathname;
      redirectToAuthServer({ serverUrl, redirectUrl, type, clientId });
      return;
    }

    createPopup({ serverUrl, clientId, type }, async (token) => {
      await oauthResponse(token);
    });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    cogoToast.success("Logged out successfully");
    return redirect("/");
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
        <PublicContext.Provider
          value={{
            meta,
            setMeta,
            appSettings,
            redirect,
            redirectToExternalAuth,
            isSidebarOpen,
            setSidebarOpen,
            language,
            setLanguage,
            networkError,
            isMobile,
            user,
            setUser,
            logout,
            socket,
          }}
        >
          <Wrapper isSidebarOpen={isSidebarOpen}>
            <Navigation />

            <div
              id="scroller"
              style={{
                display: "flex",
                overflowX: "clip",
                flexDirection: "column",
                flexGrow: 1,
                paddingBottom: !isMobile ? "6rem" : "6rem",
              }}
            >
              <Container>
                <Switch>
                  <Route path="/gaming/games">
                    <Games />
                  </Route>
                  <Route path="/gaming/launcher">
                    <Launcher />
                  </Route>
                  <Route path="/about/projects">
                    <BrowseProjects />
                  </Route>
                  <Route path="/about/hobbies">
                    <MyHobbies />
                  </Route>
                  <Route path="/about/gallery">
                    <Gallery />
                  </Route>
                  <Route path="/about/certificates">
                    <MyCertificates />
                  </Route>
                  <Route path="/learning" exact>
                    <Learning />
                  </Route>
                  <Route path="/learning/pricing">
                    <LearningPricing />
                  </Route>
                  <Route path="/learning/order">
                    <LearningOrder />
                  </Route>
                  <Route path="/learning/youtube">
                    <YoutubeCourses />
                  </Route>
                  <Route path="/fitness/program">
                    <FitnessProgram />
                  </Route>
                  <Route path="/fitness/tdee">
                    <FitnessTDEE />
                  </Route>
                  <Route path="/fitness/bmi">
                    <FitnessBMI />
                  </Route>
                  <Route path="/fitness/body-fat">
                    <FitnessBodyFat />
                  </Route>
                  <Route path="/contact">
                    <Contact />
                  </Route>
                  <Route path={"/login"}>
                    <Login />
                  </Route>
                  <Route path={"/register"}>
                    <Register />
                  </Route>
                  <Route path="/courses" exact>
                    <BrowseCourses />
                  </Route>
                  <Route path="/courses/:id">
                    <ViewCourse />
                  </Route>

                  <Route path="/" exact>
                    <Home />
                  </Route>
                </Switch>
              </Container>
            </div>
            <Footer />
            <ScrollToTopButton />
          </Wrapper>
        </PublicContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
