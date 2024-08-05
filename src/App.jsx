import { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

import { GanreContextProvider } from "./genreContext";
import { guestSession } from "./api/api";

import "./App.css";
import { IndexPage } from "./IndexPage";
import { RatePage } from "./RatePage";

const headerStyle = {
  color: "#fff",
  backgroundColor: "#fff",
  marginBottom: "30px",
  padding: "0",
};
const contentStyle = {
  color: "#fff",
  backgroundColor: "#fff",
};

const layoutStyle = {
  overflow: "hidden",
  backgroundColor: "#fff",
};

export function App() {
  const [isSessionOpened, setIsSessionOpened] = useState(false);

  useEffect(() => {
    guestSession().then((data) => {
      setIsSessionOpened(true);
    });
  }, []);

  const navigate = useNavigate();

  const items = [
    {
      key: "index",
      label: "Search",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "Rated",
      label: "Rated",
      onClick: () => {
        navigate("/rated");
      },
    },
  ];

  //  console.log(movieList);
  if (isSessionOpened === false) {
    return null;
  }
  return (
    <Layout style={layoutStyle}>
      <GanreContextProvider>
        <Header style={headerStyle}>
          <Menu items={items} mode="horizontal" style={{justifyContent: 'center'}}></Menu>
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" Component={IndexPage} />
            <Route path="/rated" Component={RatePage} />
            <Route path="*" element={<p style={{ color: "black" }}>404</p>} />
          </Routes>
        </Content>
      </GanreContextProvider>
    </Layout>
  );
}
