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
    const pageUrl = page => `${baseUrl}${page}`

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
           Integrate Gnosis Protocol v2 with your dapp: Fully permissionless trading protocol that leverages batch auctions to protect traders from MEV.
          </div>
          <div className="index-info-block-text">
            <p>
             Gnosis Protocol v2 is a fully decentralized protocol on which anyone can build. If a DEX/dapp wants to offer their users MEV protection and better prices, the project can simply integrate Gnosis Protocol v2 so that their UI routes their users trades through the protocol. 
            </p>
            <p>
              Here you can learn everything about how the protocol works and deeper technical documentation.
            </p>
          </div>
        </div>

        <div className="inner index-section-boxes grid-blocks four-blocks-grid">
          <a href={docUrl("introduction")} className="white-box">
            <h3>
              Introduction
            </h3>
            <p>
              Understand the <strong>mechanism</strong> behind Gnosis Protocol v2.
            </p>
          </a>
          
          <a href={docUrl("smartcontracts")} className="white-box">
            <h3>
              Documentation
            </h3>
            <p>
              <strong>Deep dive</strong> into Gnosis Protocol contracts
            </p>
          </a>
          <a href={pageUrl("tutorials")} className="white-box">
            <h3>
              Tutorials
            </h3>
            <p>
              <strong>Get started</strong> building on Gnosis Protocol contracts
            </p>
          </a>
          <a href={pageUrl("#support")} className="white-box">
            <h3>
              Support
            </h3>
            <p>
              Need some <strong>help</strong>? Reach out to us!
            </p>
          </a>
        </div>
        

        <div className="inner index-advantages grid-blocks two-blocks-grid">
          <div>
            <h2>
              Advantages of <br></br>Gnosis Protocol
            </h2>
          </div>
          <div className="index-advantages-boxes  grid-blocks two-blocks-grid">
            <a className="white-box">
              <h3>
                MEV Protection
              </h3>
              <p>
              Trades are <strong>protected from different sorts of MEV</strong> such as front/back running or sandwich attacks.
              </p>
            </a>

            <a className="white-box">
              <h3>
              Maximized liquidity 
              </h3>
              <p>
              Access to <strong> all</strong>  on-chain liquidity.
              </p>
            </a>

            <a className="white-box">
              <h3>
                Uniform Prices
              </h3>
              <p>
                The protocol is the first implementation (2nd iteration) of <strong>batch auctions</strong>, which promote uniform clearing prices. 
              </p>
            </a>

            <a className="white-box">
              <h3>
                Fair, decentralized settlements
              </h3>
              <p>
              Open competitions for order matching  <strong>replaces a central operator</strong>  or a constant function market maker.
              </p>
            </a>
          </div>
        </div>


         <div className="inner index-projects-using grid-blocks two-blocks-grid">
          <div>
           <a name="projects">
            <h2>
              Analytics & Resources
            </h2>
            </a>
          </div>
          
          <div className="index-projects-boxes grid-blocks two-blocks-grid">
                      
            <a href="https://duneanalytics.com/gnosis.protocol/Gnosis-Protocol-V2" className="white-box">
             <strong>Dune Analytics </strong>
            </a>
            
          </div>
        </div>

        <div className="inner index-projects-using grid-blocks two-blocks-grid">
          <div>
           <a name="projects">
            <h2>
              Projects building on<br></br>Gnosis Protocol v2
            </h2>
            </a>
            <p>
              Check out who's already on building on Gnosis.
            </p>

          </div>
          <div className="index-projects-boxes grid-blocks two-blocks-grid">
            <a href="https://cowswap.exchange" className="white-box">
               <strong>CowSwap</strong> <br></br>
               CowSwap is <strong> the first trading UI </strong> built on Gnosis Protocol v2 .
            </a>            
            <a href="https://medium.com/balancer-protocol/the-crypto-cinematic-universe-crossover-event-of-the-summer-balancer-gnosis-protocol-bgp-638568aa0385" className="white-box">
              <strong>Balancer</strong> <br></br> 
              <strong> The Balancer trading UI </strong> has integrated CowSwap
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
              <a href="https://chat.gnosis.io">
                  Join our Discord community chat.
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
