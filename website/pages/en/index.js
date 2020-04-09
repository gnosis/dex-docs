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
           Build on Gnosis Protocol: A fully permissionless DEX that enables ring trades to maximize liquidity.
          </div>
          <div className="index-info-block-text">
            <p>
              Gnosis Protocol is built in the spirit of permissionless innovation. Its fully decentralized architecture means you don’t need to trust us at Gnosis to build on our protocol. Not only can anyone list tokens or build integrations, Gnosis Protocol's order settlement process does not rely on any operator. 
            </p>
            <p>
              Here you can learn more about the protocol and everything you need to start building. Start with the introduction, use cases, or a deep dive into the contracts.
            </p>
          </div>
        </div>

        <div className="inner index-section-boxes grid-blocks four-blocks-grid">
          <a href={docUrl("introduction1")} className="white-box">
            <h3>
              Introduction
            </h3>
            <p>
              Understand the <strong>mechanism</strong> behind Gnosis Protocol 
            </p>
          </a>
          <a href={pageUrl("use-case")} className="white-box">
            <h3>
              Use Cases
            </h3>
            <p>
              Create <strong>applications</strong> using the Gnosis Protocol
            </p>
          </a>
          <a href={docUrl("devguide01")} className="white-box">
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
        </div>

        <div className="inner index-section-last-boxes grid-blocks two-blocks-grid">
          <a href={pageUrl("#support")} className="white-box">
            <h3>
              Support
            </h3>
            <p>
              Need some <strong>help</strong>? Reach out to us!
            </p>
          </a>

          <a href={pageUrl("#projects")} className="white-box">
            <h3>
              Projects
            </h3>
            <p>
              <strong>Explore</strong> existing Gnosis Protocol integrations
            </p>
          </a>
        </div>

        <div className="inner index-what-are grid-blocks two-blocks-grid">
          <div>
            <h2>
              What is Gnosis Protocol?
            </h2>
          </div>
          <div>
            <p>
              Gnosis Protocol is a fully permissionless DEX, which has been in research and development over the course of the last two years.
            </p>
            <p>
              Gnosis Protocol enables ring trades to maximize liquidity. Ring trades are order settlements which share liquidity across all orders, rather than a single token pair, and uniquely suited for trading prediction market tokens and the long tail of all tokenized assets.
            </p>
          </div>
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
                Maximized Liquidity
              </h3>
              <p>
                The protocol maximizes liquidity through <strong>ring trades</strong>, in which liquidity is shared among all traded assets.
              </p>
            </a>

            <a className="white-box">
              <h3>
              Permissionless Innovation
              </h3>
              <p>
               Anyone can list tokens, build integrations, and submit order settlements on the <strong>fully decentralized</strong> protocol.
              </p>
            </a>

            <a className="white-box">
              <h3>
                Uniform Prices
              </h3>
              <p>
                The protocol is the first implementation of <strong>batch auctions</strong>, which promote uniform clearing prices and front-running resistance. 
              </p>
            </a>

            <a className="white-box">
              <h3>
                Long Tail Markets
              </h3>
              <p>
                <strong>Trade any token pair</strong> without having to use an intermediary token or centralized exchange to convert your asset.
              </p>
            </a>
          </div>
        </div>


         <div className="inner index-projects-using grid-blocks two-blocks-grid">
          <div>
           <a name="projects">
            <h2>
              Analytics
            </h2>
            </a>
          </div>
          
          <div className="index-projects-boxes grid-blocks three-blocks-grid">
                      
            <a href="https://explore.duneanalytics.com/public/dashboards/I43OkDWnojXZYm8vmdBDcLz5UsS3Tn0cx1xU8Hcg" className="white-box">
             <strong>Dune Analytics </strong>
            </a>

            <a href="https://thegraph.com/explorer/subgraph/gnosis/protocol" className="white-box">
              <strong>The Graph Mainnet</strong>
            </a>

            <a href="https://thegraph.com/explorer/subgraph/gnosis/protocol-rinkeby" className="white-box">
              <strong> The Graph Rinkeby </strong>
            </a>
            
          </div>
        </div>

        <div className="inner index-projects-using grid-blocks two-blocks-grid">
          <div>
           <a name="projects">
            <h2>
              Projects building on<br></br>Gnosis Protocol
            </h2>
            </a>
            <p>
              Check out who's already on building on Gnosis.
            </p>

          </div>
          <div className="index-projects-boxes grid-blocks two-blocks-grid">
            <a href="https://mesa.eth.link" className="white-box">
               <strong> Mesa</strong> <br></br>
               The Mesa dapp supports simple market making strategies for stablecoins on the Gnosis Protocol.
            </a>            
            <a href="https://github.com/gnosis/GECO" className="white-box">
               <strong> Want to be the next?</strong> <br></br> Apply with your project to the <strong>Gnosis Ecosystem Fund</strong>!
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
