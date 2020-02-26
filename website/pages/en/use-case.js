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
        <div className="tutorials-intro">
          <h1>
             dƒusion protocol Use Cases
          </h1>
          <p>
            Learn about the different Use Cases of the dƒusion protocol.
          </p>
        </div>

        <div className="inner index-section-boxes grid-blocks three-blocks-grid">
          <a href={docUrl("game1")} className="white-box">
            <h3>
              Simple liquidity provision
            </h3>
            <p>
              Provide liquidity of stable coins, while making use of the fluctuation around 1USD
            </p>
          </a>
          <a className="white-box">
            <h3>
              To be continued... 
            </h3>
            <p>
               More use cases will be added over time. Make sure to come back and learn more about the dƒusion protocol.
            </p>
          </a>
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
