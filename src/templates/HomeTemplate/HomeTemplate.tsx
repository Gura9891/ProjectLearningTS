import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

type Props = {};

export default function HomeTemplate({}: Props) {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
