import { useEffect } from "preact/hooks";
import Header from "../../components/Header/Header";
import Slideshow from "../../components/Slideshow/Slideshow";
import Articles from "../../components/Articles/Articles";
import Schedule from "../../components/Schedule/Schedule";
import Downloads from "../../components/Downloads/Downloads";
import Membership from "../../components/Membership/Membership";
import PayToPlay from "../../components/PayToPlay/PayToPlay";
import Footer from "../../components/Footer/Footer";
import JoinUs from "../../components/JoinUs/JoinUs";
import useData from "../../hooks/useData";
import { usePrerenderData } from "@preact/prerender-data-provider";

export default function Home(props) {
  const [prerenderData] = usePrerenderData(props, false);
  console.log(prerenderData);

  /**
   * Netlify CMS's accept invite link land on home page.
   * This redirection takes it to the right place(/admin).
   */

  useEffect(() => {
    if (
      window !== undefined &&
      window.location.href.includes("#invite_token")
    ) {
      const { href } = window.location;
      window.location.href = `${href.substring(
        0,
        href.indexOf("#")
      )}admin${href.substring(href.indexOf("#"))}`;
    }
  }, []);

  return (
    <>
      Welcome
    </>
  );
}
