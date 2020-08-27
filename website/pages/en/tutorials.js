/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Tutorial(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="index-info-block grid-blocks two-blocks-grid">
          <div className="index-info-block-title">
            Gnosis Protocol Tutorials
          </div>
          <div className="index-info-block-text">
            <p>Enough for now with concepts, contracts, and criteria?</p>
            <p>
              Let’s get started with some basic tutorials on how to interact
              with Gnosis Protocol.
            </p>
          </div>
        </div>

        <div className="inner grid-blocks four-blocks-grid tutorials-boxes">
          <a href={docUrl("addtoken1")} className="white-box">
            <h3>Adding ERC-20 Tokens</h3>
            <p>
              This tutorial will teach you how to list any ERC-20 token on
              Gnosis Protocol using Etherscan.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp; 10min &nbsp; &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp; Easy &nbsp; &nbsp;
              <i className="icon icon-small icon-pen"></i>
              None
            </p>
          </a>

          <a href={docUrl("tutorial-limit-orders")} className="white-box">
            <h3>Submit a limit order</h3>
            <p>
              This tutorial will teach you how to place one (standing) limit
              order using Etherscan, including deposit and withdrawal.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp; 15min &nbsp; &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp; Med &nbsp; &nbsp;
              <i className="icon icon-small icon-pen"></i>
              Intro
            </p>
          </a>

          <a href={docUrl("tutorial-multiple-orders")} className="white-box">
            <h3>Submit multiple orders</h3>
            <p>
              This tutorial will teach you how to place multiple orders or
              pre-schedule orders using Etherscan.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp; 15min &nbsp; &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp; Med &nbsp; &nbsp;
              <i className="icon icon-small icon-pen"></i>
              Limit Orders
            </p>
          </a>

          <a href={docUrl("tutorial-cmm")} className="white-box">
            <h3>Set up the custom market maker</h3>
            <p>
              This tutorial will teach you how to set up the CMM for liquidity
              provision.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp; 15min &nbsp; &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp; Med &nbsp; &nbsp;
              <i className="icon icon-small icon-pen"></i>
              CMM Intro
            </p>
          </a>
          

          <a href={docUrl("tutorial-telegram-bot")} className="white-box">
            <h3>Setting up Telegram notifications</h3>
            <p>
              This tutorial will teach you how to set up a Telegram bot that
              will notify you of important activities on Gnosis Protocol.
            </p>
            <p className="box-icons">
              <i className="icon icon-small icon-time"></i>
              &nbsp; 45min &nbsp; &nbsp;
              <i className="icon icon-small icon-star"></i>
              &nbsp; Med &nbsp; &nbsp;
              <i className="icon icon-small icon-pen"></i>
              Intro
            </p>
          </a>
        </div>

        <div className="inner grid-blocks four-blocks-grid tutorials-boxes">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfubvD9WsgCS8EbB-VeTWtzUSw5Mk1-s66BuZik0GHuvQZhAw/viewform"
            className="white-box"
          >
            <h3>Looking for a specific tutorial?</h3>
            <p>
              Click here to access our request form, and let us know about what
              Gnosis Protocol tutorials you'd like to see.
            </p>
          </a>
        </div>
      </Container>
    </div>
  );
}

module.exports = Tutorial;
