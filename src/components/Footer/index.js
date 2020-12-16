import React, { Component } from 'react'
import './style.css'

class Footer extends Component {
  render () {
    return (
      <footer className='footer'>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          My Account
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Forum
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Add Shops
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Comment
        </a>
        <br/>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Treasure Web
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
        Treasure Download
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Wedding
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Parenting
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Housing
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Dinner
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Education
        </a>
        <br/>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          PC Version
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Desktop Version
        </a>
        <em className="footer__seperator">|</em>
        <br/>
        <p className="footer__copyright">copyright ©2018 dianping.com</p>
      </footer>
    )
  }
}

export default Footer