/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner index-info-block grid-blocks two-blocks-grid">
          <div 
          className="index-info-block-title">
           Trade on the dƒusion protocol: Our decentralized exchange is built using market mechanisms designed to counter low liquidity in environments where there are an increasing number of tokenized assets.
          </div>
          <div className="index-info-block-text">
            <p>
            Here we will introduce the concept and novel mechanism behind the dƒusion trading protocol.</p> 
            You’ll have all the tools you need to interact, inspect, and build on the dƒusion protocol. Additionally, we will introduce different concepts to use the mechanism, as well as an overivew of a few potential use cases and dapp integrations.
            
        
          </div>
        </div>

        <div className="inner index-section-boxes grid-blocks four-blocks-grid">
          <a href={docUrl("introduction1")} className="white-box">
            <h3>
              Introduction
            </h3>
            <p>
              Exploring the <strong>concept</strong> behind the dƒusion 
            </p>
          </a>
          <a href="/use-case" className="white-box">
            <h3>
              Use Cases
            </h3>
            <p>
              Making use of the dƒusion <strong>mechanism</strong>
            </p>
          </a>
          <a href={docUrl("devguide01")} className="white-box">
            <h3>
              Documentation
            </h3>
            <p>
              <strong>Deep dive</strong> into the dƒusion contracts
            </p>
          </a>
          <a href="/tutorials" className="white-box">
            <h3>
              Tutorials
            </h3>
            <p>
              <strong>Get started</strong> and work with the dƒusion contracts
            </p>
          </a>
        </div>

        <div className="inner index-section-last-boxes grid-blocks two-blocks-grid">
          <a href="/#support" className="white-box">
            <h3>
              Support
            </h3>
            <p>
              Need some <strong>help</strong>? Reach out to us!
            </p>
          </a>

          <a href="/#projects" className="white-box">
            <h3>
              Projects
            </h3>
            <p>
              <strong>Explore</strong> existing dƒusion integrations
            </p>
          </a>
        </div>

        <div className="inner index-what-are grid-blocks two-blocks-grid">
          <div>
            <h2>
              What is the dƒusion?
            </h2>
          </div>
          <div>
          <p>  With the dƒusion protocol Gnosis introduces a new decentralized trading mechanism for ERC20 tokens. </p>
          The Dƒusion protocol realizes a global permissionless liquidity pool and a fair matching engine that does not require a trusted operator, while maximizing trader welfare. The mechanism combines ring trades with batch auctions for a multi-dimensional order book with uniform clearing prices.  
          </div>
        </div>

        <div className="inner index-advantages grid-blocks two-blocks-grid">
          <div>
            <h2>
              Advantages of <br></br>the dƒusion protocol
            </h2>
          </div>
          <div className="index-advantages-boxes  grid-blocks two-blocks-grid">
            <a href="" className="white-box">
              <h3>
                Better Price Finding
              </h3>
              <p>
              The dƒusion protocol can lead to fairer prices with its multidimensional orderbook <strong>diminishing price discrimination</strong> and signifcantly increasing volume.
              </p>
            </a>

            <a href="" className="white-box">
              <h3>
              Liquidity Maximization
              </h3>
              <p>
               Users can <strong>easily provide liquidity</strong> through simple  trading strategies.
              </p>
            </a>

            <a href="" className="white-box">
              <h3>
                Smart Contract Integrations
              </h3>
              <p>
              Other protocols and dapps can easily <strong>use, integrate, and build </strong> on the protocol. 
              </p>
            </a>

            <a href="" className="white-box">
              <h3>
                Full Decentralization
              </h3>
              <p>
                Both order matching and asset management <strong>do not require a centralized party</strong> to steer the operations. 
              </p>
            </a>
          </div>
        </div>

        <div className="inner index-projects-using grid-blocks two-blocks-grid">
          <div>
           <a name="projects">
            <h2>
              Projects building on<br></br> the dƒusion protocol
            </h2>
            </a>
            <p>
              The dƒusion contracts are already used by those projects.
            </p>

          </div>
          <div className="index-projects-boxes grid-blocks three-blocks-grid">
          <a href="https://github.com/gnosis/GECO" className="white-box">
             <strong> Want to be the first?</strong> <br></br> Apply with your project to the <strong>Gnosis Ecosystem Fund</strong>!
          </a>
          </div>
        </div>

        <div className="inner index-support grid-blocks two-blocks-grid">
          <div>
            <a name="support">
              <h2>
                Support<br></br>and Community
              </h2>
            </a>
            <p>
              Reach out to us!
            </p>
          </div>
          <div className="index-support-boxes grid-blocks">
            <div id="index-support-telegram">
              <a href="https://t.me/dfusionprotocol">
                  Chat with us via Telegram
              </a>
            </div>
          </div>
        </div>


      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );


    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
        </div>
      </div>
    );
  }
}

module.exports = Index;
