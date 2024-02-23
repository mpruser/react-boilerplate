import { createGlobalStyle } from 'styled-components';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className="app">
        <p children={<span>react</span>} />
        <p children={<span>typescript</span>} />
      </div>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 100%);
  }

  div {
    width: 100%;
  }

  p {
    display: block;
    padding: 1vw;
    border-bottom: 0.2vw solid currentcolor;
    color: rgb(255 255 255 / 100%);
    font-weight: 700;
    font-size: 5vw;
    line-height: 1;

    span {
      display: block;
      transform: skewX(0deg);
      transition: all 0.3s;
    }

    &:hover span {
      transform: skewX(-30deg);
    }
  }

  a {
    color: currentcolor;
  }
`;

export default App;
