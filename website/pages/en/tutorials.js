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

function Tutorial(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
       <div className="index-info-block grid-blocks two-blocks-grid">
          <div className="index-info-block-title">
            Gnosis Protocol Tutorials
          </div>
          <div className="index-info-block-text">
            <p>
            Enough for now with concepts, contracts, and criteria?
            </p>
            <p>
            Let’s get started with some basic tutorials on how to interact with Gnosis Protocol.
            </p>
          </div>
        </div>


        <div className="inner grid-blocks four-blocks-grid tutorials-boxes">
          <a href={docUrl("addtoken1")} className="white-box">
            <h3>
             Adding ERC-20 Tokens
            </h3>
            <p>
              This tutorial will teach you how to list any ERC-20 token on Gnosis Protocol using Etherscan.  
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp;
              10min
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp;
              Easy
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-pen"></i>
              None
            </p>
          </a>

          <a href={docUrl("limitorder1")} className="white-box">
            <h3>
             Submit a limit order
            </h3>
            <p>
              This tutorial will teach you how to place one (standing) limit order using Etherscan, including deposit and withdrawal.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp;
              15min
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp;
              Medium
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-pen"></i>
              Intro
            </p>
          </a>

           <a href="https://docs.google.com/forms/d/e/1FAIpQLSfubvD9WsgCS8EbB-VeTWtzUSw5Mk1-s66BuZik0GHuvQZhAw/viewform"  className="white-box">
            <h3>
              Looking for a specific tutorial? 
            </h3>
            <p>
             Click here to access our request form, and let us know about what Gnosis Protocol tutorials you'd like to see.
            </p>
          </a>

          <a className="white-box">
            <h3>
              To be continued...
            </h3>
            <p>
             More tutorials will be added over time. Be sure to come back soon.
            </p>
          </a>
          
        </div>
      </Container>
    </div>
  );
}

module.exports = Tutorial;
