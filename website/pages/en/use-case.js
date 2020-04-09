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

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: 'How CT can be used to make Trades under certain Conditions',
      title: 'Tokens, Gaming, and Forking Gardens',
    },
    {
      content: 'Make decission based on prediction markets',
      title: 'Futarchy',
    },
    {
      content: "How can Conditional Tokens be used for Games",
      title: 'Games',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="index-info-block grid-blocks two-blocks-grid">
          <div className="index-info-block-title">
            Use cases for Gnosis Protocol
          </div>
          
          <div className="index-info-block-text">
            <p>
              Here you can learn more about different applications of the Gnosis Protocol.
            </p>
          </div>
        </div>

        <div className="inner index-section-boxes grid-blocks three-blocks-grid">
          <a href={docUrl("liquidity1")} className="white-box">
            <h3>
              Simple Liquidity Provision
            </h3>
            <p>
              You could employ a simple liquidity provision strategy for stablecoins, and make use of their fluctuation around 1 USD.
            </p>
          </a>
          <a className="white-box">
            <h3>
              To be continued... 
            </h3>
            <p>
               More use cases will be added over time. Be sure to come back soon.
            </p>
          </a>
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
