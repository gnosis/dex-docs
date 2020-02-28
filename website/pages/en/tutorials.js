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
            Tutorials
          </div>
          <div className="index-info-block-text">
            <p>
            OK, enough about contracts, trades and optimization criterias. <br></br>
            Let’s start with some hands on examples on how to interact with the dƒusion protocol 
            </p>
          </div>
        </div>


        <div className="inner grid-blocks four-blocks-grid tutorials-boxes">
          <a href={docUrl("addtoken1")} className="white-box">
            <h3>
             How to add any ERC20 to the dFusion Protocol
            </h3>
            <p>
              This tutorial will teach you how to add any ERC20 token to the dƒusion protocol using Etherscan.  
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp;
              10min
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp;
              easy
              &nbsp;
              &nbsp;
              <i className="icon icon-small icon-pen"></i>
              none
            </p>
          </a>
          <a className="white-box">
            <h3>
              To be continued...
            </h3>
            <p>
             More tutorials will be added over time. Make sure to come back and learn more about the dƒusion protocol.
            </p>
          </a>
          
        </div>
      </Container>
    </div>
  );
}

module.exports = Tutorial;
